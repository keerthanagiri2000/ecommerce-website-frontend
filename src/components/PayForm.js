import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Row, Col, Alert, Form, Button} from 'react-bootstrap';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useCreateOrderMutation } from '../services/appApi';
import { useNavigate } from 'react-router';

export const PayForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const user = useSelector((state) => state.users);
    const navigate = useNavigate();
    const [alertMsg, setAlertMsg] = useState('');
    const [createOrder, {isLoading, isError, isSuccess }] = useCreateOrderMutation();
    const [address, setAddress] = useState('');
    const [country, setCountry] = useState('');
    const [paying, setPaying] = useState(false);

    async function handlePay(e){
       e.preventDefault();
       if( !stripe || !elements || user.cart.count <= 0) return;
       setPaying(true);
       const {client_secret} = await fetch('http://localhost:5000/create-payment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
             Authorization: "Bearer ",
        },
        body: JSON.stringify ({ amount: user.cart.total }),
    }).then((res) => res.json());

    const {paymentIntent} = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
            card: elements.getElement(CardElement),
        },
    });
    setPaying(false);

    if (paymentIntent) {
        createOrder({ userId: user._id, cart: user.cart, address, country }).then((res) => {
          if(!isLoading && !isError){
            setAlertMsg(`Payment ${paymentIntent.status}`);
            setTimeout(() => {
             navigate('/orders');
            }, 3000);
          }
        });
      }
    }

  return (
     <Col ms={7} className='cart-payment-container' style={{boxShadow: 'rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px', padding:'20px'}}>
        <Form onSubmit={handlePay}>
        <Row>{alertMsg && <Alert>{alertMsg}</Alert>}
         <Row>
           <Col md={12}>
            <Form.Group classsName='mb-3'>
               <Form.Label>First Name</Form.Label>
               <Form.Control type='text' placeholder='First Name' value={user.name} disabled />
            </Form.Group>
           </Col>
         </Row>
         <Row className='mt-4'>
           <Col md={12}>
            <Form.Group classsName='mb-3'>
               <Form.Label>Email</Form.Label>
               <Form.Control type='text' placeholder='Email' value={user.email} disabled />
            </Form.Group>
           </Col>
         </Row>
         <Row className='mt-4'>
           <Col md={12}>
               <Form.Group classsName='mb-3'>
                 <Form.Label>Address</Form.Label>
                 <Form.Control type='text' placeholder='Address' value={address} onChange={(e) => setAddress(e.target.value)} required />
               </Form.Group>
            </Col>
         </Row>
         <Row className='mt-4'>
             <Col md={12}>
               <Form.Group classsName='mb-3'>
                 <Form.Label>Country</Form.Label>
                 <Form.Control type='text' placeholder='Country' value={country} onChange={(e) => setCountry(e.target.value)} required />
                </Form.Group>
             </Col>
         </Row>
         <Row className='mt-4'>
         <label htmlFor='card-element'>Card</label>
          <CardElement id='card-element' />
         </Row>
         <Row className='justify-content-center'>
          <Button className='mt-4 mb-4' type='submit' disabled={user.cart.count === 0 || paying || isSuccess}>
             { paying ? 'Processing...' : `pay (₹ ${user.cart.total})`}
          </Button>
         </Row>
        </Row>
      </Form>
     </Col>
  );
}
