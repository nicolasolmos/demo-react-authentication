import React, { useState } from 'react';
import './Login.css';

const Login = () => {
    const [userName, setUserName ] = useState('');
    const [password, setPassword ] = useState('');
    const handleSubmit = () => {

        
    };

  return (
    <section className='login'>
        <div className='login-form-container'>
            <form>
                <label>
                    <span>User Name</span>
                    <input className="login-input" type="text" onChange={(event) => setUserName(event.target.value)} value={userName}/>
                </label>
                <label>
                    <span>Password</span>
                    <input className="login-input" type="password" onChange={(event) => setPassword(event.target.value) } value={password}/>
                </label>
                <button className="login-form-submit-button"type='button' onClick={handleSubmit}>Sign In</button>
            </form>
        </div>
    </section>
  );

}

export default Login;
