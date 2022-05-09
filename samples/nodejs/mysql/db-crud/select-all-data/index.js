const mysql = require('mysql');
let conn;

function selectAll(params) {
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

    const query = `SELECT * FROM ${params.cdbTable}`;

    conn.query(query, (error, results, fields) => {
      if (error) {
        reject({
          done: false,
          errorMessage: error,
        });
      }
      resolve({
        done: true,
        students: results,
      });
    });
  });
}

exports.main = selectAll;
