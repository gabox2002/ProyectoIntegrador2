import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../util/api";
import Counter from "../components/Counter";
import { CartContext } from "../context/CartContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';

function Detail() {
    const { id } = useParams();
    const [movieData, setProduct] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { addMovie, removeMovie, moviesCartList } = useContext(CartContext);

    useEffect(() => {
        getProducts(id)
            .then((movieData) => {
                const productById = movieData.find(
                    (movieData) => movieData.id === id
                );
                if (productById) {
                    setProduct(productById);
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
    if (!movieData) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="product-container">
            <div className="content">
                <div className="gallery">
                    <div className="gallery__image-container">
                        <img
                            className="gallery_ppal"
                            src={movieData[`img${currentImageIndex + 1}`]}
                            alt={movieData.name}
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
                                src={movieData[`img${index}`]}
                                alt={movieData.name}
                                onClick={() => changeImage(index - 1)}
                            />
                        ))}
                    </div>
                </div>

                <div className="details">
                    <h2 className="details__category">
                        Categoría: {movieData.category}
                    </h2>
                    <h2 className="details__title">{movieData.name}</h2>
                    <p className="details__description">{movieData.longDesc}</p>
                    <p className="details__range">
                        Rango de edad: {movieData.ageFrom}-{movieData.ageTo}
                    </p>
                    <div className="details__price">
                        <Counter
                            id={id}
                            movieData={movieData}
                            initialValue={
                                moviesCartList.find((item) => item.id === id)
                                    ?.quantity || 0
                            }
                            addMovie={addMovie}
                            removeMovie={removeMovie}
                        />
                        <p>${movieData.price}</p>
                    </div>
                </div>
            </div>
            <ScrollToTopOnMount />
        </div>
    );
}

export default Detail;
