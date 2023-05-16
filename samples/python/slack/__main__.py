import json
import requests


"""
Action to send a notification to Slack when a Github event(e.g. push) information received from a Github trigger

Input parameters that must be defined as action parameters
args:
    slack_url: slack webhook URL of a channel
"""


def main(args):
    """
    The following event information `repository, commits` comes from Github to a Github trigger.
    """
    repo_name = args["repository"]["name"]
    commit_info = args["commits"][0]
    author = commit_info["author"]["name"]
    commit_msg = commit_info["message"]

    alert_data = {
        "text": f"author({author}) committed on repo({repo_name}) with msg({commit_msg})"
    }

    try:
        res = requests.post(args["slack_url"], data=json.dumps(alert_data))

        if res.status_code == 200:
            return {"done": True}

        else:
            raise Exception({"done": False, "error_message": res.text})

    except Exception as e:
        raise Exception({"done": False, "error_message": str(e)})
