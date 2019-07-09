import React from 'react';
import Button from './Button';
import { Container, Label } from './category-style';

export default function Category({ category, onPress }) {
  if (!category) return null;

  return (
    <Container>
      <Label>das{ category }</Label>
      <Button
        title="-"
        type="delete"
        onPress={ onPress }
      />
    </Container>
  );
}
