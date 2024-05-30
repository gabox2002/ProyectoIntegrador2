import React, { useContext } from "react";
import Counter from "./Counter";
import Button from "./Button";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../context/CartContext";

function CartItem({ id, movieData }) {
    const { removeMovie, moviesCartList, setMoviesCartList, addMovie } =
        useContext(CartContext);
    const itemInCart = moviesCartList.find((item) => item.id === id);
    const quantity = itemInCart ? itemInCart.quantity : 0;

    // Función para eliminar completamente un producto del carrito
    const removeProductFromCart = (id) => {
        const updatedCart = moviesCartList.filter((movie) => movie.id !== id);
        setMoviesCartList(updatedCart);
    };

    return (
        <>
            <div className="modal__content">
                <div className="modal__product">
                    {movieData && (
                        <>
                            <img
                                src={movieData.img1}
                                alt={movieData.name}
                                className="modal__product-image"
                            />
                            <div className="modal__product-details">
                                <div className="modal__product-detail">
                                    <div className="modal__title">
                                        <p className="product-name">
                                            {movieData.name}{" "}
                                        </p>
                                        <Button
                                            icon={faClose}
                                            title="Eliminar producto"
                                            action={() =>
                                                removeProductFromCart(
                                                    movieData.id
                                                )
                                            }
                                            className="trash-button"
                                        />
                                    </div>
                                    <div className="modal__product-price">
                                        <p>Precio:{" "}<span>${movieData.price}</span></p>
                                    </div>
                                    <div className="modal__product-subtotal">
                                        <p>Sub-total:{" "}<span>${( movieData.price * quantity ).toFixed(2)}</span></p>
                                    </div>
                                </div>
                                <Counter
                                    key={id}
                                    id={id}
                                    movieData={movieData}
                                    initialValue={quantity}
                                    addMovie={addMovie}
                                    removeMovie={removeMovie}
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default CartItem;
