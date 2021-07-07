import React from 'react'
import { Switch, Route } from 'react-router-dom'
import styled from 'styled-components'
import StudylogNav from '../components/StudylogNav'
import TodoList from '../components/TodoList'
import StudyRecords from '../components/StudyRecords'
import circle from '../assets/circle-bg.svg'

const StudylogWrapper = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 100vw;
  height: 100vh;
  padding: 0 10%;
  background: url(${circle}), url(${circle});
  background-repeat: no-repeat;
  background-size: 50%, 30%;
  background-position: bottom -400px left -20%, top -200px right -10%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  overflow: hidden;

  .color {
    position: absolute;
    filter: blur(250px);

    //핑크
    &:nth-child(1) {
      top: -350px;
      width: 600px;
      height: 600px;
      background: #ff359b;
    }

    //노랑이
    &:nth-child(2) {
      bottom: -150px;
      left: 100px;
      width: 500px;
      height: 500px;
      background: #fffd87;
    }

    //파랑
    &:nth-child(3) {
      bottom: 50px;
      right: 100px;
      width: 300px;
      height: 300px;
      background: #00d2ff;
    }
  }
`

export default function Studylog() {
  return (
    <StudylogWrapper>
      
      <StudylogNav />
      <Switch>
        <Route exact path='/studylog'>
          <TodoList />
        </Route>
        <Route path='/studylog/records'>
          <StudyRecords />
        </Route>
      </Switch>
    </StudylogWrapper>
  )
}

/**
<div className="color"></div>
      <div className="color"></div>
      <div className="color"></div>
 */