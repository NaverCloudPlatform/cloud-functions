const mysql = require('mysql');
let conn;

function deleteStudent(params) {
  return new Promise((resolve, reject) => {
    if (!conn) {
      conn = mysql.createConnection({
        host: params.cdbHost,
        user: params.cdbUser,
        password: params.cdbPass,
        database: params.cdbDatabase,
      });
      conn.connect();
    }

    const query = `DELETE FROM ${params.cdbTable} WHERE studentID = ${params.studentId}`;

    conn.query(query, (error, results, fields) => {
      if (error) {
        reject({
          done: false,
          errorMessage: error,
        });
      }
      resolve({ done: true });
    });
  });
}

exports.main = deleteStudent;
