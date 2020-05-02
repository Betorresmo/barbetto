import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

  *{
    margin:0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
    font-weight: 600;
  }

  body{
    background: #202020;
    color: #ECECEC;
    -webkit-font-smoothing: antialised;
  }

  body, input, button {
    font-family: 'Nunito Sans', 'sans serif';
    font-size: 18px;
    color: #202020;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 700;
  }

  button {
    cursor: pointer;
  }

  a{
    text-decoration: none;
  }
`;
