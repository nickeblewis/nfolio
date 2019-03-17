import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'gatsby-link';

import config from '../config';
import SocialIcons from './SocialIcons';
import SubscribeForm from './SubscribeForm';
import ScrollButton from './ScrollButton';

const Container = styled.footer`
  padding-bottom: 80px;
  background-color: #2f2f2f;
  position: relative;
  margin-top: 6rem;
`;

const Heading = styled.p`
  margin-bottom: 1rem;
`;

const Bottom = styled.div`
  background-color: #000000;
  width: 100%;
  position: absolute;
  bottom: 0;
  > .section {
    padding: 1.4rem 1.5rem;
  }
`;

const NavItems = [
  { id: 2, name: 'Contact Us', url: '/contact' },
  { id: 7, name: 'Gift Vouchers', url: '/coupons' },
  { id: 1, name: 'About us', url: '/page/about' },
];

const Footer = ({ home }) => (
  <Container>
    <div className="section container is-hidden-mobile">
      <div className="columns is-multiline">
        <div className="column has-text-white">
          <Heading className="is-uppercase is-size-5">Customer service</Heading>
          <ul>
            {NavItems.map(item => (
              <li key={item.id}>
                <Link to={item.url} className="has-text-white">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="column has-text-white">
          <Heading className="is-uppercase is-size-5">Subscribe</Heading>
          <p>Receive updates by signing up to our mailing list</p>
          <SubscribeForm />
        </div>
        <div className="column has-text-white">
          <Heading className="is-uppercase is-size-5">Connect</Heading>
          <SocialIcons data={home} inverted />
        </div>
      </div>
    </div>
    <Bottom>
      <div className="section container">
        <div className="columns has-text-white">
          <div className="column">
            <p>Copyright © 2019 - {config.siteName}</p>
          </div>
          <div className="column has-text-right is-hidden-mobile">
            <img
              src="/images/payment-strip.png"
              style={{ height: '26px' }}
              alt="payments cards"
            />
          </div>
        </div>
      </div>
    </Bottom>
    <ScrollButton scrollStepInPx="50" delayInMs="16.66" />
  </Container>
);

Footer.defaultProps = {
  home: {},
};

Footer.propTypes = {
  home: PropTypes.object,
};

export default Footer;
