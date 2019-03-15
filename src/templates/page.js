import React from 'react';
import graphql from 'graphql';
import ReactGA from 'react-ga';

import config from '../config/index';
import Seo from '../components/Seo';
import Heading from '../components/Heading';
import { HTMLContent } from '../utils/helpers';

export default class Page extends React.Component {
  componentDidMount() {
    const { contentfulPages: page } = this.props.data;

    ReactGA.pageview(`/page/${page.slug}`);
  }

  render() {
    const { contentfulPages: page } = this.props.data;

    return (
      <div className="section">
        <Seo
          title={page.title}
          description=""
          url={`${config.siteUrl}/page/${page.slug}`}
        />
        <Heading>{page.title}</Heading>
        <HTMLContent content={page.content.childMarkdownRemark.html} />
      </div>
    );
  }
}

export const pageQuery = graphql`
  query PageByPath($slug: String!) {
    contentfulPages(slug: { eq: $slug }) {
      id
      title
      slug
      content {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`;
