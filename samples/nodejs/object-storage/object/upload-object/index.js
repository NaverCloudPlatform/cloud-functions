const fs = require('fs');
const AWS = require('aws-sdk');

const endpoint = new AWS.Endpoint('https://kr.object.ncloudstorage.com');
const region = 'kr-standard';

/**
 * Action to upload an object on Object Storage bucket
 *
 * Input parameters that must be defined as action parameters
 * @params {string} accessKey: NAVER Cloud Platform account access key used for API authentication
 * @params {string} secretKey: NAVER Cloud Platform account secret key used for API authentication
 * @params {string} bucketName: name of a bucket to upload an object
 * @params {string} objectName: name of an object to upload
 */
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
