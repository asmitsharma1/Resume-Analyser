"use client";

import { useState, useRef } from "react";

const API =
  process.env.NEXT_PUBLIC_API_BASE || "http://127.0.0.1:8000";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  function pickFile() {
    inputRef.current?.click();
  }

  function handleChange(e) {
    const f = e.target.files?.[0];
    setFile(f);
    setResult(null);
    setError("");
  }

  async function uploadResume() {
    if (!file) {
      setError("Please select a PDF first");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const form = new FormData();
      form.append("file", file);

      const res = await fetch(`${API}/upload`, {
        method: "POST",
        body: form,
      });

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      const data = await res.json();

      setResult(data);

      // STORE SKILLS FOR CAREER PAGE
      localStorage.setItem(
        "user_skills",
        JSON.stringify(data.skills_found || [])
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">

      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        onChange={handleChange}
        hidden
      />

      <div className="flex gap-3">
        <button
          onClick={pickFile}
          className="px-4 py-2 border border-gray-600 rounded-lg"
        >
          {file ? "Change PDF" : "Choose PDF"}
        </button>

        <button
          onClick={uploadResume}
          disabled={!file || loading}
          className="px-4 py-2 bg-blue-600 rounded-lg font-semibold disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Upload & Analyze"}
        </button>
      </div>

      {file && (
        <div className="text-gray-400">
          Selected: {file.name}
        </div>
      )}

      {error && (
        <div className="text-red-400">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-6 max-w-xl">

          <h3 className="font-semibold mb-2">
            Skills Found
          </h3>

          <div className="flex flex-wrap gap-2">
            {result.skills_found.map((s) => (
              <span
                key={s}
                className="bg-gray-200 text-black px-2 py-1 rounded-full text-xs"
              >
                {s}
              </span>
            ))}
          </div>

          <h3 className="font-semibold mt-4">
            Suggested Role
          </h3>

          <div className="text-green-400 font-bold">
            {result.suggested_role}
          </div>
        </div>
      )}
    </div>
  );
}