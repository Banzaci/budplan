import React, { useState } from 'react';
import styled from 'styled-components';

export default function Input({ value, placeholder, day, onChange, currentDay, keyboardType , error}) {
  
  const [focus, setFocus] = useState(false);
  const [text, setText] = useState(value);
  const isBeforeCurrentDay = currentDay > day;
  const isCurrentDay = currentDay === day;
  const isAfterCurrentDay = currentDay < day;
  
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
    setFocus(false)
  }

  const onChangeHandler = ({ amount, day }) => {
    setText(amount);
    onChange({ amount, day })
  }

  return (
    <Container
      {...(focus && { style: {...boxShadow, width: '70%' } } )}
      {...(isCurrentDay && { style: boxShadow } )}
    >
      <Label
        {...(isBeforeCurrentDay && { style: { color: '#eee' }} )}
        {...(isCurrentDay && { style: { fontSize: 48 }} )}
      >
        { day }
      </Label>
      <TextInput
        {...(error && { placeholderTextColor: 'red', boarderColor: 'red' })}
        {...(focus && { style: { height: 130, fontSize: 28 }} )}
        {...(isBeforeCurrentDay && { placeholderTextColor: '#eee' })}
        {...(isCurrentDay && { style: { height: 130, fontSize: 48 }} )}
        {...(isAfterCurrentDay && { editable: false, style: { color: '#fff', backgroundColor: '#eee' } } )}
        {...(text ? { value: text } : placeholder )}
        keyboardType={ keyboardType }
        selectTextOnFocus={ true }
        onFocus={ onFocus }
        onBlur={ onBlur }
        onChangeText={ amount => onChangeHandler({ amount, day }) }
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