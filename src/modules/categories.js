import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '../components/Input';
import Category from '../components/Category';
import { boxShadow } from '../style/common';

export default function Categories({ list, onDelete, onClick }) {

  const [error, setError] = useState();

  const CategoryGenerator = (category, index) => (
    <Category
      key={ index }
      category={ category }
      onPress={ onDelete }
    />
  )

  const addNewCategory = category => {
    if (list.includes(category)) return;// error
    onClick(category);
  }
  
  return (
    <Container
      style={ boxShadow }
    >
    <Input
      onChange={ addNewCategory }
    />
      { list.map(CategoryGenerator) }
    </Container>
  );
}

const Container = styled.View`
  display: flex;
  padding: 10px;
  flex-direction: column;
  background-color: white;
  width: 100%;
`;