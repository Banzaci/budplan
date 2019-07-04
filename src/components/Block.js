import React from 'react';
import styled from 'styled-components';
import { Text } from 'react-native';

export default function Block({ header, text, style = {} }) {
  return (
    <Container
      { ...style }
    >
      <Header>
        { header }
      </Header>
      <P>
        { text }kr.
      </P>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #333;
  padding: 12px 8px;
`;

const Header = styled.Text`
  color: white;
  text-align: center;
  font-size: 14px;
  margin-bottom: 6px;
  padding: 0;
`;

const P = styled.Text`
  text-align: center;
  color: white;
  font-size: 18px;
  margin: 0;
  padding: 0;
`;