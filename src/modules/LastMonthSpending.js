import React, { useState } from 'react';
import styled from 'styled-components';
import Block from '../components/Block';
import BlockComponent from '../components/BlockComponent';

export default function LastMonthSpending({ lastMonthSpending = 0 }) {
  return (
    <Container>
      <BlockComponent style={{ backgroundColor:"#eee", color: 'black' } } >
        <Block
          header="Last month spending"
          text={ lastMonthSpending }
        />
      </BlockComponent>
    </Container>
  );
}

const Container = styled.View`
  display: flex;
  flex-direction: row;
  margin-bottom: 6px;
`;