import React, { useState } from 'react';
import Button from './Button';
import Input from './Input';
import { Container, View } from './category-style';

export default function Category({ id, name, onClick }) {

  const [amount, setAmount] = useState({});

  const onPress = () => onClick(amount);

  return (
    <Container>
      <View>
        <Input
          keyboardType='numeric'
          border
          placeholder={ name }
          label={ name }
          id={ id }
          value=''
          onChange={ setAmount }
        />
      </View>
      <View>
        <Button
          title="+"
          type="add"
          onPress={ onPress }
        />
      </View>
    </Container>
  );
}
