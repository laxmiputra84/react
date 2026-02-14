"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Image */}
        <img
          src="/food.jpg"
          alt="Food"
          style={styles.image}
        />

        <h1 style={styles.title}>🍔 Food Ordering App</h1>
        <p style={styles.subtitle}>
          Delicious food delivered at your doorstep
        </p>

        <div style={styles.btnBox}>
          <button
            style={styles.menuBtn}
            onClick={() => router.push("/menu")}
          >
            🍽 Order Now
          </button>

          <button
            style={styles.adminBtn}
            onClick={() => router.push("/admin")}
          >
            ⚙ Admin Panel
          </button>
        </div>
      </div>
    </div>
  );
}

/* -------- Styles -------- */

const styles: any = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f43f5e, #ec4899)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    background: "white",
    padding: "22px",
    borderRadius: "18px",
    textAlign: "center",
    width: "360px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
  },

  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "14px",
    marginBottom: "12px",
  },

  title: {
    fontSize: "26px",
    marginBottom: "6px",
    color: "#111827",
  },

  subtitle: {
    color: "#6b7280",
    marginBottom: "18px",
    fontSize: "15px",
  },

  btnBox: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  menuBtn: {
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(to right, #22c55e, #16a34a)",
    color: "white",
    fontSize: "17px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  adminBtn: {
    padding: "10px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(to right, #3b82f6, #2563eb)",
    color: "white",
    fontSize: "15px",
    cursor: "pointer",
  },
};
