import React, { useState } from 'react';
import styled from 'styled-components';
import InformationBlock from '../components/InformationBlock';

export default function Information({ list }) {

  const ListGenerator = ({ header, text }, index) => (
    <InformationBlock
      key={ index }
      header={ header }
      text={ `${text}kr` }
    />
  )

  return (
    <Container>
      { list.map(ListGenerator) }
    </Container>
  );
}

const Container = styled.View`
  display: flex;
  padding: 0;
  flex-direction: column;
  margin-bottom: 6px;
`;