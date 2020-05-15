import React from 'react';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import NavigationButton from '../../components/NavigationButton';

import {
  Background,
  GoatContainer,
  LogoButtonContainer,
  LogoImage,
} from './styles';

import goatImg from '../../assets/goat.png';
import darkLogoImg from '../../assets/darkLogo.png';

const Landing: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Background>
      <GoatContainer>
        <Image source={goatImg} />
      </GoatContainer>
      <LogoButtonContainer>
        <LogoImage source={darkLogoImg} />
        <NavigationButton
          onPress={() => navigation.navigate('SignIn')}
          direction="right"
          theme="dark"
        />
      </LogoButtonContainer>
    </Background>
  );
};

export default Landing;
