import React from 'react';
import Button from './Button';
import Input from './Input';
import { Container, Label } from './category-style';

export default function Category({ category, onPress, show }) {
  return (
    <Container>
      <Input
        keyboardType='numeric'
        border
        placeholder={ category }
        label={ category }
      />
      { show && <Button
        title="-"
        type="delete"
        onPress={ onPress }
      /> }
    </Container>
  );
}
