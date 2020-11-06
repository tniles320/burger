const connection = require("./connection")

// creates a question mark for each value
const printQuestionMarks = (num) => {
    let arr = [];
    for (let i = 0; i < num; i++) {
      arr.push("?");
    }
    return arr.toString();
}

// adds query to update devoured value from false to true
const objToSql = (ob) => {
    let arr = [];
    for (let key in ob) {
        const value = ob[key];
        if (Object.hasOwnProperty.call(ob, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = `'${value}'`;
            }
            arr.push(`${key}=${value}`);
        }
    }
    return arr.toString();
}
// orm variable
const orm = {
    // query to select all info from the table
    selectAll: function(tableInput, cb) {
        let queryString = `SELECT * FROM ${tableInput};`;
        connection.query(queryString, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    // query to add a burger to the table
    insertOne: function(table, cols, vals, cb) {
        let queryString = `INSERT INTO ${table}`;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        connection.query(queryString, vals, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    // query to update devoured from false to true
    updateOne: function(table, objColVals, condition, cb) {
        let queryString = `UPDATE ${table}`;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        connection.query(queryString, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    // query to delete a burger from the table
    delete: function(table, condition, cb) {
        let queryString = `DELETE FROM ${table}`;
        queryString += " WHERE ";
        queryString += condition;

        connection.query(queryString, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    }
};
  

module.exports = orm;