import React from "react";
import Customer from "./components/Customer";
import "./App.css";
// 컴포넌트의 외부를 감싸주는 데에 사용하는 Paper 컴포넌트
import Paper from "@material-ui/core/paper";
// Material-UI에서 Table 관련 모듈 import
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
// css를 같이 사용할 수 있도록 해주는 withStyles 라이브러리
import { withStyles } from "@material-ui/core/styles";

/* css를 적용할 스타일 변수 정의,
Material-UI에서 가져온 컴포넌트에 추가로 스타일을 적용시킬 수 있음 */
const styles = theme => ({
  root: {
    width: "100%",
    margin: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    // 테이블의 최소크기를 지정해서 모양이 망가지지 않도록 함
    minWidth: 1080
  }
});

// 고객 데이터
const customers = [
  {
    id: 1,
    image: "https://placeimg.com/64/64/0",
    name: "홍길동",
    birthday: "961222",
    gender: "남자",
    job: "대학생"
  },
  {
    id: 2,
    image: "https://placeimg.com/64/64/2",
    name: "이순신",
    birthday: "921222",
    gender: "남자",
    job: "프로그래머"
  },
  {
    id: 3,
    image: "https://placeimg.com/64/64/3",
    name: "정약용",
    birthday: "911222",
    gender: "남자",
    job: "대학원생"
  }
];

class App extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
            </TableRow>
          </TableHead>
          {/* 실질적인 내용은 TableBody에 들어감 */}
          <TableBody>
            {customers.map(c => {
              return (
                <Customer
                  key={c.id}
                  id={c.id}
                  image={c.image}
                  name={c.name}
                  birthday={c.birthday}
                  gender={c.gender}
                  job={c.job}
                />
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

// App컴포넌트를 withStyles가 적용된 상태로 내보냄
export default withStyles(styles)(App);
