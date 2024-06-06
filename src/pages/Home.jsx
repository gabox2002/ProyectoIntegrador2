import React from "react";
import { useLocation } from "react-router-dom";
import ProductsWrapper from "../components/ProductsWrapper";
import Text from "../components/Text";
import { Link } from "react-router-dom";
import ScrollToTopOnMount from "../components/ScrollToTopOnMount"


function Home() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get('search');

    return (
        <>
            <div className='home__title'>
               <Link to="/"><Text renderAs="h2" content="Lista de productos" className="title"/></Link> 
            </div>
            <div className='home__container'>
                <ProductsWrapper searchTerm={searchTerm} />
            </div> 
            <ScrollToTopOnMount />
        </>
    );
}

export default Home;