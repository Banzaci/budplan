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
          marginLeft: 6,
          marginRight: 3
        }}
      />
      <Block
        header="Last month spending"
        text={ lastMonthSpending }
        style={{
          marginLeft: 3,
          marginRight: 6
        }}
      />
    </Container>
  );
}

const Container = styled.View`
  display: flex;
  flex-direction: row;
  margin-bottom: 6px;
`;