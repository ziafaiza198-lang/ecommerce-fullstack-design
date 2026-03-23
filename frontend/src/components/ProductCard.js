import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function ProductCard({ id, name, price, image }) {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const handleClick = () => {
    navigate(`/product/${id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({ id, name, price, image, qty: 1 });
  };

  return (
    <div
      onClick={handleClick}
       className="bg-white rounded-2xl p-4 shadow hover:shadow-xl transition duration-300 cursor-pointer"
    >
      <img
        src={`http://localhost:5000${image}`}
        alt={name}
        className="w-full h-48 object-contain rounded-lg"
      />

      <h2 className="text-lg font-semibold mt-3">{name}</h2>
       <p className="text-blue-600 font-bold text-lg">${price}</p>
      <button
        className="w-full mt-3 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
