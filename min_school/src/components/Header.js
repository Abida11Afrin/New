"use client";

import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "@/components/LoginModal";

export default function Header() {
  const { lang, setLang } = useLanguage();
  const { user, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="px-4 md:px-6 h-16 flex items-center justify-between gap-2">

        {/* Logo */}
        <div className="flex items-center flex-shrink-0">
          <Image
            src="/images/10mslogo-svg.svg"
            alt="10 Minute School"
            width={120}
            height={36}
            className="object-contain w-[90px] md:w-[120px] h-auto"
          />
        </div>

        {/* Nav links — Desktop only */}
        <nav className="hidden md:flex items-center gap-1">
          {(lang === "BN"
            ? ["ক্লাস ৬-১২", "ইংলিশ", "স্টোর", "অন্যান্য"]
            : ["Class 6-12", "English", "Store", "Others"]
          ).map((item) => (
            <button key={item} className="bg-transparent border-none text-black text-sm font-medium px-3 py-2 cursor-pointer rounded-lg flex items-center gap-1">
              {item}
              <span className="text-xs opacity-50">▾</span>
            </button>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-1.5 md:gap-3 flex-shrink-0">

          {/* Language switcher */}
          <div className="hidden md:flex items-center border border-gray-300 rounded-full overflow-hidden text-sm font-semibold">
            {["BN", "EN"].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-3 py-1 border-none cursor-pointer text-sm font-semibold transition-colors ${
                  lang === l ? "bg-green-600 text-white" : "bg-transparent text-black"
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Search icon */}
          <button className="bg-transparent border-none text-black cursor-pointer text-base md:text-lg p-1">
            🔍
          </button>

          {/* Phone icon */}
          <button className="bg-transparent border-none text-black cursor-pointer text-base md:text-lg p-1">
            📞
          </button>

          {/* Login / User */}
          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-black text-xs md:text-sm font-semibold hidden sm:inline">
                {user.username}
              </span>
              <button
                onClick={logout}
                className="bg-gray-200 text-black border-none rounded-full px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-semibold cursor-pointer"
              >
                {lang === "BN" ? "লগ-আউট" : "Logout"}
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowLogin(true)}
              className="bg-green-600 text-white border-none rounded-full px-3 md:px-5 py-1.5 md:py-2 text-xs md:text-sm font-semibold cursor-pointer whitespace-nowrap"
            >
              {lang === "BN" ? "লগ-ইন" : "Login"}
            </button>
          )}

        </div>
      </div>

      {/* Mobile nav row */}
      <nav className="md:hidden flex items-center gap-1 overflow-x-auto px-4 pb-2" style={{ scrollbarWidth: "none" }}>
        {(lang === "BN"
          ? ["ক্লাস ৬-১২", "ইংলিশ", "স্টোর", "অন্যান্য"]
          : ["Class 6-12", "English", "Store", "Others"]
        ).map((item) => (
          <button key={item} className="flex-shrink-0 whitespace-nowrap bg-gray-100 border-none text-black text-xs font-medium px-2.5 py-1.5 cursor-pointer rounded-lg flex items-center gap-1">
            {item}
            <span className="text-[10px] opacity-50">▾</span>
          </button>
        ))}
      </nav>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </header>
  );
}