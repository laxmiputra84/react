"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Item = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export default function AdminDeleteItemPage() {
  const [items, setItems] = useState<Item[]>([]);
  const router = useRouter();

  useEffect(() => {
    const savedItems = localStorage.getItem("items");
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);

  const deleteItem = (id: number) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    localStorage.setItem("items", JSON.stringify(updatedItems));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🗑 Delete Food Items (Admin)</h2>

      {items.length === 0 ? (
        <p style={styles.empty}>No items found</p>
      ) : (
        items.map((item) => (
          <div key={item.id} style={styles.card}>
            <img src={item.image} style={styles.img} />
            <div style={styles.info}>
              <p><b>{item.name}</b></p>
              <p>₹{item.price}</p>
              <button
                style={styles.delBtn}
                onClick={() => deleteItem(item.id)}
              >
                ❌ Delete
              </button>
            </div>
          </div>
        ))
      )}

      <button style={styles.backBtn} onClick={() => router.push("/admin")}>
        ⬅ Back to Admin
      </button>
    </div>
  );
}

/* -------- Styles -------- */

const styles: any = {
  container: {
    padding: "15px",
    background: "#f9fafb",
    minHeight: "100vh",
  },

  title: {
    textAlign: "center",
    marginBottom: "10px",
  },

  empty: {
    textAlign: "center",
    color: "gray",
  },

  card: {
    display: "flex",
    background: "white",
    padding: "10px",
    borderRadius: "10px",
    marginBottom: "10px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },

  img: {
    width: "80px",
    height: "80px",
    objectFit: "cover",
    borderRadius: "8px",
    marginRight: "10px",
  },

  info: {
    flex: 1,
  },

  delBtn: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  backBtn: {
    marginTop: "15px",
    width: "100%",
    background: "#3b82f6",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
