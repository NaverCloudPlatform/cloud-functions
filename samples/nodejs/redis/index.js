const redis = require('redis');
let client;

function saveWord(params) {
  client = redis.createClient({
    url: params.redisUrl,
  });

  return new Promise((resolve, reject) => {
    client
      .connect()
      .then(() => {
        client.set(params.term, params.definition);
      })
      .then(() => {
        resolve({ done: true });
      })
      .catch((error) => {
        reject({ done: false, errorMessage: error });
      });
  });
}

exports.main = saveWord;
