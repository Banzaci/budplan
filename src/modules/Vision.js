import React, { useState } from 'react';
import styled from 'styled-components';
import Block from '../components/Block'

export default function Vision({ amount = 0 }) {
  return (
    <Container>
      <Block
        header="Average day spending"
        text={ amount }
        style={{
          marginLeft: 10,
          marginRight: 10
        }}
      />
    </Container>
  );
}

const Container = styled.View`
  margin-bottom: 20px;
  display: flex;
  height: 100px;
`;