import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { RiTodoFill, RiPieChart2Fill } from 'react-icons/ri'

const AsideWrapper = styled.aside`
  list-style: none;
  width: 120px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  row-gap: 2rem;
  padding-top: 2rem;
  background: rgba(255, 255, 255, 0.8);

  div {
    width: 100%;
    height: auto;
    display: grid;
    place-content: center;
    
    &:first-child {
      border-bottom: ${props => props.todoListClicked ? '3px solid rgb(47,69,82)' : null};
      font-weight: ${props => props.todoListClicked ? 'bold' : 'normal'};
    }

    &:last-child {
      border-bottom: ${props => props.recordsClicked ? '3px solid rgb(47,69,82)' : null};
      font-weight: ${props => props.recordsClicked ? 'bold' : 'normal'};
    }

    a {
      text-decoration: none;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      row-gap: 1rem;
    }

    svg {
      font-size: 2.5rem;
    }
  }

  @media (max-width: 900px) {
    width: 100%;
    flex-direction: row;
    padding: 0;
    height: auto;

    div {
      padding: 1rem;
      a {
        flex-direction: row;
        column-gap: 0.5rem;
      }
      svg {
        font-size: 1.5rem;
      }
    }
  }
`

export default function StudylogNav() {
  const [todoListClicked, setTodoListClicked] = useState(true)
  const [recordsClicked, setRecordsClicked] = useState(false)

  const handleClickTodo = () => {
    setTodoListClicked(prev => { if (prev===false) return true; else return prev})
    setRecordsClicked(prev => { if (prev===true) return false; else return prev})
  }

  const handleClickRecords = () => {
    setRecordsClicked(prev => { if (prev===false) return true; else return prev})
    setTodoListClicked(prev => { if (prev===true) return false; else return prev})
  }

  return (
    <AsideWrapper todoListClicked={todoListClicked} recordsClicked={recordsClicked}>
      <div onClick={handleClickTodo}>
        <Link to='/studylog'>
          <RiTodoFill/>
          <span id="option-todo">To-Do List</span>
        </Link>
      </div>
      <div onClick={handleClickRecords}>
        <Link to='/studylog/records'>
          <RiPieChart2Fill/>
          <span id="option-log">공부 기록</span>
        </Link>
      </div>
    </AsideWrapper>
  )
}