import styled, { keyframes } from 'styled-components';
import { animated } from 'react-spring';

import backgroundImg from '../../assets/signup-background.svg';

export const BackgroundImg = styled.div`
  height: 100vh;
  background: url(${backgroundImg}) no-repeat;
  background-size: auto 100%;
  background-color: #202020;
  background-blend-mode: luminosity;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AnimatedContainer = styled(animated.div)`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
`;

export const Content = styled.div`
  background: #d59833;
  padding: 40px;
  border-radius: 15px;
  width: 100%;
  max-width: 400px;

  display: flex;
  flex-direction: column;

  > a {
    margin-top: 40px;
    width: fit-content;

    display: flex;
    align-items: center;
    color: #202020;
    font-size: 16px;

    svg {
      transition: transform 200ms ease;
    }

    &:hover svg {
      transform: translateX(-5px);
    }
  }
`;
