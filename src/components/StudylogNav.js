import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { RiTodoFill, RiPieChart2Fill } from 'react-icons/ri'

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  height: 100%;
`
const NavHeader = styled.div`
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #183d3d;
  padding: 2rem 0;

  h2 {
    margin: 0;
  }
`

const NavUl = styled.ul`
  flex: 1 1 auto;
  list-style: none;
  margin: 0;
  box-sizing: border-box;
  border-left: 10px solid #205B5A;
  padding: 0;
  background-color: #D9E3E2;
  display: flex;
  flex-direction: column;

  li {
    padding: 1rem 0.5rem;
    background-color: #205B5A;

    &:first-child {
      border-bottom-right-radius: ${props => props.todoClicked ? 15+`px` : 0 };
    }
    &:nth-child(2) {
      padding: 0;
      background-color: ${props => props.todoClicked ? `#205B5A` : `#D9E3E2`};
      a {
        padding: 1rem 0.5rem;
        background-color: ${props => props.todoClicked ? `#D9E3E2` : `#205B5A`};
        color: ${props => props.todoClicked ?  `#205B5A` : `#fff`};
        border-top-left-radius: ${props => props.todoClicked ? 15+`px` : 0 };
        border-bottom-right-radius: ${props => props.recordsClicked ? 15+`px` : 0 };
        border-bottom-left-radius: ${props => props.todoClicked ? 15+`px` : 0 };
      }
      svg {
        color: ${props => props.todoClicked ?  `#205B5A` : `#A2C8BF`};
      }
    }
    &:nth-child(3) {
      padding: 0;
      background-color: ${props => props.recordsClicked ? `#205B5A` : `#D9E3E2` };
      a {
        padding: 1rem 0.5rem;
        color: ${props => props.recordsClicked ?  `#205B5A` : `#fff`};
        background-color: ${props => props.recordsClicked ?  `#D9E3E2` : `#205B5A`};
        border-top-right-radius: ${props => props.todoClicked ? 15+`px` : 0 };
        border-top-left-radius: ${props => props.recordsClicked ? 15+`px` : 0 };
        border-bottom-left-radius: ${props => props.recordsClicked ? 15+`px` : 0 };
      }
      svg {
        color: ${props => props.recordsClicked ?  `#205B5A` : `#A2C8BF`};
      }
    }
    &:last-child {
      flex: 1 1 auto;
      border-top-right-radius: ${props => props.recordsClicked ? 15+`px` : 0 };
    }
    a {
      display: flex;
      align-items: center;
      column-gap: 1rem;
      text-decoration: none;
      color: #fff;
      font-weight: bold;

      svg {
        font-size: 1.5rem;
        color: #A2C8BF;
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
    <Nav>
      <NavHeader>
        <h2>Guest</h2>
        <span>imaguest@gmail.com</span>
      </NavHeader>
      <NavUl todoClicked={todoListClicked} recordsClicked={recordsClicked ? 15 : 0}>
        <li></li>
        <li onClick={handleClickTodo}>
          <Link to='/studylog/todo'>
            <RiTodoFill/>
            <span>To-Do List</span>
          </Link>
        </li>
        <li onClick={handleClickRecords}>
          <Link to='/studylog/records'>
            <RiPieChart2Fill/>
            <span>공부 기록</span>
          </Link>
        </li>
        <li></li>
      </NavUl>
    </Nav>
  )
}
