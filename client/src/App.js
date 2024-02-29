import './App.css';
import {Routes, Route, Link, Navigate} from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import OneProduct from './components/OneProduct';
import Categories from './components/Categories';
import Nav from './components/Nav';
import OneCategory from './components/OneCategory';
import Cart from './components/Cart';
import Profile from './components/Profile';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/home' element={<Home />} />
        <Route path='/oneProduct/:id' element={<OneProduct />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/oneCategory/:category' element={<OneCategory />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/addProduct' element={<AddProduct />} />
        <Route path='/editProduct/:id' element={<EditProduct />} />
      </Routes>
    </div>
  );
}

export default App;
