import React, { useState, useEffect } from "react"
import { CartContext } from "./CartContext"

const CartProvider = ({ children }) => {
    const [productsCartList, setProductsCartList] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cartItems"));
        if (storedCart) {
            setProductsCartList(storedCart);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(productsCartList));
    }, [productsCartList]);

    const addProd = (data) => {
        const prodFinded = productsCartList.find(
            (prod) => prod._id === data._id
        );
        if (prodFinded) {
            setProductsCartList(
                productsCartList.map((prod) =>
                    prod._id === data._id
                        ? { ...prod, quantity: data.quantity }
                        : prod
                )
            );
        } else {
            setProductsCartList([...productsCartList, data]);
        }
        console.log("Elemento agregado al carrito:", data);
    };

    const removeProd = (id) => {
        const prodFinded = productsCartList.find((prod) => prod._id === id);
        if (prodFinded?.quantity > 1) {
            setProductsCartList(
                productsCartList.map((prod) =>
                    prod._id === id
                        ? {
                              ...prod,
                              quantity: prod.quantity - 1,
                          }
                        : prod
                )
            );
        } else {
            setProductsCartList(
                productsCartList.filter((prod) => prod._id !== id)
            );
        }
        const removedProd = productsCartList.find((prod) => prod._id === id);
        if (removedProd) {
            console.log("Elemento removido del carrito:", removedProd);
        }
    };

    return (
        <CartContext.Provider
            value={{
                productsCartList,
                setProductsCartList,
                addProd,
                removeProd,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider; 