import React from 'react'
import {Navbar, Button, Nav, Container, NavDropdown} from 'react-bootstrap'
import './Navigation.css';
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/user';


export const Navigation = () => {
  const user = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  }

  
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand className='d-flex'>
            <i className="fas fa-shopping-bag" style={{marginRight:'10px', fontSize:'32px', marginBottom: '0px', color:'#2b5970'}}></i>
            <p style={{fontFamily:" 'Luckiest Guy', cursive", fontSize:'28px', marginBottom: '0px', color:'#2b5970'}}>MERNshop</p>
          </Navbar.Brand>
        </LinkContainer>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        
          <Nav className="ms-auto">
            {/* if no user */ }
            {!user && (
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            )}
            {user && !user.isAdmin && (
              <LinkContainer to='/cart'>
               <Nav.Link>
                 <i className='fas fa-shopping-cart'></i>
                 {user?.cart.count > 0 && (
                                        <span className="badge badge-warning" id="cartcount">
                                            {user.cart.count}
                                        </span>
                                    )}
               </Nav.Link>
              </LinkContainer>
            )
            }
            
            {/* if user */}
            {user && (
              <>
               <NavDropdown title={`${user.name}`} id="basic-nav-dropdown" className="nav-dropdown">
                {user.isAdmin && (
                  <>
                  <LinkContainer to="/dashboard">
                    <NavDropdown.Item >Dashboard</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/new-product">
                    <NavDropdown.Item >Create product</NavDropdown.Item>
                  </LinkContainer>
                 </>
                )}

                {!user.isAdmin && (
                  <>
                  <LinkContainer to="/cart">
                    <NavDropdown.Item >Cart</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/orders">
                    <NavDropdown.Item >My orders</NavDropdown.Item>
                  </LinkContainer>
                  </>
                )}
                
               <NavDropdown.Divider />
                 <Button className="logout-btn" variant="danger" onClick={handleLogout}>Logout</Button>
             </NavDropdown>
             </>
            )}
            
          </Nav>
        </Navbar.Collapse>
      </Container>
     
    </Navbar>
  )
}


