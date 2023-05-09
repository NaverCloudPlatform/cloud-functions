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
Action to delete a student from a table `Student(studentId, name, age)` on Cloud DB for MySQL

Input parameters that must be defined as action parameters
args:
    cdb_host (str): private domain of a database on Cloud DB for MySQL
    cdb_user (str): user of a database on Cloud DB for MySQL
    cdb_pass (str): user password of a database on Cloud DB for MySQL
    cdb_database (str): name of database on Cloud DB for MySQL
    cdb_table (str): name of a table on Cloud DB for MySQL
    student_id (number): id of a student to delete
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

        with conn.cursor() as curs:
            query = (
                f"DELETE FROM {args['cdb_table']} WHERE studentId={args['student_id']}"
            )
            curs.execute(query)
        conn.commit()

        return {"done": True}

    except Exception as e:
        raise Exception({"done": False, "error_message": str(e)})

    finally:
        conn.close()
