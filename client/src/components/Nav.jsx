import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Nav = () => {
    return (
        <div className="flex items-center justify-between bg-slate-100 p-4">
            <Link className="text-4xl font-bold duration-150 text-blue-500 rounded-lg hover:text-blue-700" to={'/home'}><h2>Shopiyo</h2></Link>
            <div className="flex items-center justify-between bg-slate-100 w-1/2">
                <Link className="text-l font-bold duration-150 text-blue-500 hover:text-blue-700" to={'/categories'}><p>Categories</p></Link>
                <Link className="text-l font-bold duration-150 text-blue-500 hover:text-blue-700" to={'/profile'}><p>Profile</p></Link>
                <Link className="text-l font-bold duration-150 text-blue-500 hover:text-blue-700" to={'/cart'}><p>Cart</p></Link>
            </div>
        </div>
    );
}

export default Nav;
