import boto3

service_name = "s3"
endpoint = "https://kr.object.ncloudstorage.com"


def main(args):
    try:
        s3 = boto3.client(
            service_name,
            endpoint_url=endpoint,
            aws_access_key_id=args["access_key"],
            aws_secret_access_key=args["secret_key"],
        )

        buckets = s3.list_buckets()

        return {"done": True, "buckets": buckets}

    except Exception as e:
        return {"done": False, "error_message": e}
