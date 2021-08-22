import React from 'react'
import styled from 'styled-components'
import { HiViewBoards, HiOutlineChartPie } from 'react-icons/hi'

const BNav = styled.ul`
  list-style: none;
  width: 120px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  row-gap: 2rem;
  padding-top: 2rem;
  background: #fff;

  li {
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
`

export default function BoardNav() {
  return (
    <BNav>
      <li>
        <HiViewBoards/>
        <span>To-Dos</span>
      </li>
      <li>
        <HiOutlineChartPie />
        <span>공부기록</span>
      </li>
    </BNav>
  )
}
