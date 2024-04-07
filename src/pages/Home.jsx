import ProductsWrapper from "../components/ProductsWrapper";
import Text from "../components/Text";

function Home() {
    return (
        <>
        <div className='home__container'>
            <Text renderAs="h2" content="Lista de productos"/>
         </div>   
        <ProductsWrapper />
        </>
    )
}

export default Home