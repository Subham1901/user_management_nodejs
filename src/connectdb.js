const mysql = require("mysql");

const host = "localhost";
const user = "root";
const password = "subham";
const database = "prac";

// const getdbConnect = mysql.createConnection();

const getdbConnect = mysql.createConnection({ host, user, password, database });

module.exports = getdbConnect;
