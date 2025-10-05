import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart,faTrash } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../Context/CartContext";
import PaymentPage from "./PaymentPage";

function CartPage({ setCheckout }) {
  const {
    cart,
    removeFromCart,
    clearCart,
    totalPrice,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);

  const [showPayment, setShowPayment] = useState(false);

  if (showPayment) {
    return (
      <PaymentPage
        onCancel={() => setShowPayment(false)}
        onSuccess={() => {
          
          clearCart();
          setShowPayment(false);
          setCheckout(false);
        }}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 min-h-[300px] flex flex-col justify-center">
      {Object.values(cart).length === 0 ? (
        <div className="flex flex-col items-center ">
          <FontAwesomeIcon icon={faShoppingCart} size="6x" color="#888888" />
          <p className="mt-4 text-lg">Your shopping cart is empty.</p>
          <p className="mt-4 text-md text-gray-500">
            You can go to the store page to view the products.
          </p>
          <button
            onClick={() => setCheckout(false)}
            className="mt-6 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Return to the store
          </button>
        </div>
      ) : (
        <div className="max-w-7xl p-4 flex flex-col md:flex-row gap-8">
          {/* لیست کالاها */}
          <ul className="flex-[1_1_70%]">
            {Object.values(cart).map((item) => (
              <li key={item.id} className="flex items-center py-2 border-b w-full">
                <div className="flex items-center gap-4 w-full">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="md:w-28 md:h-28 w-20 h-24 object-cover rounded"
                  />
                  <div className="w-full">
                    
                    <span className="flex items-center text-xs md:text-lg gap-4">{item.title}</span>
                    <div className="flex gap-8 w-full items-center justify-between py-4">
                      <span className="flex items-center gap-2">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          disabled={item.quantity <= 1}
                          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold px-2 rounded disabled:opacity-50"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold px-2 rounded"
                        >
                          +
                        </button>
                      </span>
                      <span className="text-xs md:text-lg text-green-500 whitespace-nowrap">price : {(item.price * item.quantity).toFixed(2)} $</span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-white px-4 py-2 rounded"
                      >
                        <FontAwesomeIcon className="text-base md:text-xl" icon={faTrash} color="red"/>
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* سایدبار سمت راست */}
          <div className="flex-[1_1_30%] p-4 border rounded shadow-md  flex flex-col gap-4 h-[190px]">
            <p className="font-bold text-md flex justify-between">
              <span>Total shopping cart:</span>{" "}
              <span className="text-green-500">{totalPrice.toFixed(2)} $</span>
            </p>
            <button
              onClick={() => setShowPayment(true)}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Order completion
            </button>
            <button
              onClick={() => setCheckout(false)}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Return to the store
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
