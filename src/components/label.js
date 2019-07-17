import React from 'react';
import { Container, Text } from './label-style';

export default function Label({ label, warning, error }) {
  return (
    <Container
      {...(warning && { style: { fontSize: 18 }} )}
      {...(error && { style: { fontSize: 18 }} )}
    >
      <Text>
        { label }
      </Text>
    </Container>
  )
}