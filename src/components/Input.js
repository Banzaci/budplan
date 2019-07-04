import React, { useState } from 'react';
import styled from 'styled-components';

export default function Input({ onChange, value, key, label, keyboardType }) {
  
  const [text, setText] = useState(value);
  const [focus, setFocus] = useState(false);

  const onChangeHandler = (txt) => {
    setText(txt);
    onChange({ text, key })
  }

  const onFocus = (e) => {}

  return (
    <Container
      {...(focus && { style: {...boxShadow, width: '70%' } } )}
    >
      <Label
        {...(focus && { style: { fontSize: 48 }} )}
      >
        { label }
      </Label>
      <TextInput
        { ...(focus && { style: { height: 130, fontSize: 28 }} )}
        { ...(text && { value: text }) }
        keyboardType={ keyboardType }
        selectTextOnFocus={ true }
        onFocus={ onFocus }
        onChangeText={ txt => onChangeHandler({ txt, day }) }
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