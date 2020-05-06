import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

interface ContainerProps {
  type?: 'error' | 'success' | 'info';
}

const toastTypeStyle = {
  error: css`
    background: #bb371a;
  `,
  success: css`
    background: #6a8a27;
  `,
  info: css`
    background: #27809c;
  `,
};

const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Container = styled(animated.div) <ContainerProps>`
  ${flexCenter}
  justify-content: space-between;
  border-radius: 10px;
  color: #ececec;
  width: 300px;

  & + div {
    margin-top: 20px;
  }

  ${props => toastTypeStyle[props.type || 'info']}

  > div,
  button {
    ${flexCenter}
    background: transparent;
    border: 0;
    color: #ececec;
    padding: 20px;
  }

  section {
    padding: 20px 0;
    width: 100%;

    strong {
      font-size: 16px;
    }

    p {
      font-size: 14px;
      opacity: 0.5;
      font-weight: 600;
    }
  }
`;
