"use client";

import { motion } from "framer-motion";
import Upload from "./Upload";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, #000 0%, #111827 50%, #000 100%)",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      {/* Glow */}
      <div
        style={{
          position: "absolute",
          width: "18rem",
          height: "18rem",
          background: "rgba(59,130,246,0.2)",
          borderRadius: "9999px",
          filter: "blur(40px)",
          top: "4rem",
          left: "4rem",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "18rem",
          height: "18rem",
          background: "rgba(168,85,247,0.2)",
          borderRadius: "9999px",
          filter: "blur(40px)",
          bottom: "4rem",
          right: "4rem",
        }}
      />

      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{ fontSize: "3rem", fontWeight: 800 }}
      >
        Smart Resume <br />
        <span style={{ color: "#3b82f6" }}>Analyzer AI</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        style={{ marginTop: 20, color: "#9ca3af", maxWidth: 600 }}
      >
        Upload resume & get career roadmap, missing skills and best roles.
      </motion.p>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.7 }}
        style={{ marginTop: 40 }}
      >
        <Upload />
      </motion.div>

      {/* Extra buttons */}
      <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
        <button
          onClick={() =>
            document.getElementById("fileInput").click()
          }
          style={{
            padding: "12px 20px",
            background: "#3b82f6",
            color: "white",
            borderRadius: 8,
            border: "none",
            fontWeight: 600,
          }}
        >
          Upload Resume
        </button>

        <button
          onClick={() => router.push("/career")}
          style={{
            padding: "12px 20px",
            background: "transparent",
            color: "white",
            borderRadius: 8,
            border: "1px solid #4b5563",
            fontWeight: 600,
          }}
        >
          Explore Careers
        </button>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 30,
          color: "#9ca3af",
        }}
      >
        ↓ Scroll down to explore more ↓
      </div>
    </section>
  );
}