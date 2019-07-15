import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Input from '../components/Input';
import Button from '../components/Button';
import Label from '../components/Label';
import { saveCategoryData } from '../redux/actions/categories';

class Category extends Component {

  state = {
    fixed: {},
    variables: {},
  }

  onPress = (e) => {
    const { amount, id } = this.state;
    this.props.save({ amount, id })
      .then((props) => {
        // this.setState({
        //   ...props
        // });
      });
  }

  onChange = (amount) => {
    this.setState({
      ...amount
    });
  }

  onDeleteCategory = () => {}
  onAddategory = () => {}

  renderCategories = ({ categories }) => {
    return(
      <Label
        label="Name"
      ></Label>
    )
  }

  render() {
    return (
      <Container>
        <Input
          border
          id="category"
          value=""
          placeholder="Lägg till ny utgift"
          onChange={ this.onChange }
        />
        <Button
          text="Lägg till"
          onPress={ this.onPress }
        />
        { this.renderCategories(this.props.variables) }
        { this.renderCategories(this.props.fixed) }
      </Container>
    );
  }
}

const Container = styled.SafeAreaView`
  display: flex;
  width: 100%;
  padding: 20px 0;
  flex-direction: row;
`;

const mapStateToProps = ({ reducers }) => {
  const { categories } = reducers;
  console.log(categories)
  return {
    fixed: categories.categories.fixed,
    variables: categories.categories.variables,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    save: data => {
      return dispatch(saveCategoryData(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)