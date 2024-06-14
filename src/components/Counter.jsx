import React, { useContext } from "react";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../context/CartContext";
import Text from "./Text";
import Button from "./Button";

export default function Counter({ _id }) {
    const { productsCartList, addProd, removeProd } = useContext(CartContext);
    const itemInCart = productsCartList.find((item) => item._id === _id);
    const quantity = itemInCart ? itemInCart.quantity : 0;

    const decrement = () => {
        if (quantity > 0) {
            removeProd(_id);
        }
    };

    const increment = () => {
        addProd({
            _id,
            quantity: quantity + 1,
        });
    };

    return (
        <div className="counter__container">
            <Button
                icon={faMinus}
                className="counter__btn"
                action={decrement}
                disabled={quantity === 0}
            />
            <Text
                renderAs="p"
                content={quantity}
                componentsProps={{ className: "counter__count-text" }}
            />
            <Button icon={faPlus} className="counter__btn" action={increment} />
        </div>
    );
} 