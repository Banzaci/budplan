import React from 'react';
import styled from 'styled-components';

export default function Button({ title, onPress }) {
  return (
    <Container>
      <ActionButton
        title={ title }
        onPress={ onPress }
      />
    </Container>
  );
}

const Container = styled.View``;

const ActionButton = styled.Button``;