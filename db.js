const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "yamanote.proxy.rlwy.net",
  user: "root",
  password: "oXmrilWjCFRfiobrOuWPNFNIjwlVIsUo",
  database: "railway",
});

module.exports = pool.promise();
