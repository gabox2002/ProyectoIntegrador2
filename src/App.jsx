import CartProvider from "./context/CartProvider";
import RouterApp from "./routes/RouterApp";

function App() {
    return (
        <CartProvider>
            <RouterApp />
        </CartProvider>
    );
}

export default App;
