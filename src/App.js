import { useRef } from "react";
import { ProductProvider } from "./Context/ProductContext";
import { CartProvider } from "./Context/CartContext";
import { UIProvider } from "./Context/UIContext";
import ProductCatalog from "./Components/ProductCatalog";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

function App() {
  const cartIconRef = useRef(null);
  return (
    <ProductProvider>
      <CartProvider>
        <UIProvider>
          <div className="flex flex-col min-h-screen">
            <Header cartIconRef={cartIconRef} />
            <main className="flex-grow py-20">
              <ProductCatalog cartIconRef={cartIconRef} />
            </main>
            <Footer />
          </div>
        </UIProvider>
      </CartProvider>
    </ProductProvider>
  );
}


export default App;
