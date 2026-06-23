// src/components/DynamicBatchSection.jsx

"use client"; // ✅ Next.js এর জন্য প্রয়োজন

import { useEffect, useState } from "react";

export default function DynamicBatchSection({ lang }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/online-batches/")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching batches:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="mb-12 md:mb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center items-center space-x-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
            <p className="text-gray-400">Loading batches...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mb-12 md:mb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-red-400">Error: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-12 md:mb-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-4">
          <span className="text-white">
            {lang === "BN" ? "দেশসেরা সকল " : "All the Country's Best "}
          </span>
          <span style={{ color: "#f97316" }}>
            {lang === "BN" ? "অনলাইন " : "Online "}
          </span>
          <span style={{ color: "#facc15" }}>
            {lang === "BN" ? "ব্যাচ" : "Batches"}
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-center text-gray-400 text-sm md:text-base mb-10">
          {lang === "BN"
            ? "টেন মিনিট স্কুলের বিভিন্ন কোর্সে এই মুহূর্তে পড়া ৩০+ হাজার Academic স্টুডেন্টের একজন হও তুমিও।"
            : "Become one of the 30,000+ Academic students currently studying in various courses at 10 Minute School."}
        </p>

        {/* Dynamic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`rounded-2xl p-6 ${category.is_wide ? "md:col-span-2" : ""}`}
              style={{
                background: `linear-gradient(135deg, ${category.gradient_from}, ${category.gradient_to})`,
                border: `1px solid ${category.border_color}`,
              }}
            >
              <h3 className="text-lg font-bold mb-6" style={{ color: category.color }}>
                {lang === "BN" ? category.name_bn : category.name_en}
              </h3>

              {category.subcategories?.map((sub) => (
                <div key={sub.id} className="mb-6">
                  {category.subcategories.length > 1 && sub.name_bn && (
                    <p className="text-gray-400 text-sm mb-3">
                      {lang === "BN" ? sub.name_bn : sub.name_en}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-3">
                    {sub.items?.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          if (item.link && item.link !== "/" && item.link !== "#") {
                            window.open(item.link, "_blank");
                          }
                        }}
                        className="text-white text-sm font-medium rounded-full px-5 py-2.5 hover:opacity-80 transition-all text-left"
                        style={{ background: "#2a2a2a", border: "1px solid #444" }}
                      >
                        {lang === "BN" ? item.name_bn : item.name_en}
                        {item.has_gift && " 🎁"} →
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {categories.length === 0 && (
          <div className="text-center text-gray-400 py-12">
            <p>No batches available.</p>
          </div>
        )}
      </div>
    </section>
  );
}