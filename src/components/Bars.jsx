import React, { useState, useEffect } from "react";
import { faBars, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom"; 
import Button from "./Button";
import Modal from "./Modal";
import SocialMedia from "./SocialMedia";

function Bars() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate(); 

    const handleToggleModal = () => {
        setOpen(!open);
    };

    const handleCloseModal = () => {
        setOpen(false);
        navigate('/'); 
    };

    useEffect(() => {
        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);

    const handleClickOutside = (event) => {
        if (!event.target.closest(".modal__container")) {
            setOpen(false);
        }
    };

    const handleLinkClick = (path) => {
        handleCloseModal(); 
        navigate(path); 
    };

    const handleKeyDown = (event) => {
        if (event.keyCode === 27) {
            setOpen(false);
            if (document.activeElement instanceof HTMLElement) {
                document.activeElement.blur();
            }
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <>
            <div className="modal__bars">
                <Button
                    icon={faBars}
                    className="bars__navbar-btn"
                    action={handleToggleModal}
                />
            <Modal show={open} Close={handleCloseModal} direction="left">
            <> <div className="modal__header">
                        <p>Juguetería cósmica</p>
                        <Button
                            icon={faArrowRight}
                            className="modal__close"
                            action={handleCloseModal}
                        />
                        
                    </div>
                    <div className="modal__content">
                        <Link to="/" className="navbar__link-modal" onClick={() => handleLinkClick('/')} > Inicio </Link>
                        <Link to="/upload" className="navbar__link-modal" onClick={() => handleLinkClick('/upload')} > Alta</Link>
                        <Link to="/contact" className="navbar__link-modal" onClick={() => handleLinkClick('/contact')} > Contactanos </Link>
                        <Link to="/about" className="navbar__link-modal" onClick={() => handleLinkClick('/about')} > Nosotros </Link>
                        <SocialMedia showMessage={true} className="social__link-modal" />
                    </div></>
                </Modal>
            </div>
        </>                

    );
}

export default Bars;
