import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Home = () => {

    const [featuredProducts, setFeaturedProdcuts] = useState([])

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/featuredProducts')
            .then((res) => {
                //console.log(res)
                setFeaturedProdcuts(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <div className="min-h-screen bg-slate-100">
            <h3 className="p-8 font-bold text-blue-500">Featured Products</h3>
            <div className='flex items-center justify-center'>
                <div className="flex flex-col p-10 space-y-14">
                    {
                        featuredProducts.map((product) => (
                            <Link to={`/oneProduct/${product._id}`}>
                                <div className="flex flex-col p-6 space-y-10 bg-white rounded-2xl shadow-xl md:flex-row md:space-y-0 md:space-x-10 md:p-16 hover:shadow-2xl" key={product._id} >
                                    <img className="mx-auto duration-200 w-60 hover:scale-105" src={product.image} alt="" />
                                    <div className="flex flex-col space-y-3 text-center md:text-left">
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

export default Home;
