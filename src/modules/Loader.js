import React from 'react';
import styled from 'styled-components';

export default function Information({ text='loading...' }) {
  return (
    <Container>
      <Text>{ text }</Text>
    </Container>
  );
}

const Container = styled.View`
  display: flex;
  width: 100%;
  height: 100%;
  background: black;
  padding: 0;
  margin: 0;
`;

const Text = styled.Text`
`;