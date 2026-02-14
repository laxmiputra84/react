import Link from "next/link";

export default function Header() {
  return (
    <header style={styles.header}>
      <h2 style={styles.logo}>My Website</h2>

      <nav>
        <Link href="/" style={styles.link}>Home</Link>
        <Link href="/about" style={styles.link}>About</Link>
        <Link href="/menu" style={styles.link}>Menu</Link>
        <Link href="/login" style={styles.link}>Sign In</Link>
      </nav>
    </header>
  );
}

const styles = {
  header: {
    background: "#222",
    color: "white",
    padding: "10px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    margin: 0,
  },
  link: {
    color: "white",
    marginLeft: "15px",
    textDecoration: "none",
  },
};
