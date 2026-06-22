"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "@/components/LoginModal";

// ─── Nav Data ────────────────────────────────────────────────────────────────

const navItems = {
  EN: [
    {
      label: "Class 6-12",
      children: ["HSC", "SSC", "Class 8", "Class 7", "Class 6", "Academic free courses"],
    },
    {
      label: "English",
      children: ["Online", "Offline"],
    },
    {
      label: "Store",
      children: ["Books", "Stationery", "Digital Content", "Merchandise"],
    },
    {
      label: "Others",
      children: ["Skills", "Free Courses", "Book Store"],
    },
  ],
  BN: [
    {
      label: "ক্লাস ৬-১২",
      children: ["এইচএসসি", "এসএসসি", "ক্লাস ৮", "ক্লাস ৭", "ক্লাস ৬", "একাডেমিক ফ্রি কোর্স"],
    },
    {
      label: "ইংলিশ",
      children: ["অনলাইন", "অফলাইন"],
    },
    {
      label: "স্টোর",
      children: ["বই", "স্টেশনারি", "ডিজিটাল কন্টেন্ট", "মার্চেন্ডাইজ"],
    },
    {
      label: "অন্যান্য",
      children: ["স্কিলস", "ফ্রি কোর্স", "বুক স্টোর"],
    },
  ],
};

// ─── Reusable Dropdown Button ─────────────────────────────────────────────────

function DropdownButton({ item, isOpen, onToggle, onClose, variant = "desktop" }) {
  const isDesktop = variant === "desktop";

  return (
    <div className="relative flex-shrink-0">
      {/* Trigger */}
      <button
        onClick={onToggle}
        className={`
          whitespace-nowrap border-none cursor-pointer rounded-lg
          flex items-center gap-1 transition-colors
          ${
            isDesktop
              ? "bg-transparent text-black text-sm font-medium px-3 py-2 hover:bg-gray-100"
              : "bg-gray-100 text-black text-xs font-medium px-2.5 py-1.5 hover:bg-gray-200"
          }
        `}
      >
        {item.label}
        <span
          className={`
            opacity-50 transition-transform duration-200
            ${isDesktop ? "text-xs" : "text-[10px]"}
            ${isOpen ? "rotate-180" : "rotate-0"}
          `}
        >
          ▾
        </span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="
            absolute top-full left-0 mt-1 z-50
            min-w-[150px] bg-white rounded-xl
            shadow-lg border border-gray-100
            py-1 animate-fade-in
          "
        >
          {item.children.map((child) => (
            <button
              key={child}
              onClick={() => {
                // TODO: handle navigation
                onClose();
              }}
              className="
                w-full text-left text-xs text-gray-700
                px-3 py-2 hover:bg-gray-50 hover:text-black
                transition-colors whitespace-nowrap
              "
            >
              {child}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Main Header 

export default function Header() {
  const { lang, setLang } = useLanguage();
  const { user, logout } = useAuth();

  const [showLogin, setShowLogin]     = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(null);
  const [mobileOpen, setMobileOpen]   = useState(null);

  const desktopNavRef = useRef(null);
  const mobileNavRef  = useRef(null);

  const items = navItems[lang] ?? navItems["EN"];

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (desktopNavRef.current && !desktopNavRef.current.contains(e.target)) {
        setDesktopOpen(null);
      }
      if (mobileNavRef.current && !mobileNavRef.current.contains(e.target)) {
        setMobileOpen(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">

      {/* ── Main Row ── */}
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

        {/* Desktop Nav */}
        <nav ref={desktopNavRef} className="hidden md:flex items-center gap-1">
          {items.map((item, index) => (
            <DropdownButton
              key={item.label}
              item={item}
              variant="desktop"
              isOpen={desktopOpen === index}
              onToggle={() => setDesktopOpen(desktopOpen === index ? null : index)}
              onClose={() => setDesktopOpen(null)}
            />
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-1.5 md:gap-3 flex-shrink-0">

          {/* Language Switcher */}
          <div className="hidden md:flex items-center border border-gray-300 rounded-full overflow-hidden text-sm font-semibold">
            {["BN", "EN"].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-3 py-1 border-none cursor-pointer text-sm font-semibold transition-colors ${
                  lang === l
                    ? "bg-green-600 text-white"
                    : "bg-transparent text-black"
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Search */}
          <button className="bg-transparent border-none text-black cursor-pointer text-base md:text-lg p-1">
            🔍
          </button>

          {/* Phone */}
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

      {/* ── Mobile Nav Row ── */}
      <nav
        ref={mobileNavRef}
        className="md:hidden flex items-center gap-1 overflow-x-auto px-4 pb-2"
        style={{ scrollbarWidth: "none" }}
      >
        {items.map((item, index) => (
          <DropdownButton
            key={item.label}
            item={item}
            variant="mobile"
            isOpen={mobileOpen === index}
            onToggle={() => setMobileOpen(mobileOpen === index ? null : index)}
            onClose={() => setMobileOpen(null)}
          />
        ))}
      </nav>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </header>
  );
}