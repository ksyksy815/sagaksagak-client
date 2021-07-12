import styled from 'styled-components'

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

  // 진행중 & 완료 투두 공통
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

  #inProgress {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    flex: 0 1 50%;

    ul {
      display: flex;
      flex-direction: column;
      row-gap: 0.5rem;
      border-radius: 15px;
      background: #ebebeb;
      
      li {
        flex: 1 1 auto;
        position: relative;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        column-gap: 1rem;
        padding: 1rem;
        border-radius: 15px;
        transition: 0.2s;

        .todo-check {
          background: transparent;
          border: none;
          font-size: 1.2rem;

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

          .content-inProgress {
            font-weight: bold;
          }
        }

        
        //삭제 버튼
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
        
        &:hover {
          transform: translateY(-3px);
          background: #fff;
        }
      }
    }

    .todo-wrapper {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      column-gap: 1rem;
      width: 100%;

      form {
        width: 100%;
        display: flex;
        column-gap: 1rem;
        input {
          flex: 1 1 auto;
          background: transparent;
          border: none;
          border-bottom: 1px solid #444444;
          padding-left: 0.2rem;
          padding-bottom: 0.2rem;
          display: flex;
          justify-content: flex-start;
          align-items: center;

          &:focus {
            outline: none;
          }
        }
        #saveBtn {
          padding: 0.2rem 1rem;
          border: 1px solid #444444;
          border-radius: 15px;
          background-color: #E9E4DE;

          &:hover {
            cursor: pointer;
            background-color: #7F554F;
            color: #fff;
          }
        }
      }
    }
  }
  
  #completed {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    flex: 0 1 50%;

    ul {
      display: flex;
      flex-direction: column;
      row-gap: 0.5rem;
      border-radius: 15px;
      background: #ebebeb;
      
      li {
        flex: 1 1 auto;
        position: relative;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        column-gap: 1rem;
        padding: 1rem;
        border-radius: 15px;
        transition: 0.2s;
        
        .content-date {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          column-gap: 0.7rem;

          .content-completed {
            font-weight: bold;
            font-style: italic;
            text-decoration: line-through;
          }
        }

        
        //삭제 버튼
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
        
        &:hover {
          transform: translateY(-3px);
          background: #fff;
        }
      }
    }

    .todo-wrapper {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      column-gap: 1rem;
      width: 100%;

      form {
        width: 100%;
        display: flex;
        column-gap: 1rem;
        input {
          flex: 1 1 auto;
          background: transparent;
          border: none;
          border-bottom: 1px solid #444444;
          padding-left: 0.2rem;
          padding-bottom: 0.2rem;
          display: flex;
          justify-content: flex-start;
          align-items: center;

          &:focus {
            outline: none;
          }
        }
        #saveBtn {
          padding: 0.2rem 1rem;
          border: 1px solid #444444;
          border-radius: 15px;
          background-color: #E9E4DE;

          &:hover {
            cursor: pointer;
            background-color: #7F554F;
            color: #fff;
            border: none;
          }
        }
      }
    }
  }
}
`