const mysql = require('mysql');
let conn;

function makeResponse(statusCode, body) {
  return {
    headers: { 'Content-Type': 'application/json' },
    statusCode: statusCode, // bad request
    body: body,
  };
}

/**
 * Web Action which manipulates(CRUD) a table `Student(studentId, name, age)` on Cloud DB for MySQL
 *
 * Input parameters that must be defined as action parameters
 * @params {string} cdbHost: private domain of a database on Cloud DB for MySQL
 * @params {string} cdbUser: user of a database on Cloud DB for MySQL
 * @params {string} cdbPass: user password of a database on Cloud DB for MySQL
 * @params {string} cdbDatabase: name of database on Cloud DB for MySQL
 * @params {string} cdbTable: name of a table on Cloud DB for MySQL
 */
function cdbMysqlApp(params) {
  if (!conn) {
    conn = mysql.createConnection({
      host: params.cdbHost,
      user: params.cdbUser,
      password: params.cdbPass,
      database: params.cdbDatabase,
    });
    conn.connect();
  }

  const method = params.__ow_method;
  const path = params.__ow_path;
  const pathComponents = path.split('/');

  if (pathComponents.length === 2 && pathComponents[1] === 'students') {
    /* when called `POST  /students` with a body including `studentId`, `name`, `age` of a student to create */
    const encodedBody = params.__ow_body;
    const decodedBody = JSON.parse(
      Buffer.from(encodedBody, 'base64').toString('utf-8')
    );

    const studentId = decodedBody.studentId;
    const name = decodedBody.name;
    const age = decodedBody.age;

    return new Promise(function (resolve, reject) {
      const query = `INSERT INTO ${params.cdbTable}(studentId, name, age) VALUES(${studentId}, '${name}', ${age})`;
      conn.query(query, function (error, results, fields) {
        if (error) {
          reject(makeResponse(400, { errorMessage: error })); // bad request
        }

        resolve(makeResponse(201, results)); // ok, created
      });
    });
  } else if (pathComponents.length === 3 && pathComponents[1] === 'students') {
    const studentId = pathComponents[2];

    if (method === 'get') {
      /* when called `GET  /students/{studentId}` */
      return new Promise(function (resolve, reject) {
        const query = `SELECT * FROM ${params.cdbTable} WHERE studentId=${studentId}`;

        conn.query(query, function (error, results, fields) {
          if (error) {
            reject(makeResponse(400, { errorMessage: error })); // bad request
          }

          resolve(makeResponse(200, { studentInfo: results })); // ok
        });
      });
    } else if (method === 'put') {
      /* when called `PUT  /students/{studentId}` with a body including `name`, `age` to update */
      const encodedBody = params.__ow_body;
      const decodedBody = JSON.parse(
        Buffer.from(encodedBody, 'base64').toString('utf-8')
      );
      const name = decodedBody.name;
      const age = decodedBody.age;

      return new Promise(function (resolve, reject) {
        const query = `UPDATE ${params.cdbTable} SET name='${name}', age=${age} WHERE studentId='${studentId}'`;

        conn.query(query, function (error, results, fields) {
          if (error) {
            reject(makeResponse(400, { errorMessage: error }));
          }

          resolve(makeResponse(200, results)); // ok
        });
      });
    } else if (method === 'delete') {
      /* when called `DELETE  /students/{studentId}` */
      return new Promise(function (resolve, reject) {
        const query = `DELETE FROM ${params.cdbTable} WHERE studentId='${studentId}'`;
        conn.query(query, function (error, results, fields) {
          if (error) {
            reject(makeResponse(400, { errorMessage: error })); // bad request
          }

          resolve(makeResponse(200, results)); // ok
        });
      });
    }
  } else {
    return new Promise(function (resolve, reject) {
      resolve(
        makeResponse(405, {
          errorMessage: 'Invalid URL or not allowed methods',
        })
      ); // methods not allowed
    });
  }
}

exports.main = cdbMysqlApp;
