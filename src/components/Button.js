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

const Container = styled.View`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ActionButton = styled.Button`
  width: 50px;
  background: red;
`;