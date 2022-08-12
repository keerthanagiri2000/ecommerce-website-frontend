import React, { useState } from 'react';
import { Alert, Col, Container, Form, Row, Button } from "react-bootstrap";
import { useNavigate } from 'react-router';
import { useCreateProductMutation } from '../services/appApi';
import './NewProduct.css';
import axios from '../axios';

export const NewProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [imgToRemove, setImgToRemove] = useState(null);
  const navigate = useNavigate();
  const [createProduct, { isError, error, isLoading, isSuccess }] = useCreateProductMutation();


  const handleRemoveImg = (imgObj) => {
    setImgToRemove(imgObj.public_id);
    axios
        .delete(`/images/${imgObj.public_id}/`)
        .then((res) => {
            setImgToRemove(null);
            setImages((prev) => prev.filter((img) => img.public_id !== imgObj.public_id));
        })
        .catch((e) => console.log(e));
}

const handleSubmit= (e) =>{
    e.preventDefault();
    if (!name || !description || !price || !category || !images.length) {
        return alert("Please fill out all the fields");
    }
    createProduct({ name, description, price, category, images }).then(({ data }) => {
        if (data.length > 0) {
            setTimeout(() => {
                navigate("/");
            }, 2000);
        }
    });
}

const showWidget = () =>{
    const widget = window.cloudinary.createUploadWidget(
        {
            cloudName: "dnuhl1ypn",
            uploadPreset: "tcsoepn4",
        },
        (error, result) => {
            if (!error && result.event === "success") {
                setImages((prev) => [...prev, { url: result.info.url, public_id: result.info.public_id }]);
            }
        }
    );
    widget.open();
}


  return (
    <Container>
      <Row >
        <Col md={12} className="new-product_form-container d-flex justify-content-center">
         <div className='d-flex justify-content-center' style={{boxShadow: '0 1px 11px rgba(168, 168, 168, 0.27)', padding: '10px 40px', marginTop:'20px', marginBottom:'20px'}}>
         <Form style={{ width: "100%"}} onSubmit={handleSubmit} >
            <h1 className='mt-4 mb-4'>Create product</h1>
            {isError && <Alert variant="success">Product created with success</Alert>}
            {isError && <Alert variant="danger">{error.data}</Alert>}
            <Form.Group className="mb-3">
              <Form.Label >Product name</Form.Label>
              <Form.Control type="text" placeholder="Product name" value={name} required onChange={(e) => setName(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Product description</Form.Label>
              <Form.Control as="textarea" placeholder="Product description" style={{ height: "100px" }} value={description} required onChange={(e) => setDescription(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price(₹)</Form.Label>
              <Form.Control type="number" placeholder="Price (₹)"  value={price} required onChange={(e) => setPrice(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" onChange={(e) => setCategory(e.target.value)}>
              <Form.Label>Category</Form.Label>
              <Form.Select>
                <option disabled selected>--Select One--</option>
                <option value="Cookware sets">Cookware sets</option>
                <option value="Kitchen container">Kitchen container</option>
                <option value="Drinkware">Drinkware</option>
                <option value="Tools & Accessories">Tools & Accessories</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Button type="button" onClick={showWidget}>
                  Upload Images
              </Button>
              <div className="images-preview-container">
                {images.map((image) => (
                  <div className="image-preview">
                    <img src={image.url} alt={image.url}/>
                     {imgToRemove !== image.public_id && <i className="fa fa-times-circle" onClick={() => handleRemoveImg(image)}></i>}
                  </div>
                ))}
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Button type="submit" disabled={isLoading || isSuccess}>
                Create Product
              </Button>
            </Form.Group>
          </Form>
         </div>
          
        </Col>
      </Row>

    </Container>

  )
}


