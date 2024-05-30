import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../util/api";
import Counter from "../components/Counter";
import { CartContext } from "../context/CartContext";

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
                    </div>
                    <div className="gallery__thumbnails">
                        <img
                            className="gallery__thumbnails__thumbnail"
                            src={movieData.img2}
                            alt={movieData.name}
                            onClick={() => changeImage(1)}
                        />
                        <img
                            className="gallery__thumbnails__thumbnail"
                            src={movieData.img3}
                            alt={movieData.name}
                            onClick={() => changeImage(2)}
                        />
                        <img
                            className="gallery__thumbnails__thumbnail"
                            src={movieData.img4}
                            alt={movieData.name}
                            onClick={() => changeImage(3)}
                        />
                        <img
                            className="gallery__thumbnails__thumbnail"
                            src={movieData.img5}
                            alt={movieData.name}
                            onClick={() => changeImage(4)}
                        />
                    </div>
                </div>

                <div className="details">
                    <h2 className="details__category">
                        Categoria: {movieData.category}
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
        </div>
    );
}

export default Detail;
