import React, { useState } from 'react';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';

export default function InputAmount({ averageAmountSpent, value, placeholder, day, onChange, currentDay, keyboardType , error}) {
  
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

  const renderIcon = day => {// md-trending-down"
    if (isBeforeCurrentDay && averageAmountSpent < value) return (<Ionicons name="md-thumbs-down" size={32} color="red" />)
    if (isBeforeCurrentDay && averageAmountSpent > value) return (<Ionicons name="md-thumbs-up" size={32} color="green" />)
    if (isCurrentDay) return (<Ionicons name="md-today" size={32} color="green" />)
    return (<Ionicons name="md-lock" size={32} color="black" />)
  }

  return (
    <Container
      {...(focus && { style: boxShadow } )}
      {...(isCurrentDay && { style: {...boxShadow } } )}
      {...(isAfterCurrentDay && { opacity: .2 })}
    >
      <Icon>{ renderIcon(day) }</Icon>
      <TextInput
        {...(error && { placeholderTextColor: 'red', boarderColor: 'red' })}
        {...(focus && { style: { height: 130, fontSize: 28 }} )}
        {...(isBeforeCurrentDay && { placeholderTextColor: '#eee', width: '70%' })}
        {...(isCurrentDay && { style: { fontSize: 48, width: '80%' }} )}
        {...(isAfterCurrentDay && { editable: false, width: '50%' } )}
        {...(text ? { value: `${text}kr` } : placeholder )}
        keyboardType={ keyboardType }
        selectTextOnFocus={ true }
        onFocus={ onFocus }
        onBlur={ onBlur }
        onChangeText={ amount => onChangeHandler({ amount, day }) }
      />
      <Label
        {...(isBeforeCurrentDay && { style: { color: '#eee' }} )}
      >
        { day }
      </Label>
    </Container>
  );
}

const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: white;
  margin: 0 auto;
  padding: 10px; 
`;

const Label = styled.Text`
  font-size: 18px;
  text-align: right;
`;

const Icon = styled.View`
`;

const TextInput = styled.TextInput`
  font-size: 22px;
  text-align: center;
`;