import React from 'react'
import { Switch, Route } from 'react-router-dom'
import styled from 'styled-components'
import StudylogNav from '../components/StudylogNav'
import TodoList from '../components/TodoList'
import StudyRecords from '../components/StudyRecords'
import circle from '../assets/circle-bg.svg'
import { device } from '../device'

const StudylogWrapper = styled.div`
  box-sizing: border-box;
  width: 100vw;
  height: auto;
  min-height: 100vh;
  padding-top: 45px; /*나브바 높이 뺀 것 */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
