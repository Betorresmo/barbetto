import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  width: 100%;
  height: 65px;
  background: #d59833;
  border-radius: 15px;

  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  font-size: 20px;
  font-family: 'NunitoSans-SemiBold';
  color: #202020;
`;
