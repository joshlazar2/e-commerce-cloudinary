import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {

    const navigate = useNavigate();

    const [product, setProduct] = useState({
        title: '',
        description: '',
        price: 0.00,
        category: 'Electronics',
        quantity: 1,
        featured: false,
        image: ''
    })

    const [errors, setErrors] = useState({})

    const fileChangeHandler = (e) => {
        setProduct({ ...product, image: e.target.files[0] });
    }

    const changeHandler = (e) => {
        if (e.target.type === 'checkbox') {
            setProduct({ ...product, featured: !product.featured })
        }
        else {
            setProduct({ ...product, [e.target.name]: e.target.value })
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', product.title);
        formData.append('description', product.description);
        formData.append('price', product.price);
        formData.append('category', product.category);
        formData.append('quantity', product.quantity);
        formData.append('featured', product.featured);
        formData.append('image', product.image);
        axios
            .post('http://localhost:8000/api/createProduct', formData, {withCredentials:true})
            .then((res) => {
                // Assuming the response contains the Cloudinary URL in res.data.image
                // You might want to update the product state with this URL or handle it as needed
                console.log(res.data); // Log the response to see the structure
                navigate('/profile');
            })
            .catch((err) => {
                console.log(err);
                // Handle errors appropriately
                // For example, you might want to set error messages based on the error response
                setErrors({ ...errors, general: 'An error occurred while adding the product.' });
            });
    }
    

    return (
        <div className='bg-slate-100 min-h-screen'>
            <h2 className='text-blue-500 font-bold p-8'>Add Product</h2>
            <div className='flex justify-center'>
                <form className='bg-white rounded-2xl p-6 md:p-16 shadow-xl space-y-8' onSubmit={submitHandler}>
                    <div className='flex items-center space-x-4 justify-center'>
                        <label className=" text-blue-500 font-bold">Title:</label>
                        <input className='rounded-2xl border border-blue-500 text-sm p-2' type="text" name="title" onChange={changeHandler} />
                    </div>
                    <div className='flex items-center space-x-4 justify-center'>
                        <label className=" text-blue-500 font-bold">Description:</label>
                        <textarea className='rounded-2xl border border-blue-500 text-sm p-2' type="text" name="description" onChange={changeHandler} />
                    </div>
                    <div className='flex items-center space-x-4 justify-center'>
                        <label className=" text-blue-500 font-bold">Price:</label>
                        <input className='rounded-2xl border border-blue-500 text-sm p-2' type="number" name="price" onChange={changeHandler} />
                    </div>
                    <div className='flex items-center space-x-4 justify-center'>
                        <label className=" text-blue-500 font-bold">Category:</label>
                        <select name="category" onChange={changeHandler} >
                            <option value="Electronics">Electronics</option>
                            <option value="Watches">Watches</option>
                            <option value="Clothes">Clothes</option>
                            <option value="Shoes">Shoes</option>
                            <option value="Backpacks">Backpacks</option>
                        </select>
                    </div>
                    <div className='flex items-center space-x-4 justify-center'>
                        <label className=" text-blue-500 font-bold">Quantity:</label>
                        <input className='rounded-2xl border border-blue-500 text-sm p-2' type="number" name="quantity" onChange={changeHandler} />
                    </div>
                    <div className='flex flex-col space-y-4 items-center justify-center'>
                        <label className=" text-blue-500 font-bold">Image:</label>
                        <input type="file" onChange={fileChangeHandler} />
                    </div>
                    <div className='flex items-center space-x-4 justify-center'>
                        <label className=" text-blue-500 font-bold">Is this a featured product?</label>
                        <input type="checkbox" onChange={changeHandler} />
                    </div>
                    <button className='font-bold w-full bg-blue-500 text-white h-10 rounded-lg hover:shadow-lg hover:bg-blue-700'  type="submit">Add Product</button>
                </form>
            </div>
        </div>
    );
}

export default AddProduct;
