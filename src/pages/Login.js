import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../services/appApi";
import './Login.css';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, { error, isLoading, isError }] = useLoginMutation();
    
    function handleLogin(e) {
        e.preventDefault();
        login({email, password});
    }
    return (
        <div className="container d-flex flex-column justify-content-center align-items-center login-center">
                   
                   <form  className="Login col-md-8 col-lg-4 col-11" onSubmit={handleLogin}>
                     <h1>Login</h1>
                     {isError && <Alert variant="danger">{error.data}</Alert>}
                     <input type="email" placeholder="Enter email" value={email} required onChange={(e) => setEmail(e.target.value)}/>
                     <input type="password" placeholder="Enter Password" value={password} required onChange={(e) => setPassword(e.target.value)}/>
                     <button type="submit" disabled={isLoading}>Login</button>
                     <p className="pt-3 text-center">
                            Don't have an account? <Link to="/signup">Create account</Link>{" "}
                     </p>
                   </form>
        </div>

    );
}

        

              

    

