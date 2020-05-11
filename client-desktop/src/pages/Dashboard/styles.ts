import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  background: #d59833;
  padding: 40px;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Content = styled.div`
  flex: 1;

  display: flex;
  align-items: center;

  img {
    width: 100%;
    max-width: 1140px;
  }
`;
