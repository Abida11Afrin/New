"use client";

import { useRef, useState } from "react";
import Image from "next/image";

function GlowCard({ children, className = "", style = {} }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    setPos({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={className}
      style={{
        position: "relative",
        borderRadius: "20px",
        background: "#1c1c1c",
        cursor: "pointer",
        transform: hovered ? "scale(1.03)" : "scale(1)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        boxShadow: hovered
          ? "0 0 30px 5px rgba(200, 40, 120, 0.35)"
          : "0 0 0px transparent",
        overflow: "hidden",
        ...style,
      }}
    >
      {/* cursor glow */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: "20px",
        opacity: hovered ? 1 : 0, transition: "opacity 0.3s ease",
        background: `radial-gradient(circle at ${pos.x}% ${pos.y}%, rgba(220,40,180,0.22) 0%, transparent 65%)`,
        pointerEvents: "none", zIndex: 1,
      }} />
      {/* border glow */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: "20px", padding: "1.5px",
        background: hovered
          ? `radial-gradient(circle at ${pos.x}% ${pos.y}%, #e0308a 0%, #8b2cf5 45%, transparent 70%)`
          : "transparent",
        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor", maskComposite: "exclude",
        pointerEvents: "none", zIndex: 2,
        opacity: hovered ? 1 : 0, transition: "opacity 0.3s ease",
      }} />
      <div style={{ position: "relative", zIndex: 3, height: "100%" }}>
        {children}
      </div>
    </div>
  );
}

export default function OnlineBatchSection() {
  return (
    <section className="mb-12 md:mb-20 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Title */}
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-10">
          <span className="text-white">অনলাইন ব্যাচের </span>
          <span style={{ color: "#ed90c0" }}>শিক্ষার্থীরা পাচ্ছে</span>
        </h2>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gridTemplateRows: "auto auto",
          gap: "16px",
        }}>

          {/* 1 — ১০টি সাপ্তাহিক লাইভ ক্লাস (spans 2 rows) */}
          <GlowCard style={{ gridColumn: "1", gridRow: "1 / 3", minHeight: "280px" }}>
            <div
  className="flex items-center justify-center flex-col rounded-3xl p-8 w-52 h-52"
  style={{
    background: "linear-gradient(145deg, #1a1a1a, #111)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
  }}
>
  {/* SVG Icon */}
  <Image
    src="/images/10_Online.svg"
    alt="Online Icon"
    width={42}
    height={34}
  />

  {/* ১০টি */}
  <div className="text-5xl font-black leading-none mt-2">
    <span style={{
      background: "linear-gradient(135deg, #f97316, #ec4899)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    }}>
      ১০টি
    </span>
  </div>

  {/* Subtitle */}
  <div className="text-white text-sm font-semibold mt-3 text-center">
    সাপ্তাহিক লাইভ ক্লাস
  </div>
</div>
          </GlowCard>

          {/* 3 — SuperPrep */}
          <GlowCard style={{ gridColumn: "3", gridRow: "1" }}>
            <div style={{
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              gap: "10px", padding: "24px 16px", height: "100%",
            }}>
              <p style={{ margin: 0, fontSize: "22px", fontWeight: 800, fontStyle: "italic" }}>
                <span style={{ color: "#a78bfa" }}>Super</span>
                <span style={{ color: "#fff" }}>Prep</span>
              </p>
              <p style={{
                color: "#d1d5db", fontSize: "13px",
                margin: 0, textAlign: "center", lineHeight: 1.6,
              }}>
                আনলিমিটেড MCQ<br />
                প্র্যাকটিসের মাধ্যমে এক্সাম<br />
                প্রিপারেশন
              </p>
            </div>
          </GlowCard>

          {/* 4 — রেকর্ডেড ক্লাস */}
          <GlowCard style={{ gridColumn: "2", gridRow: "2" }}>
  <div style={{
    display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center",
    gap: "8px", padding: "20px 16px", height: "100%",
  }}>
    <p style={{ color: "#9ca3af", fontSize: "12px", margin: 0, textAlign: "center" }}>
      ক্লাস মিস? নো ইস্যু!
    </p>
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <Image
        src="/images/10_Online.svg"
        alt="Online Icon"
        width={20}
        height={16}
      />
      <p style={{
        color: "#38bdf8", fontSize: "15px", fontWeight: 700,
        margin: 0, textDecoration: "underline",
      }}>রেকর্ডেড ক্লাস</p>
    </div>
    <p style={{ color: "#9ca3af", fontSize: "12px", margin: 0 }}>তো আছেই।</p>
  </div>
</GlowCard>

          {/* 5 — ক্লাসের পাশাপাশি হোমওয়ার্ক (image bg) */}
          <GlowCard style={{ gridColumn: "3", gridRow: "2", overflow: "hidden" }}>
            <div style={{ position: "relative", height: "100%", minHeight: "160px" }}>
              <Image
                src="/images/SSC_27.jpg"
                alt="Student"
                fill
                style={{ objectFit: "cover", opacity: 0.7 }}
              />
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.85) 50%, transparent)",
                display: "flex", alignItems: "flex-end",
                padding: "16px", textAlign: "center",
              }}>
                <p style={{
                  color: "#fff", fontSize: "14px", fontWeight: 600,
                  margin: 0, lineHeight: 1.5, width: "100%",
                }}>
                  ক্লাসের পাশাপাশি<br />হোমওয়ার্ক ও<br />সাপ্তাহিক পরীক্ষা
                </p>
              </div>
            </div>
          </GlowCard>

        </div>

        {/* SuperSolve full-width */}
        <div style={{ marginTop: "16px" }}>
          <GlowCard style={{
            background: "linear-gradient(135deg, #4c1d95, #7e22ce, #be185d)",
            borderRadius: "20px", padding: "28px 32px",
          }}>
            <div style={{
              display: "flex", alignItems: "center",
              justifyContent: "space-between", flexWrap: "wrap", gap: "12px",
            }}>
              <div>
                <p style={{ margin: "0 0 6px", fontSize: "24px", fontWeight: 800, fontStyle: "italic" }}>
                  <span style={{ color: "#fbbf24" }}>Super</span>
                  <span style={{ color: "#fff" }}>Solve</span>
                </p>
                <p style={{ color: "#e9d5ff", fontSize: "14px", margin: 0, lineHeight: 1.6 }}>
                  ২৪ ঘণ্টা ডাউট সেলভের জন্য তোমার স্টাডি পার্টনার <strong style={{ color: "#fff" }}>TenTen</strong>
                </p>
              </div>
           
            </div>
          </GlowCard>
        </div>

        {/* Bottom tagline */}
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <p style={{ color: "#f8b17f", fontSize: "20px", fontWeight: 700, margin: "0 0 4px" }}>
             আর শেখার সেই পথেই গড়ে উঠছে
          </p>
          <p style={{ color: "#f8b17f", fontSize: "20px", fontWeight: 700, margin: 0 }}>
            আত্মবিশ্বাসী সফল প্রজন্ম
          </p>
        </div>

      </div>
    </section>
  );
}