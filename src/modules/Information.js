import React, { useState } from 'react';
import styled from 'styled-components';
import Block from '../components/Block'

export default function Information({ amountAverageDaySpent = 0, spentSoFar = 0 }) {
  return (
    <Container>
      <Block
        header="Average day spending"
        text={ amountAverageDaySpent }
        style={{
          marginLeft: 10,
          marginRight: 5
        }}
      />
      <Block
        header="Spent so far"
        text={ spentSoFar }
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
  height: 100px;
`;