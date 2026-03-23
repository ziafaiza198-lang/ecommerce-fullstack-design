const PromoBanner = () => {

  const scrollToCategories = () => {
    const section = document.getElementById("categories");
    section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-blue-600 text-white py-12 text-center my-12 rounded-lg mx-4">

      <h2 className="text-3xl font-bold mb-2">
        Summer Sale
      </h2>

      <p className="mb-4">
        Up To 50% Off on Selected Items
      </p>

      <button
        onClick={scrollToCategories}
        className="bg-white text-blue-600 px-6 py-2 rounded hover:bg-gray-200"
      >
        Shop Now
      </button>

    </div>
  );
};

export default PromoBanner;

