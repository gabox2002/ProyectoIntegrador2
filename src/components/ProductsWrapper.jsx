import React, { useEffect, useState } from 'react';
import Card from './Card';
import { getProducts } from '../util/api';

function ProductsWrapper({ searchTerm }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts()
            .then(data => setProducts(data))
            .catch(err => console.error(err));
    }, []);

    // Filtrar los productos basados en el término de búsqueda
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes((searchTerm || '').toLowerCase())
    );

    return (
        <div style={{ display: 'flex' }}>
            <div className="card__wrapper">
                {filteredProducts.length === 0 ? (
                    <p>Producto no encontrado</p>
                ) : (
                    filteredProducts.map(product => (
                        <Card key={product.id} {...product} />
                    ))
                )}
            </div>
        </div>
    );
}

export default ProductsWrapper;

