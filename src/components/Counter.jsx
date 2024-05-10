import React, { useContext, useState, useEffect } from 'react';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../context/CartContext';
import Text from './Text';
import Button from './Button';

const INITIAL_STATE = 0;

export default function Counter({ id }) {
    const { addMovie, removeMovie, moviesCartList } = useContext(CartContext);
    const [count, setCount] = useState(INITIAL_STATE);

    useEffect(() => {
        const quantityInCart = moviesCartList.find(movie => movie.id === id)?.quantity || 0;
        setCount(quantityInCart);
    }, [moviesCartList, id]);

    const decrement = () => {
        if (count > 0) {
            setCount(prevCount => prevCount - 1);
            removeMovie(id);
        }
    };

    const increment = () => {
        setCount(prevCount => prevCount + 1);
        addMovie({ id, quantity: count + 1 });
    };

    return (
        <div className="counter__container">
            <Button
                icon={faMinus}
                className="counter__btn"
                action={decrement}
                disabled={count === 0}
            />
            <Text
                renderAs="p"
                content={count}
                componentsProps={{ className: "counter__count-text" }}
            />
            <Button
                icon={faPlus}
                className="counter__btn"
                action={increment}
                title={"Agregar al carrito"}

            />
        </div>
    );
}
