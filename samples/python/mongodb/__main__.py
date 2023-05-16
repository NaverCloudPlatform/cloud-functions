from pymongo import MongoClient

"""
Action to store data(e.g. title/author of a book) in Cloud DB for MongoDB

Input parameters that must be defined as action parameters
args:
    mongo_url (str): the host IP of the MongoDB server that the action will access
    mongo_db_name (str): name of database in Cloud DB for MongoDB
    mongo_col_name (str): name of collection to store the data
    book_title (str)
    book_author (str)
"""


def main(args):
    try:
        client = MongoClient(args["mongo_url"])
        db = client[args["mongo_db_name"]]  # name of db
        col = db[args["mongo_col_name"]]  # name of collection

        col.insert_one({"title": args["book_title"], "author": args["book_author"]})

        return {"done": True}

    except Exception as e:
        return {"done": False, "error_message": e}
