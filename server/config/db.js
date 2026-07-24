const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "SAM1132005",
    database: "strevo"
});

connection.connect((err) => {

    if(err){

        console.error("Database Connection Failed");
        console.error(err);
        return;

    }

    console.log("✅ MySQL Connected Successfully");

});

module.exports = connection;