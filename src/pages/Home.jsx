import React from "react";
import { useLocation } from "react-router-dom";
import ProductsWrapper from "../components/ProductsWrapper";
import Text from "../components/Text";

function Home() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get('search');

    return (
        <>
            <div className='home__title'>
                <Text renderAs="h2" content="Lista de productos"/>
            </div>
            <div className='home__container'>
                <ProductsWrapper searchTerm={searchTerm} />
            </div> 
        </>
    );
}

export default Home;