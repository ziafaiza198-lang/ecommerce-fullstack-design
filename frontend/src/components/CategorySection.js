import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CategorySection() {
  const navigate = useNavigate();

  const [priceRange, setPriceRange] = useState([0, 200]); // $0-$200

  const categories = [
    { name: "T-Shirts", image: "/images/tshirt1.jpg" },
    { name: "Shirts", image: "/images/shirt.jpg" },
    { name: "Jeans", image: "/images/jeans1.jpg" },
    { name: "Shoes", image: "/images/newsh.jpg" },
    { name: "Jackets", image: "/images/newjacket.jpg" },
    { name: "Bags", image: "/images/bag.jpg" },
    { name: "Hats", image: "/images/hat.jpg" },
    { name: "Formal Shoes", image: "/images/shoes2.jpg" },
  ];

  const handleCategoryClick = (category) => {
    navigate(
      `/products?category=${encodeURIComponent(
        category
      )}&maxPrice=${priceRange[1]}`
    );
  };

  return (
    <section id="categories" className="py-16 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-10">
        Browse By Category
      </h2>

      {/* Price Filter */}
      <div className="my-4 flex justify-center items-center gap-4">
        <span>Max Price: ${priceRange[1]}</span>
        <input
          type="range"
          min="0"
          max="200"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
          className="w-64"
        />
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6">
        {categories.map((cat, index) => (
          <div
            key={index}
            onClick={() => handleCategoryClick(cat.name)}
            className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition duration-300 cursor-pointer"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="mx-auto h-32 object-contain mb-4"
            />
            <h3 className="text-lg font-semibold text-center">{cat.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CategorySection;
