import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '../components/Input'

export default function InputDayBalance({ onAmountChange, amount, currentDay, day }) {

  const [error, setError] = useState();

   const onChange = ({ amount, day }) => {
    const isNumber = Number.isInteger(parseInt(amount));
    if (isNumber) {
      onAmountChange({ amount, day });
    } else {
      setError(false);
    }
  };

  return (
    <Container>
      <Input
        error={ error }
        keyboardType = 'numeric'
        onChange={ onChange }
        value={ amount }
        currentDay={ currentDay }
        day={ day }
      />
    </Container>
  );
}

const Container = styled.View`
width: 90%;
margin: 0 auto;
margin-bottom: 10px;
`;