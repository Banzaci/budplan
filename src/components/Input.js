import React, { useState, useEffect } from 'react';
import { boxShadow } from '../style/common';
// import { Container, TextInput, Label } from './input-style';
import styled from 'styled-components';

export default function Input({ placeholder, onChange, value, id, keyboardType, error, border }) {
  
  const [focus, setFocus] = useState(false);
  const [firstRender, setFirstRender] = useState(false);
  const [text, setText] = useState(value);

  const onFocus = () => {
    setFocus(true)
  }

  const onBlur = () => {
    setFocus(false)
  }
  
  const onChangeHandler = amount => {
    onChange({ amount, id })
    setText(amount);
  }

  useEffect(() => {
    if (text !== value && !firstRender) {
      setText(value);
      setFirstRender(true)
    }
  })

  return (
    <Container
      {...(border && { style: { ...boxShadow } } )}
    >
      <TextInput
        { ...(value && { value: text.toString() })}
        { ...(placeholder && { placeholder })}
        keyboardType={ keyboardType }
        selectTextOnFocus={ true }
        onBlur={ onBlur }
        onFocus={ onFocus }
        onChangeText={ onChangeHandler }
      />
    </Container>
  );
}

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  background-color: white;
  width: 100%;
  border-radius: 12px;
  margin: 0;
  padding: 6px 12px;
`;

export const TextInput = styled.TextInput`
  padding: 6px 12px;
  font-size: 16px;
  width: 100%;
`;