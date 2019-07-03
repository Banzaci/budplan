import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '../components/Input'

export default function InputDayBalance({ onAmountChange, amount, currentDay, day }) {

  const [error, setError] = useState(false);

  const numbersOnly = amount => {
    return /^\d+$/.test(amount.toString())
  }

  const onChange = ({ amount, day }) => {
    setError(numbersOnly(amount))
    if (!error) {
      onAmountChange({ amount, day })
    }
  };

  return (
    <Container>
      <Input
        error={ error }
        keyboardType = 'numeric'
        onChange={ onChange }
        placeholder={ amount }
        currentDay={ currentDay }
        day={ day }
      />
    </Container>
  );
}

const Container = styled.View`
  margin-bottom: 10px;
`;