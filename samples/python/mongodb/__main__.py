from pymongo import MongoClient


def main(args):
    try:
        client = MongoClient(args["mongo_url"])
        db = client[args["mongo_db_name"]]  # name of db
        col = db[args["mongo_col_name"]]  # name of collection

        col.insert_one({"title": args["book_title"], "author": args["book_author"]})

        return {"done": True}

    except Exception as e:
        return {"done": False, "error_message": e}
