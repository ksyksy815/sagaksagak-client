import styled from 'styled-components'
import { FaRegCircle } from 'react-icons/fa'

const Form = styled.form`
  width: 100%;
  display: flex;
  column-gap: 1rem;
  padding: 1rem;
  background: var(--mint);
  border-radius: 15px;

  .todo-check {
    background: transparent;
    border: none;
    font-size: 1.2rem;
    svg {
      fill: #fff;
    }
  }

  input {
    flex: 1 1 auto;
    background: transparent;
    border: none;
    border-bottom: 1px solid #fff;
    padding-left: 0.2rem;
    padding-bottom: 0.2rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: #fff;
    &:focus {
      outline: none;
    }
    &::placeholder {
      font-style: italic;
      color: ${props=>props.emptyInput ? `red` : `#fff`};
    }
  }

  #saveBtn {
    padding: 0.2rem 1rem;
    border: none;
    border-radius: 15px;
    background-color: #E9E4DE;
    &:hover {
      cursor: pointer;
      background-color: var(--graish-dark-green);
      color: #fff;
      border: none;
    }
  }
`

export default function TodoForm( { handleCreateTodo, handleNewTodoChange, emptyInput } ) {
  return (
    <Form onSubmit={handleCreateTodo} emptyInput={emptyInput}>
      <button className="todo-check"><FaRegCircle /></button>
      <input onChange={handleNewTodoChange} type="text" placeholder="할 일을 적어주세요!"></input>
      <button type="submit" id="saveBtn">Save</button>
    </Form>
  )
}
