const AWS = require('aws-sdk');

const endpoint = new AWS.Endpoint('https://kr.object.ncloudstorage.com');
const region = 'kr-standard';

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
