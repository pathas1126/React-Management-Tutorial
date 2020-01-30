import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
// Material-UI 테마 import
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

// 테마로 웹 페이지 전체에 글씨체 적용
const theme = createMuiTheme({
  typography: {
    fontFamily: '"Noto Sans KR", serif'
  }
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
