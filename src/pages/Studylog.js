import React from 'react'
import { Switch, Route } from 'react-router-dom'
import styled from 'styled-components'
import StudylogNav from '../components/StudylogNav'
import TodoList from '../components/Todos/TodoList'
import StudyRecords from '../components/StudyRecords/StudyRecords'

const StudylogWrapper = styled.div`
  box-sizing: border-box;
  width: 100vw;
  height: auto;
  min-height: 100vh;
  padding-top: 45px; /*나브바 높이 뺀 것 */
  padding-bottom: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media (max-width: 650px) {
    padding-bottom: 0;
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
