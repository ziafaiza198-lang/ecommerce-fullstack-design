import React from "react";

const HeroSection = () => {
  return (
    <section className="relative w-full h-[500px] sm:h-[600px] lg:h-[700px]">
      {/* Hero Image */}
      <img
        src="/images/he.jpg"
        alt="Hero Banner"
        className="w-full h-full object-cover"
      />

      {/* Overlay with Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-center">
          New Summer Collection
        </h1>
        <p className="text-lg sm:text-xl lg:text-2xl mb-6 text-center">
          Discover the latest trends in fashion.
        </p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition">
          Shop Now
        </button>
      </div>
    </section>
  );
};

export default HeroSection;


