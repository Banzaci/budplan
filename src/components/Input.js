import React, { useState, useEffect } from 'react';
import { boxShadow } from '../style/common';
import Button from './Button';
import { Container, TextInput, Text, Label } from './input-style';

export default function Input({ placeholder, button, onChange, value, id, labelRight, labelLeft, keyboardType, error, border }) {
  
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
    <Container
      {...(border && { style: { ...boxShadow } } )}
    >
      { labelLeft && <Label
          {...(focus && { style: { fontSize: 18 }} )}
        >
          { labelLeft }
        </Label>
      }
      <TextInput
        { ...(value && { value: text.toString() })}
        { ...(placeholder && { placeholder })}
        keyboardType={ keyboardType }
        selectTextOnFocus={ true }
        onBlur={ onBlur }
        onFocus={ onFocus }
        onChangeText={ onChangeHandler }
      />
    { labelRight && <Label
        {...(focus && { style: { fontSize: 18 }} )}
      >
        { labelRight }
      </Label>
      }
      { button && <Button
        title="add"
        onPress={ onChangeHandler }
        { ...button }
      />}
    </Container>
  );
}
