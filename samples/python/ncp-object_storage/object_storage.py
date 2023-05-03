
import boto3

service_name = 's3'
endpoint_url = 'https://kr.object.ncloudstorage.com'
region_name = 'kr-standard'

access_key = 'ACCESS_KEY'
secret_key = 'SECRET_KEY'

    
def main(args):
    
    ret = dict() 
    
    s3 = boto3.client(service_name, endpoint_url=endpoint_url, aws_access_key_id=access_key,
                      aws_secret_access_key=secret_key)

    bucket_name = 'ncf-bucket-test'

    s3.create_bucket(Bucket=bucket_name)

    return {"payload" : "success"}

    