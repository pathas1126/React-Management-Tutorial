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
// progress bar
import CircularProgress from "@material-ui/core/CircularProgress";
// css를 같이 사용할 수 있도록 해주는 withStyles 라이브러리
import { withStyles } from "@material-ui/core/styles";

/* css를 적용할 스타일 변수 정의,
Material-UI에서 가져온 컴포넌트에 추가로 스타일을 적용시킬 수 있음 */
const styles = theme => ({
  root: {
    width: "100%",
    margin: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    // 테이블의 최소크기를 지정해서 모양이 망가지지 않도록 함
    minWidth: 1080
  },
  progress: {
    margin: theme.spacing(2)
  }
});

class App extends React.Component {
  state = {
    customers: "",
    completed: 0
  };
  // Mount가 완료되었을 때 실행되는 함수, API를 불러올 때 효과적
  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then(res => this.setState({ customers: res }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch("/api/customers");
    const body = await response.json();
    return body;
  };

  progress = () => {
    /* const {completed} = this.state 는 다음의 코드와 같음
     const completed = this.state.completed
      {}를 사용하면 객체내의 키값을 바로 변수로 선언할 수 있음 */
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  };

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
          <TableBody>
            {this.state.customers ? (
              this.state.customers.map(c => {
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
              })
            ) : (
              <TableRow>
                <TableCell colSpan="6" align="center">
                  <CircularProgress
                    className={classes.progress}
                    variant="determinate"
                    value={this.state.completed}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

// App컴포넌트를 withStyles가 적용된 상태로 내보냄
export default withStyles(styles)(App);
