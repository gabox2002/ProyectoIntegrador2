import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Counter from './Counter'
import { CartContext } from '../context/CartContext'


function Card({
    _id,
    name,
    img1,
    price,
    shortDesc,
    delivery,
}) {
    const { addMovie } = useContext(CartContext);

    return (
        <div className="card__container">
            <div className='card__data'>
                <Link to={`/detail/${_id}`}>
                    <img src={img1} alt={shortDesc} />
                </Link>
                <div className='card__details'>
                    <Link to={`/detail/${_id}`}>
                        <h2>{name}</h2>
                    </Link>
                    <div className='shortDesc'>
                        <Link to={`/detail/${_id}`}>
                            <p><span>{shortDesc}</span></p>
                        </Link>
                    </div>
                </div>
                <div className='precio'>
                    <Counter
                        _id={_id}
                        initialValue={0}
                        addMovie={addMovie}
                    />
                    <p>${price}</p>
                </div>
                {delivery && <p>Envío sin cargo.</p>}
            </div>
        </div>
    )
}

export default Card