import React from "react";
import Customer from "./components/Customer";
import "./App.css";

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
    return (
      <div>
        {/* customers가 배열이기 때문에 map 메소드를 이용해서 소스코드 절약 가능
        각각의 원소를 c라는 매개변수로 해서 원소마다 가지고 있는 데이터를 출력 */}
        {customers.map(c => {
          return (
            <Customer
              key={c.id}
              /* 일반적으로 map을 사용할 때는 key라는 속성을 설정해 주어야 함
                id값을 1부터 설정했기 때문에 여기서는 key값을 c.id를 넣어줌 */
              id={c.id}
              image={c.image}
              name={c.name}
              birthday={c.birthday}
              gender={c.gender}
              job={c.job}
            />
          );
        })}
      </div>
    );
  }
}

export default App;
