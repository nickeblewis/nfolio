import React from 'react';
import ReactGA from 'react-ga';
import { first } from 'underscore';

import config from '../config/index';
import Seo from '../components/Seo';
import ProductsList from '../components/ProductsList';
import HomeAbout from '../components/HomeAbout';
import ScrollButton from '../components/ScrollButton';

export default class IndexPage extends React.Component {
  componentDidMount () {
    ReactGA.pageview ('/');
  }

  render () {
    const {
      data: {allContentfulProduct: products, contentfulHome: home},
    } = this.props;

    return (
      <React.Fragment>
        <Seo
          title="Nfolio"
          description="Nfolio The Photography Site"
          url={config.siteUrl}
        />
        <ProductsList products={products.edges} />
        <HomeAbout data={home} />
      </React.Fragment>
    );
  }
}

// filter: { status: { eq: "active" } }
export const indexQuery = graphql`
  query Products {
    allContentfulProduct(
      filter: { slug: { ne: null }}
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
