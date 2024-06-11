import React, { useEffect, useState } from 'react'
import Card from './Card'
import { getProducts } from '../util/api'

function ProductsWrapper({ searchTerm }) {
    const [products, setProducts] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        getProducts()
            .then(data => {
                if (Array.isArray(data)) {
                    setProducts(data);
                } else {
                    console.error("La respuesta de la API no es un array:", data);
                    setError("Error al obtener los productos");
                }
            })
            .catch(err => {
                console.error(err);
                setError("Error al obtener los productos");
            });
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

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
                        <Card key={product._id} {...product} />
                    ))
                )}
            </div>
        </div>
    );
}

export default ProductsWrapper;

