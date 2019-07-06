import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

export default function Input({ onChange, value, id, label, keyboardType }) {
  
  const currency = 'kr';

  const [focus, setFocus] = useState(false);
  const [text, setText] = useState(`${value}${currency}`);

  const boxShadow = {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  }

  const onFocus = () => {
    setFocus(true)
  }

  const onBlur = () => {
    if(!text.includes(currency)) setText(`${text}${currency}`);
    setFocus(false)
  }

  const onChangeHandler = amount => {
    setText(amount);
    onChange({ amount, id })
  }

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
        {...(text && { value: text.toString() })}
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