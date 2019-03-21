import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Trail } from 'react-spring';

import ProductItem from './ProductItem';
import Heading from './Heading';

const Container = styled.section`
  position: relative;
`;

const CategoryItem = styled.h3`
  border-left: solid 2px red;
  padding-left: 8px;
  margin-bottom: 8px;
  width: 100%;
`;

class CategoriesList extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isOpen: true });
    }, 200);
  }

  render() {
    const { title, categories } = this.props;
    const { isOpen } = this.state;
    const keys = categories.map(item => item.node.id);
    // console.log('products', products);

    return (
      <Container className="section">
        <Heading>{title}</Heading>
        <div className="columns is-multiline">
          <Trail
            native
            from={{ opacity: 0 }}
            to={{ opacity: isOpen ? 1 : 0.25 }}
            keys={keys}
          >
            {categories.map(({ node }) => styles => (
              <CategoryItem>{node.title}</CategoryItem>
            ))}
          </Trail>
        </div>
      </Container>
    );
  }
}

CategoriesList.defaultProps = {
  title: 'Categories',
  categories: [],
};

CategoriesList.propTypes = {
  title: PropTypes.string,
  categories: PropTypes.array,
};

export default CategoriesList;
