import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '../components/Input'

export default function InputDayBalance({ onAmountSet, day, balance, currentDay }) {

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
        currentDay={ currentDay }
        labelText={ day }
        onChange={ onChange }
        placeholder={ balance }
      />
    </Container>
  );
}

const Container = styled.View`
  margin-bottom: 10px;
`;