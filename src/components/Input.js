import React, { useState, useEffect } from 'react';
import { boxShadow } from '../style/common';
import Button from './Button';
import { Container, TextInput, Text, Label } from './Imput-style';

export default function Input({ button, onChange, value, id, label, keyboardType, error, border }) {
  
  const [focus, setFocus] = useState(false);
  const [firstRender, setFirstRender] = useState(false);
  const [text, setText] = useState(value);

  const borderFocusStyle = focus ? { borderColor: 'blue' } : {};

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
    <Container>
      { label && <Label
          {...(focus && { style: { fontSize: 18 }} )}
        >
          { label }
        </Label>
      }
      <Text
        {...(border && { style: { ...boxShadow, ...borderFocusStyle } } )}
      >
        <TextInput
          { ...(focus && { style: { fontSize: 18 }} )}
          { ...(value && { value: text.toString() })}
          keyboardType={ keyboardType }
          selectTextOnFocus={ true }
          onBlur={ onBlur }
          onFocus={ onFocus }
          onChangeText={ onChangeHandler }
        />
      </Text>
      { button && <Button
        onPress={ onChangeHandler }
        { ...button }
      />}
    </Container>
  );
}
