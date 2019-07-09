import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Container, ActionButton } from './button-style';

export default function Button({ title, type, onPress }) {
  return (
    <Container>
      <ActionButton
        title={ title }
        onPress={ onPress }
      />
    </Container>
  )
}

