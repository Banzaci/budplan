import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '../components/Input'

export default function InputDayBalance({ onAmountChange, amount, currentDay, day }) {

  const onChange = ({ amount, day }) => {
    onAmountChange({ amount, day })
  };

  return (
    <Container>
      <Input
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