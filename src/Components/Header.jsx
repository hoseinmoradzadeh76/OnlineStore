
import { useContext } from "react";
import { ProductContext } from "../Context/ProductContext";
import { UIContext } from "../Context/UIContext";
import { CartContext } from "../Context/CartContext";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import SearchInput from "./SearchInput";


const Header = ({ cartIconRef }) => {
    const { searchTerm, setSearchTerm } = useContext(ProductContext);
    const { setCheckout } = useContext(UIContext);
    const { cart } = useContext(CartContext);

    const totalItems = Object.values(cart).reduce((acc, item) => acc + item.quantity, 0);

    return (
        <div className="fixed top-0 left-0 right-0 shadow-md bg-white z-50">
            <div className="max-w-7xl mx-auto p-4 flex flex-row items-center justify-between gap-4">

                <button onClick={()=>setCheckout(false)} className="md:text-2xl text-md flex items-center font-bold text-blue-600">
                    <img
                        src="/images/logo.jpg"
                        alt="Logo"
                        className="w-12 h-12 mr-3"
                    />
                    <span className="hidden md:block">Online <span className="text-blue-400">Store</span></span>


                </button>


                {/* جستجو */}
                <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

                {/* دکمه سبد خرید */}


                <button
                    ref={cartIconRef}
                    onClick={() => setCheckout(true)}
                    className="relative group px-4 py-2 rounded flex items-center justify-center w-12 h-12 hover:text-[#000]"
                >
                    {/* آیکون سبد خرید */}
                    <FontAwesomeIcon
                        icon={faShoppingCart}
                        
                        className="text-gray-500 text-2xl group-hover:text-black transition-colors duration-300"
                    />

                    {/* عدد روی آیکون */}
                    {totalItems > 0 && (
                        <span className="absolute top-1 right-1 bg-red-600 text-white text-xs rounded-full px-1.5">
                            {totalItems}
                        </span>
                    )}
                </button>

            </div>
        </div>
    );
};

export default Header;
