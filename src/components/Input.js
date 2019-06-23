import React from 'react';
import styled from 'styled-components';

export default function Input({ placeholder, labelText, onChange, disabled, currentDay }) {
  const isBeforeCurrentDay = currentDay > labelText;
  const isCurrentDay = currentDay === labelText;
  const isAfterCurrentDay = currentDay < labelText;
  const before = {...(isBeforeCurrentDay && { style: { height: 130, backgroundColor: 'red' }} )};
  const today = {...(isCurrentDay && { style: { height: 130, fontSize: 48 }} )};
  const after = {...(isAfterCurrentDay && { editable: false, style: { backgroundColor: 'grey' } } )};
  return (
    <Container
      { ...before }
      { ...after }
    >
      <Label>{ labelText }</Label>
      <TextInput
        { ...today }
        { ...after }
        placeholder={ placeholder }
        onChangeText={ number => onChange({ number }) }
      />
    </Container>
  );
}
// style={{height: 40, borderColor: 'gray', borderWidth: 1}}
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