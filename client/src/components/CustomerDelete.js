import React from "react";
// Matrial-UI Dialog 관련 라이브러리 import
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

class CustomerDelete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  //  Modal창을 띄우는 이벤트 함수
  handleClickOpen = () => {
    this.setState({
      // 창이 열리면 open 값을 true로 변경
      open: true
    });
  };

  handleClose = () => {
    this.setState({
      // 창이 닫히면 open 값을 false로 변경
      open: false
    });
  };

  // 고객 정보 삭제 함수, api/customers/id의 데이터 삭제
  deleteCustomer(id) {
    const url = "/api/customers/" + id;
    fetch(url, {
      /* REST API에서는 'delete'메소드로 해당 경로에 접속했을 때
      삭제가 이루어지도록 하는 것이 합리적임 */
      method: "DELETE"
    });
    // 삭제가 된 이후에 고객목록을 갱신하는 함수 호출
    this.props.stateRefresh();
  }

  render() {
    return (
      <div>
        <Button
          variant="contained"
          color="secondary"
          onClick={this.handleClickOpen}
        >
          삭제
        </Button>
        {/* Dialog는 열려있는 상태인지 확인하기 위해 open속성의 값을 필요로 함*/}
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle onClose={this.handleClose}>삭제 경고</DialogTitle>
          <DialogContent>
            <Typography gutterBottom>선택한 고객 정보가 삭제됩니다.</Typography>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              onClick={e => {
                this.deleteCustomer(this.props.id);
              }}
            >
              삭제
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

export default CustomerDelete;
