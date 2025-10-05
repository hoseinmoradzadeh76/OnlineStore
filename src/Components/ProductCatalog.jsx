import React, { useContext, useEffect } from "react";
import Slider from "react-slick";
import { ProductContext } from "../Context/ProductContext";
import { CartContext } from "../Context/CartContext";
import { UIContext } from "../Context/UIContext";
import ProductModal from "./ProductModal";
import CartPage from "./CartPage";
import CategoryFilter from "./CategoryFilter";
import Pagination from "./Pagination";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PRODUCTS_PER_PAGE = 6;

export default function ProductCatalog({ cartIconRef }) {
  const {
    products,
    categoryFilter,
    setCategoryFilter,
    searchTerm,
    currentPage,
    setCurrentPage,
  } = useContext(ProductContext);

  const { addToCart } = useContext(CartContext);
  const { checkout, setCheckout, selectedProduct, setSelectedProduct } = useContext(UIContext);


  const filteredByCategory =
    categoryFilter === "all"
      ? products
      : categoryFilter === "clothing"
        ? products.filter(
          (p) => p.category === "men's clothing" || p.category === "women's clothing"
        )
        : products.filter((p) => p.category === categoryFilter);


  const filteredBySearch = filteredByCategory.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const totalPages = Math.ceil(filteredBySearch.length / PRODUCTS_PER_PAGE);


  const currentProducts = filteredBySearch.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [categoryFilter, searchTerm, setCurrentPage]);

  const sliderImagesCount = 8;
  const shuffledProducts = [...products].sort(() => 0.5 - Math.random());
  const sliderImages = shuffledProducts.slice(0, sliderImagesCount);

  // react-slick
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 }
      },
    ],
  };


  const flyToCart = (imgRef) => {
    if (!imgRef.current || !cartIconRef.current) return;

    const img = imgRef.current;
    const cartIcon = cartIconRef.current;

    const flyImg = img.cloneNode(true);
    const imgRect = img.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();

    flyImg.style.position = "fixed";
    flyImg.style.left = imgRect.left + "px";
    flyImg.style.top = imgRect.top + "px";
    flyImg.style.width = imgRect.width + "px";
    flyImg.style.height = imgRect.height + "px";
    flyImg.style.transition = "all 0.7s ease-in-out";
    flyImg.style.zIndex = 1000;
    flyImg.style.pointerEvents = "none";
    flyImg.style.borderRadius = "8px";

    document.body.appendChild(flyImg);

    requestAnimationFrame(() => {
      flyImg.style.left = cartRect.left + cartRect.width / 2 - imgRect.width / 4 + "px";
      flyImg.style.top = cartRect.top + cartRect.height / 2 - imgRect.height / 4 + "px";
      flyImg.style.width = imgRect.width / 2 + "px";
      flyImg.style.height = imgRect.height / 2 + "px";
      flyImg.style.opacity = "0.5";
    });

    flyImg.addEventListener("transitionend", () => {
      flyImg.remove();
    });
  };

  if (checkout) {
    return (
      <CartPage
        setCheckout={setCheckout}
      />
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto p-6 flex flex-col gap-6">


        <div className="col-span-full w-full mb-8 ">
          <Slider {...sliderSettings}>
            {sliderImages.map((product) => (
              <div
                key={`slider-${product.id}`}
                className="p-4 cursor-pointer border-8 border-blue-400"
                onClick={() => setSelectedProduct(product)}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="mx-auto h-40 object-contain rounded"
                />
                <h3 className="text-center lg:text-base text-sm text-gray-700 font-semibold truncate">{product.title}</h3>
                <p className="text-center text-gray-600 lg:text-base text-sm font-bold mt-1">{product.price} $</p>
              </div>
            ))}
          </Slider>
        </div>

        {/* Content - 70% */}
        <h1 className="text-center text-3xl font-bold lg:text-3xl text-xl mt-8">Store products</h1>
        <div className="flex flex-col md:flex-row gap-6">

          <div className="order-2 md:order-1 flex-[1_1_80%]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {currentProducts.length === 0 ? (
                <p className="col-span-full text-center text-gray-500">
                  No products found.
                </p>
              ) : (
                currentProducts.map((product) => {
                  const imgRef = React.createRef();

                  return (
                    <div
                      key={product.id}
                      className="border rounded p-4 flex flex-col justify-between cursor-pointer"
                      onClick={() => setSelectedProduct(product)}
                    >
                      <img
                        ref={imgRef}
                        src={product.image}
                        alt={product.title}
                        className="md:h-48 h-40 object-contain mb-4"
                      />
                      <h2 className="font-semibold lg:text-lg text-base mb-2">{product.title}</h2>
                      <p className="text-gray-700 lg:text-base text-sm mb-4">
                        {product.description.slice(0, 100)}...
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold lg:text-lg text-base">{product.price} $</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            flyToCart(imgRef);
                            addToCart(product);
                          }}
                          className="bg-green-500 md:text-sm text-xs text-white px-3 py-2  rounded"
                        >
                          Add to cart
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Pagination */}
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>

          {/* Sidebar (Category Filter) - 30% */}
          <div className="order-1 md:order-2 flex-[1_1_20%] ">
            <CategoryFilter
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
            />
          </div>
        </div>
        {/* Product Modal */}
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </div>
    </>
  );
}
