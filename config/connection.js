const mysql = require("mysql");

// const connection = mysql.createConnection({
//   host: "localhost",
//   port: 3306,
//   user: "root",
//   password: "password",
//   database: "burgers_db"
// });

const connection = mysql.createPool({
  host: "us-cdbr-east-02.cleardb.com",
  user: "b8fb68a851496f",
  password: "21bf5db5",
  database: "heroku_92885bc0c03ac97"
});
 
// create mysql connection
connection.getConnection((err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

module.exports = connection;