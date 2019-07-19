import React from 'react';
import styled from 'styled-components';

export default function Button({ title, onPress, style, disabled = false, containerStyle = {}, textStyle = {} }) {
  const containerStyleWithOpacity = { ...containerStyle, ...(disabled && { opacity: .5 } ) };

  return (
    <Container
      style={ containerStyleWithOpacity }
    >
      <ActionButton
        onPress={ onPress }
        style={ style }
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
  align-items: center;
  justify-content: center;
  border-radius: 12px;
`;
//https://facebook.github.io/react-native/docs/button.html

// https://facebook.github.io/react-native/docs/touchableopacity

