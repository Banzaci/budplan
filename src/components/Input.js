import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { boxShadow } from '../style/common';

export default function Input({ onChange, value, id, label, keyboardType }) {
  
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
      {...(focus && { style: {...boxShadow } } )}
    >
      <Label
        {...(focus && { style: { fontSize: 18 }} )}
      >
        { label }
      </Label>
      <TextInput
        { ...(focus && { style: { fontSize: 18 }} )}
        { ...(value && { value: text.toString() })}
        keyboardType={ keyboardType }
        selectTextOnFocus={ true }
        onBlur={ onBlur }
        onFocus={ onFocus }
        onChangeText={ amount => onChangeHandler(amount) }
      />
    </Container>
  );
}

const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: white;
  width: 100%;
  margin: 0 auto;
  border-radius: 12px;
`;

const Label = styled.Text`
  font-size: 18px;
  padding: 6px 12px;
`;

const TextInput = styled.TextInput`
  padding: 6px 12px;
  font-size: 22px;
  width: 60%;
  text-align: center;
`;