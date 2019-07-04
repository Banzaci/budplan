import React, { useState } from 'react';
import styled from 'styled-components';
import Block from '../components/Block'

export default function LastMonthSpending({ lastMonthSpending = 0 }) {
  return (
    <Container>
      <Block
        header="Last month spending"
        text={ lastMonthSpending }
        style={{
          marginLeft: 10,
          marginRight: 10
        }}
      />
    </Container>
  );
}

const Container = styled.View`
  height: 80px;
`;