"use client";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

const POPULAR_SEARCHES = [
  "hsc 26",
  "english",
  "HSC 27 অনলাইন ব্যাচ ফিজিক্স",
  "HSC 27 অনলাইন ব্যাচ বাংলা",
  "ielts",
];

const POPULAR_SEARCHES_EN = [
  "hsc 26",
  "english",
  "HSC 27 Online Batch Physics",
  "HSC 27 Online Batch Bangla",
  "ielts",
];

const STORAGE_KEY = "recent_searches";
const MAX_RECENT = 5;

export default function SearchBar() {
  const { lang } = useLanguage();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // লোড recent searches from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setRecentSearches(JSON.parse(saved));
      }
    } catch (err) {
      console.error("Failed to load recent searches:", err);
    }
  }, []);

  // বাইরে ক্লিক করলে dropdown বন্ধ হবে
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const saveSearch = (term) => {
    if (!term.trim()) return;

    const updated = [
      term,
      ...recentSearches.filter((item) => item.toLowerCase() !== term.toLowerCase()),
    ].slice(0, MAX_RECENT);

    setRecentSearches(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error("Failed to save search:", err);
    }
  };

  const removeSearch = (term) => {
    const updated = recentSearches.filter((item) => item !== term);
    setRecentSearches(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error("Failed to update searches:", err);
    }
  };

  const clearAllSearches = () => {
    setRecentSearches([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.error("Failed to clear searches:", err);
    }
  };

  const handleSearch = (term) => {
    const searchTerm = term ?? query;
    if (!searchTerm.trim()) return;

    saveSearch(searchTerm);
    setQuery(searchTerm);
    setIsOpen(false);
    inputRef.current?.blur();

    // TODO: এখানে আসল সার্চ লজিক/রিডাইরেক্ট যোগ করুন
    console.log("Searching for:", searchTerm);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    } else if (e.key === "Escape") {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const popularList = lang === "BN" ? POPULAR_SEARCHES : POPULAR_SEARCHES_EN;

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      {/* Search Input */}
      <div className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 bg-white">
        <span className="text-gray-400">🔍</span>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={lang === "BN" ? "সার্চ করুন..." : "Search..."}
          className="flex-1 outline-none border-none text-sm text-black bg-transparent"
        />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full sm:w-[320px] bg-white rounded-xl shadow-2xl border border-gray-200 p-4 z-50 max-h-[400px] overflow-y-auto">

          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-500 text-xs font-semibold">
                  {lang === "BN" ? "সাম্প্রতিক অনুসন্ধান" : "Recent Searches"}
                </span>
                <button
                  onClick={clearAllSearches}
                  className="text-green-600 text-xs font-semibold cursor-pointer bg-transparent border-none hover:underline"
                >
                  {lang === "BN" ? "ক্লিয়ার করুন" : "Clear"}
                </button>
              </div>
              <div className="flex flex-col gap-1">
                {recentSearches.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-2 px-2 py-1.5 rounded-md hover:bg-gray-100 cursor-pointer group"
                    onClick={() => handleSearch(item)}
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <span className="text-gray-400 text-sm">🕐</span>
                      <span className="text-gray-700 text-sm truncate">{item}</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeSearch(item);
                      }}
                      className="text-gray-400 hover:text-gray-700 bg-transparent border-none cursor-pointer text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Popular Searches */}
          <div>
            <div className="text-gray-500 text-xs font-semibold mb-2">
              {lang === "BN" ? "জনপ্রিয় অনুসন্ধান" : "Popular Searches"}
            </div>
            <div className="flex flex-col gap-1">
              {popularList.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSearch(item)}
                >
                  <span className="text-gray-400 text-sm">🔍</span>
                  <span className="text-gray-700 text-sm truncate">{item}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}