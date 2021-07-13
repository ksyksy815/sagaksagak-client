import React from 'react'
import styled from 'styled-components'

const UnauthorizedPage = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default function Unauthorized() {
  return (
    <UnauthorizedPage>
      <span>Unauthorized!!!!</span>
    </UnauthorizedPage>
  )
}
