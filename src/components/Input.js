import React from 'react';
import styled from 'styled-components';

export default function Input({ placeholder, labelText, onChange }) {
  return (
    <Container>
      <Label>{ labelText }</Label>
      <TextInput
        placeholder={ placeholder }
        onChangeText={ number => onChange({ number }) }
      />
    </Container>
  );
}

const sharedMargins = `
  margin: 16px 12px;
`;

const Container = styled.View`
  margin-top: 190px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.Text`
  font-size: 18px;
  ${sharedMargins}
`;

const TextInput = styled.TextInput`
  background-color: white;
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 28px;
  width: 80%;
  text-align: center;
  ${sharedMargins}
`;