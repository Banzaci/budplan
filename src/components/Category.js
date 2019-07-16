import React, { useState } from 'react';
import Button from './Button';
import Input from './Input';
import { Container, TextView, ButtonView } from './category-style';

export default function Category({ id, name, onClick, border }) {

  const [amount, setAmount] = useState({});

  const onPress = () => onClick(amount);

  return (
    <Container>
      <TextView>
        <Input
          keyboardType='numeric'
          border={ border }
          placeholder={ name }
          label={ name }
          id={ id }
          value=''
          onChange={ setAmount }
        />
      </TextView>
      <ButtonView>
        <Button
          style={ { marginLeft: 12 } }
          title="+"
          onPress={ onPress }
        />
      </ButtonView>
    </Container>
  );
}
