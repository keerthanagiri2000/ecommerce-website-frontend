import React from 'react';
import { Nav,Container,Row,Col,Tab, } from 'react-bootstrap';
import { ClientAdmin } from '../components/ClientAdmin';
import { DashboardProducts } from '../components/DashboardProducts';
import { OrderAdmin } from '../components/OrderAdmin';


export const Dashboard = () => {
  return (
    <Container>
        <Tab.Container defaultActiveKey='products'>
            
                <Row style={{marginTop:'30px'}}>
                <Col md={12}>
                    <Nav variant='pills' className='flex-row'>
                        <Nav.Item>
                            <Nav.Link eventKey='products'>Products</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey='orders'>Orders</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey='clients'>Clients</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                </Row>
                <Row style={{marginTop:'30px'}}>
                <Col md={12}>
                    <Tab.Content>
                        <Tab.Pane eventKey='products'>
                           <DashboardProducts />
                        </Tab.Pane>
                        <Tab.Pane eventKey='orders'>
                           <OrderAdmin />
                        </Tab.Pane>
                        <Tab.Pane eventKey='clients'>
                           <ClientAdmin />
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
                </Row>
                
           
        </Tab.Container>
    </Container>
  );
}
