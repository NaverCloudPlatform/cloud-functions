import hashlib
import hmac
import base64
import requests
import time


# Signature is the value of `x-ncp-apigw-signature-v2` field in the header.
def make_signature(url, timestamp, access_key, secret_key):
    timestamp = int(time.time() * 1000)
    timestamp = str(timestamp)

    secret_key = bytes(secret_key, "UTF-8")

    method = "GET"

    message = method + " " + url + "\n" + timestamp + "\n" + access_key
    message = bytes(message, "UTF-8")
    sign_key = base64.b64encode(
        hmac.new(secret_key, message, digestmod=hashlib.sha256).digest()
    )
    print(sign_key)
    return sign_key


# Header is required for authentication to call NAVER Cloud Platform API.
def make_header(timestamp, access_key, sign_key):
    headers = {
        "Content-Type": "application/json; charset=utf-8",
        "x-ncp-apigw-timestamp": timestamp,
        "x-ncp-iam-access-key": access_key,
        "x-ncp-apigw-signature-v2": sign_key,
    }
    return headers


"""
Action to start(or stop) server(VPC) instances using Server API

Input parameters that must be defined as action parameters
args:
    access_key: NAVER Cloud Platform account access key used for API authentication
    secret_key: NAVER Cloud Platform account secret key used for API authentication
    base_url: https://ncloud.apigw.ntruss.com
    api_url: `/vserver/v2/startServerInstances` or `/vserver/v2/stopServerInstances`
    server_instances: list of instances' Id to start or stop (e.g. [11111111, 22222222])

Please refer to the Server API guide for the accurate `base_url` and `ap_url`.
"""


def main(args):  # control vpc server instance
    api_url_with_params = args["api_url"]

    if len(args["server_instances"]) > 0:
        api_url_with_params += f'?serverInstanceNoList.1={args["server_instances"][0]}'

    for i in range(1, len(args["server_instances"])):
        api_url_with_params += (
            f'&serverInstanceNoList.{i+1}={args["server_instances"][i]}'
        )

    url = f'{args["base_url"]}{api_url_with_params}'
    timestamp = str(int(time.time() * 1000))

    sign_key = make_signature(
        api_url_with_params, timestamp, args["access_key"], args["secret_key"]
    )
    headers = make_header(timestamp, args["access_key"], sign_key)

    try:
        res = requests.get(url, headers=headers)

        if res.status_code == 200:
            return {"done": True}
        else:
            raise Exception({"done": False, "error_message": res.text})
            
    except Exception as e:
        raise Exception({"done": False, "error_message": str(e)})
