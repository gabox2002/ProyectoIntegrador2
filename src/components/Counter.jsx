import React, { useContext } from "react"
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons"
import { CartContext } from "../context/CartContext"
import Text from "./Text"
import Button from "./Button"

export default function Counter({ _id, movieData }) {
    const { addMovie, removeMovie, moviesCartList } = useContext(CartContext);
    const itemInCart = moviesCartList.find((item) => item._id === _id);
    const initialQuantity = itemInCart ? itemInCart.quantity : 0;

    const decrement = () => {
        if (initialQuantity > 0) {
            removeMovie(_id);
        }
    };

    const increment = () => {
        addMovie({
            _id,
            movieData: movieData, 
            quantity: initialQuantity + 1,
        });
    };

    return (
        <div className="counter__container">
            <Button
                icon={faMinus}
                className="counter__btn"
                action={decrement}
                disabled={initialQuantity === 0}
            />
            <Text
                renderAs="p"
                content={initialQuantity}
                componentsProps={{ className: "counter__count-text" }}
            />
            <Button icon={faPlus} className="counter__btn" action={increment} />
        </div>
    );
}
