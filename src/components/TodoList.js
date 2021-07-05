import React from 'react'
import styled from 'styled-components'

const TodoWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  column-gap: 1rem;
  background-color: #D9E3E2;
`
const TodoColumn = styled.div`
  border: 1px solid red;
  flex: 1 1 auto;
  box-sizing: border-box;
  margin: 1rem 0;
  border-radius: 15px;
`
const NewTodo = styled(TodoColumn)`
  margin-right: 1rem;
`
const InProgressTodo = styled(TodoColumn)`

`
const CompletedTodo = styled(TodoColumn)`
  margin-left: 1rem;
`

export default function TodoList() {
  return (
    <TodoWrapper>
      <NewTodo>새거</NewTodo>
      <InProgressTodo>진행중</InProgressTodo>
      <CompletedTodo>완료</CompletedTodo>
    </TodoWrapper>
  )
}
