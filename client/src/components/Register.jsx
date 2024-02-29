import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        owner: false
    })

    const [errors, setErrors] = useState({})

    const [emailError, setEmailError] = useState({})

    const changeHandler = (e) => {
        if (e.target.type === 'checkbox') {
            setUser({ ...user, owner: !user.owner })
        }
        else {
            setUser({ ...user, [e.target.name]: e.target.value })
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:8000/api/register', user, { withCredentials: true })
            .then((res) => {
                console.log(res)
                navigate('/home')
            })
            .catch((err) => {
                console.log(err)
                if(err.response.data.error){
                    setErrors(err.response.data.error.errors)
                }
                else{
                    setEmailError(err.response.data)
                }
            })
    }

    return (
        <div className='bg-slate-100 min-h-screen flex justify-center'>
            <div className='space-y-10'>
                <h1 className='mt-8 text-blue-500 font-bold'>Register</h1>
                <div className='rounded-2xl bg-white p-6 md:p-16 space-y-8 shadow-xl'>
                    <Link className='font-bold text-blue-500 text-sm' to={'/'}>Already have an account? Login Here!</Link>
                    <form className='space-y-8' onSubmit={submitHandler}>
                        <div className='flex items-center justify-center space-x-6'>
                            <label className='text-blue-500 font-bold'>First Name:</label>
                            <input className='rounded-2xl border border-blue-500 text-sm p-2' type="text" name='firstName' onChange={changeHandler} />
                        </div>
                        {
                            errors.firstName ?
                            <p className='text-red-500'>{errors.firstName.message}</p>:
                            null
                        }
                        <div className='flex items-center justify-center space-x-6'>
                            <label className='text-blue-500 font-bold'>Last Name:</label>
                            <input className='border border-blue-500 rounded-2xl text-sm p-2' type="text" name='lastName' onChange={changeHandler} />
                        </div>
                        {
                            errors.lastName ?
                            <p className='text-red-500'>{errors.lastName.message}</p>:
                            null
                        }
                        <div className='flex items-center justify-center space-x-6'>
                            <label className='text-blue-500 font-bold'>Email:</label>
                            <input className='border border-blue-500 text-sm p-2 rounded-2xl' type="text" name='email' onChange={changeHandler} />
                        </div>
                        {
                            errors.email ?
                            <p className='text-red-500'>{errors.email.message}</p>:
                            null
                        }
                        {
                        emailError.message ?
                            <p className='text-danger'>{emailError.message}</p> :
                            null
                        }
                        <div className='flex items-center justify-center space-x-6'>
                            <label className='text-blue-500 font-bold'>Password:</label>
                            <input className='border border-blue-500 text-sm p-2 rounded-2xl' type="password" name='password' onChange={changeHandler} />
                        </div>
                        {
                            errors.password ?
                            <p className='text-red-500'>{errors.password.message}</p>:
                            null
                        }
                        <div className='flex items-center justify-center space-x-6'>
                            <label className='text-blue-500 font-bold'>Confirm Password:</label>
                            <input className='border border-blue-500 text-sm p-2 rounded-2xl' type="password" name='confirmPassword' onChange={changeHandler} />
                        </div>
                        {
                            errors.confirmPassword ?
                            <p className='text-red-500'>{errors.confirmPassword.message}</p>:
                            null
                        }
                        <div className='flex items-center justify-center space-x-6'>
                            <label className='text-blue-500 font-bold'>Are you the owner? (Allows you to add products from profile page)</label>
                            <input type="checkbox" name="owner" value={user.owner} onChange={changeHandler} />
                        </div>
                        <button className='bg-blue-500 text-white h-10 w-full rounded-lg font-bold hover:shadow-lg hover:bg-blue-700' type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
