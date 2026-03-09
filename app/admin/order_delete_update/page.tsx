"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Order = {
    id: number;
    name: string;
    phone: string;
    address: string;
    paymentType: string;
    status: string;
    total: number;
    createdAt: string;
};

const STATUS_OPTIONS = ["Pending", "Preparing", "On the Way", "Delivered", "Cancelled"];

const STATUS_COLORS: Record<string, string> = {
    Pending: "#f39c12",
    Preparing: "#3498db",
    "On the Way": "#9b59b6",
    Delivered: "#2ecc71",
    Cancelled: "#e74c3c",
};

export default function OrderDeleteUpdatePage() {
    const router = useRouter();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchOrders();
    }, []);

    async function fetchOrders() {
        try {
            setLoading(true);
            const res = await fetch("/api/orders");
            if (res.ok) {
                const data = await res.json();
                setOrders(data.orders ?? data);
            }
        } catch (err) {
            console.error("Failed to fetch orders:", err);
        } finally {
            setLoading(false);
        }
    }

    async function handleStatusChange(id: number, newStatus: string) {
        try {
            const res = await fetch(`/api/orders/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });
            if (res.ok) {
                setOrders((prev) =>
                    prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
                );
                showMessage("✅ Order status updated!");
            } else {
                showMessage("❌ Failed to update status.");
            }
        } catch {
            showMessage("❌ Network error.");
        }
    }

    async function handleDelete(id: number) {
        if (!confirm("Are you sure you want to delete this order?")) return;
        try {
            const res = await fetch(`/api/orders/${id}`, { method: "DELETE" });
            if (res.ok) {
                setOrders((prev) => prev.filter((o) => o.id !== id));
                showMessage("🗑️ Order deleted successfully.");
            } else {
                showMessage("❌ Failed to delete order.");
            }
        } catch {
            showMessage("❌ Network error.");
        }
    }

    function showMessage(msg: string) {
        setMessage(msg);
        setTimeout(() => setMessage(""), 3000);
    }

    return (
        <div style={styles.main}>
            {/* Sidebar */}
            <div style={styles.sidebar}>
                <h2 style={styles.logo}>🍔 Food Admin</h2>
                <p style={styles.menu} onClick={() => router.push("/admin/add_item")}>➕ Add Item</p>
                <p style={styles.menu} onClick={() => router.push("/admin/show_orders")}>📦 Show Orders</p>
                <p style={styles.menu} onClick={() => router.push("/admin/edit_item")}>✏ Edit Item</p>
                <p style={styles.menu} onClick={() => router.push("/admin/delete_item")}>🗑 Delete Item</p>
                <p style={{ ...styles.menu, background: "#c0392b" }} onClick={() => router.push("/admin/order_delete_update")}>
                    🔄 Manage Orders
                </p>
                <p style={{ ...styles.menu, color: "red" }} onClick={() => router.push("/login")}>🚪 Logout</p>
            </div>

            {/* Content */}
            <div style={styles.content}>
                <h1 style={styles.heading}>🔄 Manage Orders</h1>

                {message && <div style={styles.toast}>{message}</div>}

                {loading ? (
                    <p style={{ textAlign: "center", color: "#888" }}>Loading orders…</p>
                ) : orders.length === 0 ? (
                    <p style={{ textAlign: "center", color: "#888" }}>No orders found.</p>
                ) : (
                    <div style={styles.tableWrapper}>
                        <table style={styles.table}>
                            <thead>
                                <tr style={styles.thead}>
                                    <th style={styles.th}>#</th>
                                    <th style={styles.th}>Customer</th>
                                    <th style={styles.th}>Phone</th>
                                    <th style={styles.th}>Address</th>
                                    <th style={styles.th}>Payment</th>
                                    <th style={styles.th}>Total</th>
                                    <th style={styles.th}>Status</th>
                                    <th style={styles.th}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order.id} style={styles.tr}>
                                        <td style={styles.td}>{order.id}</td>
                                        <td style={styles.td}>{order.name}</td>
                                        <td style={styles.td}>{order.phone}</td>
                                        <td style={styles.td}>{order.address}</td>
                                        <td style={styles.td}>{order.paymentType}</td>
                                        <td style={styles.td}>₹ {order.total}</td>
                                        <td style={styles.td}>
                                            <select
                                                value={order.status}
                                                onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                                style={{
                                                    ...styles.select,
                                                    background: STATUS_COLORS[order.status] ?? "#ccc",
                                                }}
                                            >
                                                {STATUS_OPTIONS.map((s) => (
                                                    <option key={s} value={s}>{s}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td style={styles.td}>
                                            <button
                                                style={styles.deleteBtn}
                                                onClick={() => handleDelete(order.id)}
                                            >
                                                🗑 Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

/* -------- Styles -------- */
const styles: any = {
    main: { display: "flex", minHeight: "100vh" },
    sidebar: { width: "230px", background: "#1e272e", padding: "20px", flexShrink: 0 },
    logo: { color: "white", textAlign: "center", marginBottom: "20px", fontSize: "18px" },
    menu: {
        color: "white",
        padding: "10px",
        marginBottom: "8px",
        cursor: "pointer",
        background: "#2f3640",
        borderRadius: "5px",
        fontSize: "14px",
    },
    content: { flex: 1, padding: "24px", background: "#f1f2f6", overflowX: "auto" },
    heading: { marginBottom: "20px", color: "#2d3436", fontSize: "24px" },
    toast: {
        background: "#2ecc71",
        color: "white",
        padding: "10px 16px",
        borderRadius: "8px",
        marginBottom: "16px",
        fontWeight: "bold",
        maxWidth: "400px",
    },
    tableWrapper: { overflowX: "auto" },
    table: { width: "100%", borderCollapse: "collapse", background: "white", borderRadius: "10px", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" },
    thead: { background: "#2d3436", color: "white" },
    th: { padding: "12px 14px", textAlign: "left", fontWeight: "600", fontSize: "13px" },
    tr: { borderBottom: "1px solid #ecf0f1" },
    td: { padding: "10px 14px", fontSize: "13px", color: "#2d3436", verticalAlign: "middle" },
    select: {
        border: "none",
        borderRadius: "6px",
        padding: "5px 8px",
        color: "white",
        fontWeight: "bold",
        cursor: "pointer",
        fontSize: "12px",
    },
    deleteBtn: {
        background: "#e74c3c",
        color: "white",
        border: "none",
        padding: "6px 12px",
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "12px",
        fontWeight: "bold",
    },
};
