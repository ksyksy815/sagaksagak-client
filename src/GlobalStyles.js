import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
    scroll-behavior: smooth;
  }

  ::selection {
    background-color: #FECF2D;
    color: #FE5244;
  }
`

// colors used
/*
Landing page background: #F4EBE2

Dark orange: #F58820
-> with opacity: #f58720be
Light orange: #F5D0A9

Dark pink: #DE877F
-> with opacity: #de877fc9
Light pink: #F5C3B8

Dark green: #205B5A
Light green: #A2C8BF
*/