import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Col, Container, Row } from 'react-bootstrap';
import { Loading } from '../components/Loading';
import axios from '../axios';
import { ProductCard } from '../components/ProductCard';
import './CategoryScreen.css';
import { Pagination } from '../components/Pagination';

export const CategoryScreen = () => {
    const {category} = useParams();
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
  

    useEffect(() => {
        setLoading(true);
        axios.get(`/products/category/${category}`)
        .then(({data}) => {
            setLoading(false);
            setProducts(data);
        })
        .catch((err) => {
            setLoading(false);
            console.log(err.message);
        });
    }, [category]);

    if(loading) {
        <Loading />
    }
    
    const productsSearch = products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const ProductSearch = ({ _id, category, name, pictures, price }) => {
      return <ProductCard _id={_id} category={category} name={name} pictures={pictures} price={price} />;
  }

    return (
   <div className="category-page-container">
       <h1 className='text-center mt-4'>{category.charAt(0).toUpperCase() + category.slice(1)}</h1>
      <div className=" filters-container d-flex justify-content-center pt-4 pb-4 ">
        <input type="search" placeholder="Search" onChange={(e) => setSearchTerm(e.target.value)} style={{width:'74%', padding:'10px',boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px'}} />
      </div>
    {productsSearch.length === 0 ? (
      <p className='text-center' style={{marginTop:'30px'}}>No products</p>
    ) : (
    <Container>
        <Row>
            <Col md={{ span: 12 }}>
              <Pagination data={productsSearch} RenderComponent={ProductSearch} pageLimit={1} dataLimit={4} tablePagination={false} />
            </Col>
        </Row>
    </Container>
    )}
</div>
  );
}
