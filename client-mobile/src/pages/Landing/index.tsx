import React from 'react';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import {
  Background,
  GoatContainer,
  LogoButtonContainer,
  LogoImage,
  ButtonContainer,
  Button,
} from './styles';

import goatImg from '../../assets/goat.png';
import darkLogoImg from '../../assets/darkLogo.png';

const Landing: React.FC = () => {
  return (
    <Background>
      <GoatContainer>
        <Image source={goatImg} />
      </GoatContainer>
      <LogoButtonContainer>
        <LogoImage source={darkLogoImg} />
        <ButtonContainer>
          <Button>
            <Icon name="chevron-right" color="#ececec" size={24} />
          </Button>
        </ButtonContainer>
      </LogoButtonContainer>
    </Background>
  );
};

export default Landing;
