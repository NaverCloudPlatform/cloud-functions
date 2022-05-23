import redis


def main(args):
    try:
        rd = redis.StrictRedis(host=args["redis_host"], port=args["redis_port"])

        rd.set(args["term"], args["definition"])

        return {"done": True}

    except Exception as e:
        raise Exception({"done": False, "error_message": str(e)})
