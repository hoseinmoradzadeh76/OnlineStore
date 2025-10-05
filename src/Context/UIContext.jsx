// UIContext.js
import React, { createContext, useState } from "react";

export const UIContext = createContext();

export function UIProvider({ children }) {
  const [checkout, setCheckout] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <UIContext.Provider
      value={{ checkout, setCheckout, selectedProduct, setSelectedProduct }}
    >
      {children}
    </UIContext.Provider>
  );
}
