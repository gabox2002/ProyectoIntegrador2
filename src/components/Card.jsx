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
                    <p>$ {price}</p>
                </div>
                <Counter id={id}/>
                <div className='category'>
                    <p>Categ: <span>{category}</span></p>
                </div>
                <div className='shortDesc'>
                    <p>Descrip: <span>{shortDesc}</span></p>
                </div>
                {delivery ? <p>Envío sin cargo.</p> : undefined}
            </div>
            
        </div>
    )
}

export default Card