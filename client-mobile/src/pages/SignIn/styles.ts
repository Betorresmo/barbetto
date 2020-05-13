import styled from 'styled-components/native';
import { transparentize } from 'polished';

export const Container = styled.View`
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding: 40px;
`;

export const LogoContainer = styled.View`
  /* margin: auto 0; */
`;

export const FormContainer = styled.View`
  width: 100%;
  align-items: center;
`;

export const ForgotPassword = styled.TouchableOpacity`
  padding: 15px;
`;

export const ForgotPasswordText = styled.Text`
  font-family: 'NunitoSans-SemiBold';
  font-size: 16px;
  color: ${transparentize(0.5, '#ececec')};
`;

export const SignUpButton = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const SignUpButtonText = styled.Text`
  color: #ececec;
  font-family: 'NunitoSans-SemiBold';
  font-size: 16px;
  margin-right: 5px;
  align-items: center;
  justify-content: center;
`;
