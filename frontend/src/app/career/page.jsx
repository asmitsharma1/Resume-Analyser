"use client";

import { useState, useEffect } from "react";

const API =
  process.env.NEXT_PUBLIC_API_BASE || "http://127.0.0.1:8000";

export default function CareerPage() {
  const [role, setRole] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  async function checkCareer() {
    if (!role) return;

    setLoading(true);

    const userSkills =
      JSON.parse(localStorage.getItem("user_skills")) || [];

    try {
      const res = await fetch(`${API}/career-plan`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          target_role: role,
          user_skills: userSkills,
        }),
      });

      const json = await res.json();
      setData(json);
    } catch (err) {
      alert("Backend error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen p-10 text-white bg-gradient-to-br from-black via-gray-900 to-black">

      <h1 className="text-3xl font-bold mb-6">
        Career Roadmap
      </h1>

      <div className="flex gap-4">
        <input
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Enter role e.g IAS Officer"
          className="px-4 py-2 text-black rounded"
        />

        <button
          onClick={checkCareer}
          className="px-4 py-2 bg-blue-600 rounded"
        >
          {loading ? "Checking..." : "Check"}
        </button>
      </div>

      {data && (
        <div className="mt-10">

          {/* REQUIRED */}
          <h3 className="text-xl font-semibold">
            Required Skills
          </h3>

          {data?.required_skills?.map((s) => (
            <div key={s}>✅ {s}</div>
          ))}

          {/* MISSING */}
          <h3 className="text-xl font-semibold mt-5">
            Missing Skills
          </h3>

          {data?.missing_skills?.map((s) => (
            <div key={s} className="text-red-400">
              ❌ {s}
            </div>
          ))}

          {/* PROGRESS */}
          <div className="mt-5">
            Progress: {data.progress_percent}%
          </div>

          {/* NEXT STEP */}
          <div className="mt-2 font-semibold">
            Next Step: {data.next_step}
          </div>
        </div>
      )}
    </div>
  );
}