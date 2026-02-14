import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={styles.nav}>
      {/* Left side */}
      <div style={styles.left}>
        <Link href="/home" style={styles.link}>Home</Link>
        <Link href="/about" style={styles.link}>About</Link>
        <Link href="/menu" style={styles.link}>Menu</Link>
         <Link href="/signup" style={styles.link}>Singup</Link>
      </div>

      {/* Right side */}
      <div style={styles.right}>
        <Link href="/admin" style={styles.link}>Admin</Link>
        <Link href="/login" style={styles.link}>Login</Link>
        <Link href="/profile" style={styles.link}>Profile</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "black",
    padding: "10px 20px",
  },
  left: {
    display: "flex",
    gap: "15px",
  },
  right: {
    display: "flex",
    gap: "15px",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
  },
};
