const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;

// REST API에서는 json 형태로 데이터를 주고 받음
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const data = fs.readFileSync("./database.json");
const conf = JSON.parse(data);
const mysql = require("mysql");
console.log(conf);

// .createConnection() : MySQL에 연결한 객체를 Node.js로 제어할 수 있도록 하는 함수
const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
});
// 실제로 연결을 수행하도록 함
connection.connect();

app.get("/api/customers", (req, res) => {
  // database에 쿼리를 전송하는 코드
  connection.query("SELECT * FROM CUSTOMER", (err, rows, fields) => {
    // response로 사용자의 정보가 담긴 rows를 반환
    res.send(rows);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
