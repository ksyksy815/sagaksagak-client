import React from 'react'
import styled from 'styled-components'
import { HiViewBoards, HiOutlineChartPie } from 'react-icons/hi'

const BNav = styled.aside`
  list-style: none;
  width: 120px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  row-gap: 2rem;
  padding-top: 2rem;
  background: rgba(255, 255, 255, 0.8);

  div {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 0.5rem;

    svg {
      font-size: 2.5rem;
    }
  }

  @media (max-width: 900px) {
    width: 100%;
    flex-direction: row;
    padding: 0;

    div {
      padding: 1rem;
      svg {
        font-size: 1.5rem;
      }
    }
  }
`

export default function BoardNav() {
  return (
    <BNav>
      <div>
        <HiViewBoards/>
        <span>To-Dos</span>
      </div>
      <div>
        <HiOutlineChartPie />
        <span>공부기록</span>
      </div>
    </BNav>
  )
}
