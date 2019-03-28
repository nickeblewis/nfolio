import React from 'react';
import ReactGA from 'react-ga';
import styled from 'styled-components';
import { first } from 'underscore';

import config from '../config/index';
import Seo from '../components/Seo';
import ProductsList from '../components/ProductsList';
import CategoriesList from '../components/CategoriesList';

import HomeAbout from '../components/HomeAbout';
import ScrollButton from '../components/ScrollButton';

const Container = styled.div`
  &&& {
    margin-top: 3rem;
  }
`;

export default class IndexPage extends React.Component {
  componentDidMount() {
    ReactGA.pageview('/');
  }

  render() {
    const {
      data: {
        allContentfulProduct: products,
        contentfulHome: home,
        allContentfulCategories: categories,
        contentfulPrices: prices,
      },
    } = this.props;

    return (
      <React.Fragment>
        <Seo
          title="Nfolio"
          description="Nfolio The Photography Site"
          url={config.siteUrl}
        />
        <Container className="columns">
          <div className="column is-one-fifth section">
            <CategoriesList categories={categories.edges} />
          </div>
          <div className="column section">
            <ProductsList products={products.edges} prices={prices} />
          </div>
        </Container>

        <HomeAbout data={home} />
      </React.Fragment>
    );
  }
}

// filter: { status: { eq: "active" } }
export const indexQuery = graphql`
  query Products {
    allContentfulCategories {
      edges {
        node {
          title
        }
      }
    }
    allContentfulProduct(
      filter: { slug: { ne: null } }
      sort: { fields: [listingOrder], order: ASC }
    ) {
      edges {
        node {
          id
          title
          slug
          colour
          originalPrice
          discountPrice
          image {
            title
            sizes(maxWidth: 550) {
              ...GatsbyContentfulSizes
            }
          }
        }
      }
    }
    contentfulPrices {
      a4Price
      a3Price
      a2Price
    }
    contentfulHome {
      homeSliderTitle
      homeSliderSubTitle
      homeSliderImage {
        title
        sizes(maxWidth: 550) {
          ...GatsbyContentfulSizes
        }
      }
      homeIntro {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`;
