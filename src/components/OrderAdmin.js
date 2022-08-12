import React, { useEffect, useState } from 'react';
import { Badge, Table, Button, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Loading } from './Loading';
import axios from '../axios';
import {Pagination} from './Pagination';

export const OrderAdmin = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const products = useSelector((state) => state.products);
    const [orderToShow, setOrderToShow] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const markShipped = (orderId, ownerId) => {
      axios
        .patch(`/orders/${orderId}/mark-shipped`, {ownerId})
        .then(({data}) => setOrders(data))
        .catch((err) => console.log(err));
    }

    const showOrder =(productsObj) => {
      let productsToShow = products.filter((product) => productsObj[product._id]);
      productsToShow = productsToShow.map((product) => {
        const productCopy = {...product};
        productCopy.count = productsObj[product._id];
        delete productCopy.description;
        return productCopy;
      });
      setShow(true);
      setOrderToShow(productsToShow);
    }

    useEffect(() => {
        setLoading(true);
        axios
         .get('/orders')
         .then(({data}) => {
            setLoading(false);
            setOrders(data);        
        })
        .catch((err) => {
           setLoading(false);
        });
    }, []);

    if (loading) {
        return <Loading />;
    }

    if(orders.length === 0) {
        return <p className='text-center mt-3'>No orders yet</p>
    }

    const TableRow = ({ _id, count, owner, total, status, products, address}) => {
      return (
        <tr>
                    <td>{_id}</td>
                    <td>{owner?.name}</td>
                    <td>{count}</td>
                    <td>₹{total}</td>
                    <td>{address}</td>

                    <td>
                        {status === 'processing' ? (
                        <Button size='sm' onClick={() => markShipped(_id, owner?._id)}>Mark as shipped</Button>
                        ) : (
                        <Badge bg='success'>Shipped</Badge>
                       )}
                    </td>
                    <td>
                        <span style={{ cursor: 'pointer' }} onClick={() => showOrder(products)}>
                           view order <i className='fa fa-eye'></i>
                        </span>
                    </td>
                </tr>
      );
    }

  return (
    <>
      <Table responsive striped bordered hover>
        <thead>
            <tr className='text-center'>
                <th>Id</th>
                <th>Customer Name</th>
                <th>Items</th>
                <th>Order Total</th>
                <th>Address</th>
                <th>Order status</th>
            </tr>
        </thead>
        <tbody className='text-center'>
         <Pagination data={orders} RenderComponent={TableRow} pageLimit={1} dataLimit={10} tablePagination={true} />
        </tbody>
      </Table>
  
       <Modal show={show} onHide={handleClose}>
         <Modal.Header closeButton>
            <Modal.Title>Order details</Modal.Title>
         </Modal.Header>
         {orderToShow.map((order) => (
            <div className='order-details_container' style={{display:'flex', gap: '60px'}} >
                <img src={order.pictures[0].url} alt={order.pictures[0].url} style={{maxWidth: 100, height: 100, objectFit: 'cover'}} />
                <p><span>{order.count} x </span> {order.name}</p>
                <p>Price: ₹{Number(order.price) * order.count} </p>
            </div>
         ))}
         <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
                Close
            </Button>
         </Modal.Footer>
       </Modal>
    </>
  );
}

