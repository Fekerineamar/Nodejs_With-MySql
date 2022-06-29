import mysql from "mysql";

const con = mysql.createConnection({
  multipleStatements: true,
  host: "localhost",
  user: "root",
  password: "Admin123",
});

export default con;
