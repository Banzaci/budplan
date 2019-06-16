import React from 'react';
import styled from 'styled-components';
import InputDayBalance from './modules/InputDayBalance'

export default function Wrapper() {
  const onAmountSet = amount => {
    console.log(amount)
  };
  return (
    <Container>
      <InputDayBalance
        onAmountSet={ onAmountSet }
      />
    </Container>
  );
}

const Container = styled.View`
  height: 100%;
  width: 100%;
  padding: 20px;
  background-color: papayawhip;
`;