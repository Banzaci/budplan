import React from 'react';
import { Container, Label } from './label-style';

export default function Label({ label, warning, error }) {
  return (
    <Container
      {...(warning && { style: { fontSize: 18 }} )}
      {...(error && { style: { fontSize: 18 }} )}
    >
      <Label>
        { label }
      </Label>
    </Container>
  )
}