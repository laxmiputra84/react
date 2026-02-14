"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Navbar from "../components/navabar";

export default function Register() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  async function handleRegister() {
    if (!username || !password || !email || !phone) {
      alert("Please fill all fields");
      return;
    }

    // 👉 Send data to Register API
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
        phone: phone,
      }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Registered Successfully!");
      router.push("/login");
    } else {
      alert(data.message || "Register failed");
    }
  }

  return (
    <div>
      <Navbar />

      <div style={styles.container}>
        <div style={styles.box}>
          <h2>User Register</h2>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={styles.input}
          />

          <button onClick={handleRegister} style={styles.button}>
            Register
          </button>

          <p style={{ marginTop: "10px" }}>
            Already have an account?{" "}
            <span
              style={{
                color: "blue",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => router.push("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    border: "1px solid #ccc",
    padding: "25px",
    borderRadius: "10px",
    width: "320px",
    textAlign: "center" as const,
  },
  input: {
    width: "100%",
    padding: "8px",
    margin: "6px 0",
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "green",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};
