"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Navbar from "../components/navabar";

export default function Login() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    if (!username || !password) {
      alert("Please fill all fields");
      return;
    }

    // 👉 DB check using API
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const data = await res.json();

   if (data.success) {
  alert("Login Success");

  // ✅ admin check
  if (username === "admin") {
    router.push("/dashboard");      // admin page
  } else {
    router.push("/admin");  // normal user page
  }

} else {
  alert("Invalid username or password");
}

  }

  return (
    <div>
      <Navbar />

      <div style={styles.container}>
        <div style={styles.box}>
          <h2>User Login</h2>

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

          <button onClick={handleLogin} style={styles.button}>
            Login
          </button>

          {/* Register link */}
          <p style={{ marginTop: "10px" }}>
            New user?{" "}
            <span
              style={{
                color: "blue",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => router.push("/register")}
            >
              Register
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
    width: "300px",
    textAlign: "center" as const,
  },
  input: {
    width: "100%",
    padding: "8px",
    margin: "8px 0",
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
