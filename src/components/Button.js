import React from 'react';
import Icon from '../utils/button-icon';
import { Container, ActionButton } from './button-style';

export default function Button({ type, onPress }) {(
  <Container>
    <ActionButton
      icon={ Icon(type) }
      onPress={ onPress }
    />
  </Container>
)}