const mysql = require('mysql');

function insertStudent(params) {
  return new Promise((resolve, reject) => {
    const conn = mysql.createConnection({
      host: params.cdbHost,
      user: params.cdbUser,
      password: params.cdbPass,
      database: params.cdbDatabase,
    });

    const query = `INSERT INTO ${params.cdbTable}(studentId, name, age)
                       VALUES(${params.studentId}, '${params.name}', ${params.age})`;

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

exports.main = insertStudent;
