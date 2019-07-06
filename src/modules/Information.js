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
          marginLeft: 6,
          marginRight: 3
        }}
      />
      <Block
        header="Spent so far"
        text={ totalAmountSpent }
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