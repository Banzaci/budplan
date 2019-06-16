import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '../components/Input'
import Button from '../components/Button'

export default function InputDayBalance({ onAmountSet }) {

  const [ amount, setAmount ] = useState(0);

  const onChange = ({ number }) => {
    setAmount(number)
  };
  const onPress = evt => {
    onAmountSet(amount)
  };
  return (
    <Container>
      <Input
        onChange={ onChange }
        labelText="Gårdagens utgifter"
        placeholder="Skriv in belopp"

      />
      <Button
        title="Lägg till"
        onPress={ onPress }
      />
    </Container>
  );
  }

  const Container = styled.View`
    height: 100%;
    width: 100%;
  `;