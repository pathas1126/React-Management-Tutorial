import React from "react";
import Customer from "./components/Customer";
// 고객 정보 추가 컴포넌트
import CustomerAdd from "./components/CustomerAdd";
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
// Material-UI app bar 관련 모듈 import
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
// 텍스트를 담는 Material-UI 라이브러리
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";

/* css를 적용할 스타일 변수 정의,
Material-UI에서 가져온 컴포넌트에 추가로 스타일을 적용시킬 수 있음 */
const styles = theme => ({
  root: {
    width: "100%",
    minwidth: 1080
  },
  menu: {
    marginTop: 15,
    marginBottom: 15,
    display: "flex",
    justifyContent: "center"
  },
  paper: {
    marginLeft: 18,
    marginRight: 18
  },
  progress: {
    margin: theme.spacing(2)
  },
  tableHead: {
    fontSize: "1.0rem"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  }
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: "",
      completed: 0
    };
  }
  /* state 초기화 함수, 리액트는 데이터가 변한 부분에 대해서만 새로고침을
  진행하기 때문에 고객 정보가 추가된 후에 고객 목록만 새로고침이 진행되도록 함수 작성 */
  stateRefresh = () => {
    this.setState({
      customers: "",
      completed: 0
    });
    this.callApi()
      .then(res => this.setState({ customers: res }))
      .catch(err => console.log(err));
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
    const cellList = [
      "번호",
      "프로필 이미지",
      "이름",
      "생일",
      "성별",
      "직업",
      "설정"
    ];
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              고객 관리 시스템
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="검색하기"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          </Toolbar>
        </AppBar>
        {/* 고객 추가 Form 컴포넌트 */}
        {/* 함수 자체를 props형태로 자식 컴포넌트에 전달 */}
        <div className={classes.menu}>
          <CustomerAdd stateRefresh={this.stateRefresh} />
        </div>
        <Paper className={classes.paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {cellList.map(c => {
                  return (
                    <TableCell calssName={classes.TableHead}>{c}</TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.customers ? (
                this.state.customers.map(c => {
                  return (
                    <Customer
                      stateRefresh={this.stateRefresh}
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
                  <TableCell colSpan="7" align="center">
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
      </div>
    );
  }
}

// App컴포넌트를 withStyles가 적용된 상태로 내보냄
export default withStyles(styles)(App);
