import React, { useState } from 'react';
import Button from './Button';
import Input from './Input';
import { Container, TextView, ButtonView } from './category-style';

export default function Category({ id, name, onClick }) {

  const [amount, setAmount] = useState({});

  const onPress = () => onClick(amount);

  return (
    <Container>
      <TextView>
        <Input
          keyboardType='numeric'
          border
          placeholder={ name }
          label={ name }
          id={ id }
          value=''
          onChange={ setAmount }
        />
      </TextView>
      <ButtonView>
        <Button
          title="+"
          type="add"
          onPress={ onPress }
        />
      </ButtonView>
    </Container>
  );
}
