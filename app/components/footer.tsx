export default function Footer() {
  return (
    <footer style={styles.footer}>
      <p>© 2026 My Website. All rights reserved.</p>
    </footer>
  );
}

const styles = {
  footer: {
    background: "#222",
    color: "white",
    textAlign: "center" as const,
    padding: "10px",
    position: "fixed" as const,
    bottom: 0,
    width: "100%",
  },
};
