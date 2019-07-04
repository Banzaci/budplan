import React, { useState } from 'react';
import styled from 'styled-components';
import Block from '../components/Block'

export default function Information({ averageAmountSpent, totalAmountSpent }) {
  return (
    <Container>
      <Block
        header="Average day spending"
        text={ averageAmountSpent.toFixed(2) }
        style={{
          marginLeft: 10,
          marginRight: 5
        }}
      />
      <Block
        header="Spent so far"
        text={ totalAmountSpent }
        style={{
          marginLeft: 5,
          marginRight: 10
        }}
      />
    </Container>
  );
}

const Container = styled.View`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
`;