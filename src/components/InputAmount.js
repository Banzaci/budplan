import React, { useState } from 'react';
import styled from 'styled-components';
import { boxShadow } from '../style/common';

export default function InputAmount({ value, placeholder, day, onChange, currentDay, keyboardType}) {
  
  const currency = 'kr';
  const [error, setError] = useState();
  const [focus, setFocus] = useState(false);
  const [text, setText] = useState(`${value}${currency}`);

  const isBeforeCurrentDay = currentDay > day;
  const isCurrentDay = currentDay === day;
  const isAfterCurrentDay = currentDay < day;

  const onFocus = () => {
    setFocus(true)
  }

  const onBlur = () => {
    if(!text.includes(currency)) setText(`${text}${currency}`)
    setFocus(false)
  }

  const onChangeHandler = ({ amount, day }) => {
    const isNumber = Number.isInteger(parseInt(amount));
    if (isNumber) {
      setText(amount);
      onChange({ amount, day })
    } else {
      setError(false);
    }
  }

  return (
    <Container
      {...(focus && { style: boxShadow } )}
      {...(isCurrentDay && { style: {...boxShadow } } )}
      {...(isAfterCurrentDay && { opacity: .2 })}
    >
    <Label
        {...(isBeforeCurrentDay && { style: { color: '#eee' }} )}
      >
        { day }
      </Label>
      <TextInput
        {...(error && { placeholderTextColor: 'red' })}
        {...(focus && { style: { padding: 10, fontSize: 28 }} )}
        {...(isBeforeCurrentDay && { placeholderTextColor: '#eee', width: '80%' })}
        {...(isCurrentDay && { style: { fontSize: 28, width: '50%' }} )}
        {...(isAfterCurrentDay && { editable: false, width: '40%' } )}
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

// borderBottomColor: #eee;
// borderBottomWidth: 2;

const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: white;
  width: 100%;
  padding: 10px;
`;

const Label = styled.Text`
  font-size: 18px;
  text-align: left;
  background-color: white;
  width: 42px;
  height: 42px;
  border-radius: 21;
`;

const Icon = styled.View`
margin-left: 20px;
`;

const TextInput = styled.TextInput`
  font-size: 22px;
  text-align: right;
`;