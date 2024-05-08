import React, { useContext, useState, useEffect, useRef } from "react";
import { faClose, faShoppingCart, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../context/CartContext";
import Button from "./Button";
import Modal from "./Modal";
import Counter from "./Counter";

function Cart() {
    const { moviesCartList, setMoviesCartList} = useContext(CartContext);
    const [open, setOpen] = useState(false);
    const modalRef = useRef(null);
    const [loading, setLoading] = useState(false); 


    // Función para abrir y cerrar el modal
    const handleToggleModal = () => {
        setOpen(!open);
        const cartButton = document.querySelector(".cart__navbar-button");
        if (cartButton) {
            cartButton.focus();
        }
    };

    // Función para cerrar el modal
    const handleCloseModal = () => {
        setOpen(false);
        const cartContainer = document.querySelector(".modal_close");
    if (cartContainer) {
        cartContainer.blur();
    }
    };

    // Efecto para manejar el clic fuera del modal
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

    // Función para manejar el clic en la tecla Escape
    const handleKeyDown = (event) => {
        if (event.keyCode === 27) {
            setOpen(false);
            // Desenfocar cualquier elemento que esté actualmente enfocado
            if (document.activeElement instanceof HTMLElement) {
                document.activeElement.blur();
            }
        }
    };

    // Función que remueve un event listener para cerrar el modal al presionar la tecla 'Escape'
    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    // Función para calcular el subtotal de un producto en el carrito
    const calculateSubtotal = (movie) => {
        return movie.price * movie.quantity;
    };

    // Función para calcular el total del carrito
    const calculateTotal = () => {
        return moviesCartList.reduce((total, movie) => total + calculateSubtotal(movie), 0);
    };

    // Función para vaciar el carrito
    const handleEmptyCart = () => {
        setMoviesCartList([]); 
        handleCloseModal();
    };

    // Función para realizar el checkout con el envío del formulario
    const handleCheckout = () => {
        setLoading(true); 
        setTimeout(() => {
            setLoading(false); 
            alert("¡Su compra se ha realizado con éxito!");
            setMoviesCartList([]); 
            handleCloseModal();
        }, 1000); 
    };

    // Efecto para cerrar el modal cuando el carrito está vacío
    useEffect(() => {
        if (moviesCartList.length === 0) {
            handleCloseModal();
        }
    }, [moviesCartList]);

    // Función para eliminar completamente un producto del carrito
    const removeProductFromCart = (id) => {
        const updatedCart = moviesCartList.filter(movie => movie.id !== id);
        setMoviesCartList(updatedCart);
    };
    
    
    return (
        <>
            <div className="cart__container">
                <Button
                    icon={faShoppingCart}
                    className="cart__navbar-button"
                    action={handleToggleModal}
                    disabled={!moviesCartList.length}
                />
                {moviesCartList.length ? (
                    <div className="cart__badge">
                        <span>
                            {moviesCartList.reduce(
                                (acc, movie) => acc + movie.quantity,
                                0
                            )}
                        </span>
                    </div>
                ) : undefined}
            </div>
            <Modal show={open} Close={handleCloseModal} direction="right">

                <div className="modal__header">
                    <Button
                        icon={faArrowLeft}
                        className="modal__close"
                        action={handleCloseModal}

                    />
                    <p>Carrito de compras</p>
                </div>
                <div className="modal__content" ref={modalRef}>
                    {moviesCartList.map((movie) => (
                        <div key={movie.id} className="modal__product">
                            <img
                                src={movie.img1}
                                alt={movie.name}
                                className="modal__product-image"
                            />
                            <div className="modal__product-details">
                                <div className="modal__product-detail">
                                    <div className="modal__title">
                                        <p className="product-name">{movie.name} </p>
                                        <Button 
                                            icon={faClose}
                                            title="Eliminar producto"
                                            action={() => removeProductFromCart(movie.id)}
                                            className="trash-button"
                                        />
                                    </div> 
                                    <div className="modal__product-price">
                                        <p>Precio: <span>${movie.price}</span></p>                               
                                    </div>  
                                    <div className="modal__product-subtotal">
                                        <p>Sub-total: <span>${calculateSubtotal(movie).toFixed(2)}</span></p>
                                    </div>                                 
                                </div>
                                <Counter id={movie.id}/>
                            </div>
                        </div>
                    ))}
                    <div className="modal__total-container">
                        <p className="modal__total">TOTAL:<span> ${calculateTotal().toFixed(2)}</span></p>
                    </div>
                    <div className="modal__cupon">
                        <input
                                    type="text"
                                    id="correo"
                                    name="correo"
                                    placeholder="Ingrese el código"
                                    className="cupon-input"
                                />
                        <Button
                            label="Aplicar cupón"
                            className="cupon-btn"
                        />
                    </div>
                    <div className="modal__buttons">
                        <Button
                            label="Vaciar carrito"
                            action={handleEmptyCart}
                            className="clear__button"
                        />
                        <Button
                                label={loading ? "Comprando..." : "Finalizar compra"}
                                type="submit"
                                action={handleCheckout}
                                className="checkout__button"
                                disabled={loading}
                            />
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default Cart;

