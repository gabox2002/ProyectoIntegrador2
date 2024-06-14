import React, { useContext } from "react"
import Button from "./Button"
import Counter from './Counter'
import { faClose } from "@fortawesome/free-solid-svg-icons"
import { CartContext } from "../context/CartContext"

const CartItem = ({ id, prodData, quantity }) => {
    const { productsCartList, setProductsCartList } = useContext(CartContext);

    if (!prodData) return null;

    // Función para eliminar completamente un producto del carrito
    const removeProductFromCart = (id) => {
        const updatedCart = productsCartList.filter((prod) => prod._id !== id);
        setProductsCartList(updatedCart);
    };

    return (
    <div className="modal__content">
        <div className='modal__product'>
            <img src={prodData.img1} alt={prodData.name} className="modal__product-image" />

            <div className='modal__product-details'>
                <div className="modal__product-detail">
                    <div className="modal__title">
                        <p className="product-name">{prodData.name}</p>
                        <Button
                            icon={faClose}
                            title="Eliminar producto"
                            action={() =>
                                removeProductFromCart(
                                    prodData._id
                                )
                            }
                            className="trash-button"
                        />
                    </div>
                    <div className="modal__product-price">
                        <p>Precio: ${prodData.price}</p>
                    </div>
                    <div className="modal__product-subtotal">
                        <p>Sub-total:{" "}<span>${( prodData.price * quantity ).toFixed(2)}</span></p>
                    </div>
                    <div className='cart-item-counter'>
                        <Counter _id={id} />
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};
export default CartItem