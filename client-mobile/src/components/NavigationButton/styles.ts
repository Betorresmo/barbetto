import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

interface ButtonContainerProps {
  direction: 'left' | 'right';
}

interface ButtonProps {
  color?: 'light' | 'dark';
}

export const ButtonContainer = styled.View<ButtonContainerProps>`
  overflow: hidden;

  ${props =>
    props.direction === 'left'
      ? css`
          border-radius: 15px;
          border-top-left-radius: 0px;
          border-bottom-left-radius: 0px;
        `
      : css`
          border-radius: 15px;
          border-top-right-radius: 0px;
          border-bottom-right-radius: 0px;
        `}
`;

export const Button = styled(RectButton)<ButtonProps>`
  height: 70px;
  width: 70px;
  justify-content: center;
  align-items: center;
  background: #202020;

  ${props =>
    props.color &&
    css`
      background: ${props.color === 'light' ? '#D59833' : '#202020'};
    `}
`;
