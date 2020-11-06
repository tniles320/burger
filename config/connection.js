const mysql = require("mysql");

/*
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "burgers_db"
});
*/

const connection = mysql.createConnection({
  host: "us-cdbr-iron-east-02.cleardb.net",
  user: "b7e2437887xxxa",
  password: "0200xxx6",
  database: "heroku_7643ec736354xxx"
});

// create mysql connection
connection.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

module.exports = connection;