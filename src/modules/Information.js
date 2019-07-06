import React, { useState } from 'react';
import styled from 'styled-components';
import Block from '../components/Block'

export default function Information({ average, total, targetAverage, totalByAverage }) {
  return (
    <Container>
      <Block
        header="Average day spending"
        text={ `${average}kr / (${targetAverage}kr)` }
        style={{
          marginLeft: 6,
          marginRight: 3
        }}
      />
      <Block
        header="Spent so far"
        text={ `${total}kr / (${totalByAverage}kr)` }
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