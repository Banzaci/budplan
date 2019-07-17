import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, Text, ActionButton } from './button-style';

export default function Button({ title, onPress, style, container={}, text={} }) {
  return (
    <Container
      style={ container }
    >
      <ActionButton
         onPress={ onPress }
         style={ style }
       >
         <Text
          style={ text }
         >
           { title }
         </Text>
       </ActionButton>
    </Container>
  )
}
//https://facebook.github.io/react-native/docs/button.html

// https://facebook.github.io/react-native/docs/touchableopacity

