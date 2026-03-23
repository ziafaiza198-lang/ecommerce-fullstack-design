import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import CategorySection from "../components/CategorySection";
import NewArrivals from "../components/NewArrivals";
import TopSelling from "../components/TopSelling";
import PromoBanner from "../components/PromoBanner";
import Reviews from "../components/Reviews";
import reviewsData from "../data/reviewsData";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";


function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center p-10 text-xl">Loading products...</p>;

  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategorySection />

      {/* Featured Products */}
      <section className="py-12 container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.slice(17, 26).map(product => (
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

      {/* New Arrivals */}
      <NewArrivals products={products.slice(15, 19)} />

      {/* Top Selling */}
      <TopSelling products={products.slice(9, 13)} />



      <PromoBanner />
      <Reviews reviews={reviewsData} />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default Home;
