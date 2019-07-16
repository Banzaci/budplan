import React, { useState, useEffect } from 'react';
import { boxShadow, clearBoxShadow } from '../style/common';
import { Container, TextInput, Text } from './input-style';

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