/* global $ */

import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import gql from 'graphql-tag';

import apolloClient from '../utils/apolloClient';

const couponMutation = gql`
  mutation validateCoupon($code: String!) {
    validateCoupon(code: $code) {
      code
      details
      discountPercentage
    }
  }
`;

class CouponForm extends React.Component {
  render() {
    const {
      values,
      isSubmitting,
      handleSubmit,
      handleChange,
      handleBlur,
    } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <div className="field has-addons">
          <div className="control" style={{ width: '225px' }}>
            <input
              className="input is-shadowless"
              placeholder="Gift card or discount code"
              name="couponCode"
              value={values.couponCode}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          <div className="control">
            <button
              type="submit"
              className="button coupon-form-btn is-dark"
              disabled={isSubmitting}
            >
              Apply
            </button>
          </div>
        </div>
      </form>
    );
  }
}

CouponForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default withFormik({
  mapPropsToValues: () => ({
    couponCode: '',
  }),
  handleSubmit: (values, { setSubmitting, props }) => {
    // console.log('handle submit', values, props);
    const alertify = require('alertify.js'); // eslint-disable-line
    $('.coupon-form-btn').addClass('is-loading');
    apolloClient
      .mutate({
        mutation: couponMutation,
        variables: { code: values.couponCode },
      })
      .then(result => {
        // console.log('result', result);
        alertify.log(`Applied: ${result.data.validateCoupon.details}`);
        setSubmitting(false);
        setTimeout(() => props.handleSubmit(result.data.validateCoupon), 200);
        $('.coupon-form-btn').removeClass('is-loading');
      })
      .catch(() => {
        setSubmitting(false);
        alertify.error('Invalid coupon code.');
        $('.coupon-form-btn').removeClass('is-loading');
      });
  },
  displayName: 'CouponForm', // helps with React DevTools
})(CouponForm);
