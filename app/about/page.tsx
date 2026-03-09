"use client";

import { useRouter } from "next/navigation";

export default function AboutPage() {
  const router = useRouter();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>ℹ About Our App</h1>

        <p style={styles.text}>
          🍔 This is a simple Food Ordering Application built using
          Next.js and React.
        </p>

        <p style={styles.text}>
          🛒 Users can browse menu items, add them to cart, and place orders easily.
        </p>

        <p style={styles.text}>
          ⚙ Admin can manage food items like add, update, and delete items.
        </p>

        <p style={styles.text}>
          ❤️ Our goal is to provide fresh, tasty food with a smooth ordering experience.
        </p>

        <div style={styles.btnBox}>
          <button style={styles.homeBtn} onClick={() => router.push("/home")}>
            🏠 Home
          </button>

          <button style={styles.menuBtn} onClick={() => router.push("/menu")}>
            🍽 Menu
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
    background: "linear-gradient(to right, #60a5fa, #34d399)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    background: "white",
    padding: "25px",
    borderRadius: "15px",
    textAlign: "center",
    width: "360px",
    boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
  },

  title: {
    fontSize: "24px",
    marginBottom: "15px",
  },

  text: {
    fontSize: "15px",
    marginBottom: "10px",
    color: "#374151",
  },

  btnBox: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "space-around",
  },

  homeBtn: {
    padding: "8px 14px",
    borderRadius: "8px",
    border: "none",
    background: "#2563eb",
    color: "white",
    cursor: "pointer",
  },

  menuBtn: {
    padding: "8px 14px",
    borderRadius: "8px",
    border: "none",
    background: "#22c55e",
    color: "white",
    cursor: "pointer",
  },
};
