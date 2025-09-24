const redis = require('redis');
let client;

/**
 * Action to store data(e.g., term and its definition) in Cloud DB for Cache
 *
 * Input parameters that must be defined as action parameters
 * @params {string} redisUrl: the host IP of the Redis server that the action will access
 * @params {} term
 * @params {} definition
 */
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
