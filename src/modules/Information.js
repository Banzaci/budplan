import React, { useState } from 'react';
import styled from 'styled-components';
import InformationBlock from '../components/InformationBlock';
import { boxShadow } from '../style/common';

export default function Information({ list }) {

  const ListGenerator = ({ header, text }, index) => (
    <InformationBlock
      index={ index }
      key={ index }
      header={ header }
      text={ `${text}kr` }
    />
  )
  
  return (
    <Container
      style={ boxShadow }
    >
      { list.map(ListGenerator) }
    </Container>
  );
}

const Container = styled.View`
  display: flex;
  padding: 10px;
  flex-direction: column;
  margin: 10px 10px 0;
  background-color: white;
`;