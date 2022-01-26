import React from 'react';
import '../styles/login.css'
import { useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux';
import { setInfo } from '../redux/userSlice';
import { LoginCall } from '../apiCalls/Apicalls';
import validator from 'validator';

export function Login(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogin = async(e) =>{
        e.preventDefault();
        const email = e.target[0].value;
        if(validator.isEmail(email)){
            const password = e.target[1].value;
            const result = await LoginCall(email,password);
            const {token} = result;
            const {id} = result;
            dispatch((setInfo({id,token})));
            if(token){
                navigate('/home');
            }else{
                alert('Invalid Email/Password');
            }
        }else alert('Invalid Email');
    }

    return(
        <div className='mainContainer'>
            <div className='loginContainer'>
                <div className='text'>Login</div>
                <form className='form' onSubmit={handleLogin}>
                    <input className='email' placeholder='Enter your email' type="email" required></input>
                    <input className='password' placeholder='Enter your password' type="password" required></input>
                    <button className='button'>Login</button>
                </form>
                <button className='reg' onClick={()=>navigate('/register')}>Create Account</button>
            </div>
            
        </div>
    );
}



