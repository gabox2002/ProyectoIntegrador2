import React from 'react'
import Counter from './Counter'

function Card({
    id,
    name,
    img,
    category,
    price,
    shortDesc,
    delivery,
}) {
    return (
        <div className="card__container">
            <img src={img} alt={shortDesc} />
            <div className='card__data'>
                <h2>{name} </h2>
                <div className='precio'>
                    <p>${price}</p>
                </div>
                <span><Counter id={id}/></span>
                <div className='category'>
                    <b>{category}</b>
                </div>
                <div className='shortDesc'>
                    <p>{shortDesc}</p>
                </div>
                {delivery ? <p>Envío sin cargo.</p> : undefined}
            </div>
            
        </div>
    )
}

export default Card