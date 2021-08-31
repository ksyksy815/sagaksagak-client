import styled from 'styled-components'
import { device }from '../../device'

export const TodoWrapper = styled.div`
  box-sizing: border-box;
  max-width: 1000px;
  flex: 1 1 auto;
  width: 100%;
  height: 70vh;
  position: relative;

  @media ${device.tablet} {
    overflow-y: scroll;
  }

  .noTodoMessage {
    padding: 1rem;
    text-align: center;
    background: #ebebeb;
    width: 100%;
    border-radius: 15px;
  }

  #todo-options {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    list-style: none;
    padding: 1rem 1rem;
    row-gap: 0.5rem;
    column-gap: 0.5rem;
    height: 100%;

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
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      row-gap: 0.5rem;
      border-radius: 15px;
      overflow-y: scroll;
    }

    .main-lists {
      width: 100%;
      background: var(--light-gray);
      display: flex;
      flex-direction: column;
      row-gap: 1rem;
      flex: 0 1 50%;
      overflow: hidden;
      padding: 0.5rem;
      border-radius: 10px;
    }

    @media (min-width: 650px) {
      flex-direction: row;
      column-gap: 1rem;
      align-items: flex-start;
    }

    @media ${device.tablet} {
      height: auto;
    }

    @media ${device.mobile} {
      padding: 1rem 0;
      .todo-ul {
        height: auto;
      }
    }
  }
`