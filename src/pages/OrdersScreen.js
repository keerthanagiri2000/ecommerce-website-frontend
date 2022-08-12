import React, { useEffect, useState } from 'react';
import { Container, Table, Badge } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import axios from '../axios';
import {Loading}  from '../components/Loading';

export const OrdersScreen = () => {
   const user = useSelector((state)=> state.users);
   const [orders, setOrders] = useState([]);
   const [loading, setLoading] = useState(false);
   
   useEffect(() => {
    setLoading(true);
    axios
        .get(`/users/${user._id}/orders`)
        .then(({ data }) => {
            setLoading(false);
            setOrders(data);
        })
        .catch((err) => {
            setLoading(false);
            console.log(err);
        });
}, [user._id]);

  if(loading) {
    return <Loading />;
  }

  if(orders.length === 0){
    return <h1 className='text-center'>No orders yet</h1>
  }
   return (
    <Container>
      <h1 className="text-center">My orders</h1>
      <Table responsive striped bordered hover>
        <thead>
            <tr className='text-center'>
                <th>Id</th>
                <th>Status</th>
                <th>Date</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody className='text-center'>
            {orders.map((order, index) => (
                <tr key={index}>
                    <td>{order._id}</td>
                    <td>
                        <Badge bg={`${order.status === "processing" ? "warning" : "success"}`} text="white">
                            {order.status}
                        </Badge>
                    </td>
                    <td>{order.date}</td>

                    <td>₹{order.total}</td>
                </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
}
