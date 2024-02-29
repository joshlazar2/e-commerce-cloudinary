import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Categories = () => {

    const [products, setProducts] = useState([])

    const [categories, setCategories] = useState([])

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/allProducts')
            .then((res) => {
                setProducts(res.data)
                const uniqueCategories = [...new Set(res.data.map((product) => product.category))]
                setCategories(uniqueCategories)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <div className='bg-slate-100 min-h-screen flex justify-center'>
            <div className='grid grid-cols-1 md:grid-cols-5 gap-10 p-12'>
                {
                    categories.map((category) => (
                        <div key={category}  className='bg-white rounded-2xl p-12 text-md shadow-xl hover:shadow-2xl h-20 flex items-center justify-center'>
                            <Link className='text-blue-500 font-bold' to={`/oneCategory/${category}`}><h2>{category}</h2></Link>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Categories;
