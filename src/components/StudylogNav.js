import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { RiTodoFill, RiPieChart2Fill } from 'react-icons/ri'

const Nav = styled.ul`
  display: flex;
  list-style: none;
  width: 100%;
  max-width: 1000px;

  li {

    &:nth-child(1) {
      border-bottom: ${props=> props.todoListClicked ? `3px solid #7F554F` : `none`};
    }

    &:nth-child(2) {
      border-bottom: ${props=> props.recordsClicked ? `3px solid #7F554F` : `none`};
    }

    a {
      padding: 1rem;
      text-decoration: none;
      display: flex;
      justify-content: center;
      align-items: center;
      column-gap: 1rem;

      #option-todo {
        font-weight: ${props=> props.todoListClicked ? `bold` : `normal`};
      }
      #option-log {
        font-weight: ${props=> props.recordsClicked ? `bold` : `normal`};
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
    <Nav todoListClicked={todoListClicked} recordsClicked={recordsClicked}>
      <li onClick={handleClickTodo}>
        <Link to='/studylog'>
          <RiTodoFill/>
          <span id="option-todo">To-Do List</span>
        </Link>
      </li>
      <li onClick={handleClickRecords}>
        <Link to='/studylog/records'>
          <RiPieChart2Fill/>
          <span id="option-log">공부 기록</span>
        </Link>
      </li>
    </Nav>
  )
}
