const mysql = require('mysql');

/**
 * Action to update a student from a table `Student(studentId, name, age)` on Cloud DB for MySQL
 *
 * Input parameters that must be defined as action parameters
 * @params {string} cdbHost: private domain of Cloud DB for MySQL
 * @params {string} cdbUser: user of Cloud DB for MySQL
 * @params {string} cdbPass: user password of Cloud DB for MySQL
 * @params {string} cdbDatabase: name of database of Cloud DB for MySQL
 * @params {string} cdbTable: name of a table of Cloud DB for MySQL
 * @params {number} studentId: id of a student to update
 * @params {string} name: name of a student to update
 * @params {number} age: age of a student to update
 */
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
