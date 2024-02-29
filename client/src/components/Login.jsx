import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const [errors, setErrors] = useState()

    const changeHandler = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:8000/api/login', user, { withCredentials: true })
            .then((res) => {
                //console.log(res);
                navigate('/home')
            })
            .catch((err) => {
                console.log(err)
                setErrors(err.response.data.message)
            })
    }

    return (
        <div className='flex justify-center bg-slate-100 min-h-screen'>
            <div className='space-y-10'>
                <h1 className="mt-8 text-l font-bold text-blue-500">Login</h1>
                <div className='space-y-8 bg-white p-6 md:p-16 rounded-2xl shadow-xl'>
                    <Link className="text-blue-500 font-bold text-sm" to={'/register'}>Don't have an account? Register Here!</Link>
                    <form className='space-y-8' onSubmit={submitHandler}>
                        <div className='flex items-center space-x-4'>
                            <label className=" text-blue-500 font-bold">Email:</label>
                            <input className='rounded-2xl border border-blue-500 text-sm p-2' type="text" name='email' onChange={changeHandler} />
                        </div>
                        <div className='flex items-center space-x-4'>
                            <label className="font-bold text-blue-500">Password:</label>
                            <input className='rounded-2xl border border-blue-500 p-2 text-sm' type="password" name='password' onChange={changeHandler} />
                        </div>
                        {
                            errors ?
                            <p className='text-red-500'>{errors}</p>:
                            null
                        }
                        <button className=' font-bold w-full bg-blue-500 text-white h-10 rounded-lg hover:shadow-lg hover:bg-blue-700' type='submit'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
