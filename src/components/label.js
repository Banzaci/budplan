import React from 'react';
import { Container, Text } from './label-style';

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