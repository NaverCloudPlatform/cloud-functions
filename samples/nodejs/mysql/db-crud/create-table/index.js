const mysql = require('mysql');
let conn;

function createTable(params) {
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

    const query = `CREATE TABLE ${params.cdbTable}(
                      studentId INT NOT NULL,
                      name VARCHAR(50) NOT NULL,
                      age INT NOT NULL,
                      PRIMARY KEY(studentId))`;

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

exports.main = createTable;
