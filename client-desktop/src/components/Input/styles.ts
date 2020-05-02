import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

import Tooltip from '../Tooltip';

interface ContainerProps {
  hasFocus: boolean;
  isFilled: boolean;
  hasError: boolean;
}

export const Container = styled.div<ContainerProps>`
  border: 2px solid #d59833;
  border-radius: 15px;
  background: ${transparentize(0.9, '#202020')};
  padding: 10px;
  width: 100%;
  transition: border-color 300ms ease-out;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 10px;
  }

  > svg {
    margin-right: 10px;
    opacity: 0.5;
    transition: opacity 800ms ease-in;
  }

  ${props =>
    props.hasError &&
    css`
      border-color: #af3b21;
    `}

  ${props =>
    props.hasFocus &&
    css`
      border-color: #202020;
      svg {
        opacity: 1;
      }
    `}

  ${props =>
    props.isFilled &&
    css`
      svg {
        opacity: 1;
      }
    `}


  input {
    flex: 1;
    border: 0;
    background: transparent;
    font-weight: 600;

    &::placeholder{
      color: ${transparentize(0.5, '#202020')};
    }
  }
`;

export const Error = styled(Tooltip)`
  height: 24px;
  margin-left: 10px;
  cursor: pointer;
`;
