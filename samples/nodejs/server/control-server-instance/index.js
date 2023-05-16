const axios = require('axios');
const CryptoJS = require('crypto-js');

// Signature is the value of `x-ncp-apigw-signature-v2` field in the header.
function makeSignature(url, timestamp, accessKey, secretKey) {
  const space = ' ',
    newLine = '\n',
    method = 'GET';

  const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);

  hmac.update(method);
  hmac.update(space);
  hmac.update(url);
  hmac.update(newLine);
  hmac.update(timestamp);
  hmac.update(newLine);
  hmac.update(accessKey);
  const hash = hmac.finalize();

  return hash.toString(CryptoJS.enc.Base64);
}

// Header is required for authentication to call NAVER Cloud Platform API.
function makeHeader(timestamp, accessKey, signKey) {
  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    'x-ncp-apigw-timestamp': timestamp,
    'x-ncp-iam-access-key': accessKey,
    'x-ncp-apigw-signature-v2': signKey,
  };

  return headers;
}

/**
 * Action to start(or stop) server(VPC) instances using Server API
 *
 * Input parameters that must be defined as action parameters
 * @params {string} accessKey: NAVER Cloud Platform account access key used for API authentication
 * @params {string} secretKey: NAVER Cloud Platform account secret key used for API authentication
 * @params {string} baseUrl: https://ncloud.apigw.ntruss.com
 * @params {string} apiUrl: `/vserver/v2/startServerInstances` or `/vserver/v2/stopServerInstances`
 * @params {array} serverInstances: list of instances' Id to start or stop (e.g. [11111111, 22222222])
 *
 * Please refer to the Server API guide for the accurate `baseUrl` and `apiUrl`.
 */
function controlVpcServerInstance(params) {
  let apiUrlWithParams = params.apiUrl;

  if (params.serverInstances.length > 0) {
    apiUrlWithParams += `?serverInstanceNoList.${(1).toString()}=${
      params.serverInstances[0]
    }`;
    for (let i = 1; i < params.serverInstances.length; i++) {
      apiUrlWithParams += `&serverInstanceNoList.${(i + 1).toString()}=${
        params.serverInstances[i]
      }`;
    }
  }

  const url = `${params.baseUrl}${apiUrlWithParams}`; // fullUrl
  const timestamp = new Date().getTime().toString(); // epoch, ms time for signKey and headers
  const signKey = makeSignature(
    apiUrlWithParams,
    timestamp,
    params.accessKey,
    params.secretKey
  );
  const headers = makeHeader(timestamp, params.accessKey, signKey);

  return new Promise((resolve, reject) => {
    axios
      .get(url, { headers: headers })
      .then(() => {
        resolve({ done: true });
      })
      .catch((error) => {
        reject({
          done: false,
          errorMessage: error, // or error.response.data.message
        });
      });
  });
}

exports.main = controlVpcServerInstance;
