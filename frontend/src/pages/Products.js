import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";

function Products() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const categoryFilter = queryParams.get("category");
  const searchQuery = queryParams.get("search") || "";

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  // ✅ FIXED FILTER (category + search dono)
  const filteredProducts = products
    .filter(p => {
      if (!categoryFilter) return true;
      return p.category.toLowerCase() === categoryFilter.toLowerCase();
    })
    .filter(p => {
      const search = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(search) ||
        p.category.toLowerCase().includes(search)
      );
    });

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6 text-center">
        {categoryFilter || "All Products"}
      </h1>

      {/* Search bar */}
      <SearchBar />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {filteredProducts.length === 0 ? (
          <p className="text-center col-span-4">No products found</p>
        ) : (
          filteredProducts.map(product => (
            <ProductCard
              key={product._id}
              id={product._id}
              name={product.name}
              price={product.price}
              image={product.image}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Products;
