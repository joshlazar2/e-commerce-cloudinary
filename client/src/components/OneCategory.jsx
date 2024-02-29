import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link, useParams } from 'react-router-dom';

const OneCategory = () => {

    const { category } = useParams()

    const [categoryProducts, setCategoryProducts] = useState([])

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/oneCategory/${category}`)
            .then((res) => {
                setCategoryProducts(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <div className='bg-slate-100 min-h-screen'>
            <h3 className="text-l font-bold text-blue-500 p-8">{category}</h3>
            <div className='flex items-center justify-center'>
                <div className='flex flex-col space-y-14 p-10'>
                    {
                        categoryProducts.map((product) => (
                            <Link to={`/oneProduct/${product._id}`}>
                            <div key={product._id} className='bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl flex flex-col md:flex-row space-y-10 md:space-y-0 md:space-x-10 md:p-16'>
                                <img className="mx-auto duration-200 w-60 hover:scale-105" src={product.image} alt="" />
                                <div className='flex flex-col space-y-3 md:text-left text-center'>
                                    <p className="max-w-sm text-2xl font-medium">{product.title}</p>
                                    <p className="max-w-sm text-l font-medium">Description: {product.description}</p>
                                    <p className="text-4xl font-bold">${product.price}</p>
                                </div>
                            </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default OneCategory;
