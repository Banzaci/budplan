import React, { useState } from 'react';
import Button from './Button';
import Input from './Input';
import { Container } from './category-style';

export default function Category({ category, onClick, day, value }) {

  const [amount, setAmount] = useState(value);

  const onPress = () => onClick({ amount, category, day })

  return (
    <Container>
      <Input
        keyboardType='numeric'
        border
        placeholder={ category }
        label={ category }
        onChange={ setAmount }
      />
      <Button
        title="+"
        type="add"
        onPress={ onPress }
      />
    </Container>
  );
}
