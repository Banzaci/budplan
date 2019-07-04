import React from 'react';
import styled from 'styled-components';

export default function Input({ label, warning = {}, style = {} }) {
  
  return (
    <Container
      { ...warning }
      { ...style }
    >
      <Label>
        { label }
      </Label>
    </Container>
  );
}

const Container = styled.View`
  width: 100%;
  margin: 0 auto;
`;

const Label = styled.Text`
  font-size: 18px;
  padding: 6px 12px;
`;