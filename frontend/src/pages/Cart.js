import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Cart() {
  const { cart, removeFromCart, increaseQty, decreaseQty } =
    useContext(CartContext);

  // ✅ FIX: price is number now
  const total = cart.reduce((acc, item) => {
    return acc + item.price * item.qty;
  }, 0);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border p-4 mb-4"
            >
              <div className="flex items-center gap-4">
                {/* ✅ FIX: image path */}
                <img
                  src={`http://localhost:5000${item.image}`}
                  alt={item.name}
                  className="rounded-xl"
                />

                <div>
                  <h3 className="font-bold">{item.name}</h3>

                  {/* ✅ show price properly */}
                  <p>${item.price}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => decreaseQty(item.id)}
                  className="px-3 bg-gray-200"
                >
                  -
                </button>

                <span>{item.qty}</span>

                <button
                  onClick={() => increaseQty(item.id)}
                  className="px-3 bg-gray-200"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}

          {/* ✅ FIX: total */}
          <h2 className="text-2xl font-bold mt-6">
            Total: ${total}
          </h2>

          <Link to="/checkout">
            <button className="bg-green-600 text-white px-8 py-3 mt-6 rounded hover:bg-green-700">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Cart;
