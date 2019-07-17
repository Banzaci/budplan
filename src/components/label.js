import React from 'react';
import { Container, Text } from './label-style';

export default function Label({ text }) {
  return (
    <Container>
      <Text>
        { text }
      </Text>
    </Container>
  )
}