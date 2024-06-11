import React, { useState, useEffect } from "react"
import { CartContext } from "./CartContext"

const CartProvider = ({ children }) => {
    const [moviesCartList, setMoviesCartList] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cartItems"));
        if (storedCart) {
            setMoviesCartList(storedCart);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(moviesCartList));
    }, [moviesCartList]);

    const addMovie = (data) => {
        const movieFinded = moviesCartList.find(
            (movie) => movie._id === data._id
        );
        if (movieFinded) {
            setMoviesCartList(
                moviesCartList.map((movie) =>
                    movie._id === data._id
                        ? { ...movie, quantity: data.quantity }
                        : movie
                )
            );
        } else {
            setMoviesCartList([...moviesCartList, data]);
        }
        console.log("Elemento agregado al carrito:", data);
    };

    const removeMovie = (id) => {
        const movieFinded = moviesCartList.find((movie) => movie._id === id);
        if (movieFinded?.quantity > 1) {
            setMoviesCartList(
                moviesCartList.map((movie) =>
                    movie._id === id
                        ? {
                              ...movie,
                              quantity: movie.quantity - 1,
                          }
                        : movie
                )
            );
        } else {
            setMoviesCartList(
                moviesCartList.filter((movie) => movie._id !== id)
            );
        }
        const removedMovie = moviesCartList.find((movie) => movie._id === id);
        console.log("Elemento quitado del carrito:", removedMovie);
    };

    return (
        <CartContext.Provider
            value={{
                moviesCartList,
                setMoviesCartList,
                addMovie,
                removeMovie,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
