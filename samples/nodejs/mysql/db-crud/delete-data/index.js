const mysql = require('mysql');

function deleteStudent(params) {
  return new Promise((resolve, reject) => {
    const conn = mysql.createConnection({
      host: params.cdbHost,
      user: params.cdbUser,
      password: params.cdbPass,
      database: params.cdbDatabase,
    });

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
