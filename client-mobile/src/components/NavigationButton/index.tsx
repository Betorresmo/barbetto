import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { RectButtonProperties } from 'react-native-gesture-handler';

import { ButtonContainer, Button } from './styles';

interface NavigationButtonProps extends RectButtonProperties {
  theme: 'light' | 'dark';
  direction: 'left' | 'right';
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
  theme,
  direction,
  ...rest
}) => {
  return (
    <ButtonContainer direction={direction}>
      <Button color={theme} {...rest}>
        <Icon
          name={`chevron-${direction}`}
          color={theme === 'light' ? '#202020' : '#ececec'}
          size={24}
        />
      </Button>
    </ButtonContainer>
  );
};

export default NavigationButton;
