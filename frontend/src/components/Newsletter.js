import { useState } from "react";
import axios from "axios";

function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubscribe = async () => {
    if (!email) return;

    await axios.post("http://localhost:5000/api/subscribers", { email });

    alert("Subscribed!");
    setEmail("");
  };

  return (
    <div className="bg-blue-600 text-white text-center py-10">
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="px-4 py-2 rounded-l text-black" 
      />
      <button onClick={handleSubscribe} className="bg-black px-4 py-2 rounded-r">
        Subscribe
      </button>
    </div>
  );
}

export default Newsletter;
