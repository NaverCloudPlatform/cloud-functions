import sys
import os
import hashlib
import hmac
import base64
import requests
import time
import json

def main(args):
  # millisecond
  timestamp = int(time.time() * 1000)
  timestamp = str(timestamp)

  access_key = "{access_key}"   # access key id (from portal or sub account)
  secret_key = "{secret_key}"   # secret key (from portal or sub account)
  service_id = "{service_id}"   # your SENS project service id
  
  secret_key = bytes(secret_key, 'UTF-8')

  method = "POST"
  uri = "/sms/v2/services/{}/messages".format(service_id)

  # this is simplest data form. check full spec of data format
  # url : https://apidocs.ncloud.com/ko/ai-application-service/sens/sms_v2/#요청-body
  data = {
    "type":"SMS",
    "contentType":"COMM",
    "from":"{from_phone_number}",
    "content":"{message_content}",
    "messages":[
        {
            "to":"{to_phone_number}"
        }
    ],
    "files":[]
  }

  data = json.dumps(data)
  data = bytes(data, "UTF-8")

  message = "{} {}\n{}\n{}".format(method, uri, timestamp, access_key)
  message = bytes(message, "UTF-8")
  signingKey = base64.b64encode(hmac.new(secret_key, message, digestmod=hashlib.sha256).digest())
  
  # Post method
  headers = {"Content-Type": "application/json; charset=utf-8", "x-ncp-apigw-timestamp": timestamp, "x-ncp-iam-access-key": access_key, "x-ncp-apigw-signature-v2": signingKey}
  url = "https://sens.apigw.ntruss.com/sms/v2/services/{}/messages".format(service_id)
  response = requests.post(url=url, headers=headers, data=data)

  return {"payload": response.json()}
