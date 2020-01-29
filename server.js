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

const multer = require("multer");
// 업로드 폴더 설정 : 기본 root 폴더에 있는 upload 폴더로 지정
const upload = multer({ dest: "./upload" });

app.get("/api/customers", (req, res) => {
  // database에 쿼리를 전송하는 코드
  connection.query("SELECT * FROM CUSTOMER", (err, rows, fields) => {
    // response로 사용자의 정보가 담긴 rows를 반환
    res.send(rows);
  });
});
// 업로드 폴더를 공유하도록 함, 사용자의 image경로와 서버의 upload폴더 맵핑
app.use("/image", express.static("./upload"));
// post방식으로 /api/customers로 데이터를 전송했을 때 그 데이터를 처리하는 것
app.post("/api/customers", upload.single("image"), (req, res) => {
  let sql = "INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?)";
  let image = "/image/" + req.file.filename;
  let name = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;
  // sql 구문의 ? 부분에 각각의 값이 전달됨
  let params = [image, name, birthday, gender, job];
  // 쿼리 함수 안에서 해당 params를 전송하도록 함
  connection.query(sql, params, (err, rows, fields) => {
    // 성공적으로 전달되었다면 관련 메시지를 클라이언트에 전송
    res.send(rows);
  });
  // 이미지 폴더가 git에 업로드 되지 않도록 .gitigonore 를 작성해주어야 함
});

app.listen(port, () => console.log(`Listening on port ${port}`));
