const AWS = require('aws-sdk');

const endpoint = new AWS.Endpoint('https://kr.object.ncloudstorage.com');
const region = 'kr-standard';

/**
 * Action to query all Object Storage buckets
 *
 * Input parameters that must be defined as action parameters
 * @params {string} accessKey: NAVER Cloud Platform account access key used for API authentication
 * @params {string} secretKey: NAVER Cloud Platform account secret key used for API authentication
 */
function listBucket(params) {
  const S3 = new AWS.S3({
    endpoint,
    region,
    credentials: {
      accessKeyId: params.accessKey,
      secretAccessKey: params.secretKey,
    },
  });

  return new Promise((resolve, reject) => {
    S3.listBuckets()
      .promise()
      .then((buckets) => {
        resolve({ done: true, buckets: buckets });
      })
      .catch((error) => {
        reject({ done: false, errorMessage: error });
      });
  });
}

exports.main = listBucket;
