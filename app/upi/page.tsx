"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UpiPage() {
  const router = useRouter();
  const [upiId, setUpiId] = useState("");

  const payNow = () => {
    if (!upiId) {
      alert("⚠ Please enter UPI ID");
      return;
    }

    // simple UPI validation
    const upiRegex = /^[\w.-]+@[\w.-]+$/;
    if (!upiRegex.test(upiId)) {
      alert("⚠ Enter valid UPI ID (example: test@upi)");
      return;
    }

    const order = JSON.parse(localStorage.getItem("lastOrder") || "null");
    if (!order) {
      alert("No order found");
      return;
    }

    // ✅ update lastOrder
    order.paymentType = "online";
    order.onlineMethod = "PhonePe";
    order.upiId = upiId;

    localStorage.setItem("lastOrder", JSON.stringify(order));

    // ✅ update admin orders[]
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    const updatedOrders = orders.map((o: any) =>
      o.id === order.id ? { ...o, ...order } : o
    );
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    alert("✅ Payment Successful via UPI");

    // 👉 user order summary page
    router.push("/show_order");
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2 style={title}>📱 UPI Payment</h2>
        <p style={subtitle}>Pay securely using your UPI ID</p>

        <div style={upiIcons}>
          <span>GPay</span>
          <span>PhonePe</span>
          <span>Paytm</span>
          <span>BHIM</span>
        </div>

        <input
          style={input}
          placeholder="Enter UPI ID (eg: test@upi)"
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
        />

        <button style={btn} onClick={payNow}>
          💳 Pay Now
        </button>

        <p style={note}>🔒 Secure UPI transaction (demo)</p>
      </div>
    </div>
  );
}

/* -------- STYLES -------- */

const container = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg,#667eea,#764ba2)",
};

const card = {
  width: "100%",
  maxWidth: "380px",
  background: "#fff",
  padding: "25px",
  borderRadius: "16px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
  textAlign: "center" as const,
};

const title = { marginBottom: "5px" };

const subtitle = {
  color: "#555",
  marginBottom: "15px",
  fontSize: "14px",
};

const upiIcons = {
  display: "flex",
  justifyContent: "space-around",
  marginBottom: "15px",
  fontWeight: "bold",
  color: "#4f46e5",
};

const input = {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  marginBottom: "15px",
  fontSize: "15px",
};

const btn = {
  width: "100%",
  padding: "12px",
  borderRadius: "25px",
  border: "none",
  background: "linear-gradient(135deg,#22c55e,#16a34a)",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  cursor: "pointer",
};

const note = {
  marginTop: "10px",
  fontSize: "12px",
  color: "#666",
};
