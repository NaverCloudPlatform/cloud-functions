const fs = require('fs');
const AWS = require('aws-sdk');

const endpoint = new AWS.Endpoint('https://kr.object.ncloudstorage.com');
const region = 'kr-standard';

function uploadObject(params) {
  const S3 = new AWS.S3({
    endpoint,
    region,
    credentials: {
      accessKeyId: params.accessKey,
      secretAccessKey: params.secretKey,
    },
  });

  return new Promise((resolve, reject) => {
    S3.putObject({
      Bucket: params.bucketName,
      Key: params.objectName,
      ACL: 'public-read',
      Body: fs.createReadStream('./ncloud_image.jpeg'),
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

exports.main = uploadObject;
