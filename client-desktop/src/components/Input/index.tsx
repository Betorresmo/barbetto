import React, {
  InputHTMLAttributes,
  useRef,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { useField } from '@unform/core';
import { IconBaseProps } from 'react-icons';
import { FiAlertTriangle } from 'react-icons/fi';

import { Container, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [hasFocus, setHasFocus] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, registerField, error } = useField(name);

  const handleInputFocus = useCallback(() => {
    setHasFocus(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setHasFocus(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container
      onFocus={handleInputFocus}
      onBlur={handleInputBlur}
      hasFocus={hasFocus}
      isFilled={isFilled}
      hasError={!!error}
    >
      {Icon && <Icon size={24} />}
      <input ref={inputRef} {...rest} />
      {error && (
        <Error title={error}>
          <FiAlertTriangle size={24} color="AF3B21" />
        </Error>
      )}
    </Container>
  );
};

export default Input;
