import React, { useState } from 'react';
import styled from 'styled-components';

export default function Input({ placeholder, day, onChange, currentDay, keyboardType , error}) {
  
  const [focus, setFocus] = useState(false)
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

  return (
    <Container
      {...(focus && { placeholderTextColor: 'blue', boarderColor: 'blue' })}
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
        {...(focus && { placeholderTextColor: 'blue', boarderColor: 'blue' })}
        {...(isBeforeCurrentDay && { placeholderTextColor: '#eee' })}
        {...(isCurrentDay && { style: { height: 130, fontSize: 48 }} )}
        {...(isAfterCurrentDay && { editable: false, style: { color: '#fff', backgroundColor: '#eee' } } )}
        placeholder={ placeholder }
        keyboardType={ keyboardType }
        clearTextOnFocus={ true }
        onFocus={ onFocus }
        onBlur={ onBlur }
        onChangeText={ amount => onChange({ amount, day }) }
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
  width: 50%;
  margin: 0 auto;
  border-radius: 12px;
`;

const Label = styled.Text`
  font-size: 18px;
  padding: 6px 12px;
`;

const TextInput = styled.TextInput`
  padding: 6px 12px;
  font-size: 28px;
  width: 40%;
  text-align: center;
`;