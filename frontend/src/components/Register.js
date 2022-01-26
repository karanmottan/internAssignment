import React from 'react';
import '../styles/login.css';
import { useNavigate } from "react-router-dom";
import { RegisterCall } from '../apiCalls/Apicalls';
import validator from 'validator';

export function Register(){
    const navigate = useNavigate();

    const handleRegister = async(e) =>{
        e.preventDefault();
        const email = e.target[0].value;
        if(validator.isEmail(email)){
            const password = e.target[1].value;
            const result = await RegisterCall(email,password);
            if(result.status === 'ok'){
                navigate('/');
            }else{
                alert('Failed to Register');
            }
        }else{
            alert('Enter a Valid Email');
        }
        
    }

    return(
        <div className='mainContainer'>
            <div className='loginContainer'>
                <div className='text'>Create Account</div>
                <form className='form' onSubmit={handleRegister}>
                    <input className='email' placeholder='Enter your email' type="email" required></input>
                    <input className='password' placeholder='Enter your password' type="password" required></input>
                    <button className='button'>Register</button>
                </form>
                <button className='reg' onClick={()=>navigate('/')}>Login</button>
            </div>
            
        </div>
    );
}