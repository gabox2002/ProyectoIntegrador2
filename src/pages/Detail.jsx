import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../util/api";
import Counter from "../components/Counter";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';
import Text from "../components/Text"
import { Link } from "react-router-dom"

function Detail() {
    const { id } = useParams();
    const [productData, setProductData] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        getProducts()
            .then((products) => {
                const productById = products.find((product) => product._id === id);
                if (productById) {
                    setProductData(productById);
                } else {
                    console.error(`Product with ID ${id} not found`);
                }
            })
            .catch((err) => console.error(err));
    }, [id]);

    const changeImage = (index) => {
        setCurrentImageIndex(index);
    };

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 3 ? 0 : prevIndex + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? 3 : prevIndex - 1
        );
    };

    if (!productData) {
        return <div>Cargando...</div>;
    }

    return (
       
        <div className="product-container"> 
            <div className='product__title'>
               <Link to="/"><Text renderAs="h4" content="Lista de productos >" className="title"/></Link> 
            </div>
            <div className="content">
                <div className="gallery">
                    <div className="gallery__image-container">
                        <img
                            className="gallery_ppal"
                            src={productData[`img${currentImageIndex + 1}`]}
                            alt={productData.name}
                        />
                        <button onClick={prevImage} className="slider-button prev-button">
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        <button onClick={nextImage} className="slider-button next-button">
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    </div>
                    <div className="gallery__thumbnails">
                        {[1, 2, 3, 4].map((index) => (
                            <img
                                key={index}
                                className={`gallery__thumbnails__thumbnail ${currentImageIndex === index - 1 ? 'active' : ''}`}
                                src={productData[`img${index}`]}
                                alt={productData.name}
                                onClick={() => changeImage(index - 1)}
                            />
                        ))}
                    </div>
                </div>

                <div className="details">
                    <h2 className="details__category">
                        Categoría: {productData.category}
                    </h2>
                    <h2 className="details__title">{productData.name}</h2>
                    <p className="details__description">{productData.longDesc}</p>
                    <p className="details__range">
                        Rango de edad: {productData.ageFrom}-{productData.ageTo}
                    </p>
                    <div className="details__price">
                        <Counter _id={id} />
                        <p>${productData.price}</p>
                    </div>
                </div>
            </div>
            <ScrollToTopOnMount />
        </div>
    );
}

export default Detail;
