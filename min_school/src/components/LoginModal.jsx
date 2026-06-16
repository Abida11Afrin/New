"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";

export default function LoginModal({ onClose }) {
  const { lang } = useLanguage();
  const { login, register } = useAuth();

  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isRegister) {
        await register(username, email, password);
      } else {
        await login(username, password);
      }
      onClose();
    } catch (err) {
      setError(err.message || (lang === "BN" ? "কিছু একটা ভুল হয়েছে" : "Something went wrong"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] px-4">
      <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-sm relative">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-black bg-transparent border-none cursor-pointer text-xl"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold text-black mb-6 text-center">
          {isRegister
            ? (lang === "BN" ? "অ্যাকাউন্ট তৈরি করুন" : "Create Account")
            : (lang === "BN" ? "লগ-ইন করুন" : "Login")}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder={lang === "BN" ? "ইউজারনেম" : "Username"}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm text-black outline-none focus:border-green-500"
          />

          {isRegister && (
            <input
              type="email"
              placeholder={lang === "BN" ? "ইমেইল" : "Email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm text-black outline-none focus:border-green-500"
            />
          )}

          <input
            type="password"
            placeholder={lang === "BN" ? "পাসওয়ার্ড" : "Password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm text-black outline-none focus:border-green-500"
          />

          {error && (
            <p className="text-red-500 text-xs">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white rounded-full px-4 py-2 text-sm font-semibold cursor-pointer hover:bg-green-500 transition-colors disabled:opacity-60"
          >
            {loading
              ? (lang === "BN" ? "অপেক্ষা করুন..." : "Please wait...")
              : isRegister
                ? (lang === "BN" ? "সাইন আপ" : "Sign Up")
                : (lang === "BN" ? "লগ-ইন" : "Login")}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          {isRegister
            ? (lang === "BN" ? "অ্যাকাউন্ট আছে?" : "Already have an account?")
            : (lang === "BN" ? "অ্যাকাউন্ট নেই?" : "Don't have an account?")}{" "}
          <button
            onClick={() => { setIsRegister(!isRegister); setError(""); }}
            className="text-green-600 font-semibold bg-transparent border-none cursor-pointer hover:underline"
          >
            {isRegister
              ? (lang === "BN" ? "লগ-ইন করুন" : "Login")
              : (lang === "BN" ? "সাইন আপ করুন" : "Sign Up")}
          </button>
        </p>

      </div>
    </div>
  );
}