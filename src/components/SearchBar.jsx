import React, { useState, useEffect } from "react";
import Button from "./Button";
import Modal from "./Modal";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom"; 

function SearchBar() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate(); 
    const [searchTerm, setSearchTerm] = useState('');

    // Función para abrir y cerrar el modal
    const toggleSearch = () => {
        setOpen(!open);
        setSearchTerm(''); 
        const cartButton = document.querySelector("search-btn");
        if (cartButton) {
            cartButton.focus();
        }
    };

    // Función para cerrar el modal
    const handleCloseModal = () => {
        setOpen(false);
        setSearchTerm(''); 
        navigate('/'); 

        const cartContainer = document.querySelector(".modal_close");
    if (cartContainer) {
        cartContainer.blur();
    }
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

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            navigate(`/?search=${searchTerm}`);
            setOpen(false);
        };
    }

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="search__container">
            <Button
                icon={faSearch}
                className="search-btn"
                action={toggleSearch}
                />
            <Modal
                show={open}  
                onClose={handleCloseModal}  
                direction="right"
            >
                <div>
                <form onSubmit={(e) => e.preventDefault()}>
                        <label htmlFor="search" hidden>Buscar</label>
                        <input
                            id="search"
                            name="search"
                            type="text"
                            className="searcher__input"
                            placeholder="Buscar producto..."
                            value={searchTerm}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                        />
                    </form>
                </div>
            </Modal>
        </div>
    );
}

export default SearchBar;
