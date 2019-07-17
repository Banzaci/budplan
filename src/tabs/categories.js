import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Label from '../components/Label';
import Button from '../components/Button';
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

  renderList = ([_, value]) => {
    return (<Label
        text={ value }
      />
    );
  }

  render() {
    const fixed = Object.entries(this.props.fixed).map(this.renderList);
    const variables = Object.entries(this.props.fixed).map(this.renderList);
    return (
      <Container>
        { this.props.fixed && fixed }
        { this.props.variables && variables }
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