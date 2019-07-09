import React from 'react';
import Button from './Button';
import { Container, Label } from './category-style';

export default function Category({ category, onPress }) {
  return (
    <Container>
      <Label>{ category }</Label>
      <Button
        type="delete"
        onPress={ onPress }
      />
    </Container>
  );
}
