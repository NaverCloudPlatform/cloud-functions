const axios = require('axios');

function alertSlack(params) {
  const repoName = params.repository.name;
  const commitInfo = params.commits[0];
  const author = commitInfo.author.name;
  const commitMsg = commitInfo.message;

  const alertData = {
    text: `user(${author}) commited on repo(${repoName}) with msg(${commitMsg})`,
  };

  return new Promise(function (resolve, reject) {
    axios
      .post(params.slackUrl, alertData)
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

exports.main = alertSlack;
