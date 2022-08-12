import React from "react";
import { Container, Row, Alert, Col, Table} from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  useIncreaseCartProductMutation,
  useDecreaseCartProductMutation,
  useRemoveFromCartMutation
} from "../services/appApi";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import "./CartScreen.css";
import { PayForm } from "../components/PayForm";

const stripePromise = loadStripe('pk_test_51LT14qSGW55rxe8QJrenAL6Q5sd5uslEUDefytaWAS5UsltDuqZnSjjl2zyBMMKqlO6ZiZNQWNPowCDgVGieU4Jw00zCAOFByn');


export const CartScreen = () => {
  const user = useSelector((state) => state.users);
  const products = useSelector((state) => state.products);
  const userCartObj = user.cart;
  let cart = products.filter((product) => userCartObj[product._id] != null);
  const [increaseCart] = useIncreaseCartProductMutation();
  const [decreaseCart] = useDecreaseCartProductMutation();
  const [removeFromCart, {isLoading}] = useRemoveFromCartMutation();
  


  const handleDecrease = (product) => {
    const quantity = user.cart.count;
    if (quantity <= 0) return alert(" Can't proceed ");
    decreaseCart(product);
  };

  return (
    <Container style={{ minHeight: "95vh" }} className="cart-container">
        <Row className='mb-4 justify-content-center' style={{gap:'30px'}}>
        <h1 className="pt-4 pb-4 h3 text-center ">Shopping cart</h1>
          {cart.length > 0 && (
            <Col md={6}>
            <>
              <Table responsive="sm" className="cart-table">
                <thead>
                  <tr>
                    <th>&nbsp;</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {/* loop cart products */}
                  {cart.map((item) => (
                    <tr>
                      <td>&nbsp;</td>
                      <td>
                        <img
                          src={item.pictures[0].url}
                          style={{
                            width: 100,
                            height: 100,
                            objectFit: "cover",
                          }}
                        />
                      </td>
                      <td>₹{item.price}</td>
                      <td>
                        <span className="quantity-level">
                          <i
                            className="fa fa-plus-circle"
                            onClick={() =>
                              increaseCart({
                                productId: item._id,
                                price: item.price,
                                userId: user._id,
                              })
                            }
                          ></i>
                          <span>{user.cart[item._id]}</span>
                          <i
                            className="fa fa-minus-circle"
                            onClick={() =>
                              handleDecrease({
                                productId: item._id,
                                price: item.price,
                                userId: user._id,
                              })
                            }
                          ></i>
                        </span>
                      </td>
                      <td>₹{item.price * user.cart[item._id]}</td>
                      <td>
                        {!isLoading && 
                          <i
                          className="fa fa-times"
                          style={{
                            marginRight: 10,
                            cursor: "pointer",
                            boxShadow:
                              "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
                            padding: "2px 5px",
                          }}

                          onClick={() => 
                            removeFromCart({ 
                              productId: item._id, 
                              price: item.price, 
                              userId: user._id 
                            })
                          }
                        ></i>
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              
               <div>
                <h3 className="h4 pt-4">Total: ₹{user.cart.total}</h3>
               </div>
              </>
            </Col>
          )}

          <Col md={5} className='d-flex justify-content-center '>
          {cart.length === 0 ? (
            <Alert variant="info">
              Shoping cart is empty.Add products to your cart
            </Alert>
          ) : (
           <Elements stripe={stripePromise}>
             {<PayForm />}
           </Elements>
          )}
          </Col>
        </Row>
    </Container>
  );
}
