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
