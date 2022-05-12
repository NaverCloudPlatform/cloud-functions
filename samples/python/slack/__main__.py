import json
import requests


def main(args):
    repo_name = args["repository"]["name"]
    commit_info = args["commits"][0]
    author = commit_info["author"]["name"]
    commit_msg = commit_info["message"]

    alert_data = {"text": f"author({author}) commited on repo({repo_name}) with msg({commit_msg})"}

    try:
        res = requests.post(args["slack_url"], data=json.dumps(alert_data))

        if res.status_code == 200:
            return {"done": True, "status": res.status_code}
        else:
            return {"done": False, "status": res.status_code}

    except Exception as e:
        return {"done": False, "error_message": e}
