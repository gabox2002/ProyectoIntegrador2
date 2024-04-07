import React, { useState, useEffect } from 'react';
import { CartContext } from './CartContext';
import { getProducts } from '../util/api';

const CartProvider = ({ children }) => {
    const [moviesCartList, setMoviesCartList] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cartItems'));
        if (storedCart) {
            setMoviesCartList(storedCart);
        }
    }, []);

    useEffect(() => {
        getProducts()
            .then(data => setProducts(data))
            .catch(err => console.error(err));
    }, []);

    const addMovie = (data) => {
        const movieFinded = moviesCartList.find(movie => movie.id === data.id);
        if (movieFinded) {
            setMoviesCartList(
                moviesCartList.map(movie => movie.id === data.id ? { ...movie, quantity: movie.quantity + 1 } : movie)
            );
        } else {
            const product = products.find(product => product.id === data.id);
            if (product) {
                setMoviesCartList([...moviesCartList, { ...product, quantity: 1 }]);
            }
        }
    };

    const removeMovie = (id) => {
        const updatedCart = moviesCartList.map(movie => {
            if (movie.id === id) {
                if (movie.quantity > 1) {
                    return { ...movie, quantity: movie.quantity - 1 };
                } else {
                    return null; 
                }
            } else {
                return movie;
            }
        }).filter(Boolean); 
        setMoviesCartList(updatedCart);
        
    };

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(moviesCartList));
    }, [moviesCartList]);

    return (
        <CartContext.Provider value={{ moviesCartList, setMoviesCartList, addMovie, removeMovie }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
