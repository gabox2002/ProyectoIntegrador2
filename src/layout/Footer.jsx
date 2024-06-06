import React from "react";
import SocialMedia from "../components/SocialMedia";
import { Link } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import Button from "../components/Button";

function Footer() {
    return (
        <footer className="footer">
            <div className="scroll-to-top-container">
                <ScrollToTop />
            </div>
            <div className="footer__navigation">
                <div className="link-Navigation">
                    <ul>
                        <li><Link to="/">Inicio</Link></li>
                        <li><Link to="/upload">Alta de productos</Link></li>
                        <li><Link to="/contact">Contacto</Link></li>
                        <li><Link to="/about">Nosotros</Link></li>
                    </ul>
                    <ul>
                        <li>Ingresar</li>
                        <li>Buscar</li>
                        <li>Catálogo</li>
                        <li>Novedades</li>
                    </ul>
                </div>
                <SocialMedia />
            </div>

            <div className="footer__copyright">
                <div>
                    <p>Copyright © 2024 - Realizado por
                    <Button
                        label=" Gabriel Quispe"
                        className="autor__button"
                        to="https://github.com/gabox2002" 
                    />
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
