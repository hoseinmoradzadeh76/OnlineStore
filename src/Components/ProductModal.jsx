import { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const ProductModal = ({ product, onClose }) => {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  if (!product) return null;

  const inCart = !!cart[product.id];

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg w-full max-w-3xl p-6 relative
             mx-4 my-8
             max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-700 text-xl font-bold"
        >
          <FontAwesomeIcon icon={faTimes} size="lg" color="red" />
        </button>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <img
              src={product.image}
              alt={product.title}
              className="w-32 h-32 md:w-auto md:h-auto max-w-xs max-h-80 object-contain transform transition-transform duration-300 hover:scale-110"
            />

          </div>

          <div className="flex flex-col flex-grow">
            <h2 className="md:text-2xl text-md font-bold mb-4">{product.title}</h2>
            <p className="mb-4 text-xs md:text-lg">{product.description}</p>
            <p className="font-bold md:text-lg mb-4">{product.price} $</p>

            <div className="flex gap-4">
              {!inCart ? (
                <button
                  onClick={() => addToCart(product)}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Add to cart
                </button>
              ) : (
                <button
                  onClick={() => removeFromCart(product.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Remove from cart
                </button>
              )}
              <button
                onClick={onClose}
                className="border border-gray-500 px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
