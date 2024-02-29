import React from 'react';
import {useSelector} from 'react-redux'
import {useDispatch} from 'react-redux'
import { updateQuantity, removeFromCart } from '../features/cart/cartSlice';

const Cart = () => {
    const dispatch = useDispatch()

    const cart = useSelector(state => state.items);

    const removeFromCartHandler = (itemId) => {
        dispatch(removeFromCart(itemId))
    }

    const quantityChangeHandler = (id, e) => {
        const newQuantity = e.target.value;
        dispatch(updateQuantity({id, quantity: newQuantity}))
    }

    return (
        <div className='bg-slate-100 min-h-screen'>
            <h2 className='text-blue-500 p-8 font-bold'>Cart</h2>
            <div className='flex items-center justify-center'>
                <div className='flex flex-col p-10 space-y-14'>
                    {
                        Object.values(cart).map((item) => (
                            <div className='bg-white p-6 md:p-16 rounded-2xl shadow-xl flex flex-col md:flex-row md:space-y-0 space-y-10 md:space-x-10 hover:shadow-2xl' key={item.id}>
                                <img className="mx-auto duration-200 w-60 hover:scale-105" src={item.image} alt={item.name} />
                                <div className='flex flex-col md:flex-row items-center md:text-left space-y-3 md:space-x-8'>
                                    <div className='space-y-3'>
                                        <p className=' text-2xl font-bold'>{item.title}</p>
                                        <form className='flex flex-col space-y-2'>
                                            <label className='text-blue-500 font-bold'>Quantity:</label>
                                            <input className='rounded-2xl border border-blue-500 text-sm p-2' type="number" name="quantity" value={item.quantity} onChange={(e) => quantityChangeHandler(item._id, e)}/>
                                        </form>
                                    </div>
                                    <button className='bg-red-500 text-white font-bold rounded-lg hover:shadow-lg hover:bg-red-700 p-3' onClick={() => removeFromCartHandler(item._id)}>Remove</button>
                                </div>
                            </div>
                        ))
                    }
                    <div>
                        <button className='bg-blue-500 hover:bg-blue-700 rounded-lg hover:shadow-lg text-white font-bold w-60 p-2'>Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
