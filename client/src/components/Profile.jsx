import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { resetCart } from '../features/cart/cartSlice';

const Profile = () => {

    const backendUrl = process.env.REACT_APP_BACKEND_URL

    const navigate = useNavigate();

    const dispatch = useDispatch()

    const [user, setUser] = useState({})

    useEffect(() => {
        axios
            .get(`${backendUrl}/api/findUserInfo`)
            .then((res) => {
                setUser(res.data)
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])

    const logoutUser = () => {
        axios
            .post(`${backendUrl}/api/logout`, {}, {withCredentials:true})
            .then((res) => {
                dispatch(resetCart());
                navigate('/')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className='flex justify-center bg-slate-100 min-h-screen'>
            <div className='space-y-10'>
                <h2 className='mt-8 font-bold text-blue-500'>Profile</h2>
                <div className='bg-white rounded-2xl p-6 md:p-16 shadow-xl space-y-8'>
                    <div className='flex justify-center space-x-10'>
                        {
                            user.firstName ? <button class='bg-blue-500 text-white p-4 rounded-lg hover:shadow-lg hover:bg-blue-700 font-bold' onClick={logoutUser}>Logout</button> : <Link to={'/'}><button class='bg-blue-500 text-white p-4 rounded-lg hover:shadow-lg hover:bg-blue-700 font-bold'>Login</button></Link>
                        }
                        {
                            user.owner ?
                            <Link to={'/addProduct'}><button className='bg-blue-500 text-white p-4 rounded-lg hover:shadow-lg hover:bg-blue-700 font-bold'>Add Product</button></Link>:
                            null
                        }
                    </div>
                    <div className='space-y-4'>
                        <p className='font-bold text-blue-500'>{user.firstName} {user.lastName}</p>
                        <p className='font-bold text-blue-500'>{user.email}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
