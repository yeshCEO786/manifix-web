import React from "react";
import TopBar from "./TopBar";
import BottomNav from "./BottomNav";

const MobileLayout = ({ children }) => {
  return (
    <div style={styles.wrapper}>
      <TopBar />
      <main style={styles.content}>{children}</main>
      <BottomNav />
    </div>
  );
};

const styles = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "var(--bg)",
    color: "var(--text)",
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont",
  },
  content: {
    flex: 1,
    padding: "1rem",
    paddingBottom: "80px", // space for bottom nav
    maxWidth: "600px",
    margin: "0 auto",
    width: "100%",
  },
};

export default MobileLayout;
