import redis

"""
Action to store data(e.g., term and its definition) in Cloud DB for Cache

Input parameters that must be defined as action parameters
args:
    redis_host (str): the host IP of the Redis server that the action will access
    redis_port (int): the port number of Redis server (default: 6379)
    term
    definition
"""


def main(args):
    try:
        rd = redis.StrictRedis(host=args["redis_host"], port=args["redis_port"])

        rd.set(args["term"], args["definition"])

        return {"done": True}

    except Exception as e:
        raise Exception({"done": False, "error_message": str(e)})
