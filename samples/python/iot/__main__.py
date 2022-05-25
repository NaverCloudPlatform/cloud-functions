import json
import redis
import pymongo


def get_device_info(redis_client, device_id):
    device_info = redis_client.hget("deviceId", device_id).decode("utf8")
    return json.loads(device_info)


def main(args):
    access_info = args["access_info"]

    try:
        redis_client = redis.StrictRedis(
            host=access_info["redis_host"], port=access_info["redis_port"]
        )

        device_info = get_device_info(redis_client, access_info["device_id"])

        mongo_client = pymongo.MongoClient(access_info["mongo_url"])
        mongo_db = mongo_client[access_info["mongo_db_name"]]
        col = mongo_db[access_info["mongo_col_name"]]

        del args["access_info"]  # delete access_info from action input args
        col.insert_one({**device_info, **args})

        return {"done": True}

    except Exception as e:
        raise Exception({"done": False, "error_message": str(e)})

