import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import axios from "axios"; // ✅ Import axios for backend requests

function Checkout() {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const { cart, clearCart } = useContext(CartContext); // ✅ clearCart optional
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value
    });
  };

  // ✅ Form validation
  const validate = () => {
    let newErrors = {};

    if (!customer.name) {
      newErrors.name = "Name is required";
    } else if (/\d/.test(customer.name)) {
      newErrors.name = "Name cannot contain numbers";
    }

    if (!customer.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(customer.email)) {
      newErrors.email = "Enter valid email";
    }

    if (!customer.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d+$/.test(customer.phone)) {
      newErrors.phone = "Phone must contain only numbers";
    }

    if (!customer.address) {
      newErrors.address = "Address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Handle order + send to backend
const handleOrder = async () => {
  if (!validate()) return;

  try {
    await axios.post("http://localhost:5000/api/orders", {
      customer,
      items: cart,
      total: cart.reduce((acc, item) => acc + item.price * item.qty, 0)
    });

    alert("Order placed successfully!");
    setCustomer({ name: "", email: "", phone: "", address: "" });
    clearCart(); // Cart context me ek function add karo items clear karne ke liye
  } catch (err) {
    console.log(err);
    alert("Error placing order!");
  }
};



  // ✅ Calculate total
  const total = cart.reduce(
    (acc, item) => acc + Number(item.price) * item.qty,
    0
  );

  return (
    <div className="p-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {orderPlaced ? (
  <div className="text-center">
    <h2 className="text-3xl font-bold text-green-600">
      🎉 Order Placed Successfully!
    </h2>
    <p className="mt-4">Thank you for your purchase ❤️</p>
  </div>
) : cart.length === 0 ? (
  <p>Your cart is empty</p>
      ) : (
        <div>

          <h2 className="text-xl font-semibold mb-4">Customer Details</h2>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={customer.name}
            onChange={handleChange}
            className="w-full border p-3 mb-1 rounded"
          />
          {errors.name && <p className="text-red-500 mb-2">{errors.name}</p>}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={customer.email}
            onChange={handleChange}
            className="w-full border p-3 mb-1 rounded"
          />
          {errors.email && <p className="text-red-500 mb-2">{errors.email}</p>}

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={customer.phone}
            onChange={handleChange}
            className="w-full border p-3 mb-1 rounded"
          />
          {errors.phone && <p className="text-red-500 mb-2">{errors.phone}</p>}

          <textarea
            name="address"
            placeholder="Delivery Address"
            value={customer.address}
            onChange={handleChange}
            className="w-full border p-3 mb-1 rounded"
          />
          {errors.address && <p className="text-red-500 mb-4">{errors.address}</p>}

          {/* Order Summary */}
          <h2 className="text-xl font-semibold mt-6 mb-4">Order Summary</h2>

          {cart.map((item) => (
            <div key={item.id} className="flex justify-between mb-3">
              <span>{item.name} x {item.qty}</span>
              <span>${Number(item.price) * item.qty}</span>
            </div>
          ))}

          <h2 className="text-2xl font-bold mt-6">
            Total: ${total}
          </h2>

          <button
            onClick={handleOrder}
            className="bg-blue-600 text-white px-8 py-3 mt-6 rounded hover:bg-blue-700"
          >
            Place Order
          </button>

        </div>
      )}
    </div>
  );
}

export default Checkout;
