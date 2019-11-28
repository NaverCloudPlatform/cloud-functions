import sys
import os
import hashlib
import hmac
import base64
import requests
import time
import json

def main(args):
  timestamp = int(time.time() * 1000)
  timestamp = str(timestamp)
  access_key = "{access_key}"				# access key id (from portal or sub account)
  secret_key = "{secret_key}"				# secret key (from portal or sub account)
  secret_key = bytes(secret_key, 'UTF-8')

  method = "GET"
  uri = "/geolocation/v2/geoLocation?ip={your_ip}&responseFormatType=json"

  message = "{} {}\n{}\n{}".format(method, uri, timestamp, access_key)
  message = bytes(message, "UTF-8")
  signingKey = base64.b64encode(hmac.new(secret_key, message, digestmod=hashlib.sha256).digest())
  
  # # Post method
  params = {"ip": "{your_ip}", "responseFormatType": "json"}
  headers = {"Content-Type": "application/json; charset=utf-8", "x-ncp-apigw-timestamp": timestamp, "x-ncp-iam-access-key": access_key, "x-ncp-apigw-signature-v2": signingKey}
  url = "https://geolocation.apigw.ntruss.com/geolocation/v2/geoLocation"
  response = requests.get(url=url, params=params, headers=headers)

  return {"payload": response.json()}
