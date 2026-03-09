"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OrderPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);

  const [paymentType, setPaymentType] = useState(""); // cash / online
  const [onlineMethod, setOnlineMethod] = useState(""); // GPay / PhonePe / Paytm / Card

  // 📍 Get Location
  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude);
        setLng(pos.coords.longitude);
      },
      () => alert("Location permission denied")
    );
  };

  // 💾 Save Order
  const saveOrder = () => {
    const orderData = {
      id: Date.now(),
      name,
      phone,
      address,
      lat,
      lng,
      paymentType,
      onlineMethod,
      cart: JSON.parse(localStorage.getItem("cart") || "[]"),
    };

    // last order
    localStorage.setItem("lastOrder", JSON.stringify(orderData));

    // all orders
    const oldOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    oldOrders.push(orderData);
    localStorage.setItem("orders", JSON.stringify(oldOrders));

    localStorage.removeItem("cart");
  };

  // ✅ Place Order
  const submitOrder = () => {
  if (!name || !phone || !address || !lat || !lng || !paymentType) {
    alert("⚠ Fill all details, allow location & choose payment");
    return;
  }

  if (paymentType === "online" && !onlineMethod) {
    alert("⚠ Select online payment method");
    return;
  }

  // 👉 PhonePe → go to UPI page
  if (paymentType === "online" && onlineMethod === "PhonePe") {
    saveOrder();
    router.push("/upi");
    return;
  }

  // 👉 Other methods (Cash, GPay, Paytm, Card)
  alert(
    paymentType === "cash"
      ? "Order placed (Cash on Delivery)"
      : "Payment Successful via " + onlineMethod
  );

  saveOrder();
  router.push("/show_orders");
};


  return (
    <div style={container}>
      <h2 style={title}>📦 Delivery & Payment</h2>

      <div style={form}>
        <input
          style={input}
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          style={input}
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <textarea
          style={textarea}
          placeholder="Full Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <button style={locBtn} onClick={getLocation}>
          📍 Use My Current Location
        </button>

        {lat && lng && (
          <iframe
            width="100%"
            height="180"
            style={{ borderRadius: "10px", border: "0", marginTop: "10px" }}
            src={`https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
          ></iframe>
        )}

        {/* PAYMENT TYPE */}
        <h3 style={{ marginTop: "15px" }}>💳 Payment Type</h3>

        <div style={payTypeBox}>
          <div
            style={{
              ...payCard,
              border:
                paymentType === "cash"
                  ? "2px solid #4caf50"
                  : "2px solid #ddd",
            }}
            onClick={() => {
              setPaymentType("cash");
              setOnlineMethod("");
            }}
          >
            💵 Cash on Delivery
          </div>

          <div
            style={{
              ...payCard,
              border:
                paymentType === "online"
                  ? "2px solid #4caf50"
                  : "2px solid #ddd",
            }}
            onClick={() => setPaymentType("online")}
          >
            💳 Online Payment
          </div>
        </div>

        {/* ONLINE METHODS */}
        {paymentType === "online" && (
          <>
            <h4 style={{ marginTop: "10px" }}>Select Online Method</h4>
            <div style={onlineGrid}>
              {["GPay", "PhonePe", "Paytm", "Card"].map((method) => (
                <div
                  key={method}
                  style={{
                    ...onlineCard,
                    border:
                      onlineMethod === method
                        ? "2px solid #2196f3"
                        : "2px solid #ddd",
                  }}
                  onClick={() => setOnlineMethod(method)}
                >
                  {method}
                </div>
              ))}
            </div>
          </>
        )}

        <button style={btn} onClick={submitOrder}>
          ✅ Place Order
        </button>
      </div>
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
};

const form = {
  maxWidth: "430px",
  margin: "auto",
  background: "#fff",
  padding: "20px",
  borderRadius: "14px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
};

const input = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const textarea = {
  width: "100%",
  padding: "10px",
  height: "80px",
  marginBottom: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const locBtn = {
  width: "100%",
  padding: "10px",
  background: "#2196f3",
  color: "#fff",
  border: "none",
  borderRadius: "20px",
  cursor: "pointer",
  marginBottom: "10px",
};

const payTypeBox = {
  display: "flex",
  gap: "10px",
  marginTop: "5px",
};

const payCard = {
  flex: 1,
  padding: "12px",
  textAlign: "center" as const,
  borderRadius: "10px",
  cursor: "pointer",
  background: "#f9fafb",
  fontWeight: "bold",
};

const onlineGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "10px",
  marginTop: "8px",
};

const onlineCard = {
  padding: "10px",
  textAlign: "center" as const,
  borderRadius: "8px",
  cursor: "pointer",
  background: "#f1f5f9",
  fontWeight: "bold",
};

const btn = {
  width: "100%",
  padding: "12px",
  marginTop: "15px",
  background: "#4caf50",
  color: "#fff",
  border: "none",
  borderRadius: "25px",
  cursor: "pointer",
  fontSize: "16px",
};
