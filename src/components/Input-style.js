import styled from 'styled-components';

export const Text = styled.View`
  width: 100%;
`;

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  background-color: white;
  width: 100%;
  border-radius: 12px;
  margin: 0;
`;

export const Label = styled.Text`
  font-size: 18px;
  padding: 6px 12px;
`;

export const TextInput = styled.TextInput`
  padding: 6px 12px;
  font-size: 22px;
  width: 100%;
`;