const AWS = require('aws-sdk');

const endpoint = new AWS.Endpoint('https://kr.object.ncloudstorage.com');
const region = 'kr-standard';

function deleteBucket(params) {
  const S3 = new AWS.S3({
    endpoint,
    region,
    credentials: {
      accessKeyId: params.accessKey,
      secretAccessKey: params.secretKey,
    },
  });

  return new Promise((resolve, reject) => {
    S3.deleteBucket({
      Bucket: params.bucketName,
    })
      .promise()
      .then(() => {
        resolve({ done: true });
      })
      .catch((error) => {
        reject({
          done: false,
          errorMessage: error,
        });
      });
  });
}

exports.main = deleteBucket;
