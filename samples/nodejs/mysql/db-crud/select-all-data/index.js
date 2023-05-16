const mysql = require('mysql');

/**
 * Action to query all students from a table `Student(studentId, name, age)` on Cloud DB for MySQL
 *
 * Input parameters that must be defined as action parameters
 * @params {string} cdbHost: private domain of a database on Cloud DB for MySQL
 * @params {string} cdbUser: user of a database on Cloud DB for MySQL
 * @params {string} cdbPass: user password of a database on Cloud DB for MySQL
 * @params {string} cdbDatabase: name of database on Cloud DB for MySQL
 * @params {string} cdbTable: name of a table on Cloud DB for MySQL
 */
function selectAll(params) {
  return new Promise((resolve, reject) => {
    const conn = mysql.createConnection({
      host: params.cdbHost,
      user: params.cdbUser,
      password: params.cdbPass,
      database: params.cdbDatabase,
    });

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
