const axios = require('axios');

/**
 * Action to send a notification to Slack when a Github event(e.g. push) information received from a Github trigger
 *
 * Input parameters that must be defined as action parameters
 * @params {string} slackUrl: slack webhook URL of a channel
 */
function alertSlack(params) {
  /* The following event information `repository, commits` comes from Github to a Github trigger. */
  const repoName = params.repository.name;
  const commitInfo = params.commits[0];
  const author = commitInfo.author.name;
  const commitMsg = commitInfo.message;

  const alertData = {
    text: `user(${author}) committed on repo(${repoName}) with msg(${commitMsg})`,
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
