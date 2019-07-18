import React from 'react';
import styled from 'styled-components';

export default function Button({ title, onPress, style, disabled = false, containerStyle = {}, textStyle = {} }) {
  return (
    <Container
      style={ containerStyle }
    >
      <ActionButton
        onPress={ onPress }
        style={ { ...style, ...(disabled && { opacity: .2, background: 'red' } ) } }
       >
         <Text
          style={ textStyle }
         >
           { title }
         </Text>
       </ActionButton>
    </Container>
  )
}

const Container = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text`
  width: 100%;
  color: black;
`;
const ActionButton = styled.TouchableOpacity`
  width: 100%;
  background: #eee;
  align-items: center;
  justify-content: center;
  padding: 12px 12px;
  border-radius: 12px;
`;
//https://facebook.github.io/react-native/docs/button.html

// https://facebook.github.io/react-native/docs/touchableopacity

