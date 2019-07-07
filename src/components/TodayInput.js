import React, { useState } from 'react';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import { boxShadow } from '../style/common';

export default function TodayInput({ value, onChange, currentDay }) {
  
  const currency = 'kr';
  const [error, setError] = useState();
  const [focus, setFocus] = useState(false);
  const [text, setText] = useState(`Dagens utgifter ${value}${currency}`);

  const onFocus = () => {
    setFocus(true)
    setText('');
  }

  const onBlur = () => {
    if(!text.includes(currency)) setText(`Dagens utgifter ${text}${currency}`)
    setFocus(false)
  }

  const onChangeHandler = ({ amount, currentDay }) => {
    const isNumber = Number.isInteger(parseInt(amount));
    if (isNumber) {
      setText(amount);
      onChange({ amount, currentDay })
    } else {
      setError(false);
    }
  }

  return (
    <Container
      {...(focus && { style: boxShadow } )}
      style={ boxShadow }
    >
      <TextInput
        {...(error && { placeholderTextColor: 'red' })}
        {...(focus && { style: { padding: 10, fontSize: 28 }} )}
        {...(text && { value: text } )}
        keyboardType="numeric"
        selectTextOnFocus={ true }
        onFocus={ onFocus }
        onBlur={ onBlur }
        onChangeText={ amount => onChangeHandler({ amount, currentDay }) }
      />
    </Container>
  );
}
//   borderBottomColor: #eee;
  // borderBottomWidth: 2;
const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: white;
  margin: 0 10px;
  padding: 20px 10px;
`;

const Label = styled.Text`
  font-size: 18px;
  text-align: left;
  background-color: white;
  width: 42px;
  height: 42px;
  border-radius: 21;
`;

const TextInput = styled.TextInput`
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  width: 70%;
  margin: 0 auto;
`;