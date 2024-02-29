import { configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartReducer from '../features/cart/cartSlice';
import { persistStore } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, cartReducer);

const store = configureStore({
    reducer: persistedReducer,
});

let persistor = persistStore(store);

export { store, persistor };

