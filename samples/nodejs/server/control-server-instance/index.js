const axios = require('axios');
const CryptoJS = require('crypto-js');

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

function makeHeader(timestamp, accessKey, signKey) {
  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    'x-ncp-apigw-timestamp': timestamp,
    'x-ncp-iam-access-key': accessKey,
    'x-ncp-apigw-signature-v2': signKey,
  };

  return headers;
}

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
