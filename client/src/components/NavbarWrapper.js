// NavbarWrapper.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';

const NavbarWrapper = () => {
    const currentPath = useLocation();

  return currentPath !== '/login' ? <Navbar /> : null;
};

export default NavbarWrapper;
