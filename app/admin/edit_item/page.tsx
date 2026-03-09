"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Item = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export default function AdminEditItemPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<Item>({
    id: 0,
    name: "",
    price: 0,
    image: "",
  });

  const router = useRouter();

  useEffect(() => {
    const savedItems = localStorage.getItem("items");
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);

  const startEdit = (item: Item) => {
    setEditingId(item.id);
    setForm(item);
  };

  const saveEdit = () => {
    const updatedItems = items.map((item) =>
      item.id === editingId ? form : item
    );

    setItems(updatedItems);
    localStorage.setItem("items", JSON.stringify(updatedItems));
    setEditingId(null);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>✏ Edit Food Items (Admin)</h2>

      {items.length === 0 ? (
        <p style={styles.empty}>No items found</p>
      ) : (
        items.map((item) => (
          <div key={item.id} style={styles.card}>
            {editingId === item.id ? (
              <>
                <input
                  style={styles.input}
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  placeholder="Item name"
                />

                <input
                  style={styles.input}
                  type="number"
                  value={form.price}
                  onChange={(e) =>
                    setForm({ ...form, price: Number(e.target.value) })
                  }
                  placeholder="Price"
                />

                <input
                  style={styles.input}
                  value={form.image}
                  onChange={(e) =>
                    setForm({ ...form, image: e.target.value })
                  }
                  placeholder="Image URL"
                />

                <button style={styles.saveBtn} onClick={saveEdit}>
                  💾 Save
                </button>
              </>
            ) : (
              <>
                <img src={item.image} style={styles.img} />
                <div style={styles.info}>
                  <p><b>{item.name}</b></p>
                  <p>₹{item.price}</p>
                  <button
                    style={styles.editBtn}
                    onClick={() => startEdit(item)}
                  >
                    ✏ Edit
                  </button>
                </div>
              </>
            )}
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
    flexDirection: "column",
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
    marginBottom: "5px",
  },

  info: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },

  input: {
    padding: "6px",
    marginBottom: "6px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },

  editBtn: {
    background: "#f59e0b",
    color: "white",
    border: "none",
    padding: "6px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  saveBtn: {
    background: "#22c55e",
    color: "white",
    border: "none",
    padding: "6px",
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
