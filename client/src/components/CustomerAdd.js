import React from "react";
// post 방식을 통해 서버로 데이터를 전송하기 위해 post 라이브러리 import
import { post } from "axios";

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
      fileName: ""
      // 보내고자 하는 이미지의 이름, 파일명
    };
  }
  // 파일이 변경되었을 때 발생하는 이벤트 함수
  handleFileChange = e => {
    this.setState({
      file: e.target.files[0],
      /* e.target : 이벤트가 발생한 input값 자체,
            files[0]: 파일을 여러개 업로드 하지 않고 첫 번째 파일만 업로드*/
      fileName: e.target.vaule
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

  render() {
    return (
      /* submit 버튼을 클릭하면 해당 이벤트 함수가 호출됨 */
      <form onSubmit={this.handleFormSubmit}>
        <h1>고객 추가</h1>
        {/* form 내부에 input 태그를 이용해서 어떤 값을 전송할 것인지 설정할 수 있음
        실제로 서버로 데이터가 전달될 때는 input태그의 name속성에 들어가는 값을 참조함 */}
        프로필 이미지:
        <input
          type="file"
          name="file"
          file={this.state.file}
          value={this.state.fileName}
          onChange={this.handleFileChange}
        />
        <br />
        이름:
        <input
          type="text"
          name="userName"
          value={this.state.userName}
          onChange={this.handleValueChange}
        />
        <br />
        생년월일:
        <input
          type="text"
          name="birthday"
          value={this.state.birthday}
          onChange={this.handleValueChange}
        />
        <br />
        성별:
        <input
          type="text"
          name="gender"
          value={this.state.gender}
          onChange={this.handleValueChange}
        />
        <br />
        직업:
        <input
          type="text"
          name="job"
          value={this.state.job}
          onChange={this.handleValueChange}
        />
        <button type="submit">추가하기</button>
      </form>
    );
  }
}

// App.js에서 사용하기 위해 export
export default CustomerAdd;
