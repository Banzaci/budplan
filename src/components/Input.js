import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { boxShadow, clearBoxShadow } from '../style/common';

export default function Input({ placeholder, onChange, value, id, keyboardType, error, shadow }) {
  
  const [focus, setFocus] = useState(false);
  const [firstRender, setFirstRender] = useState(false);
  const [text, setText] = useState(value);

  const onFocus = () => {
    setFocus(true)
  }

  const onBlur = () => {
    setFocus(false)
  }
  
  const onChangeHandler = str => {
    onChange({ value: str, id })
    setText(str);
  }

  useEffect(() => {
    if (text !== value && !firstRender) {
      setText(value);
      setFirstRender(true)
    }
  })

  return (
    <Container
      {...(shadow && { style: { ...boxShadow } } )}
      {...(focus && { style: { ...clearBoxShadow } } )}
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

const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  background-color: white;
  border-radius: 12px;
  margin: 0;
  padding: 6px 12px;
`;

const TextInput = styled.TextInput`
  padding: 6px 12px;
  flex: 1;
  font-size: 16px;
`;

const Text = styled.Text`
  width: 100%;
  color: black;
`;