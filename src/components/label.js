import React from 'react';
import styled from 'styled-components';

export default function Label({ text, style={} }) {
  return (
    <Container>
      <Text
        style={ style }
      >
        { text }
      </Text>
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
`;

const Text = styled.Text`
  font-size: 18px;
  padding: 6px 12px;
`;