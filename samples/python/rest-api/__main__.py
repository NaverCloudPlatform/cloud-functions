import json
import base64
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


def make_response(statusCode, body):
    return {
        "headers": {"Content-Type": "application/json"},
        "statusCode": statusCode,
        "body": body,
    }


def insert_student(table, student_id, name, age):
    with conn.cursor() as cursor:
        query = f"INSERT INTO {table}(studentId, name, age) VALUES({student_id}, '{name}', {age})"
        cursor.execute(query)
    conn.commit()


def retrieve_student(table, student_id):
    with conn.cursor() as curs:
        sql = f"SELECT * FROM {table} WHERE studentId={student_id}"
        curs.execute(sql)
        row = curs.fetchall()
        return row


def update_student(table, student_id, name, age):
    with conn.cursor() as cursor:
        query = (
            f"UPDATE {table} SET name='{name}', age={age} WHERE studentId={student_id}"
        )
        cursor.execute(query)
    conn.commit()


def delete_student(table, student_id):
    with conn.cursor() as cursor:
        query = f"DELETE FROM {table} WHERE studentId={student_id}"
        cursor.execute(query)
    conn.commit()


"""
Web Action which manipulates(CRUD) a table `Student(studentId, name, age)` on Cloud DB for MySQL

Input parameters that must be defined as action parameters
args:
    cdb_host (str): private domain of a database on Cloud DB for MySQL
    cdb_user (str): user of a database on Cloud DB for MySQL
    cdb_pass (str): user password of a database on Cloud DB for MySQL
    cdb_database (str): name of database on Cloud DB for MySQL
    cdb_table (str): name of a table on Cloud DB for MySQL
"""


def main(args):
    method, path = args["__ow_method"], args["__ow_path"]
    path_components = path.split("/")

    try:
        if conn is None or not conn.open:
            db_connect(
                args["cdb_host"],
                args["cdb_user"],
                args["cdb_pass"],
                args["cdb_database"],
            )

        if len(path_components) == 2 and path_components[1] == "students":
            # When called `POST  /students` with a body including `studentId`, `name`, `age` of a student to create
            encoded_body = args["__ow_body"]
            decoded_body = json.loads(base64.b64decode(encoded_body).decode("utf8"))

            student_id = decoded_body["student_id"]
            name = decoded_body["name"]
            age = decoded_body["age"]

            insert_student(args["cdb_table"], student_id, name, age)

            return make_response(201, {"done": True})  # ok, created

        elif len(path_components) == 3 and path_components[1] == "students":
            student_id = path_components[2]

            if method == "get":
                # When called `GET  /students/{studentId}`
                student_info = retrieve_student(args["cdb_table"], student_id)

                return make_response(200, {"student_info": student_info})

            elif method == "put":
                # when called `PUT  /students/{studentId}` with a body including `name`, `age` to update
                encoded_body = args["__ow_body"]
                decoded_body = json.loads(base64.b64decode(encoded_body).decode("utf8"))

                name = decoded_body["name"]
                age = decoded_body["age"]

                update_student(args["cdb_table"], student_id, name, age)

                return make_response(200, {"done": True})

            elif method == "delete":
                # when called `DELETE  /students/{studentId}`
                delete_student(args["cdb_table"], student_id)

                return make_response(200, {"done": True})

        else:
            return make_response(
                405, {"error_message": "Invalid URL or not allowed method"}
            )

    except Exception as e:
        print(e) # check console activation result
        return make_response(400, {"done":False, "error_message": "check Error log on NCP console"})

    finally:
        conn.close()
