import boto3

service_name = "s3"
endpoint = "https://kr.object.ncloudstorage.com"


"""
Action to delete an Object Storage bucket

Input parameters that must be defined as action parameters
args:
    access_key (str): NAVER Cloud Platform account access key used for API authentication
    secret_key (str): NAVER Cloud Platform account secret key used for API authentication
    bucket_name (str): name of a bucket to delete
"""


def main(args):
    try:
        s3 = boto3.client(
            service_name,
            endpoint_url=endpoint,
            aws_access_key_id=args["access_key"],
            aws_secret_access_key=args["secret_key"],
        )

        s3.delete_bucket(Bucket=args["bucket_name"])

        return {"done": True}

    except Exception as e:
        return {"done": False, "error_message": str(e)}
