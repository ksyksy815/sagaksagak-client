import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import { GlobalStyles } from "./GlobalStyles";
import MainNav from "./components/MainNav";
import LandingPage from "./pages/LandingPage";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import Studylog from "./pages/Studylog";
import MyPage from "./pages/MyPage";

const StyledApp = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function App() {
  return (
    <Router>
      <GlobalStyles />
      <StyledApp>
        <MainNav />
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route path="/login">
            <LogInPage />
          </Route>
          <Route path="/signup">
            <SignUpPage />
          </Route>
          <Route path="/studylog">
            <Studylog />
          </Route>
          <Route path="/mypage">
            <MyPage />
          </Route>
        </Switch>
      </StyledApp>
    </Router>
  );
}

export default App;
