import sys
import os
import hashlib
import hmac
import base64
import requests
import time
import json


# Signature is the value of `x-ncp-apigw-signature-v2` field in the header.
def make_signature(url, timestamp, method, access_key, secret_key):
    timestamp = int(time.time() * 1000)
    timestamp = str(timestamp)

    secret_key = bytes(secret_key, "UTF-8")

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


def replace_service_id(path, service_id):
    return path.format(service_id=service_id)


"""
Action to send a simple sms using SENS API

Input Parameters that must be defined as action parameters
args:
    access_key (str): NAVER Cloud Platform account access key used for API authentication
    secret_key (str): NAVER Cloud Platform account secret key used for API authentication
    base_url (str): https://sens.apigw.ntruss.com
    api_url (str): /sms/v2/services/{service_id}/messages
    service_id (str): service id from a SENS project, this should replace api_url's {service_id}
    from_phone_number (str): phone number of a sender
    to_phone_number (str): phone number of a recipient
    message_content (str): content of a sms to send

Please refer to the SENS API guide for the accurate `base_url` and `api_url`.
`from_phone_number` must be registered as an `SMS Calling Number` in advance.
"""


def main(args):
    # SENS project service id
    service_id = args["service_id"]

    api_url = replace_service_id(args["api_url"], service_id)
    url = f'{args["base_url"]}{api_url}'

    timestamp = str(int(time.time() * 1000))  # milliseconds
    sign_key = make_signature(
        api_url, timestamp, "POST", args["access_key"], args["secret_key"]
    )

    # This is simplest data form. Check full spec of data format from SENS guide doc
    data = {
        "type": "SMS",
        "contentType": "COMM",  # or AD for advertisement, default: COMM
        "from": args["from_phone_number"],
        "content": args["message_content"],
        "messages": [{"to": args["to_phone_number"]}],
        "files": [],
    }
    data = json.dumps(data)
    data = bytes(data, "UTF-8")

    headers = make_header(timestamp, args["access_key"], sign_key)
    response = requests.post(url=url, headers=headers, data=data)

    return {"payload": response.json()}
