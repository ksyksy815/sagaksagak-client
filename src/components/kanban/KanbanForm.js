import React, { useState } from 'react'
import styled from 'styled-components'

const KanbanFormWrapper = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 0.3em;
  border-radius: 5px;
  background: #fff;

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    textarea {
      width: 100%;
      min-height: 80px;
      padding: 0.5rem;
      border: none;
      background: transparent;
      font-size: 1rem;
      color: #555;
      resize: none;

      &:focus {
        outline: none;
      }
      &::placeholder {
        font-style: italic;
        font-size: 0.8rem;
      }
    }

    #form-error {
      font-size: 0.8rem;
      color: var(--red);
      font-style: italic;
    }

    span {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      column-gap: 1rem;
      padding: 0.5rem;

      button {
        width: 50px;
        height: 25px;
        border: none;
        background: var(--graish-dark-green);
        transition: 0.2s;
        color: #fff;

        &:focus {
          outline: none;
        }
        &:hover {
          cursor: pointer;
          background: var(--mint);
        }
      }
    }
  }

`

export default function KanbanForm( { list, closeForm, addItem }) {
  const [content, setContent] = useState('')
  const [errMessage, setErrMessage] = useState(false)

  const handleChange = (e) => {
    setContent(e.target.value);
    if (content.length <= 250) setErrMessage(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.length > 250) setErrMessage(true);

    addItem(list, content)
    e.target[0].value = '';
  }

  const handleClose = (e) => {
    e.preventDefault();
    closeForm(list, 'close')
  }

  return (
    <KanbanFormWrapper>
      <form onSubmit={handleSubmit}>
        <textarea type="text" placeholder="할 일을 적어주세요!" onChange={handleChange}/>
        { errMessage && <span id="form-error">250자 이상 작성할 수 없습니다.</span>}
        <span>
          <button type="submit">추가</button>
          <button id="form-cloase-btn" onClick={handleClose}>취소</button>
        </span>
      </form>
    </KanbanFormWrapper>
  )
}
