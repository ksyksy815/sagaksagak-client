import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import "./App.css";
import MainNav from "./components/MainNav";
import LandingPage from "./pages/LandingPage";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";

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
        </Switch>
      </StyledApp>
    </Router>
  );
}

export default App;
