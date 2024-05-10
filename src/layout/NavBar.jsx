import React from 'react';
import { NavLink } from "react-router-dom";
import Cart from "../components/Cart";
import Login from '../components/Login';
import Bars from '../components/Bars'; 
import SearchBar from "../components/SearchBar"; 

function NavBar() {
    return (
        <header className="navbar__container">
            <div className="navbar__wrapper">

                <NavLink to="/" className="navbar__wrapper-logo">Juguetería Cósmica</NavLink>

                <div className="navbar__wrapper-items">
                    <nav>
                        <NavLink to="/" className="navbar__link">Inicio</NavLink>
                        <NavLink to="/upload" className="navbar__link">Alta</NavLink>
                        <NavLink to="/contact" className="navbar__link">Contactanos</NavLink>
                        <NavLink to="/about" className="navbar__link">Nosotros</NavLink>
                    </nav>
                </div>
                <Bars/> 
                <div className="navbar__wrapper-icons">
                    <SearchBar />
                    <Cart />
                    <Login />
                </div>
            </div>
        </header>
    );
}

export default NavBar;
