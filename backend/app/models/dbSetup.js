const db = require('./db.js');

exports.start = () => {
  return new Promise(function (resolve, reject) {
    let sql = 'CREATE DATABASE IF NOT EXISTS coffeeDB';
    let results = 'result';

    
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      results = result;
      console.log(results);
      resolve(results);
    });
  });
};
