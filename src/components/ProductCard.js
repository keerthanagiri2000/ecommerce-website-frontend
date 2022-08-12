import React from 'react'
import { Badge, Card } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

export const ProductCard = ({_id, name, category, pictures, price}) => {
  return (
    <LinkContainer to={`/product/${_id}`} style={{cursor: 'pointer', width: '13rem', margin: '10px', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px' }}>
      <Card style={{width: '20rem', margin: '10px'}}>
        <Card.Img variant='top' className='product-preview-img' src={pictures[0].url} style={{height: "170px", objectFit:"cover"}} />
        <Card.Body>
            <Card.Text>{name}</Card.Text>
            <Card.Title style={{fontSize: '16px'}}>₹{price}</Card.Title>
            <Badge bg="warning" text="dark">{category}</Badge>
        </Card.Body>
      </Card>
    </LinkContainer>
  );
}
