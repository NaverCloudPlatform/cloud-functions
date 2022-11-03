const mysql = require('mysql');

function updateStudent(params) {
  return new Promise((resolve, reject) => {
    const conn = mysql.createConnection({
      host: params.cdbHost,
      user: params.cdbUser,
      password: params.cdbPass,
      database: params.cdbDatabase,
    });

    const query = `UPDATE ${params.cdbTable} SET age = ${params.age} WHERE studentID = ${params.studentId}`;

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

exports.main = updateStudent;
