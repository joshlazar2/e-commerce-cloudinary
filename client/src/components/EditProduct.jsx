import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';

const EditProduct = () => {

    const backendUrl = process.env.REACT_APP_BACKEND_URL

    const navigate = useNavigate();

    const {id} = useParams()

    const [product, setProduct] = useState({
        title: '',
        description: '',
        price: 0.00,
        category: 'Electronics',
        quantity: 1,
        featured: false,
        image: ''
    })

    useEffect(() => {
        axios
            .get(`${backendUrl}/api/oneProduct/${id}`)
            .then((res) => {
                setProduct(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

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
            .post(`${backendUrl}/api/editProduct/${id}`, formData, {withCredentials:true})
            .then((res) => {
                navigate(`/oneProduct/${id}`);
            })
            .catch((err) => {
                console.log(err);
                // Example of setting error messages based on the error response
                if (err.response && err.response.data) {
                    setErrors({ ...errors, general: err.response.data.error || 'An error occurred while editing the product.' });
                } else {
                    setErrors({ ...errors, general: 'An error occurred while editing the product.' });
                }
            });
    }


    return (
        <div className='bg-slate-100 min-h-screen'>
            <h2 className='text-blue-500 font-bold p-8'>Edit Product</h2>
            <div className='flex justify-center'>
                <form onSubmit={submitHandler} class='bg-white rounded-2xl p-6 md:p-16 shadow-xl space-y-8'>
                    <div className='flex justify-center items-center space-x-4 '>
                        <label className='text-blue-500 font-bold'>Title:</label>
                        <input value={product.title} class='rounded-2xl border border-blue-500 text-sm p-2' type="text" name="title" onChange={changeHandler}/>
                    </div>
                    <div className='flex items-center space-x-4 justify-center'>
                        <label className=" text-blue-500 font-bold">Description:</label>
                        <textarea value={product.description} class='rounded-2xl border border-blue-500 text-sm p-2' type="text" name="description" onChange={changeHandler} />
                    </div>
                    <div className='flex items-center space-x-4 justify-center'>
                        <label className=" text-blue-500 font-bold">Price:</label>
                        <input value={product.price} class='rounded-2xl border border-blue-500 text-sm p-2' type="number" name="price" onChange={changeHandler} />
                    </div>
                    <div className='flex items-center space-x-4 justify-center'>
                        <label className=" text-blue-500 font-bold">Category:</label>
                        <select value={product.category} name="category" onChange={changeHandler} >
                            <option value="Electronics">Electronics</option>
                            <option value="Watches">Watches</option>
                            <option value="Clothes">Clothes</option>
                            <option value="Shoes">Shoes</option>
                            <option value="Backpacks">Backpacks</option>
                        </select>
                    </div>
                    <div className='flex items-center space-x-4 justify-center'>
                        <label className=" text-blue-500 font-bold">Quantity:</label>
                        <input value={product.quantity} class='rounded-2xl border border-blue-500 text-sm p-2' type="number" name="quantity" onChange={changeHandler} />
                    </div>
                    <div className='flex flex-col space-y-4 items-center justify-center'>
                        <label className=" text-blue-500 font-bold">Image:</label>
                        <input type="file" onChange={fileChangeHandler} />
                    </div>
                    <div className='flex items-center space-x-4 justify-center'>
                        <label className=" text-blue-500 font-bold">Is this a featured product?</label>
                        <input checked={product.featured} type="checkbox" onChange={changeHandler} />
                    </div>
                    <button className='font-bold w-full bg-blue-500 text-white h-10 rounded-lg hover:shadow-lg hover:bg-blue-700'  type="submit">Edit Product</button>
                </form>

            </div>
        </div>
    );
}

export default EditProduct;
