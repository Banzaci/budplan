import React, { useState } from 'react';
import styled from 'styled-components';
import Button from './Button';
import Input from './Input';

export default function Category({ category, onPress }) {

  const [text, setText] = useState();
  const onChange = value => setText(value);
  const onClick = () => onPress(text);

  return (
    <Container>
      <Label>{ category }</Label>
      <Button
        title="Ta bort"//Icon delete
        onPress={ onPress }
      />
    </Container>
  );
}

const Container = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const Label = styled.Text`
  color: black;
`;