"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Item = {
  id: number;
  name: string;
  price: number;
  image: string;
  qty?: number;
};

export default function MenuPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [cart, setCart] = useState<Item[]>([]);
  const router = useRouter();

  // Load items & cart from localStorage (only once)
  useEffect(() => {
    const savedItems = localStorage.getItem("items");
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }

    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart)); // restore old cart
    }
  }, []);

  const addToCart = (item: Item) => {
    const existing = cart.find((c) => c.id === item.id);
    let updatedCart: Item[];

    if (existing) {
      updatedCart = cart.map((c) =>
        c.id === item.id ? { ...c, qty: (c.qty || 1) + 1 } : c
      );
    } else {
      updatedCart = [...cart, { ...item, qty: 1 }];
    }

    setCart(updatedCart);

    // store cart permanently
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalItems = cart.reduce((sum, i) => sum + (i.qty || 1), 0);

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>🍽 Our Menu</h2>

      <div style={styles.grid}>
        {items.map((item) => (
          <div key={item.id} style={styles.card}>
            <img src={item.image} style={styles.img} alt={item.name} />
            <div style={styles.info}>
              <p style={styles.name}>{item.name}</p>
              <p style={styles.price}>₹{item.price}</p>
              <button style={styles.btn} onClick={() => addToCart(item)}>
                ➕ Add
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.bottomBar}>
        <span>🛒 {totalItems} items</span>
        <button
          style={styles.cartBtn}
          onClick={() => router.push("/view_cart")}
        >
          View Cart
        </button>
      </div>
    </div>
  );
}

/* ---------- Styles ---------- */

const styles: any = {
  page: {
    padding: "12px",
    paddingBottom: "80px",
    background: "#f3f4f6",
    minHeight: "100vh",
  },

  title: {
    textAlign: "center",
    marginBottom: "12px",
    fontSize: "22px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)", // 4x4 grid
    gap: "12px",
  },

  card: {
    background: "#fff",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
  },

 img: {
  width: "100%",
  height: "150px",
  objectFit: "contain",
  background: "#f9fafb",
  padding: "6px",
},


  info: {
    padding: "8px",
    textAlign: "center",
  },

  name: {
    fontWeight: "bold",
    margin: "4px 0",
  },

  price: {
    color: "#16a34a",
    fontWeight: "600",
    marginBottom: "6px",
  },

  btn: {
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "6px",
    cursor: "pointer",
    width: "100%",
  },

  bottomBar: {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    background: "#ec4899",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px",
    fontSize: "16px",
  },

  cartBtn: {
    background: "white",
    color: "#ec4899",
    border: "none",
    borderRadius: "6px",
    padding: "6px 14px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};
