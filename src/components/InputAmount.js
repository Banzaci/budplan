import React, { useState } from 'react';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import { boxShadow } from '../style/common';

export default function InputAmount({ average, value, placeholder, day, onChange, currentDay, keyboardType , error}) {
  
  const currency = 'kr';
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
    setText(amount);
    onChange({ amount, day })
  }

  const renderIcon = day => {// md-trending-down"
    if (isBeforeCurrentDay && average < value) return (<Ionicons name="md-thumbs-down" size={32} color="#eee" />)
    if (isBeforeCurrentDay && average > value) return (<Ionicons name="md-thumbs-up" size={32} color="#eee" />)
    if (isCurrentDay) return (<Ionicons name="md-today" size={32} color="#aaa" />)
    return (<Ionicons name="md-lock" size={32} color="black" />)
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
        {...(isCurrentDay && { style: { fontSize: 48, width: '60%' }} )}
        {...(isAfterCurrentDay && { editable: false, width: '40%' } )}
        {...(text ? { value: text } : placeholder )}
        keyboardType={ keyboardType }
        selectTextOnFocus={ true }
        onFocus={ onFocus }
        onBlur={ onBlur }
        onChangeText={ amount => onChangeHandler({ amount, day }) }
      />
      <Icon>{ renderIcon(day) }</Icon>
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
  padding: 10px;
  borderBottomColor: #eee;
  borderBottomWidth: 2;
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