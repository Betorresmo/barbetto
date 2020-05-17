import styled, { css } from 'styled-components/native';
import { transparentize } from 'polished';
import VectorIcon from 'react-native-vector-icons/Feather';

interface ContainerProps {
  hasFocus: boolean;
  hasError: boolean;
}
interface IconProps {
  hasFocus: boolean;
  isFilled: boolean;
}

export const Container = styled.View<ContainerProps>`
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

  ${props =>
    props.hasError &&
    css`
      border-color: #bb371a;
    `}
  ${props =>
    props.hasFocus &&
    css`
      border-color: ${transparentize(0.2, '#d59833')};
    `}
`;

export const Icon = styled(VectorIcon)<IconProps>`
  margin-right: 10px;

  color: ${props => (props.hasFocus || props.isFilled ? '#d59833' : '#202020')};
`;

export const TextInput = styled.TextInput`
  flex: 1;
  font-family: 'NunitoSans-Regular';
  font-size: 16px;
  color: #ececec;
  text-decoration: none;
`;
