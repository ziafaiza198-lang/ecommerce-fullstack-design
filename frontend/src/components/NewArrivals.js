import ProductCard from "./ProductCard";

function NewArrivals({ products }) {
  return (
    <section className="py-12 container mx-auto px-6">
      <h2 className="text-2xl font-bold mb-6">New Arrivals</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            id={product._id}
            name={product.name}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>
    </section>
  );
}

export default NewArrivals;
