import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
// 필기체(제목 등 꾸미는 곳에 필요 시)font-family: 'Nanum Pen Script', cursive;
  :root {
    --light-blue: rgb(187,213,248);
    --blue: rgb(113,178,248);
    --purple: rgb(134,144,220);
    --light-gray: rgb(238,242,248);
    --green: rgb(122,212,173);
    --yellow: rgb(255,182,77);
    --red: rgb(223,117,146);
  }

  * {
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
    scroll-behavior: smooth;
    font-family: 'Nanum Gothic', sans-serif;
    color: #555555;
  }

  ::selection {
    background-color: #FECF2D;
    color: #FE5244;
  }
`;