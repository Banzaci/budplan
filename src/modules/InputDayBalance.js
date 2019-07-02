import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '../components/Input'

export default function InputDayBalance({ onAmountChange, amount, currentDay, day }) {

  const [error, setError] = useState(false)
  const numbersOnly = (e) => {
    return /^\d+$/.test(e.toString())
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