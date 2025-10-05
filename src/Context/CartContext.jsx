// CartContext.js
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : {};
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const newCart = { ...prev };
      if (newCart[product.id]) {
        newCart[product.id] = {
          ...newCart[product.id],              
          quantity: newCart[product.id].quantity + 1
        };
      } else {
        newCart[product.id] = { ...product, quantity: 1 };
      }
      return newCart;
    });
  };


  const removeFromCart = (productId) => {
    setCart((prev) => {
      const newCart = { ...prev };
      delete newCart[productId];
      return newCart;
    });
  };

  const clearCart = () => setCart({});

  const totalPrice = Object.values(cart).reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const increaseQuantity = (id) => {
    setCart(prevCart => {
      const updatedCart = { ...prevCart };
      if (updatedCart[id]) {
        updatedCart[id] = {
          ...updatedCart[id],          
          quantity: updatedCart[id].quantity + 1,  
        };
      }
      return updatedCart;
    });
  };

  const decreaseQuantity = (id) => {
    setCart(prevCart => {
      const updatedCart = { ...prevCart };
      if (updatedCart[id] && updatedCart[id].quantity > 1) {
        updatedCart[id] = {
          ...updatedCart[id],   
          quantity: updatedCart[id].quantity - 1, 
        };
      }
      return updatedCart;
    });
  };


  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}
