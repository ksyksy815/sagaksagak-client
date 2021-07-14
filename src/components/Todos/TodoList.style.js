import styled from 'styled-components'
import { device }from '../../device'

export const TodoWrapper = styled.div`
  box-sizing: border-box;
  max-width: 1000px;
  flex: 1 1 auto;
  width: 100%;
  padding: 0 1rem;
  background-color: #E9E4DE;
  position: relative;

  .noTodoMessage {
    padding: 1rem;
    text-align: center;
    background: #ebebeb;
  }

  #newTodoBtn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    padding: 0.2rem 0.5rem;
    background-color: #7F554F;
    color: #fff;
    border-radius: 15px;
    border: none;
    &:hover {
      cursor: pointer;
      background-color: #cc857a;
    }
    @media (min-width: 650px) {
      right: 50%;
    }
    @media ${device.mobile} {
      right: 0.5rem;
    }
  }

  #todo-options {
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 1rem 1rem;
    row-gap: 1rem;

    @media (min-width: 650px) {
      flex-direction: row;
      column-gap: 1rem;
    }
    @media ${device.mobile} {
      padding: 1rem 0;
    }

    .list-title {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      column-gap: 1rem;
      &:hover {
        cursor: pointer;
      }
    }

    .todo-ul {
      display: flex;
      flex-direction: column;
      row-gap: 0.5rem;
      border-radius: 15px;
    }

    .main-lists {
      display: flex;
      flex-direction: column;
      row-gap: 1rem;
      flex: 0 1 50%;
    }
  }
`