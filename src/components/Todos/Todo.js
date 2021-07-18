import React from 'react'
import styled from 'styled-components'
import { FaRegCircle, FaRegCheckCircle } from 'react-icons/fa'
import { AiOutlineCloseSquare } from 'react-icons/ai'

const StyledTodo = styled.li`
  flex: 1 1 auto;
  width: 100%;
  min-height: 80px;
  max-height: 80px;
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  column-gap: 1rem;
  padding: 1rem;
  border-radius: 15px;
  transition: 0.2s;
  background: ${props => props.completed ? `#ebebeb` : `#edc0b2`};
  &:hover {
    transform: translateY(-3px);
    background: #fac86b;
  }

  .todo-check {
    background: transparent;
    border: none;
    font-size: 1.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      cursor: pointer;
      svg{
        fill: #7F554F;
      }
    }
  }

  .content-date {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    row-gap: 0.2rem;
    

    .todo-content {
      font-weight: bold;
      font-style: ${props => props.completed? `italic` : `normal`};
      text-decoration: ${props => props.completed? `line-through` : `none`};
    }

    .todo-date {
      font-size: 0.8rem;
    }
  }

  #deleteBtn {
    background: transparent;
    border: none;
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    font-size: 1.2rem;
    &:hover {
      cursor: pointer;
    }
  }
`

export default function Todo( { todo, handleTodoCheck, handleDeleteTodo, completed } ) {
  
  return (
    <StyledTodo key={todo.id} completed={completed}>
      <button onClick={e=> handleTodoCheck(e, completed)} id={todo.id} className="todo-check">
        { 
          completed ? 
          <FaRegCheckCircle id={todo.id}/>: <FaRegCircle id={todo.id}/> 
        }
      </button>
      <div className="content-date">
        <span className="todo-content"> {todo.content}</span>
        <span className="todo-date">{todo.updatedAt}</span>
      </div>
      <button onClick={e=>handleDeleteTodo(e, completed)} id="deleteBtn"><AiOutlineCloseSquare id={todo.id}/></button>
    </StyledTodo>
  )
}
