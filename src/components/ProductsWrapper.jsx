import React, { useEffect, useState } from 'react'
import Card from './Card'

import { getProducts } from '../util/api'

function ProductsWrapper() {

    const [products, setProducts] = useState([])

    useEffect(() => {
        getProducts()
            .then(
                data => setProducts(data)
            )
            .catch( err => console.error(err))
    }, [])
    

    return (
        <div style={{ display: 'flex'}}>
            <div className="card__wrapper">
                {
                    products.map(
                        product =>
                            <Card 
                                key={product.id}
                                {...product}
                            />
                    )
                }
            </div>
        </div>
    )
}

export default ProductsWrapper