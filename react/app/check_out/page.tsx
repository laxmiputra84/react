"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type CartItem = {
  id: number;
  name: string;
  price: number;
  qty: number; // ✅ same as View Cart
};

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // ✅ Total Bill (safe calculation)
  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.qty),
    0
  );

  return (
    <div style={container}>
      <h2 style={title}>🧾 Bill Summary</h2>

      {cart.length === 0 ? (
        <p style={empty}>Your cart is empty</p>
      ) : (
        <>
          {cart.map((item) => {
            const itemTotal = Number(item.price) * Number(item.qty);

            return (
              <div key={item.id} style={card}>
                <div>
                  <h4 style={{ margin: 0 }}>{item.name}</h4>
                  <p style={{ margin: "5px 0", color: "#555" }}>
                    Qty: {item.qty}
                  </p>
                </div>

                <div style={priceBox}>₹ {itemTotal}</div>
              </div>
            );
          })}

          {/* TOTAL BOX */}
          <div style={totalBox}>
            <p>Subtotal: ₹ {total}</p>
            <hr />
            <h2 style={{ margin: "10px 0" }}>Grand Total: ₹ {total}</h2>

            <button style={btn} onClick={() => router.push("/order")}>
              ➡ Proceed to Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const container = {
  padding: "20px",
  minHeight: "100vh",
  background: "linear-gradient(135deg,#fdfbfb,#ebedee)",
};

const title = {
  textAlign: "center" as const,
  marginBottom: "20px",
  fontSize: "26px",
};

const empty = {
  textAlign: "center" as const,
  fontSize: "18px",
  color: "gray",
};

const card = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: "#fff",
  padding: "15px",
  borderRadius: "12px",
  marginBottom: "12px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
};

const priceBox = {
  fontWeight: "bold",
  color: "#ff5722",
  fontSize: "17px",
};

const totalBox = {
  marginTop: "20px",
  background: "#fff",
  padding: "20px",
  borderRadius: "14px",
  textAlign: "center" as const,
  boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
};

const btn = {
  marginTop: "12px",
  padding: "12px 24px",
  background: "linear-gradient(135deg,#4caf50,#2e7d32)",
  color: "#fff",
  border: "none",
  borderRadius: "25px",
  cursor: "pointer",
  fontSize: "16px",
};
