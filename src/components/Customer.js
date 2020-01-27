import React from "react";
// 외부 라이브러리를 사용할 수 있도록 가져옴, react를 사용할 것이기 때문에 React를 가져옴

class Customer extends React.Component {
  //React 의 Compnonent 클래스를 상속하는 Customer 클래스 생성
  render() {
    return (
      <div>
        <CustomerProfile
          id={this.props.id}
          image={this.props.image}
          name={this.props.name}
        ></CustomerProfile>
        <CustomerInfo
          birthday={this.props.birthday}
          gender={this.props.gender}
          job={this.props.job}
        ></CustomerInfo>
      </div>
    );
  }
}

// ==============컴포넌트 분리 ==================
/* 컴포넌트 분리는 유지보수에 용이함 */

// 사용자 프로필 이미지, 이름, 아이디 정보
class CustomerProfile extends React.Component {
  render() {
    return (
      <div>
        <img src={this.props.image} alt="profile" />
        <h2>
          {this.props.name}({this.props.id})
        </h2>
      </div>
    );
  }
}

// 사용자의 남은 정보
class CustomerInfo extends React.Component {
  render() {
    return (
      <div>
        <p>{this.props.birthday}</p>
        <p>{this.props.gender}</p>
        <p>{this.props.job}</p>
      </div>
    );
  }
}

export default Customer;
// 외부에서도 이 파일을 사용할 수 있도록 내보냄, default를 사용하면 모듈을 이름없이 내보낼 수 있음, 하나의 파일(모듈)에서는 하나의 default만 가능함
