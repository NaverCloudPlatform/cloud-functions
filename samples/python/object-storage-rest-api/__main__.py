import json
import base64
import boto3
import requests

service_name = "s3"
endpoint_url = "https://kr.object.ncloudstorage.com"
region_name = "kr-standard"


S3 = None


def set_response(status_code, body):
    return {
        "Content-Type": "application/json",
        "statusCode": status_code,
        "body": json.dumps(body),
    }


def set_S3_client(access_key, secret_key):
    print("--- new object storage client ---")
    return boto3.client(
        service_name,
        endpoint_url=endpoint_url,
        aws_access_key_id=access_key,
        aws_secret_access_key=secret_key,
    )


def base64_decode(base64_str):
    return base64.b64decode(base64_str).decode("utf-8")


def get_object_content(bucket_name, object_name):
    try:
        global S3
        response = S3.get_object(Bucket=bucket_name, Key=object_name)
        print("Object query done.")
        return response["Body"].read().decode("utf-8")
    except Exception as e:
        print("Object upload Failed.")
        raise e


def post_object(bucket_name, object_name, data):
    try:
        global S3
        object_data = data.encode("utf-8")
        response = S3.put_object(Bucket=bucket_name, Key=object_name, Body=object_data)
        print("Object upload done.")
    except Exception as e:
        print("Object upload failed.")
        raise e


def delete_object(bucket_name, object_name):
    try:
        global S3
        response = S3.delete_object(Bucket=bucket_name, Key=object_name)
        print("Object removing done.")
    except Exception as e:
        print("Object removing Failed.")
        raise e


"""
Web Action to store, query and delete an object from an Object Storage bucket

With this web action, a client can specify name or content of an object, using http request path or body.

Input parameters that must be defined as action parameters
args:
    access_key (str): NAVER Cloud Platform account access key used for API authentication
    secret_key (str): NAVER Cloud Platform account secret key used for API authentication
    bucket_name (str): name of a bucket to upload/query/delete an object
"""


def main(args):
    try:
        # set client for Object Storage
        global S3
        if S3 is None:
            S3 = set_S3_client(args["access_key"], args["secret_key"])

        # parse http request
        method = args["__ow_method"]
        body = args[
            "__ow_body"
        ]  # base64 encoded body, only available when 'raw-http' option is true
        path = args["__ow_path"]
        path_components = path.split("/")

        # response for invalid request path
        if len(path_components) > 3 or path_components[1] != "objects":
            return set_response(400, {"error": "Invalid request format."})

        object_name = path_components[2] if len(path_components) == 3 else None

        # when called `GET  /objects/{object-name}`
        if method == "get":
            if object_name is None:
                return set_response(400, {"error": "Invalid request format."})
            return set_response(
                400,
                {"content": f"{get_object_content(args['bucket_name'], object_name)}"},
            )

        # when called `POST  /objects` with a body including `name`, `content` to store(or update) on object storage
        if method == "post":
            if body is None:
                set_response(400, {error: "The request body is missing or empty."})
            print("body:", body)
            body_json = json.loads(base64_decode(body))
            post_object(args["bucket_name"], body_json["name"], body_json["content"])
            return set_response(
                201,
                {"message": f"Create/Update object {body_json['name']} successfully."},
            )

        # when called `DELETE  /objects/{object-name}` to delete an object
        if method == "delete":
            if object_name is None:
                return set_response(400, {"error": "Invalid request format."})
            delete_object(args["bucket_name"], object_name)
            return set_response(204, None)

    except Exception as e:
        print(e)
        return set_response(500, {"error": "An unexpected error occurred."})
