import React, { useContext, useState, useEffect } from "react"
import { faShoppingCart, faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { CartContext } from "../context/CartContext"

import Button from "./Button"
import Modal from "./Modal"
import CartItem from "./CartItem"
import { getProducts, postCart} from "../util/api"


function Cart() {
    const { cart, productsCartList, setProductsCartList } = useContext(CartContext);
    const [open, setOpen] = useState(false);
    const [products, setProducts] = useState([]); // Estado para almacenar los productos
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);

    // Obtener los datos de los productos
    useEffect(() => {
        getProducts()
            .then((products) => setProducts(products))
            .catch((error) => console.error("Error fetching products:", error));
    }, []);

    // Calculamos el total sumando los subtotales de cada producto
    useEffect(() => {
        const cartTotal = productsCartList.reduce(
            (total, prod) => {
                const prodData = products.find(product => product._id === prod._id);
                return total + (prodData?.price || 0) * prod.quantity;
            },
            0
        );
        setTotal(cartTotal);
    }, [productsCartList, products]);

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
        setProductsCartList([]);
        handleCloseModal();
    };

    // Función para realizar el checkout con el envío del formulario
    const handlePurchase = async () => {
        try {
            if (!cart || !cart.items) {
                throw new Error("El carrito está vacío");
            }
            const response = await postCart(cart.items);
            console.log("¡Su compra se ha realizado con éxito!", response);
            // Puedes redirigir al usuario o mostrar un mensaje de éxito
            setLoading(true); // Agregado para mostrar "Comprando..." en el botón
        } catch (error) {
            console.error("Error al realizar la compra:", error);
            // Manejar el error, mostrar mensaje de error al usuario, etc.
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
    // Efecto para cerrar el modal cuando el carrito está vacío
    useEffect(() => {
        if (productsCartList.length === 0) {
            handleCloseModal();
        }
    }, [productsCartList]);

    // Calculamos la cantidad total de productos en el carrito sumando las cantidades de todos los productos
    const totalQuantity = productsCartList.reduce(
        (total, prod) => total + prod.quantity,
        0
    );

    return (
        <>
            <div className="cart__container">
                <Button
                    icon={faShoppingCart}
                    className="cart__navbar-button"
                    action={handleToggleModal}
                    disabled={!productsCartList.length}
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
                            disabled={!productsCartList.length}
                        />
                        <p>Carrito de compras</p>
                    </div>
                    {productsCartList.map((data, index) => (
                        <CartItem
                            key={index}
                            id={data._id}
                            prodData={products.find(
                                (product) => product._id === data._id
                            )}
                            quantity={data.quantity}
                        />
                    ))}
                    <div className="modal__total-container">
                        <h3>Total: ${total.toFixed(2)}</h3>
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
                            action={handlePurchase}
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