"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type CartItem = {
  id: number;
  name: string;
  price: number;
  qty: number;
  image: string;
};

export default function ViewCartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(data);
  }, []);

  const updateCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const increaseQty = (id: number) => {
    updateCart(
      cart.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id: number) => {
    updateCart(
      cart.map((item) =>
        item.id === id && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    if (confirm("Remove this item from cart?")) {
      updateCart(cart.filter((item) => item.id !== id));
    }
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div style={container}>
      <h2 style={title}>🛒 Your Cart</h2>

      {cart.length === 0 && <p style={empty}>Your cart is empty</p>}

      {cart.map((item, index) => (
        <div key={item.id + "-" + index} style={card}>
          <img src={item.image} style={img} alt={item.name} />

          <div style={content}>
            <h3>{item.name}</h3>
            <p style={price}>₹ {item.price}</p>

            <div style={qtyRow}>
              <button style={qtyBtn} onClick={() => decreaseQty(item.id)}>
                −
              </button>
              <span style={qty}>{item.qty}</span>
              <button style={qtyBtn} onClick={() => increaseQty(item.id)}>
                +
              </button>
            </div>

            <button style={removeBtn} onClick={() => removeItem(item.id)}>
              🗑 Remove
            </button>
          </div>
        </div>
      ))}

      {cart.length > 0 && (
        <div style={totalBox}>
          <h3>Total: ₹ {totalPrice}</h3>
          <button
            style={checkoutBtn}
            onClick={() => router.push("/check_out")}
          >
            ✅ Checkout
          </button>
        </div>
      )}
    </div>
  );
}

/* STYLES + ANIMATION */

const container = {
  padding: "20px",
  minHeight: "100vh",
  background: "linear-gradient(135deg,#fdfbfb,#ebedee)",
};

const title = {
  textAlign: "center" as const,
  marginBottom: "20px",
  fontSize: "28px",
};

const empty = {
  textAlign: "center" as const,
  fontSize: "18px",
};

const card = {
  display: "flex",
  background: "#fff",
  marginBottom: "15px",
  borderRadius: "15px",
  boxShadow: "0 6px 15px rgba(0,0,0,0.15)",
  animation: "fadeIn 0.5s ease",
  transition: "transform 0.3s",
};

const img = {
  width: "120px",
  height: "120px",
  objectFit: "cover" as const,
  borderRadius: "15px 0 0 15px",
};

const content = {
  padding: "12px",
  flex: 1,
};

const price = {
  color: "#ff5722",
  fontWeight: "bold",
};

const qtyRow = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  marginTop: "5px",
};

const qty = {
  fontSize: "18px",
  fontWeight: "bold",
};

const qtyBtn = {
  padding: "6px 14px",
  border: "none",
  borderRadius: "50%",
  background: "#2196f3",
  color: "#fff",
  cursor: "pointer",
  transition: "0.2s",
};

const removeBtn = {
  marginTop: "8px",
  background: "#f44336",
  color: "#fff",
  border: "none",
  padding: "6px 12px",
  borderRadius: "8px",
  cursor: "pointer",
};

const totalBox = {
  marginTop: "25px",
  background: "#fff",
  padding: "20px",
  borderRadius: "15px",
  textAlign: "center" as const,
  boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
  animation: "slideUp 0.6s ease",
};

const checkoutBtn = {
  marginTop: "12px",
  background: "linear-gradient(135deg,#4caf50,#2e7d32)",
  color: "#fff",
  border: "none",
  padding: "12px 20px",
  borderRadius: "25px",
  cursor: "pointer",
  fontSize: "16px",
};

/* Add animation in global.css */
