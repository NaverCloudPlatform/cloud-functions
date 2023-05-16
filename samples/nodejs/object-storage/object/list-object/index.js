const AWS = require('aws-sdk');

const endpoint = new AWS.Endpoint('https://kr.object.ncloudstorage.com');
const region = 'kr-standard';
const MAX_KEYS = 300;

/**
 * Action to query all objects from Object Storage bucket
 *
 * Input parameters that must be defined as action parameters
 * @params {string} accessKey: NAVER Cloud Platform account access key used for API authentication
 * @params {string} secretKey: NAVER Cloud Platform account secret key used for API authentication
 * @params {string} bucketName: name of a bucket to query objects
 */
async function listObject(params) {
  const S3 = new AWS.S3({
    endpoint,
    region,
    credentials: {
      accessKeyId: params.accessKey,
      secretAccessKey: params.secretKey,
    },
  });

  const objectList = [];

  try {
    while (true) {
      const response = await S3.listObjectsV2({
        Bucket: params.bucketName,
        MaxKeys: MAX_KEYS,
      }).promise();

      for (let content of response.Contents) {
        objectList.push(content.Key);
      }
      // response.IsTruncated - set to false when all results were returned
      if (!response.IsTruncated) break;
    }

    return {
      done: true,
      objects: objectList,
    };
  } catch (error) {
    return { done: false, errorMessage: error };
  }
}

exports.main = listObject;
