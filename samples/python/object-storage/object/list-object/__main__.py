import boto3

service_name = "s3"
endpoint = "https://kr.object.ncloudstorage.com"
MAX_KEYS = 300


"""
Action to query all objects from Object Storage bucket

Input parameters that must be defined as action parameters
args:
    access_key (str): NAVER Cloud Platform account access key used for API authentication
    secret_key (str): NAVER Cloud Platform account secret key used for API authentication
    bucket_name (str): name of a bucket to query objects
"""


def main(args):
    try:
        s3 = boto3.client(
            service_name,
            endpoint_url=endpoint,
            aws_access_key_id=args["access_key"],
            aws_secret_access_key=args["secret_key"],
        )

        object_list = []

        while True:
            response = s3.list_objects(Bucket=args["bucket_name"], MaxKeys=MAX_KEYS)

            for content in response.get("Contents"):
                object_list.append(content.get("Key"))
            # response.get('IsTrucated') - set to False when all results were returned
            if response.get("IsTruncated") == False:
                break

        return {"done": True, "objects": object_list}

    except Exception as e:
        return {"done": False, "error_message": e}
