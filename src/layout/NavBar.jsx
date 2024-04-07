import React, { useEffect } from 'react';
import { NavLink, useLocation } from "react-router-dom";
import { faSearch, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Button from "../components/Button";
import Cart from "../components/Cart";
import Login from '../components/Login';
import Bars from '../components/Bars'; 
import Modal from '../components/Modal';

function NavBar() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <header className="navbar__container">
            <div className="navbar__wrapper">
                <div className="navbar__wrapper-logo">Juguetería Cósmica</div>
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
                    <Button
                        icon={faSearch}
                        className="search-btn"
                    />
                    <Cart />
                    <Login />
                </div>
            </div>
            <Modal >
                <div className="modal__nav-login">
                    <div className="modal__nav-header">
                        <Button
                            icon={faArrowLeft}
                            className="modal__nav-close"
                        />
                        <p>Tienda online</p>
                    </div>
                    <div className="modal__nav-content">
                        {/* Contenido del modal */}
                    </div>
                </div>
            </Modal>
        </header>
    );
}

export default NavBar;
