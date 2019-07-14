import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Input from '../components/Input';
import Categories from '../modules/Categories';
import { saveTargetData, getTargetData } from '../redux/actions/target';

class Category extends Component {

  state = {
    monthlyBudget: 0
  }

  async componentDidMount(){
    const { monthlyBudget } = await this.props.dispatch(getTargetData());
    this.setState({
      monthlyBudget
    });
  }

  onChange = ({ amount, id }) => {
    this.props.save({ amount, id })
      .then(({ monthlyBudget }) => {
        this.setState({
          monthlyBudget
        });
      });
  }

  onDeleteCategory = () => {}
  onAddategory = () => {}

  render() {
    return (
      <Container>
        <Input
          id="monthlyBudget"
          label="Monthly budget"
          value={ this.state.monthlyBudget }
          keyboardType='numeric'
          onChange={ this.onChange }
        />
        <Categories
          list={ this.props.categories }
          onDelete={ this.onDeleteCategory }
          onClick={ this.onAddCategory }
        />
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
  const { category } = reducers;
  return {
    categories: [],
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    save: data => {
      return dispatch(saveTargetData(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)