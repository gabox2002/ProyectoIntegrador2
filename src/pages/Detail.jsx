import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../util/api';
import Counter from '../components/Counter';

function Detail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        getProductById(id)
            .then(data => setProduct(data))
            .catch(err => console.error(err));
    }, [id]);

    const changeImage = (index) => {
        setCurrentImageIndex(index);
    };

    if (!product) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="product-container">
            <div className="content">
                <article className="gallery">
                    <div className="gallery__image-container">
                        <img className="gallery_ppal" src={product[`img${currentImageIndex + 1}`]} alt={product.name} />
                    </div>
                    <div className="gallery__thumbnails">
                        <img className="gallery__thumbnails__thumbnail" src={product.img2} alt={product.name} onClick={() => changeImage(1)} />
                        <img className="gallery__thumbnails__thumbnail" src={product.img3} alt={product.name} onClick={() => changeImage(2)} />
                        <img className="gallery__thumbnails__thumbnail" src={product.img4} alt={product.name} onClick={() => changeImage(3)} />
                        <img className="gallery__thumbnails__thumbnail" src={product.img5} alt={product.name} onClick={() => changeImage(4)} />
                    </div>
                </article>

                <article className="details">
                    <h2 className="details__category">Categoria: {product.category}</h2>
                    <h2 className="details__title">{product.name}</h2>
                    <p className="details__description">{product.longDesc}</p>
                    <p className="details__range">Rango de edad: {product.ageFrom}-{product.ageTo}</p>
                    <div className="details__price">
                        <Counter id={id} />
                        <p>${product.price}</p>
                    </div>
                </article>
            </div>
        </div>
    );
}

export default Detail;
