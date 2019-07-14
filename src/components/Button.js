import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Container, ActionButton, Label } from './button-style';

export default function Button({ title, type, onPress, text }) {
  return (
    <Container>
      <ActionButton
        style={ {} }
        title={ title }
        onPress={ onPress }
        type="clear"
      />
      <Label>
        { text }
      </Label>
    </Container>
  )
}

