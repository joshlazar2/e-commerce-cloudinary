import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../features/cart/cartSlice';

const OneProduct = () => {
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const { id } = useParams();
    const dispatch = useDispatch()

    const [user, setUser] = useState({})

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/findUserInfo', {withCredentials:true})
            .then((res) => {
                setUser(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/oneProduct/${id}`)
            .then((res) => {
                //console.log(res);
                setProduct(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]); // Include id in the dependency array to refetch data when id changes.

    const addToCartHandler = (e) => {
        e.preventDefault()
        dispatch(addToCart(product))
    }

    const cart = useSelector(state => state.items);

    const deleteHandler = () => {
        axios
            .delete(`http://localhost:8000/api/deleteProduct/${id}`, { withCredentials: true })
            .then((res) => {
                console.log(res)
                navigate('/home')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-100">
            <div className="flex flex-col p-6 m-3 space-y-10 bg-white rounded-2xl shadow-2xl md:flex-row md:space-y-0 md:space-x-10 md:m-0 md:p-16">
                <div>
                    <img className="mx-auto duration-200 w-60 hover:scale-105" src={product.image} alt={``} />
                </div>
                <div className="flex flex-col space-y-6">
                    <div className="flex flex-col mb-4 space-y-3 text-center md:text-left">
                        <p className="inline-block px-3 py-1 text-sm text-white bg-black rounded-full">Free Shipping</p>
                        <p className="max-w-sm text-2xl font-medium">{product.title}</p>
                        <p className="max-w-sm text-l font-medium">Description: {product.description}</p>
                        <p className="text-4xl font-bold">${product.price}</p>
                        {
                            (cart[product._id]) ?
                                <button>Added</button> :
                                <button className="w-full h-10 duration-150 bg-blue-500 text-white rounded-lg hover:bg-blue-700 hover:shadow-lg" onClick={addToCartHandler}>Add to Cart</button>
                        }
                        {
                            user.owner ?
                            <Link to={`/editProduct/${product._id}`}><button className="w-full h-10 duration-150 bg-blue-500 text-white rounded-lg hover:bg-blue-700 hover:shadow-lg" >Edit Product</button></Link> :
                            null
                        }
                        {
                            user.owner?
                            <button onClick={deleteHandler} className="w-full h-10 duration-150 bg-red-500 text-white rounded-lg hover:bg-red-700 hover:shadow-lg" button>Delete Product</button>:
                            null
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OneProduct;
