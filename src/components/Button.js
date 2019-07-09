import React from 'react';
import styled from 'styled-components';
import Icon from '../utils/button-icon';

export default function Button({ type, onPress }) {
  
  const icon = Icon(type);

  return (
    <Container>
      <ActionButton
        onPress={ onPress }
      />
    </Container>
  );
}

const Container = styled.View``;

const ActionButton = styled.Button``;