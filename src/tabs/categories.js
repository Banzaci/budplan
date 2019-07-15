import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Input from '../components/Input';
import { saveCategoryData, getCategoryData } from '../redux/actions/categories';

class Category extends Component {

  state = {
    monthlyBudget: 0
  }

  async componentDidMount(){
    const props = await this.props.dispatch(getCategoryData());
    console.log(props)
    // this.setState({
    //   monthlyBudget
    // });
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

  render() {
    return (
      <Container>
        <Input
          id="category"
          value=""
          onChange={ this.onChange }
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
      return dispatch(saveCategoryData(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)