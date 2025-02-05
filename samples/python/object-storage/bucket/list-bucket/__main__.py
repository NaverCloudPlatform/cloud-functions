import platform
import boto3

service_name = "s3"
endpoint = "https://kr.object.ncloudstorage.com"


"""
Action to query all Object Storage buckets

Input parameters that must be defined as action parameters
args:
    access_key (str): NAVER Cloud Platform account access key used for API authentication
    secret_key (str): NAVER Cloud Platform account secret key used for API authentication
"""


def main(args):
    try:
        major, minor, path = platform.python_version_tuple()
        if major == "3" and minor == "11":
            import collections
            collections.Callable = collections.abc.Callable
        
        s3 = boto3.client(
            service_name,
            endpoint_url=endpoint,
            aws_access_key_id=args["access_key"],
            aws_secret_access_key=args["secret_key"],
        )

        buckets = s3.list_buckets()
        
        bucket_names = [bucket["Name"] for bucket in buckets.get("Buckets", [])]

        return {"done": True, "buckets": bucket_names}

    except Exception as e:
        return {"done": False, "error_message": str(e)}
