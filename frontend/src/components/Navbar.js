import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
   <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
      
      {/* Logo */}
      <div
         className="text-3xl font-extrabold text-blue-600 cursor-pointer"
        onClick={() => navigate("/")}
      >
        E-Shop
      </div>

      {/* Search Bar (centered on large screens) */}
      <form onSubmit={handleSearch} className="flex items-center w-1/3">
  <input
    type="text"
    placeholder="Search products..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="border rounded-full px-4 py-2 w-80 focus:outline-none focus:ring-2 focus:ring-blue-400"
  />
  <button
    type="submit"
    className="transition hover:scale-105"
  >
    Search
  </button>
</form>


      {/* Links + Cart */}
      <div className="flex gap-6 items-center">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <Link to="/products" className="hover:text-blue-600">Products</Link>
        <Link to="/cart" className="relative hover:text-blue-600">
          🛒
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {cart.length}
            </span>
          )}
        </Link>
      </div>

    </nav>
  );
}

export default Navbar;
