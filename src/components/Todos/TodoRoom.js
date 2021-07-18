import React from 'react'
import styled from 'styled-components'
import { AiOutlineCloseSquare } from 'react-icons/ai'
import { FaRegCheckCircle, FaRegCircle } from 'react-icons/fa'

const RoomTodo = styled.li`
  background: ${props=> props.checked? `#9e9e9e` : `#ebebeb`} ;
  border-radius: 10px;
  position: relative;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 0.5rem;
  min-height: 60px;
  transition: 0.2s;

  &:hover {
    transform: translateY(-2px);
    background-color: #DDBCB5;
    .todo-content{
      color: #fff;
    }
  }
  
  .todoroom-todo-check-btn {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    background: transparent;
    font-size: 2rem;
    transition: 0.2s;

    &:hover {
      cursor: pointer;
      transform: translateY(-2px);
      svg {
        fill: #fff;
      }
    }
  }

  .todoroom-todo-content-And-date {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    row-gap: 0.2rem;

    span {
      &:first-child {
        font-weight: bold;
        text-decoration: ${props=> props.checked ? `line-through` : `none`};
        font-style: ${props=> props.checked ? `italic` : `none`};
      }
      &:last-child {
        font-size: 0.8rem;
      }
    }
  }

  #todoroom-delete-btn {
    position: absolute;
    top: 0.2rem;
    right: 0.2rem;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    background: transparent;
    font-size: 1.5rem;
    &:hover {
      cursor: pointer;
      svg {
        fill: #fff;
      }
    }
  }
`

export default function TodoRoom( {todo, deleteTodo, checkTodo}) {
  return (
    <RoomTodo key={todo.id} checked={todo.checked}>
      <button onClick={checkTodo} id={todo.id} className="todoroom-todo-check-btn">
        { 
          todo.checked ? 
          <FaRegCheckCircle id={todo.id}/>: <FaRegCircle id={todo.id}/> 
        }
      </button>
      <div className="todoroom-todo-content-And-date">
        <span className="todo-content"> {todo.content}</span>
        <span className="todo-date">{todo.updatedAt}</span>
      </div>
      <button onClick={deleteTodo} id="todoroom-delete-btn"><AiOutlineCloseSquare id={todo.id}/></button>
    </RoomTodo>
  )
}
