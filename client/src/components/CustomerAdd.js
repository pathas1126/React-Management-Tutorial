import React from "react";
// post 방식을 통해 서버로 데이터를 전송하기 위해 post 라이브러리 import
import { post } from "axios";
// Matrial-UI Dialog 관련 라이브러리 import
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
//input의 역할을 하는 Material-UI 입력창
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  hidden: {
    display: "none"
  }
});

class CustomerAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      // 바이트 형태의 데이터
      userName: "",
      birthday: "",
      gender: "",
      job: "",
      // 보내고자 하는 이미지의 이름, 파일명
      fileName: "",
      // Dialog 창이 열려있는지 확인하는 state
      open: false
    };
  }
  // 파일이 변경되었을 때 발생하는 이벤트 함수
  handleFileChange = e => {
    this.setState({
      file: e.target.files[0],
      /* e.target : 이벤트가 발생한 input값 자체,
            files[0]: 파일을 여러개 업로드 하지 않고 첫 번째 파일만 업로드*/
      fileName: e.target.value
    });
  };

  // input의 value가 변경되었을 때 발생하는 이벤트 함수
  handleValueChange = e => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    /* 이벤트가 발생한 input태그의 name : value 형태로
      빈 배열 nextState에 새로운 값이 저장됨 */
    this.setState(nextState);
    // 새로운 객체인 nextState로 현재 state값 갱신
  };

  // form을 submit 버튼으로 제출했을 때 발생하는 함수
  handleFormSubmit = e => {
    e.preventDefault(); // 기본적으로 발생하는 이벤트가 작동하지 않도록 설정
    // addCustomer() 함수를 호출하고, 서버로부터 받아온 데이터를 콘솔창에 출력함
    this.addCustomer().then(response => {
      console.log(response.data);
      /* 부모 컴포넌트로부터 전달받은 함수, 고객 정보를 추가하고
      서버로부터 응답을 받은 이후에 고객 목록을 다시 불러오도록 함 */
      this.props.stateRefresh();
    });
    // 데이터 전송 후 state초기화
    this.setState({
      file: null,
      userName: "",
      birthday: "",
      gender: "",
      job: "",
      fileName: "",
      open: false
    });
  };
  // 고객 정보를 추가하는 함수
  addCustomer = () => {
    // 해당 주소로 데이터를 보내도록 함
    const url = "/api/customers";
    // 데이터를 실제로 보내기 위해 FromData()객체 사용
    const formData = new FormData();
    // this.state.file에 담긴 바이트 데이터를 "image"라는 이름으로 전달
    formData.append("image", this.state.file);
    formData.append("name", this.state.userName);
    formData.append("birthday", this.state.birthday);
    formData.append("gender", this.state.gender);
    formData.append("job", this.state.job);
    /* 파일이 포함되어 있는 데이터를 서버로 전송하고자 할 때는
    웹 표준에 맞는 헤더를 작성해 주어야 함 */
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    /* Axios에 포함되어 있는 post라이브러리를 이용해서
    해당 url에 formData를 config형식에 맞춰서 전달함 */
    return post(url, formData, config);
  };

  // 고객 추가 Modal창을 띄우는 이벤트 함수
  handleClickOpen = () => {
    this.setState({
      // 창이 열리면 open 값을 true로 변경
      open: true
    });
  };

  handleClose = () => {
    this.setState({
      file: null,
      userName: "",
      birthday: "",
      gender: "",
      job: "",
      fileName: "",
      // 창이 닫히면 open 값을 false로 변경
      open: false
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleClickOpen}
        >
          고객 추가
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>고객 추가</DialogTitle>
          <DialogContent>
            <input
              className={classes.hidden}
              accept="image/*"
              id="raised-button-file"
              type="file"
              file={this.state.file}
              value={this.state.fileName}
              onChange={this.handleFileChange}
            />
            <label htmlFor="raised-button-file">
              <Button
                variant="contained"
                color="primary"
                component="span"
                name="file"
              >
                {this.state.fileName === ""
                  ? "프로필 이미지 선택"
                  : this.state.fileName}
              </Button>
            </label>
            <br />
            <TextField
              /* TextField는 label 값으로 어떤 값을 넣어야하는지 알려줄 수 있음 */
              label="이름"
              type="text"
              name="userName"
              value={this.state.userName}
              onChange={this.handleValueChange}
            />
            <br />
            <TextField
              label="생년월일"
              type="text"
              name="birthday"
              value={this.state.birthday}
              onChange={this.handleValueChange}
            />
            <br />
            <TextField
              label="성별"
              type="text"
              name="gender"
              value={this.state.gender}
              onChange={this.handleValueChange}
            />
            <br />
            <TextField
              label="직업"
              type="text"
              name="job"
              value={this.state.job}
              onChange={this.handleValueChange}
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleFormSubmit}
            >
              추가
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={this.handleClose}
            >
              닫기
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

// App.js에서 사용하기 위해 export
export default withStyles(styles)(CustomerAdd);
