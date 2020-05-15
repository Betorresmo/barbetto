import styled from 'styled-components/native';
import { transparentize, darken } from 'polished';
import VectorIcon from 'react-native-vector-icons/Feather';

export const Container = styled.View`
  background: ${transparentize(0.9, '#ececec')};
  width: 100%;
  height: 45px;
  border-radius: 15px;
  padding: 0 10px;
  margin-bottom: 10px;
  flex-direction: row;
  align-items: center;

  border-width: 2px;
  border-color: #202020;
`;

export const Icon = styled(VectorIcon)`
  color: #202020;
  margin-right: 10px;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  font-family: 'NunitoSans-Regular';
  font-size: 16px;
  color: ${darken(0.2, '#ececec')};
  text-decoration: none;
`;