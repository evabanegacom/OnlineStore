import React, { useState, useEffect } from 'react';
import useStyles from './styles';
import AddressForm from '../addressForm';
import PaymentForm from '../paymentForm';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';
import { commerce } from '../../../lib/commerce';

const steps = ['shipping addresss', 'payment details']
const Checkout = ({ cart,order, onCaptureCheckout, error }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({})
  const classes = useStyles();

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, { type: 'cart'})
        console.log(token);
        setCheckoutToken(token)
      } catch (error) {

      }
    }
    generateToken();
  }, [cart]);

  const nextstep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1)
  const backstep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)

  const next = (data) => {
    setShippingData(data)
    nextstep()
  }

  const Confirmation = () => (
    <div>
      confirmation
    </div>
  )

  const Form = () => activeStep === 0 
    ? <AddressForm checkoutToken={checkoutToken} next={next} />
    : <PaymentForm 
    shippingData={shippingData} 
    checkoutToken={checkoutToken} 
    backstep={backstep} 
    onCaptureCheckout={onCaptureCheckout}
    nextstep={nextstep}
    />
    return (
        <>
          <div className={classes.toolbar} />
          <main className={classes.layout}>
              <Paper className={classes.paper}>
                <Typography variant='h5' align='center'>Checkout</Typography>
                <Stepper activeStep={activeStep} className={classes.stepper}>
                  { steps.map((step) => (
                    <Step key={step}>
                      <StepLabel>{step}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                { activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form /> }
              </Paper>
          </main>
        </>
    )
}

export default Checkout
