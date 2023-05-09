import boto3

service_name = "s3"
endpoint = "https://kr.object.ncloudstorage.com"


"""
Action to delete an object on Object Storage bucket

Input parameters that must be defined as action parameters
args:
    access_key (str): NAVER Cloud Platform account access key used for API authentication
    secret_Key (str): NAVER Cloud Platform account secret key used for API authentication
    bucket_name (str): name of a bucket to delete an object
    object_name (str): name of an object to delete
"""


def main(args):
    try:
        s3 = boto3.client(
            service_name,
            endpoint_url=endpoint,
            aws_access_key_id=args["access_key"],
            aws_secret_access_key=args["secret_key"],
        )

        s3.delete_object(Bucket=args["bucket_name"], Key=args["object_name"])

        return {"done": True}

    except Exception as e:
        return {"done": False, "error_message": e}
