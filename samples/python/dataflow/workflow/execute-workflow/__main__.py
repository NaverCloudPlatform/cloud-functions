import base64
import hashlib
import hmac
import json
import logging
import os
import time
from urllib.parse import urlsplit

import requests


logger = logging.getLogger(__name__)

API_HOST = "https://dataflow.apigw.ntruss.com"


def make_signature(method, path_with_query, timestamp, access_key, secret_key):
    message = "{} {}\n{}\n{}".format(
        method.upper(), path_with_query, timestamp, access_key
    )
    digest = hmac.new(
        secret_key.encode("utf-8"),
        message.encode("utf-8"),
        hashlib.sha256,
    ).digest()
    return base64.b64encode(digest).decode("utf-8")


# NOTE: Surface the reason the server gave. A status code alone does not say
# whether the path is missing or the workflow id is wrong. DataFlow answers with
# detail/errorType, API Gateway with error, so the message also tells them apart.
def failure_reason(response):
    try:
        body = response.json()
    except ValueError:
        return response.text[:300]

    if isinstance(body, dict) and ("detail" in body or "errorType" in body):
        return "{} (errorType={})".format(
            body.get("detail", ""), body.get("errorType", "")
        )
    return "rejected before reaching DataFlow: {}".format(
        json.dumps(body, ensure_ascii=False)[:300]
    )


def main(args):
    # Action default parameters and invocation parameters are merged into args.
    params = dict(args) if isinstance(args, dict) else {}

    access_key = params["NCLOUD_ACCESS_KEY"]
    secret_key = params["NCLOUD_SECRET_KEY"]
    workflow_id = params["DATAFLOW_WORKFLOW_ID"]

    action_name = os.environ["__OW_ACTION_NAME"]
    activation_id = os.environ["__OW_ACTIVATION_ID"]

    # NOTE: Only the call source is sent. The invocation event stays in Cloud Functions.
    payload = {
        "cloudFunctions": {
            "actionName": action_name,
            "activationId": activation_id,
        },
    }

    execution_path = "/api/v1/workflows/{}/executions".format(workflow_id)
    url = API_HOST + execution_path
    parsed_url = urlsplit(url)
    signature_path = parsed_url.path + (
        "?" + parsed_url.query if parsed_url.query else ""
    )

    payload_header = base64.b64encode(
        json.dumps(
            payload,
            ensure_ascii=False,
            separators=(",", ":"),
        ).encode("utf-8")
    ).decode("ascii")

    timestamp = str(int(time.time() * 1000))
    headers = {
        "Content-Type": "application/json",
        "x-ncp-apigw-timestamp": timestamp,
        "x-ncp-iam-access-key": access_key,
        "x-ncp-apigw-signature-v2": make_signature(
            "POST", signature_path, timestamp, access_key, secret_key
        ),
        "x-ncp-dataflow-payload": payload_header,
    }

    response = requests.post(
        url,
        headers=headers,
        timeout=30,
    )
    logger.info(
        "DataFlow workflow execution requested: "
        "status=%s, workflowId=%s, actionName=%s, activationId=%s",
        response.status_code,
        workflow_id,
        action_name,
        activation_id,
    )
    if not response.ok:
        raise RuntimeError(
            "DataFlow workflow execution failed: "
            "status={}, workflowId={}, {}".format(
                response.status_code, workflow_id, failure_reason(response)
            )
        )
    response_body = response.json()

    return {
        "statusCode": response.status_code,
        "body": response_body,
    }
