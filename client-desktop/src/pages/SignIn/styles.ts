import styled from 'styled-components';
import { transparentize } from 'polished';

import backgroundImg from '../../assets/signin-background.svg';

export const BackgroundImg = styled.div`
  background: url(${backgroundImg}) no-repeat;
  background-size: auto 110%;
  background-color: #202020;
  background-blend-mode: luminosity;
`;

export const Container = styled.div`
  height: 100vh;
  padding: 0 40px;
  max-width: 1140px;
  margin: 0 auto;

  display: flex;
  justify-content: space-between;
`;

export const YellowBox = styled.div`
  background: #d59833;
  padding: 40px;
  border-radius: 0 0 15px 15px;
  align-self: flex-start;
  width: 100%;
  max-width: 400px;

  display: flex;
  flex-direction: column;

  &:first-child {
    img:first-child {
      margin-bottom: 40px;
    }
  }

  & + div {
    align-self: flex-end;
    border-radius: 15px 15px 0 0;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;

    a {
      width: fit-content;
      text-align: center;
      margin: 0 auto;
      margin-top: 15px;
      color: ${transparentize(0.2, '#202020')};
      font-size: 16px;
      transition: color 200ms ease;

      &:hover {
        color: #202020;
      }
    }
  }

  > a {
    width: fit-content;
    margin: 0 auto;
    margin-top: 40px;
    padding: 10px;

    & + a {
      margin-top: 0;
      display: flex;
      align-items: center;
      color: #202020;
      font-size: 16px;

      svg {
        margin-left: 5px;
        transition: transform 200ms ease;
      }

      &:hover svg {
        transform: translateX(5px);
      }
    }
  }
`;
