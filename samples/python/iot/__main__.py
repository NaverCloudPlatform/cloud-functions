import json
import redis
import pymongo


def get_device_info(redis_client, device_id):
    device_info = redis_client.hget("deviceId", device_id).decode("utf8")
    return json.loads(device_info)


"""
Action retrieves `deviceInfo` from Cloud DB for Cache using `deviceId` received from an IoT trigger,
supplement the information received from the IoT trigger, and store it in Cloud DB for MongoDB.

You need to set Cloud IoT Core rules to send certain information through an IoT trigger.

Input parameters that must be defined as action parameters
args:
    access_info (dict):
        redis_host (str): the host IP of the Redis server that the action queries `deviceInfo` from
        redis_port (int): the port number of Redis server (default: 6379)
        mongo_url (str): the host IP of the MongoDB server that the action will access
        mongo_db_name (str): name of database in Cloud DB for MongoDB
        mongo_col_name (str): name of collection to store the data
"""


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
