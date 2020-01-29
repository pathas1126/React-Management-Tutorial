import React from "react";

class CustomerDelete extends React.Component {
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
      <button
        onClick={e => {
          this.deleteCustomer(this.props.id);
        }}
      >
        삭제
      </button>
    );
  }
}

export default CustomerDelete;
