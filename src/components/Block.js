import React from 'react';
import styled from 'styled-components';
import { Text, View } from 'react-native';

export default function Block({ header, text, style = {} }) {
  return (
    <View
      { ...style }
    >
      <Header>
        { header }
      </Header>
      <Paragraph>
        { text }
      </Paragraph>
    </View>
  );
}

const Header = styled.Text`
  text-align: center;
  font-size: 14px;
  margin-bottom: 6px;
  padding: 0;
`;

const Paragraph = styled.Text`
  text-align: center;
  font-size: 18px;
  margin: 0;
  padding: 0;
`;