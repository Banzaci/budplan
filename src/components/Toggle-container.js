import React from 'react';
import { Container, Wrapper } from './label-style';

export default function ToggleContainer({ isOpen, Components }) {(
  <Container
    {...(isOpen && { style: { display: 'flex' }} )}
  >
    <Wrapper>
      { }
    </Wrapper>
  </Container>
)}