import React from 'react';
import {Spinner} from 'react-bootstrap';

export const Loading = () => {
  return (
    <div className='loading-container' style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
       <Spinner animation="border" variant="secondary" />
    </div>
  );
}
