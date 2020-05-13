import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Background = styled.View`
  flex: 1;
  background: #d59833;
`;

export const GoatContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const LogoButtonContainer = styled.View`
  margin-bottom: 50px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const LogoImage = styled.Image`
  margin-left: 20px;
  transform: scale(0.9);
`;

export const ButtonContainer = styled.View`
  overflow: hidden;
  border-radius: 15px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
`;

export const Button = styled(RectButton)`
  background: #202020;
  height: 70px;
  width: 70px;
  justify-content: center;
  align-items: center;
`;
