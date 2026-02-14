"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const savedProfile = localStorage.getItem("profile");
    if (savedProfile) {
      const data = JSON.parse(savedProfile);
      setName(data.name || "");
      setEmail(data.email || "");
      setPhone(data.phone || "");
      setAddress(data.address || "");
      setImage(data.image || null);
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

  const saveProfile = () => {
    const profileData = { name, email, phone, address, image };
    localStorage.setItem("profile", JSON.stringify(profileData));
    alert("✅ Profile saved successfully!");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>👤 My Profile</h2>

        {image && (
          <img src={image} alt="Profile" style={styles.profileImg} />
        )}

        <input type="file" accept="image/*" onChange={handleImageUpload} />

        <input
          style={styles.input}
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <textarea
          style={styles.textarea}
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <button style={styles.saveBtn} onClick={saveProfile}>
          💾 Save Profile
        </button>

        <div style={styles.btnBox}>
          <button style={styles.backBtn} onClick={() => router.push("/home")}>
            ⬅ Home
          </button>
          <button style={styles.menuBtn} onClick={() => router.push("/menu")}>
            🍽 Menu
          </button>
        </div>
      </div>
    </div>
  );
}

const styles: any = {
  container: {
    minHeight: "100vh",
    background: "#f3f4f6",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    background: "white",
    padding: "25px",
    borderRadius: "12px",
    width: "360px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
    textAlign: "center",
  },
  title: { marginBottom: "10px" },
  profileImg: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "10px",
  },
  input: {
    width: "100%",
    padding: "8px",
    marginBottom: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  textarea: {
    width: "100%",
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    minHeight: "60px",
    marginBottom: "10px",
  },
  saveBtn: {
    width: "100%",
    padding: "10px",
    background: "#22c55e",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  btnBox: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  },
  backBtn: {
    background: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "8px 12px",
  },
  menuBtn: {
    background: "#ec4899",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "8px 12px",
  },
};
