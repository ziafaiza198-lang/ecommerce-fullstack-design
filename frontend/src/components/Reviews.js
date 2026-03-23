import { useState } from "react";

const Reviews = () => {
  const [reviews, setReviews] = useState([
    { name: "Sara", comment: "Amazing products!", rating: 5 },
    { name: "Ali", comment: "Fast delivery and great quality.", rating: 4 },
    { name: "Nida", comment: "Excellent customer service!", rating: 5 },
  ]);

  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !comment || rating < 1 || rating > 5) {
      setError("Please fill all fields correctly.");
      return;
    }
    setError("");
    const newReview = { name, comment, rating };
    setReviews([newReview, ...reviews]); // newest first
    setName("");
    setComment("");
    setRating(5);
  };

  return (
    <section className="py-12 bg-gray-50">
      <h2 className="text-2xl font-bold text-center mb-8">Customer Reviews</h2>

      {/* Reviews List */}
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        {reviews.map((r, i) => (
          <div key={i} className="bg-white p-6 rounded shadow text-center hover:shadow-lg transition">
            <p className="text-gray-700 mb-2">"{r.comment}"</p>
            <p className="text-yellow-400 mb-2">{"⭐".repeat(r.rating)}</p>
            <p className="font-bold">{r.name}</p>
          </div>
        ))}
      </div>

      {/* Submit Review Form */}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded shadow">
        <h3 className="text-xl font-bold mb-4">Submit Your Review</h3>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-2 px-3 py-2 border rounded"
        />
        <textarea
          placeholder="Your Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full mb-2 px-3 py-2 border rounded"
        />
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value))}
          className="w-full mb-4 px-3 py-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Submit Review
        </button>
      </form>
    </section>
  );
};

export default Reviews;
