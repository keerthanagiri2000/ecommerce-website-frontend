import React from 'react';
import { useSelector } from 'react-redux';
import { Table, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './DashboardProducts.css';
import { useDeleteProductMutation } from '../services/appApi';
import {Pagination} from './Pagination';

export const DashboardProducts = () => {
    const user = useSelector((state) => state.users);
    const products = useSelector((state) => state.products);

    // delete the product
    const [deleteProduct, {isLoading}] = useDeleteProductMutation();

    const handleDeleteProduct = (id) => {
      if (window.confirm("Are you sure?")) deleteProduct({ product_id: id, user_id: user._id });
    }

    const TableRow = ({ pictures, _id, name, price}) => {
      return(
        <tr className='text-center'>
            <td>
              <img src={pictures[0].url} alt={pictures[0].url} className='dashboard-product-preview' />
            </td>
            <td>{_id}</td>
            <td>{name}</td>
            <td>{price}</td>
            <td>
              <Button onClick={() => handleDeleteProduct(_id, user._id)} disabled={isLoading}>
                 Delete
              </Button>
              <Link to={`/product/${_id}/edit`} className='btn btn-warning' style={{marginLeft: "20px"}}>
                Edit
              </Link>
            </td>
          </tr>
      )
    } 
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr className='text-center'>
            <th>Product Image</th>
            <th>Product Id</th>
            <th>Product name</th>
            <th>Product price(₹)</th>
        </tr>
      </thead>
      <tbody>
        <Pagination data={products} RenderComponent={TableRow} pageLimit={1} dataLimit={5} tablePagination={true} />
      </tbody>
    </Table>
  )
}
