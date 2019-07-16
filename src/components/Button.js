import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Container } from './button-style';

export default function Button({ title, onPress, style }) {
  return (
    <Container
      style={ style }
    >
      <TouchableOpacity
         onPress={ onPress }
       >
         <Text>
           { title }
         </Text>
       </TouchableOpacity>
    </Container>
  )
}
//https://facebook.github.io/react-native/docs/button.html

// https://facebook.github.io/react-native/docs/touchableopacity

