import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import axios from "axios";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);     // ✅ always top-level
  const [relatedProducts, setRelatedProducts] = useState([]); // ✅ top-level
  const [loading, setLoading] = useState(true);     // ✅ top-level
  const [qty, setQty] = useState(1);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [loadingBuy, setLoadingBuy] = useState(false);
  const navigate = useNavigate();

  // ✅ fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
        setLoading(false);

        // fetch related after product loaded
        const resAll = await axios.get("http://localhost:5000/api/products");
        const related = resAll.data.filter(
          (p) => p.category === res.data.category && p._id !== res.data._id
        ).slice(0, 4);
        setRelatedProducts(related);

      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <p>Loading product...</p>;
  if (!product) return <p>No product found!</p>;

  const handleAddToCart = () => {
    setLoadingAdd(true);
    setTimeout(() => {
      addToCart({ ...product, qty });
      setLoadingAdd(false);
      navigate("/cart");
    }, 500);
  };

  const handleBuyItNow = () => {
    setLoadingBuy(true);
    setTimeout(() => {
      addToCart({ ...product, qty });
      setLoadingBuy(false);
      navigate("/checkout");
    }, 500);
  };

  return (
    <div className="p-10">
      {/* Product Section */}
      <div className="flex flex-col md:flex-row gap-10">
        <div className="md:w-1/2">
          <img src={`http://localhost:5000${product.image}`} alt={product.name} className="w-full object-contain" />
        </div>

        <div className="md:w-1/2 flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-xl text-gray-700">${product.price}</p>
          <p className="text-gray-600">{product.description}</p>
<p className="text-sm text-gray-500">
  Stock: {product.stock > 0 ? "Available" : "Out of Stock"}
</p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-2">
            <button onClick={() => setQty(qty > 1 ? qty - 1 : 1)} className="px-3 py-1 bg-gray-200">-</button>
            <span>{qty}</span>
            <button onClick={() => setQty(qty + 1)} className="px-3 py-1 bg-gray-200">+</button>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button onClick={handleAddToCart} disabled={loadingAdd} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50">
              {loadingAdd ? "Processing..." : "Add to Cart"}
            </button>
            <button onClick={handleBuyItNow} disabled={loadingBuy} className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition disabled:opacity-50">
              {loadingBuy ? "Processing..." : "Buy It Now"}
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <h2 className="text-2xl font-bold mt-16 mb-6">Related Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {relatedProducts.map((item) => (
          <ProductCard key={item._id} id={item._id} name={item.name} price={`$${item.price}`} image={item.image} />
        ))}
      </div>

      
    </div>
  );
}

export default ProductDetails;
