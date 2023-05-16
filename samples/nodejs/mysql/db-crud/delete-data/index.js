const mysql = require('mysql');

/**
 * Action to delete a student from a table `Student(studentId, name, age)` on Cloud DB for MySQL
 *
 * Input parameters that must be defined as action(or trigger) parameters
 * @params {string} cdbHost: private domain of a database on Cloud DB for MySQL
 * @params {string} cdbUser: user of a database on Cloud DB for MySQL
 * @params {string} cdbPass: user password of a database on Cloud DB for MySQL
 * @params {string} cdbDatabase: name of database on Cloud DB for MySQL
 * @params {string} cdbTable: name of a table on Cloud DB for MySQL
 * @params {number} studentId: id of a student to delete
 */
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
