import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { RiTodoFill, RiPieChart2Fill } from 'react-icons/ri'

const Nav = styled.nav`
  box-sizing: border-box;
  flex: 1 1 20%;
  display: flex;
  flex-direction: column;
  height: 80%;
  z-index: 10;
  row-gap: 0.5rem;
  margin-top: 5vh;
`
const NavHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 2rem 0;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);

  h2 {
    margin: 0;
  }
`

const NavUl = styled.ul`
  box-sizing: border-box;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 1rem 0;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  
  li {
    width: 100%;
    
    &:first-child {
      a{
        font-size: ${props => props.todoClicked ?  `1.2rem` : `1rem`};
        font-weight: bold;
      }
    }
    &:last-child {
      a{
        color: ${props => props.recordsClicked ?  `#DE877F` : `grey`};
      }
    }
    
    a{
      display: flex;
      column-gap: 0.5rem;
      justify-content: center;
      align-items: center;
      color: rgb(10,10,10);
      text-decoration: none;
      transition: 0.2s;
      padding: 1rem 0;
    }


    &:hover {
      cursor: pointer;
      background: #DE877F;
      
      a{
        color: #fff;
        transform: translateY(-3px);
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
      <NavUl todoClicked={todoListClicked} recordsClicked={recordsClicked}>
        <li onClick={handleClickTodo}>
          <Link to='/studylog'>
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
      </NavUl>
    </Nav>
  )
}
