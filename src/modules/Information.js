import React, { useState } from 'react';
import styled from 'styled-components';
import Block from '../components/Block';
import BlockComponent from '../components/BlockComponent';

export default function Information({ list }) {

  const generatePrice = (a, b) => `${a}kr / (${b}kr)`;

  const ListGenerator = ({ header, pre1, pre2 }, index) => (
    <BlockComponent key={ index } style={{ backgroundColor:"#ddd", color: 'black' } } >
      <Block
        header={ header }
        text={ generatePrice(pre1, pre2) }
      />
    </BlockComponent>
  )

  return (
    <Container>
      { list.map(ListGenerator) }
    </Container>
  );
}

const Container = styled.View`
  display: flex;
  flex-direction: row;
  margin-bottom: 6px;
`;