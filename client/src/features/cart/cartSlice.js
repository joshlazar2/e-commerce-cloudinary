import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    items: {}
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload
            if (state.items[product._id]){
                state.items[product._id].quantity += 1;
            }
            else{
                state.items[product._id] = {...product, quantity: 1}
            }
        },
        removeFromCart: (state, action) => {
            const itemId = action.payload;
            delete state.items[itemId]
        },
        updateQuantity: (state, action) => {
            const item = action.payload;
            state.items[item.id].quantity = item.quantity
        },
        resetCart: (state) => {
            state.items = {};
        }
    }

})


export const { addToCart, removeFromCart, updateQuantity, resetCart } = cartSlice.actions;
export default cartSlice.reducer;