const mysql = require('mysql');

/**
 * Action to create a table `Student(studentId, name, age)` in Cloud DB for MySQL
 *
 * Input parameters that must be defined as action parameters
 * @params {string} cdbHost: private domain of a database on Cloud DB for MySQL
 * @params {string} cdbUser: user of a database on Cloud DB for MySQL
 * @params {string} cdbPass: user password of a database on Cloud DB for MySQL
 * @params {string} cdbDatabase: name of database on Cloud DB for MySQL
 * @params {string} cdbTable: name of a table on Cloud DB for MySQL
 */
function createTable(params) {
  return new Promise((resolve, reject) => {
    const conn = mysql.createConnection({
      host: params.cdbHost,
      user: params.cdbUser,
      password: params.cdbPass,
      database: params.cdbDatabase,
    });

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
