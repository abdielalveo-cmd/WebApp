const mysql = require('mysql');

// const connection = mysql.createConnection({
//   host: '192.168.99.100', // check on your computer
//   port: '3306', // default port
//   user: 'root',
//   password: 'root',
//   database: 'supersami',
// });

const connection = mysql.createConnection({
  host: 'eu-cdbr-west-03.cleardb.net', // check on your computer
  port: '3306', // default port
  user: 'bd1fcc1b71587e',
  password: '19a8684d',
  database: 'heroku_c242eafe9967244',
});
connection.connect((error) => {
  if (error) console.log(error);
  else console.log('Database Connected!');
});

module.exports.connection = connection;
