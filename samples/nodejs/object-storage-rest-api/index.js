const AWS = require('aws-sdk');

const endpoint = new AWS.Endpoint('https://kr.object.ncloudstorage.com');
const region = 'kr-standard';

function setResponse(statusCode, body) {
  return {
    'Content-Type': 'application/json',
    statusCode: statusCode,
    body: body,
  };
}

let S3;

function setS3Client(accessKey, secretKey) {
  console.log('--- new object storage client ---');
  return new AWS.S3({
    endpoint,
    region,
    credentials: {
      accessKeyId: accessKey,
      secretAccessKey: secretKey,
    },
  });
}

function base64Decode(base64Str) {
  return atob(base64Str);
}

async function getObjectContent(bucketName, objectName) {
  try {
    const data = await S3.getObject({
      Bucket: bucketName,
      Key: objectName,
    }).promise();
    console.log('Object query done.');
    return data.Body.toString('utf-8');
  } catch (e) {
    console.error('Object upload Failed.');
    throw e;
  }
}

async function postObject(bucketName, objectName, data) {
  const objectData = Buffer.from(data);

  try {
    const response = await S3.putObject({
      Bucket: bucketName,
      Key: objectName,
      Body: objectData,
    }).promise();
    console.log('Object upload done.');
  } catch (e) {
    console.error('Object upload failed.');
    throw e;
  }
}

async function deleteObject(bucketName, objectName) {
  try {
    await S3.deleteObject({ Bucket: bucketName, Key: objectName }).promise();
    console.log('Object removing done.');
  } catch (e) {
    console.error('Object removing Failed.');
    throw e;
  }
}

/**
 * Web Action to store, query and delete an object from an Object Storage bucket
 *
 * With this web action, a client can specify name or content of an object, using http request path or body.
 *
 * Input parameters that must be defined as action parameters
 * @params {string} accessKey: NAVER Cloud Platform account access key used for API authentication
 * @params {string} secretKey: NAVER Cloud Platform account secret key used for API authentication
 * @params {string} bucketName: name of a bucket to upload/query/delete an object
 */
async function main(params) {
  try {
    // set client for Object Storage
    if (!S3) {
      S3 = setS3Client(params.accessKey, params.secretKey);
    }

    // parse http request
    const method = params.__ow_method;
    const body = params.__ow_body; // base64 encoded body, and only available when 'raw-http' option is true
    const path = params.__ow_path;
    const pathComponents = path.split('/');

    // response for invalid request path
    if (pathComponents.length > 3 || pathComponents[1] !== 'objects') {
      return setResponse(400, { error: 'Invalid request format.' });
    }

    const objectName =
      pathComponents.length === 3 ? pathComponents[2] : undefined;

    /* when called `GET  /objects/{object-name}` */
    if (method === 'get') {
      if (!objectName) {
        return setResponse(400, { error: 'Invalid request format.' });
      }
      return setResponse(200, {
        content: await getObjectContent(params.bucketName, objectName),
      });
    }

    /* when called `POST  /objects` with a body including `name`, `content` to store(or update) on object storage */
    if (method === 'post') {
      if (body === undefined)
        setResponse(400, { error: 'The request body is missing or empty.' });

      const bodyJson = JSON.parse(base64Decode(body));
      await postObject(params.bucketName, bodyJson.name, bodyJson.content);
      return setResponse(201, {
        message: `Create/Update object ${bodyJson.name} successfully.`,
      });
    }

    /* when called `DELETE  /objects/{object-name}` to delete an object */
    if (method === 'delete') {
      if (!objectName) {
        return setResponse(400, { error: 'Invalid request format.' });
      }
      await deleteObject(params.bucketName, objectName);
      return setResponse(204);
    }
  } catch (e) {
    console.error(e);
    return setResponse(500, { error: 'An unexpected error occurred.' });
  }
}

exports.main = main;
