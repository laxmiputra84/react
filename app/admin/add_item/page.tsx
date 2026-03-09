"use client";

import { useState, useEffect } from "react";

type Item = {
  id: number;
  name: string;
  price: number;
  type: string;
  softDrink: string;
  image: string;
};

export default function AddItemPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [softDrink, setSoftDrink] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const savedItems = localStorage.getItem("items");
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      alert("Please upload an image");
      return;
    }

    const newItem: Item = {
      id: Date.now(),
      name,
      price: Number(price), // ✅ number
      type,
      softDrink,
      image,
    };

    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    localStorage.setItem("items", JSON.stringify(updatedItems));

    alert("✅ Item added successfully!");

    setName("");
    setPrice("");
    setType("");
    setSoftDrink("");
    setImage(null);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>➕ Add New Food Item</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Food Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={styles.input}
          required
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={styles.input}
          required
        >
          <option value="">Select Type</option>
          <option value="veg">Veg</option>
          <option value="non-veg">Non-Veg</option>
          <option value="fruit">Fruit</option>
        </select>

        <select
          value={softDrink}
          onChange={(e) => setSoftDrink(e.target.value)}
          style={styles.input}
          required
        >
          <option value="">Is this Soft Drink?</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={styles.input}
          required
        />

        {image && (
          <img
            src={image}
            alt="Preview"
            style={styles.preview}
          />
        )}

        <button type="submit" style={styles.button}>
          Add Item
        </button>
      </form>

      <h3 style={{ marginTop: "20px" }}>📋 Items List</h3>

      {items.map((item) => (
        <div key={item.id} style={styles.itemCard}>
          <img src={item.image} alt={item.name} style={styles.cardImg} />
          <div><b>{item.name}</b></div>
          <div>₹{item.price}</div>
          <div>Type: {item.type}</div>
          <div>Soft Drink: {item.softDrink}</div>
        </div>
      ))}
    </div>
  );
}

const styles: any = {
  container: {
    maxWidth: "500px",
    margin: "20px auto",
    background: "white",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  title: {
    marginBottom: "20px",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    padding: "12px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
  },
  preview: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    marginBottom: "10px",
    borderRadius: "6px",
  },
  itemCard: {
    padding: "10px",
    background: "#f3f4f6",
    marginTop: "10px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  cardImg: {
    width: "100%",
    height: "120px",
    objectFit: "cover",
    borderRadius: "6px",
    marginBottom: "6px",
  },
};
