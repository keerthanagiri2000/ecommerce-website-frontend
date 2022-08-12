import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { useSignupMutation } from '../services/appApi';

export const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [signup, { error, isLoading, isError }] = useSignupMutation();

    function handleSignup(e) {
        e.preventDefault();
        signup({ name, email, password });
    }
  return (

    <div className="container d-flex flex-column justify-content-center align-items-center login-center">
                   
                   <form  className="Login col-md-8 col-lg-4 col-11" onSubmit={handleSignup}>
                     <h1>Create Account</h1>
                     {isError && <Alert variant="danger">{error.data}</Alert>}
                     <input type='text' placeholder='Username' value={name} required onChange={(e) => setName(e.target.value)}/>
                     <input type="email" placeholder="Enter email" value={email} required onChange={(e) => setEmail(e.target.value)}/>
                     <input type="password" placeholder="Enter Password" value={password} required onChange={(e) => setPassword(e.target.value)}/>
                     <button type="submit" disabled={isLoading}>Sign up</button>
                     <p className="pt-3 text-center">
                        You have an account? <Link to='/login'>Login</Link>
                     </p>
                   </form>
        </div>
      );
}




                  