import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  border: 0;
  border-radius: 15px;
  padding: 15px;
  background: #202020;
  color: #ececec;
  margin-top: 15px;
  transition: transform 200ms ease, background 200ms ease;
  width: 100%;

  &:hover {
    background: ${shade(0.2, '#202020')};
  }

  &:active {
    transform: scale(0.98);
  }
`;
