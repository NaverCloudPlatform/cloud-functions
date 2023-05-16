import pymysql


conn = None


def db_connect(cdb_host, cdb_user, cdb_pass, cdb_database):
    global conn
    conn = pymysql.connect(
        host=cdb_host,
        user=cdb_user,
        password=cdb_pass,
        db=cdb_database,
        charset="utf8",
    )


"""
Action to create a table `Student(studentId, name, age)` in Cloud DB for MySQL

Input parameters that must be defined as action parameters
args:
    cdb_host (str): private domain of a database on Cloud DB for MySQL
    cdb_user (str): user of a database on Cloud DB for MySQL
    cdb_pass (str): user password of a database on Cloud DB for MySQL
    cdb_database (str): name of database on Cloud DB for MySQL
    cdb_table (str): name of a table on Cloud DB for MySQL
"""


def main(args):
    try:
        if conn is None or not conn.open:
            db_connect(
                args["cdb_host"],
                args["cdb_user"],
                args["cdb_pass"],
                args["cdb_database"],
            )

        with conn.cursor() as cursor:
            query = f"CREATE TABLE {args['cdb_table']}(studentId INT NOT NULL, name VARCHAR(50) NOT NULL, age INT NOT NULL, PRIMARY KEY(studentId))"
            cursor.execute(query)
        conn.commit()

        return {"done": True}

    except Exception as e:
        raise Exception({"done": False, "error_message": str(e)})

    finally:
        conn.close()
