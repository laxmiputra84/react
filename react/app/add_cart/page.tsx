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

export default function AddCartPage() {
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
      <h2 style={title}>🛒 My Cart</h2>

      {cart.length === 0 && <p>Your cart is empty</p>}

      {cart.map((item) => (
        <div key={item.id} style={card}>
          <img src={item.image} style={img} alt={item.name} />

          <div style={content}>
            <h3>{item.name}</h3>
            <p>₹ {item.price}</p>

            <div style={qtyRow}>
              <button style={qtyBtn} onClick={() => decreaseQty(item.id)}>
                -
              </button>
              <span>{item.qty}</span>
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
            style={orderBtn}
            onClick={() => router.push("/show_order")}
          >
            ✅ Place Order
          </button>
        </div>
      )}
    </div>
  );
}

/* STYLES */

const container = {
  padding: "20px",
  background: "#f2f2f2",
  minHeight: "100vh",
};

const title = {
  textAlign: "center" as const,
  marginBottom: "20px",
};

const card = {
  display: "flex",
  background: "#fff",
  marginBottom: "10px",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
};

const img = {
  width: "100px",
  height: "100px",
  objectFit: "cover" as const,
};

const content = {
  padding: "10px",
  flex: 1,
};

const qtyRow = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

const qtyBtn = {
  padding: "4px 10px",
  background: "#2196f3",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const removeBtn = {
  marginTop: "5px",
  background: "#f44336",
  color: "#fff",
  border: "none",
  padding: "5px 10px",
  borderRadius: "5px",
  cursor: "pointer",
};

const totalBox = {
  marginTop: "20px",
  background: "#fff",
  padding: "15px",
  borderRadius: "10px",
  textAlign: "center" as const,
};

const orderBtn = {
  marginTop: "10px",
  background: "#4caf50",
  color: "#fff",
  border: "none",
  padding: "10px 15px",
  borderRadius: "6px",
  cursor: "pointer",
};
