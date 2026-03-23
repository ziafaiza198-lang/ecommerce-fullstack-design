import { useNavigate } from "react-router-dom";
import { useState } from "react";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchTerm.trim() === "") return;

    // ✅ ALWAYS go to products page with search
    navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex justify-center mb-6">
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border px-4 py-2 w-64 rounded-l"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-r"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
