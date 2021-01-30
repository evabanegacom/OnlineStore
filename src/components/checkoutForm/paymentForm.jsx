import React from 'react';
import { Typography, Divider, Button } from '@material-ui/core';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { LoadStrip } from '@stripe/stripe-js';
import Review from './review';

const PaymentForm = ({ checkoutToken }) => {
    return (
        <>
          <Review checkoutToken={checkoutToken} />
        </>
    )
};

export default PaymentForm
