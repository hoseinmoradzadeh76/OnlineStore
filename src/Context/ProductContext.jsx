// ProductContext.js
import React, { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  // وقتی دسته‌بندی یا جستجو تغییر کنه، صفحه اول میشه
  useEffect(() => {
    setCurrentPage(1);
  }, [categoryFilter, searchTerm]);

  return (
    <ProductContext.Provider
      value={{
        products,
        categoryFilter,
        setCategoryFilter,
        searchTerm,
        setSearchTerm,
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
