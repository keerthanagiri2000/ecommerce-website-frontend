import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import categories from '../categories';
import SaleImg from '../Asserts/sale-img.jpg';
import axios from '../axios';
import './Home.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateProducts } from '../features/product';
import { ProductCard } from '../components/ProductCard';


export const Home = () => {
 const dispatch = useDispatch();
 const products = useSelector(state => state.products);
 const ourProducts = products.slice(0, 8)

  useEffect(() => {
    axios.get("/products").then(({data}) => dispatch(updateProducts(data)));
  });
  return (
    <div>
        <img src={SaleImg} alt='last-img' className='home-banner'/>
        <div className='featured-products-container container mt-4'>
            <h3 className='text-center'>Our Products</h3>
            {/* our products */}
                <div className="d-flex justify-content-center flex-wrap">
                    {ourProducts.map((product, index) => (
                        <ProductCard {...product} key={index} />
                    ))}
                </div>
                <div>
                    <Link to='/category/all' style={{textAlign: 'right', display: 'block', textDecoration: 'none'}}>See more{'>>'}</Link>
                </div>
        </div>
      
        <div className='recent-products-container container mt-4'>
               <h3 className='text-center'>Categories</h3>
               <Row>
                {categories.map((category, index) => (
                    <LinkContainer key={index} to={`/category/${category.name.toLocaleLowerCase()}`}>
                     <Col md={4}>
                        <div style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${category.image})`, gap: '10px'}} className='category-tile'>
                          {category.name}
                        </div>
                     </Col>
                    </LinkContainer>
                ))}
               </Row>
        </div> 
        <>
        <footer className='home-footer'>@2022 Copyright: MERNshop.com</footer>
        </>
    </div>
  );
}
