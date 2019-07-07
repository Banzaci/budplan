import React, { Component } from 'react';
import styled from 'styled-components';
import Block from './Block';

const BlockContainer = ({ children, style }) => {
  return (
    <Container style={ { ...style } } >
      { children }
    </Container>
  )
}

export default BlockContainer;

const Container = styled.View`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 12px 8px;
`;