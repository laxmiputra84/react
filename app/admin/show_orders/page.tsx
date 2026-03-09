"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type CartItem = {
  id: number;
  name: string;
  price: number;
  qty: number; // ✅ use qty (same as cart)
};

type OrderData = {
  name: string;
  phone: string;
  address: string;
  lat: number;
  lng: number;
  paymentType: string;
  onlineMethod?: string;
  cart: CartItem[];
};

export default function ShowOrderPage() {
  const [order, setOrder] = useState<OrderData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const data = localStorage.getItem("lastOrder");
    if (data) {
      setOrder(JSON.parse(data));
    }
  }, []);

  if (!order) {
    return <p style={{ textAlign: "center" }}>❌ No order found</p>;
  }

  // ✅ Safe total
const total = order.cart.reduce(
  (sum, item: any) =>
    sum + Number(item.price) * Number(item.qty ?? item.quantity ?? 0),
  0
);


  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🧾 Your Order</h2>

      {/* CUSTOMER DETAILS */}
      <div style={styles.card}>
        <h3>👤 Customer Details</h3>
        <p><b>Name:</b> {order.name}</p>
        <p><b>Phone:</b> {order.phone}</p>
        <p><b>Address:</b> {order.address}</p>
        <p>
          <b>Payment:</b>{" "}
          {order.paymentType === "cash"
            ? "Cash on Delivery"
            : order.onlineMethod}
        </p>
      </div>

      {/* ITEMS */}
      <div style={styles.card}>
        <h3>🛒 Items</h3>
        {order.cart.map((item) => (
          <div key={item.id} style={styles.row}>
            <span>
              {item.name} × {item.qty}
            </span>
            <span>₹ {Number(item.price) * Number(item.qty)}</span>
          </div>
        ))}
        <hr />
        <h3 style={{ textAlign: "right" }}>Total: ₹ {total}</h3>
      </div>

      {/* MAP */}
      <div style={styles.card}>
        <h3>📍 Delivery Location</h3>
        <iframe
          width="100%"
          height="200"
          style={{ borderRadius: "10px", border: "0" }}
          src={`https://maps.google.com/maps?q=${order.lat},${order.lng}&z=15&output=embed`}
        ></iframe>
      </div>

      <button
        style={styles.btn}
        onClick={() => router.push("/admin/show_orders")}
      >
        🏠 Back to Admin
      </button>
    </div>
  );
}

/* ---------- Styles ---------- */

const styles: any = {
  container: {
    padding: "15px",
    background: "#f9fafb",
    minHeight: "100vh",
  },
  title: {
    textAlign: "center",
    marginBottom: "12px",
  },
  card: {
    background: "white",
    padding: "12px",
    borderRadius: "10px",
    marginBottom: "12px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "6px",
  },
  btn: {
    width: "100%",
    background: "#22c55e",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
