import React, { useContext, useState, useEffect } from "react";
import { faShoppingCart, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../context/CartContext";

import Button from "./Button";
import Modal from "./Modal";
import CartItem from "./CartItem";
import { getProducts } from "../util/api";

function Cart() {
    const { moviesCartList, setMoviesCartList } = useContext(CartContext);
    const [open, setOpen] = useState(false);
    const [products, setProducts] = useState([]); // Estado para almacenar los productos
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Obtener los datos de los productos
        getProducts()
            .then((products) => setProducts(products))
            .catch((error) => console.error("Error fetching products:", error));
    }, []);

    // Función para abrir y cerrar el modal
    const handleToggleModal = () => {
        setOpen(!open);
        const cartButton = document.querySelector(".cart__navbar-button");
        if (cartButton) {
            cartButton.focus();
        }
    };

    // Función para vaciar el carrito
    const handleEmptyCart = () => {
        setMoviesCartList([]);
        handleCloseModal();
    };

    // Función para calcular el total del carrito
    const calculateTotal = () => {
        return moviesCartList.reduce(
            (total, movie) => total + movie.movieData.price * movie.quantity,
            0
        );
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
    // Función para cerrar el modal
    const handleCloseModal = () => {
        setOpen(false);
        const cartContainer = document.querySelector(".modal_close");
        if (cartContainer) {
            cartContainer.blur();
        }
    };
    // Efecto para cerrar el modal cuando el carrito está vacío
    useEffect(() => {
        if (moviesCartList.length === 0) {
            handleCloseModal();
        }
    }, [moviesCartList]);

    // Calculamos la cantidad total de productos en el carrito sumando las cantidades de todos los productos
    const totalQuantity = moviesCartList.reduce(
        (total, movie) => total + movie.quantity,
        0
    );

    return (
        <>
            <div className="cart__container">
                <Button
                    icon={faShoppingCart}
                    className="cart__navbar-button"
                    action={handleToggleModal}
                    disabled={!moviesCartList.length}
                />
                {totalQuantity ? (
                    <div className="cart__badge">
                        <span>{totalQuantity}</span>
                    </div>
                ) : undefined}
            </div>
            <Modal show={open} onClose={handleCloseModal} direction="right">
                <>
                    <div className="modal__header">
                        <Button
                            icon={faArrowLeft}
                            className="modal__close"
                            action={handleCloseModal}
                            disabled={!moviesCartList.length}
                        />
                        <p>Carrito de compras</p>
                    </div>
                    {moviesCartList.map((data, index) => (
                        <CartItem
                            key={index}
                            id={data.id}
                            movieData={products.find(
                                (product) => product.id === data.id
                            )}
                            quantity={data.quantity}
                        />
                    ))}
                    <div className="modal__total-container">
                        <h3>Total: ${calculateTotal().toFixed(2)}</h3>
                    </div>
                    <div className="modal__cupon">
                        <input
                            type="text"
                            id="correo"
                            name="correo"
                            placeholder="Ingrese el código"
                            className="cupon-input"
                        />
                        <Button label="Aplicar cupón" className="cupon-btn" />
                    </div>
                    <div className="modal__buttons">
                        <Button
                            label="Vaciar carrito"
                            action={handleEmptyCart}
                            className="clear__button"
                        />
                        <Button
                            label={loading ? "Comprando..." : "Comprar"}
                            type="submit"
                            action={handleCheckout}
                            className="checkout__button"
                            disabled={loading}
                        />
                    </div>
                </>
            </Modal>
        </>
    );
}

export default Cart;
