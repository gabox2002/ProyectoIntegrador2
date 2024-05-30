import React from 'react'
import { Link } from 'react-router-dom'
// import Counter from './Counter'

function Card({
    id,
    name,
    img1,
    price,
    shortDesc,
    delivery,
}) {
    return (
        <div className="card__container">
            <Link to={`/detail/${id}`}>
                <div className='card__data'>
                {/* <img src={imgUrl} alt={shortDesc} /> */}
                <img src={img1} alt={shortDesc} />
                    {/* <Counter id={id}/> */}
                    <h2>{name} </h2>
                    <div className='card__interno'>
                        <div className='shortDesc'>
                            <p><span>{shortDesc}</span></p>
                        </div>
                        <div className='precio'>
                            <p>${price}</p>
                        </div>
                    </div>
                    {delivery ? <p>Envío sin cargo.</p> : undefined}
                </div>
            </Link>
        </div>
    )
}

export default Card