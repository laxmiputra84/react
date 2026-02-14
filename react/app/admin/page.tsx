"use client";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  return (
    <div style={styles.main}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>🍔 Food Admin</h2>

        <p style={styles.menu} onClick={() => router.push("/admin/add_item")}>
          ➕ Add Item
        </p>

        <p style={styles.menu} onClick={() => router.push("/admin/show_orders")}>
          📦 Show Orders
        </p>

        <p style={styles.menu} onClick={() => router.push("/admin/edit_item")}>
          ✏ Edit Item
        </p>

        <p style={styles.menu} onClick={() => router.push("/admin/delete_item")}>
          🗑 Delete Item
        </p>
         <p style={styles.menu} onClick={() => router.push("/admin/delete_item")}>
          🗑 Delete Item
        </p>


        <p
          style={{ ...styles.menu, color: "red" }}
          onClick={() => router.push("/login")}
        >
          🚪 Logout
        </p>
      </div>

      {/* Content */}
      <div style={styles.content}>
        <h1>Admin Dashboard</h1>

        <div style={styles.cards}>
          <div style={{ ...styles.card, background: "#3498db" }}>
            ➕ Add Item
          </div>
          <div style={{ ...styles.card, background: "#e67e22" }}>
            📦 Orders
          </div>
          <div style={{ ...styles.card, background: "#2ecc71" }}>
            ✏ Edit Item
          </div>
          <div style={{ ...styles.card, background: "#e74c3c" }}>
            🗑 Delete Item
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  main: { display: "flex", minHeight: "100vh" },
  sidebar: { width: "230px", background: "#1e272e", padding: "20px" },
  logo: { color: "white", textAlign: "center" as const, marginBottom: "20px" },
  menu: {
    color: "white",
    padding: "10px",
    marginBottom: "8px",
    cursor: "pointer",
    background: "#2f3640",
    borderRadius: "5px",
  },
  content: { flex: 1, padding: "20px", background: "#f1f2f6" },
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
    gap: "15px",
    marginTop: "20px",
  },
  card: {
    color: "white",
    padding: "20px",
    borderRadius: "8px",
    fontSize: "18px",
    textAlign: "center" as const,
  },
};
