"use client";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import HeroBackground from "@/components/HeroBackground";
import Header from "@/components/Header";
import OnlineBatchSection from "@/components/OnlineBatchSection";
import ScrollingBanner from "@/components/ScrollingBanner";
import ParentReviewSlider from "@/components/ParentReviewSlider";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import DynamicBatchSection from '../components/DynamicBatchSection';


{/* ── Helper functions (return এর বাইরে, export এর বাইরে) ── */}
const toBengaliDigits = (num) => {
  const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num.toString().replace(/\d/g, (d) => bengaliDigits[d]);
};

const formatIndianNumber = (num) => {
  const str = Math.floor(num).toString();
  const lastThree = str.slice(-3);
  const other = str.slice(0, -3);
  let formatted = lastThree;
  if (other !== "") {
    formatted = other.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree;
  }
  return toBengaliDigits(formatted);
};

export default function Home() {
  const { lang } = useLanguage();

  {/* ── App Download Section ── */}
  const [downloadCount, setDownloadCount] = useState(900000);
  const downloadSectionRef = useRef(null);
  const timerRef = useRef(null);
  const hasAnimatedRef = useRef(false);

  {/* ── Course States ── */}
  const [heroCourses, setHeroCourses] = useState([]);
  const [onlineEnglishCourses, setOnlineEnglishCourses] = useState([]);
  const [offlineLocations, setOfflineLocations] = useState([]);
  const [offlineEnglishCourses, setOfflineEnglishCourses] = useState([]);
  const [superFeatures, setSuperFeatures] = useState([]);
  const [offlineImages, setOfflineImages] = useState([]);
  const [offlineFeatures, setOfflineFeatures] = useState([]);


  {/* ── useEffects ── */}
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/courses/?category=school_college`)
      .then((res) => res.json())
      .then((data) => setHeroCourses(data))
      .catch((err) => console.error("Course fetch failed:", err));
  }, []);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/courses/?category=online_english`)
      .then((res) => res.json())
      .then((data) => setOnlineEnglishCourses(data))
      .catch((err) => console.error("Online English courses fetch failed:", err));
  }, []);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/courses/?category=offline_english`)
      .then((res) => res.json())
      .then((data) => setOfflineEnglishCourses(data))
      .catch((err) => console.error("Offline English courses fetch failed:", err));
  }, []);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/offline-locations/`)
      .then((res) => res.json())
      .then((data) => setOfflineLocations(data))
      .catch((err) => console.error("Offline locations fetch failed:", err));
  }, []);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/super-features/`)
      .then((res) => res.json())
      .then((data) => setSuperFeatures(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/offline-images/`)
      .then((res) => res.json())
      .then((data) => setOfflineImages(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/offline-features/`)
      .then((res) => res.json())
      .then((data) => setOfflineFeatures(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const startCount = () => {
      const target = 1000000;
      const start = 900000;
      const duration = 40000;
      const steps = 10000;
      const increment = (target - start) / steps;
      const stepTime = duration / steps;

      let current = start;
      let step = 0;

      setDownloadCount(start);
      if (timerRef.current) clearInterval(timerRef.current);

      timerRef.current = setInterval(() => {
        step++;
        current += increment;
        if (step >= steps) {
          current = target;
          clearInterval(timerRef.current);
        }
        setDownloadCount(Math.floor(current));
      }, stepTime);
    };

    const handleScroll = () => {
      if (!downloadSectionRef.current) return;
      const rect = downloadSectionRef.current.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight * 0.85 && rect.bottom > 0;
      if (isVisible && !hasAnimatedRef.current) {
        hasAnimatedRef.current = true;
        startCount();
      } else if (!isVisible && hasAnimatedRef.current) {
        hasAnimatedRef.current = false;
        if (timerRef.current) clearInterval(timerRef.current);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();



    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="bg-[#0d0d0d] text-white min-h-screen">
      <style>{`
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.6); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .hero-title { opacity: 0; animation: fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) forwards; animation-delay: 0.2s; }
        .hero-sub   { opacity: 0; animation: fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) forwards; animation-delay: 0.45s; }
        .card-item  { opacity: 0; animation: scaleIn 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards; }
        .btn-wrap   { opacity: 0; animation: fadeIn 0.6s ease forwards; animation-delay: 1.2s; }
        .card-item:hover { transform: scale(1.05); transition: transform 0.2s ease; }
        .eng-title  { opacity: 0; animation: fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) forwards; animation-delay: 0.2s; }
        .eng-loc    { opacity: 0; animation: fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) forwards; animation-delay: 0.4s; }
        .eng-card   { opacity: 0; animation: scaleIn 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards; }
        .eng-btn    { opacity: 0; animation: fadeIn 0.6s ease forwards; animation-delay: 1.2s; }
        .eng-card:hover { transform: scale(1.05); transition: transform 0.2s ease; }
      `}</style>

      <Header />


{/* ── Hero Section ── */}
<section className="relative min-h-screen overflow-hidden flex items-center justify-center">
  <HeroBackground />

  <div className="relative z-10 w-full max-w-5xl px-6 pt-32 pb-16 text-center">
    {/* Title */}
    <h1 className="hero-title m-0 leading-tight text-5xl sm:text-6xl font-bold">
      <span className="text-[#f8b17f]">{lang === "BN" ? "শেখা" : "Let"} </span>
      <span
        style={{
          background: "linear-gradient(90deg, #f3c6a6, #dabef3, #a1c6f3, #93c5fd)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {lang === "BN" ? "হোক আনন্দে!" : "learning be fun!"}
      </span>
    </h1>

    {/* Subtitle */}
    <p className="hero-sub text-gray-300 mt-4 text-base sm:text-lg font-normal">
      {lang === "BN"
        ? "এক জায়গায় স্কুল ও কলেজের সম্পূর্ণ প্রস্তুতি!"
        : "Complete preparation for school and college in one place!"}
    </p>

  {/* Cards */}
<div className="flex flex-wrap justify-center gap-6 mt-10">
  {heroCourses.length === 0 ? (
    // লোড হওয়ার সময় skeleton দেখাবে
    [...Array(6)].map((_, i) => (
      <div key={i} className="flex flex-col items-center gap-2">
        <div className="w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] rounded-[28px] bg-[#222] animate-pulse" />
        <div className="h-4 w-16 bg-[#222] rounded animate-pulse" />
      </div>
    ))
  ) : (
    heroCourses.map((course, i) => (
      <div key={course.id} className="flex flex-col items-center gap-2">
        <Link href={course.link || "/"} className="inline-block">
          <div
            className="shineWrap box-border w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] rounded-[28px] p-[3px] cursor-pointer hover:scale-105 transition-transform duration-150"
            style={{
              background: course.category === 'hsc'
                ? "linear-gradient(145deg, #f5c518, #e8890c, #f5c518)"
                : "linear-gradient(145deg, #2f2f2f, #6a6a6a, #2f2f2f)"
            }}
          >
            <span className="shineLine" style={{ animationDelay: `${i * 0.6}s` }} />
            <div className="box-border w-full h-full rounded-[25px] bg-[#0b0b0b] p-[10px] relative z-[3]">
              <div className="w-full h-full rounded-[18px] overflow-hidden">
                {course.image_url ? (
                  <img
                    src={course.image_url}
                    alt={course.title_en}
                    className="block w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-[#222] rounded-[18px]" />
                )}
              </div>
            </div>
          </div>
        </Link>

        <span className="text-white text-xs sm:text-sm font-bold text-center">
          {lang === "BN" ? course.title_bn : course.title_en}
        </span>

        {(lang === "BN" ? course.badge_bn : course.badge_en) ? (
          <div
            className="float-badge text-white text-[9px] sm:text-[11px] font-semibold rounded-full px-3 py-1 text-center"
            style={{ background: "linear-gradient(90deg, #c0392b, #e74c3c)" }}
          >
            {lang === "BN" ? course.badge_bn : course.badge_en}
          </div>
        ) : (
          <div className="h-[26px]" />
        )}
      </div>
    ))
  )}
</div>

    {/* Buttons */}
    <div className="flex gap-4 justify-center mt-10 w-full">
      <button className="bg-green-600 text-white rounded-full px-6 py-2.5 text-xs sm:text-sm font-semibold cursor-pointer hover:bg-green-500 transition-all">
        {lang === "BN" ? "ফ্রি ক্লাস (৬-১০) →" : "Free class (6-10) →"}
      </button>
      <button className="bg-green-600 text-white rounded-full px-6 py-2.5 text-xs sm:text-sm font-semibold cursor-pointer hover:bg-green-500 transition-all">
        {lang === "BN" ? "ফ্রি ক্লাস (HSC) →" : "Free class (HSC) →"}
      </button>
    </div>
  </div>
</section>


{/* ── English Section ── */}
<section>
  <div className="mb-16 md:mb-24 bg-[#0d0d0d] min-h-screen flex justify-center px-4 md:px-8 py-12">
    <div
      className="w-full max-w-5xl rounded-3xl p-2"
      style={{
        background: "linear-gradient(135deg, #0f0f0f, #0d0d0d)",
        border: "1px solid rgba(66, 78, 80, 0.2)",
        boxShadow: `
          inset 0 0 40px rgba(120, 120, 120, 0.2),
          inset 0 0 80px rgba(120, 120, 120, 0.2),
          inset 0 -20px 60px rgba(120, 120, 120, 0.2)
        `,
      }}
    >
      <div className="max-w-5xl mx-auto px-3 py-6 md:px-6 md:py-8">

        {/* Title */}
        <h2 className="eng-title text-center text-2xl md:text-3xl font-bold text-[#f8b17f] mb-6 md:mb-8">
          {lang === "BN"
            ? "ক্লাসরুমে ইংরেজি শেখার নতুন আনন্দ"
            : "A New Joy of Learning English in the Classroom"}
        </h2>

        {/* Location Tabs */}
        <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2 mb-6 md:mb-8" style={{ scrollbarWidth: "none" }}>
          {offlineLocations.length === 0 ? (
            [...Array(5)].map((_, i) => (
              <div key={i} className="flex-shrink-0 bg-[#1a1a1a] border border-[#333] rounded-xl p-3 w-[180px]">
                <div className="h-4 w-16 bg-[#333] rounded animate-pulse mb-2" />
                <div className="h-3 w-full bg-[#333] rounded animate-pulse" />
              </div>
            ))
          ) : (
            offlineLocations.map((loc) => (
              <div
                key={loc.id}
                className="flex-shrink-0 bg-[#1a1a1a] border border-[#333] rounded-xl p-3 w-[200px] md:w-auto md:flex-1 md:min-w-[160px]"
              >
                <div className="text-white text-sm font-bold mb-1">
                  {lang === "BN" ? loc.name_bn : loc.name_en}
                </div>
                <div className="text-gray-500 text-xs leading-relaxed">
                  {lang === "BN" ? loc.address_bn : loc.address_en}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Offline English Course Cards */}
        <div className="grid grid-cols-3 gap-2 md:gap-4 mb-8">
          {offlineEnglishCourses.length === 0 ? (
            [...Array(6)].map((_, i) => (
              <div key={i} className="bg-[#111] border border-[#333] rounded-2xl p-2 md:p-3">
                <div className="w-full aspect-square bg-[#222] rounded-lg md:rounded-xl animate-pulse mb-2" />
                <div className="h-3 w-3/4 bg-[#222] rounded animate-pulse mb-1" />
                <div className="h-3 w-1/2 bg-[#222] rounded animate-pulse" />
              </div>
            ))
          ) : (
            offlineEnglishCourses.map((course, i) => {
              const isOrange = i < 3; // প্রথম ৩টায় orange style

              return isOrange ? (
                // ── Orange border + shine (প্রথম ৩টা) ──
                <div key={course.id} className="flex flex-col items-center gap-2">
                  <div
                    className="shineWrap box-border w-full rounded-[20px] p-[3px] cursor-pointer hover:scale-105 transition-transform duration-150"
                    style={{
                      background: "linear-gradient(145deg, #f5c518, #e8890c, #f5c518)",
                    }}
                  >
                    <span className="shineLine" style={{ animationDelay: `${i * 0.6}s` }} />

                    <div className="box-border w-full rounded-[17px] bg-[#0b0b0b] p-[8px] relative z-[3]">
                      <div className="w-full rounded-[12px] overflow-hidden">
                        {course.image_url ? (
                          <img
                            src={course.image_url}
                            alt={lang === "BN" ? course.title_bn : course.title_en}
                            className="block w-full aspect-square object-cover"
                          />
                        ) : (
                          <div className="w-full aspect-square bg-[#222] rounded-[12px]" />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="text-white text-[11px] md:text-sm font-bold text-center leading-tight line-clamp-2">
                    {lang === "BN" ? course.title_bn : course.title_en}
                  </div>
                  <div className="text-gray-500 text-[10px] md:text-xs text-center line-clamp-1">
                    {course.instructor || ""}
                  </div>
                </div>

              ) : (
                // ── Normal style (বাকি ৩টা) ──
                <div
                  key={course.id}
                  className="eng-card cursor-pointer text-center bg-[#111] border border-[#333] rounded-2xl md:rounded-3xl p-2 md:p-3 hover:scale-105 transition-transform duration-150"
                  style={{ animationDelay: `${0.5 + i * 0.1}s` }}
                >
                  {course.image_url ? (
                    <img
                      src={course.image_url}
                      alt={lang === "BN" ? course.title_bn : course.title_en}
                      className="rounded-lg md:rounded-xl w-full aspect-square object-cover"
                    />
                  ) : (
                    <div className="w-full aspect-square bg-[#222] rounded-lg md:rounded-xl" />
                  )}

                  <div className="text-white text-[11px] md:text-sm font-bold mt-2 leading-tight line-clamp-2">
                    {lang === "BN" ? course.title_bn : course.title_en}
                  </div>
                  <div className="text-gray-500 text-[10px] md:text-xs mt-1 line-clamp-1">
                    {course.instructor || ""}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Button */}
        <div className="eng-btn text-center">
          <button className="bg-green-700 text-white border-none rounded-full px-5 md:px-7 py-2.5 md:py-3 text-xs md:text-sm font-semibold cursor-pointer">
            {lang === "BN"
              ? "অফলাইন সেন্টারে ফ্রি ক্লাস করুন →"
              : "Book a Free Class at Offline Center →"}
          </button>
        </div>

      </div>
    </div>
  </div>
</section>

    {/* ── ঘরে বসে অনলাইনেও ইংরেজি শেখা চলুক নিরবচ্ছিন্ন ── */}
<section className="mb-12 md:mb-20 lg:mb-28">
  <div className="bg-[#0d0d0d] min-h-screen flex justify-center px-4 md:px-8 py-12">
    <div
      className="cursor-pointer w-full max-w-5xl rounded-3xl p-2"
      style={{
        background: "linear-gradient(135deg, #0f0f0f, #0d0d0d)",
        border: "1px solid rgba(34, 211, 238, 0.2)",
        boxShadow: `
          inset 0 0 40px rgba(34, 211, 238, 0.08),
          inset 0 0 80px rgba(34, 211, 238, 0.04),
          inset 0 -20px 60px rgba(29, 212, 130, 0.06)
        `,
      }}
    >
      <div className="max-w-5xl mx-auto px-3 py-6 md:px-6 md:py-8">

        {/* Title */}
        <h2 className="eng-title text-center text-2xl md:text-3xl font-bold mb-3"
          style={{
            background: "linear-gradient(90deg, #4ade80, #facc15)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
          {lang === "BN"
            ? "ঘরে বসে অনলাইনেও ইংরেজি শেখা চলুক নিরবচ্ছিন্ন"
            : "Keep Learning English Online from Home, Uninterrupted"}
        </h2>

        {/* Subtitle */}
        <p className="eng-loc text-center text-xs md:text-sm mb-6 md:mb-8 px-4 py-1 rounded-md inline-block w-full"
          style={{ color: "#7dd3fc", textDecoration: "underline", textDecorationColor: "#3b82f6" }}>
          {lang === "BN"
            ? "শেখার সেরা সুযোগ অনলাইন ও অফলাইন দু'জায়গাতেই"
            : "The best opportunity to learn, both online and offline"}
        </p>

        {/* Course Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-8">

          {/* Loading skeleton */}
          {onlineEnglishCourses.length === 0 ? (
            [...Array(6)].map((_, i) => (
              <div key={i} className="flex flex-col bg-[#111] border border-[#2a2a2a] rounded-2xl p-3">
                <div className="w-full h-36 bg-[#222] rounded-xl animate-pulse mb-3" />
                <div className="h-4 w-3/4 bg-[#222] rounded animate-pulse mb-2" />
                <div className="h-3 w-1/2 bg-[#222] rounded animate-pulse" />
              </div>
            ))
          ) : (
            onlineEnglishCourses.map((course, i) => (
              <div
                key={course.id}
                className="eng-card flex flex-col bg-[#111] border border-[#2a2a2a] rounded-2xl p-3 cursor-pointer hover:border-[#444] transition-all"
                style={{ animationDelay: `${0.5 + i * 0.1}s` }}
              >
                {/* Thumbnail */}
                <div className="relative w-full mb-3">

                  {/* Badge */}
                  {(lang === "BN" ? course.badge_bn : course.badge_en) && (
                    <span className={`absolute top-2 left-2 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm z-10 ${
                      course.badge_en === "LIVE Batch"
                        ? "bg-red-600"
                        : "bg-orange-500"
                    }`}>
                      {course.badge_en === "LIVE Batch"
                        ? `● ${lang === "BN" ? course.badge_bn : course.badge_en}`
                        : (lang === "BN" ? course.badge_bn : course.badge_en)}
                    </span>
                  )}

                  {/* Image */}
                  {course.image_url ? (
                    <img
                      src={course.image_url}
                      alt={lang === "BN" ? course.title_bn : course.title_en}
                      className="rounded-xl w-full h-36 object-cover"
                    />
                  ) : (
                    <div className="rounded-xl w-full h-36 bg-[#222]" />
                  )}
                </div>

                {/* Title */}
                <div className="text-white text-sm font-bold leading-snug">
                  {lang === "BN" ? course.title_bn : course.title_en}
                </div>

                {/* Instructor */}
                <div className="text-gray-500 text-xs mt-1">
                  {course.instructor || ""}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Button */}
        <div className="eng-btn text-center">
          <button className="bg-green-600 hover:bg-green-500 text-white border-none rounded-full px-6 md:px-8 py-2.5 md:py-3 text-xs md:text-sm font-semibold cursor-pointer transition-colors">
            {lang === "BN" ? "এক্সপ্লোর করুন →" : "Explore →"}
          </button>
        </div>

      </div>
    </div>
  </div>
</section>

{/* ── Super Live Section ── */}
<section className="mb-12 md:mb-20">
  <div className="flex justify-center px-4">
    <div
      className="cursor-pointer w-full max-w-5xl rounded-3xl p-8"
      style={{
        background: "linear-gradient(135deg, #0a0e1a, #0d0d0d)",
        border: "1px solid rgba(59, 130, 246, 0.2)",
        boxShadow: `
          inset 0 0 40px rgba(59, 130, 246, 0.06),
          inset 0 0 80px rgba(59, 130, 246, 0.03),
          0 20px 60px rgba(0, 0, 0, 0.8)
        `,
      }}
    >
      {/* Title */}
      <h2 className="text-center text-3xl md:text-4xl font-bold mb-4">
        <span style={{ color: "#38bdf8" }}>
          {lang === "BN" ? "অনলাইনেই শেখা " : "Learn Online "}
        </span>
        <span className="text-white">
          {lang === "BN" ? "হোক নিজের গতিতে!" : "at Your Own Pace!"}
        </span>
      </h2>

      {/* Subtitle */}
      <p className="text-center text-gray-400 text-sm md:text-base mb-10">
        {lang === "BN"
          ? "দেশের সেরা শিক্ষকদের ক্লাস, রেকর্ডেড লেকচার, আর নিরবচ্ছিন্ন প্র্যাকটিস সব অনলাইনে।"
          : "Classes by the country's best teachers, recorded lectures, and uninterrupted practice — all online."}
      </p>

      {/* Super Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {superFeatures.length === 0 ? (
          [...Array(3)].map((_, i) => (
            <div key={i} className="flex flex-col gap-4">
              <div className="rounded-2xl w-full h-48 bg-[#1a1a2a] animate-pulse" />
              <div className="h-4 w-1/2 bg-[#1a1a2a] rounded animate-pulse" />
              <div className="h-3 w-full bg-[#1a1a2a] rounded animate-pulse" />
            </div>
          ))
        ) : (
          superFeatures.map((feature) => (
            <div key={feature.id} className="flex flex-col gap-4">
              <div className="rounded-2xl overflow-hidden" style={{ border: "2px solid #1e3a5f" }}>
                {feature.image_url ? (
                  <img
                    src={feature.image_url}
                    alt={feature.title}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-[#1a1a2a]" />
                )}
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2" style={{ color: feature.title_color }}>
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {lang === "BN" ? feature.description_bn : feature.description_en}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-[#222] my-10" />

      {/* অফলাইনে শেখা Section */}
      <h2 className="text-center text-3xl md:text-4xl font-bold mb-4">
        <span style={{ color: "#ef4444" }}>
          {lang === "BN" ? "অফলাইনে শেখা, আরও " : "Offline Learning, Now "}
        </span>
        <span style={{ color: "#f472b6" }}>
          {lang === "BN" ? "ইন্টারঅ্যাকটিভভাবে!" : "More Interactive!"}
        </span>
      </h2>
      <p className="text-center text-gray-400 text-sm md:text-base mb-10">
        {lang === "BN"
          ? "বাস্তব ক্লাসরুমে শেখার আনন্দ অত্যাধুনিক মাল্টিমিডিয়া ক্লাসরুমে বসে"
          : "Enjoy real classroom learning in state-of-the-art multimedia classrooms"}
      </p>

      {/* Offline Images */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {offlineImages.length === 0 ? (
          [...Array(3)].map((_, i) => (
            <div key={i} className="rounded-2xl w-full h-52 bg-[#1a1a1a] animate-pulse" />
          ))
        ) : (
          offlineImages.map((img) => (
            <div key={img.id} className="relative rounded-2xl overflow-hidden" style={{ border: "2px solid #3a1a1a" }}>
              {img.image_url ? (
                <img
                  src={img.image_url}
                  alt={lang === "BN" ? img.caption_bn || "Offline Class" : img.caption_en || "Offline Class"}
                  className="w-full h-52 object-cover"
                />
              ) : (
                <div className="w-full h-52 bg-[#1a1a1a]" />
              )}
              {(lang === "BN" ? img.caption_bn : img.caption_en) && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-sm text-center py-2 px-3">
                  {lang === "BN" ? img.caption_bn : img.caption_en}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Offline Feature List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {offlineFeatures.length === 0 ? (
          [...Array(3)].map((_, i) => (
            <div key={i}>
              <div className="h-4 w-1/2 bg-[#1a1a1a] rounded animate-pulse mb-3" />
              <div className="h-3 w-full bg-[#1a1a1a] rounded animate-pulse" />
            </div>
          ))
        ) : (
          offlineFeatures.map((item) => (
            <div key={item.id}>
              <h3 className="text-white text-lg font-bold mb-3">
                {lang === "BN" ? item.title_bn : item.title_en}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {lang === "BN" ? item.description_bn : item.description_en}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-4 justify-center items-center">
        <button className="bg-green-600 hover:bg-green-500 text-white rounded-full px-8 py-3 text-sm font-semibold cursor-pointer transition-colors">
          {lang === "BN" ? "ফ্রি ক্লাস বুক করুন →" : "Book a Free Class →"}
        </button>
        <button className="bg-transparent text-white text-sm font-semibold cursor-pointer hover:text-gray-300 transition-colors">
          {lang === "BN" ? "আরও জানুন →" : "Learn More →"}
        </button>
      </div>

    </div>
  </div>
</section>


 <DynamicBatchSection lang={lang} />



{/* ── এইচএসসি অনলাইন ব্যাচ ── */}
<section className="mb-12 md:mb-20 px-4">
  <div className="max-w-6xl mx-auto">
    <div
      className="rounded-2xl p-8"
      style={{
        background: "linear-gradient(135deg, #050a1a, #0a0f2a)",
        border: "1px solid #1a2a4a",
      }}
    >
      <h3 className="text-lg font-bold mb-8" style={{ color: "#60a5fa" }}>
        {lang === "BN" ? "এইচএসসি অনলাইন ব্যাচ" : "HSC Online Batch"}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Left — এইচএসসি ২০২৭ */}
        <div>
          <p className="text-gray-400 text-sm mb-4">{lang === "BN" ? "এইচএসসি ২০২৭" : "HSC 2027"}</p>
          <div className="flex flex-wrap gap-3">
            {(lang === "BN"
              ? [
                  "ফিজিক্স, কেমিস্ট্রি, ম্যাথ, বায়োলজি বান্ডেল (🎁)",
                  "বাংলা, ইংরেজি, তথ্য ও যোগাযোগ প্রযুক্তি বান্ডেল (🎁)",
                  "ফাইন্যান্স ও একাউন্টিং বান্ডেল (🎁)",
                  "জিওগ্রাফি ও ইকোনমিক্স বান্ডেল (🎁)",
                  "ফিজিক্স", "কেমিস্ট্রি", "ম্যাথ",
                  "বায়োলজি", "ফাইন্যান্স", "একাউন্টিং",
                  "জিওগ্রাফি", "ইকোনমিক্স", "বাংলা",
                  "ইংরেজি", "আইসিটি",
                ]
              : [
                  "Physics, Chemistry, Math, Biology Bundle (🎁)",
                  "Bangla, English, ICT Bundle (🎁)",
                  "Finance & Accounting Bundle (🎁)",
                  "Geography & Economics Bundle (🎁)",
                  "Physics", "Chemistry", "Math",
                  "Biology", "Finance", "Accounting",
                  "Geography", "Economics", "Bangla",
                  "English", "ICT",
                ]
            ).map((item, i) => (
              <button
                key={i}
                className="text-white text-sm font-medium rounded-full px-4 py-2 hover:opacity-80 transition-opacity"
                style={{ background: "#1a1a2a", border: "1px solid #2a2a4a" }}
              >
                {item} →
              </button>
            ))}
          </div>
        </div>

        {/* Right — এইচএসসি ২০২৬ + ভর্তি পরীক্ষা */}
        <div className="flex flex-col gap-8">

          {/* এইচএসসি ২০২৬ */}
          <div>
            <p className="text-gray-400 text-sm mb-4">{lang === "BN" ? "এইচএসসি ২০২৬" : "HSC 2026"}</p>
            <div className="flex flex-wrap gap-3">
              {(lang === "BN"
                ? [
                    "শেষ মুহূর্তের প্রস্তুতি কোর্স (বিজ্ঞান)",
                    "শেষ মুহূর্তের প্রস্তুতি কোর্স (ব্যবসায় শিক্ষা)",
                    "শেষ মুহূর্তের প্রস্তুতি কোর্স (মানবিক)",
                    "শেষ মুহূর্তের প্রস্তুতি কোর্স (বাংলা, ইংরেজি, ICT)",
                    "ফিজিক্স, কেমিস্ট্রি, ম্যাথ, বায়োলজি বান্ডেল (🎁)",
                    "বাংলা, ইংরেজি, তথ্য ও যোগাযোগ প্রযুক্তি বান্ডেল (🎁)",
                    "ফিজিক্স", "কেমিস্ট্রি",
                    "ম্যাথ", "বায়োলজি", "বাংলা",
                    "ইংরেজি", "ICT",
                  ]
                : [
                    "Last Minute Preparation Course (Science)",
                    "Last Minute Preparation Course (Business Studies)",
                    "Last Minute Preparation Course (Humanities)",
                    "Last Minute Preparation Course (Bangla, English, ICT)",
                    "Physics, Chemistry, Math, Biology Bundle (🎁)",
                    "Bangla, English, ICT Bundle (🎁)",
                    "Physics", "Chemistry",
                    "Math", "Biology", "Bangla",
                    "English", "ICT",
                  ]
              ).map((item, i) => (
                <button
                  key={i}
                  className="text-white text-sm font-medium rounded-full px-4 py-2 hover:opacity-80 transition-opacity"
                  style={{ background: "#1a1a2a", border: "1px solid #2a2a4a" }}
                >
                  {item} →
                </button>
              ))}
            </div>
          </div>

          {/* ভর্তি পরীক্ষা ২০২৫ */}
          <div>
            <p className="text-gray-400 text-sm mb-4">
              {lang === "BN" ? "ভর্তি পরীক্ষা ২০২৫" : "Admission Test 2025"}
            </p>
            <div className="flex flex-wrap gap-3">
              {(lang === "BN"
                ? ["A ইউনিট", "B ইউনিট", "C ইউনিট"]
                : ["Unit A", "Unit B", "Unit C"]
              ).map((item, i) => (
                <button
                  key={i}
                  className="text-white text-sm font-medium rounded-full px-5 py-2.5 hover:opacity-80 transition-opacity"
                  style={{ background: "#1a1a2a", border: "1px solid #2a2a4a" }}
                >
                  {item} →
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</section>

<OnlineBatchSection />
<ScrollingBanner />

<div className="flex gap-1 justify-center">
  {[...Array(5)].map((_, i) => (
    <span key={i} className="text-yellow-400 text-xl">★</span>
  ))}
</div>

{/* কেন আমরাই শিক্ষার্থী ও অভিভাবকদের প্রথম পছন্দ? */}
<section>
  <div className="mb-16 md:mb-24 bg-[#0d0d0d] flex flex-col items-center px-8 py-12">
    <h1 className="text-3xl font-bold text-center mb-10">
      <span style={{
        background: "linear-gradient(90deg, #eaffee, #dabef3, #a1c6f3, #93c5fd)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}>
        {lang === "BN" ? "কেন আমরাই শিক্ষার্থী ও অভিভাবকদের প্রথম পছন্দ?" : "Why are we the first choice of students and parents?"}
      </span>
    </h1>

    <div
      className="flex flex-nowrap gap-6 overflow-x-auto pb-4 w-full max-w-5xl"
      style={{
        scrollbarWidth: "none",
        WebkitOverflowScrolling: "touch",
      }}
    >
      {[
        { src: "https://www.youtube.com/embed/xPgIpyx04bE", shadow: "rgba(161, 198, 243, 0.08)", shadow2: "rgba(161, 198, 243, 0.04)" },
        { src: "https://www.youtube.com/embed/L9NFfsYHpJU", shadow: "rgba(218, 190, 243, 0.08)", shadow2: "rgba(218, 190, 243, 0.04)" },
        { src: "https://www.youtube.com/embed/owAIxAdc3oA", shadow: "rgba(218, 190, 243, 0.08)", shadow2: "rgba(218, 190, 243, 0.04)" },
        { src: "https://www.youtube.com/embed/qiWVZ6uAxnU", shadow: "rgba(218, 190, 243, 0.08)", shadow2: "rgba(218, 190, 243, 0.04)" },
        { src: "https://www.youtube.com/embed/buYiU9v8AS0", shadow: "rgba(218, 190, 243, 0.08)", shadow2: "rgba(218, 190, 243, 0.04)" },
        { src: "https://www.youtube.com/embed/d65A5cumrUY", shadow: "rgba(218, 190, 243, 0.08)", shadow2: "rgba(218, 190, 243, 0.04)" },
        { src: "https://www.youtube.com/embed/PiWsFPs048U", shadow: "rgba(218, 190, 243, 0.08)", shadow2: "rgba(218, 190, 243, 0.04)" },
        { src: "https://www.youtube.com/embed/aaRTwdL-u84", shadow: "rgba(218, 190, 243, 0.08)", shadow2: "rgba(218, 190, 243, 0.04)" },
      ].map((item, i) => (
        <div
          key={i}
          className="flex-shrink-0 rounded-2xl p-6"
          style={{
            width: "260px",
            minWidth: "260px",
            background: "#111",
            border: "1px solid #222",
            boxShadow: `inset 0 0 40px ${item.shadow}, inset 0 0 80px ${item.shadow2}`,
          }}
        >
          <div className="relative w-full" style={{ paddingBottom: "177.78%" }}>
            <iframe
              src={item.src}
              title="YouTube Shorts"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full rounded-xl"
              style={{ border: "none" }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


{/* ── Student Reviews Section ── */}
<section className="mb-12 md:mb-20 px-4 overflow-hidden">
  <div className="max-w-6xl mx-auto">

    <div className="flex gap-4 overflow-x-auto pb-4" style={{ scrollbarWidth: "none" }}>

      {(lang === "BN"
        ? [
            {
              text: "টেন মিনিট স্কুলকে আমি অসংখ্য ধন্যবাদ জানাতে চাই। আমি যখন ২০২৪ সালে ৮ম উঠি তখন ছিল নতুন কারিকুলাম। অর্ধেক মাস এরকম আগোছালো কেটে গেল। যখন পরীক্ষার সিদ্ধান্ত নেওয়া হয় এবং বড় একটা সিলেবাস আমাদের ধরিয়ে দেওয়া হয় তখন আমার মতো প্রায় সবার একদম নাজেহাল ঠিক ঐরকম সময় 10 minute school নিয়ে আসে...",
              name: "রেদোয়ান আহমেদ",
              school: "বীরশ্রেষ্ঠ নূর মোহাম্মদ পাবলিক কলেজ",
              bg: "linear-gradient(135deg, #2a0a1a, #1a0510)",
              border: "#4a1a2a",
              icon: "/images/boys_icon.jpg",
            },
            {
              text: "আমি গত 4 বছর ধরে প্রথম স্থান অর্জন করে আসছি। এইবছরও আমি 9 থেকে 10এ উত্তীর্ণ হয়েছি প্রথম স্থান অর্জন করে। এর পেছনে টেন মিনিট স্কুলের অবদান অনেক ছিল। তাই আমি টেন মিনিট স্কুলকে অনেক অনেক ধন্যবাদ জানাচ্ছি। আসলে আমি 10 ms এর ফ্রি ক্লাস গুলো করে আসছি। আর এই ক্লাস গুলোই আমাকে inspire করেছে ভালো একটা স্থান অর্জন করার। এবং আমি এই...",
              name: "পূজা রানী দাস",
              school: "The Roses Collectorate School, Habiganj",
              bg: "linear-gradient(135deg, #0a2a10, #051a08)",
              border: "#1a4a1a",
              highlight: true,
              icon: "/images/girls_icon.jpg",
            },
            {
              text: "টেন মিনিট স্কুল আমার পড়াশোনায় অনেক হেল্প করেছে। অনেক অভিজ্ঞ টিচারদের স্টাডি টিপস, আর তাদের ভালো করে পড়ানোর কারণে আমার বার্ষিক পরীক্ষার রেজাল্ট অনেক ভালো হয়েছে। থ্যাংক ইউ, টেন মিনিট স্কুল।",
              name: "জাহিদ আলম",
              school: "কমর আলী হাই স্কুল, নারায়ণগঞ্জ",
              bg: "linear-gradient(135deg, #0a1a2a, #050f1a)",
              border: "#1a3a5a",
              icon: "/images/boys_icon.jpg",
            },
            {
              text: "আমি এবার স্কুলে ৫ সেকশন মিলিয়ে ফার্স্ট হয়েছি। বার্ষিক পরীক্ষার আগের মডেল টেস্টগুলো আর ফাইনাল রিভিশন ক্লাসগুলো আমার অনেক কাজে লেগেছে। থ্যাংক ইউ টেন মিনিট স্কুল।",
              name: "অমৃত সাহা",
              school: "কান্তনগর",
              bg: "linear-gradient(135deg, #0a1a2a, #051510)",
              border: "#1a3a3a",
              icon: "/images/boys_icon.jpg",
            },
            {
              text: "আপনাদের পড়ানোর ধরন এবং বিষয়গুলো সহজভাবে ব্যাখ্যা করার পদ্ধতি আমার খুব ভালো লেগেছে। আপনাদের ভিডিও ও কন্টেন্ট দেখে আমি পড়াশোনায় অনেক সাহায্য পেয়েছি। বিশেষ করে, জটিল বিষয়গুলো সহজভাবে শেখানোর জন্য আপনাদের টিমকে ধন্যবাদ। আপনাদের কাজ শিক্ষার্থীদের জন্য সত্যিই অনুপ্রেরণাদায়ক। আমি মন থেকে আপনাদের সফলতা কামনা করছি এবং...",
              name: "তাওহিদুল রাহমান",
              school: "জামশেদ আহমেদ হাই স্কুল, সিলেট",
              bg: "linear-gradient(135deg, #0a1a2a, #051510)",
              border: "#1a3a3a",
              icon: "/images/boys_icon.jpg",
            },
            {
              text: "আমি ৬ষ্ঠ শ্রেণি থেকে টেন মিনিট স্কুলের সাথে যুক্ত। কোনো টিচার বা কোচিং করিনি। প্রয়োজনে মায়ের সাহায্য নিয়েছি। সত্যি অসাধারণ।",
              name: "স্বীকৃতি দাস হৃদিকা",
              school: "চিটাগং গভ. গার্লস হাই স্কুল",
              bg: "linear-gradient(135deg, #0a1a2a, #051510)",
              border: "#1a3a3a",
              icon: "/images/girls_icon.jpg",
            },
          ]
        : [
            {
              text: "I want to thank 10 Minute School immensely. When I moved to class 8 in 2024, it was a new curriculum. About half a month went by in complete disarray. When the exam decisions were made and we were handed a huge syllabus, almost everyone like me was completely overwhelmed — right at that time, 10 Minute School came in...",
              name: "Redwan Ahmed",
              school: "Birshreshtha Noor Mohammad Public College",
              bg: "linear-gradient(135deg, #2a0a1a, #1a0510)",
              border: "#4a1a2a",
              icon: "/images/boys_icon.jpg",
            },
            {
              text: "I have been securing first position for the past 4 years. This year too, I passed from class 9 to 10 securing first position. 10 Minute School contributed a lot to this. So I thank 10 Minute School very much. Actually, I've been taking 10 MS's free classes, and these classes inspired me to achieve a good position. And I...",
              name: "Puja Rani Das",
              school: "The Roses Collectorate School, Habiganj",
              bg: "linear-gradient(135deg, #0a2a10, #051a08)",
              border: "#1a4a1a",
              highlight: true,
              icon: "/images/girls_icon.jpg",
            },
            {
              text: "10 Minute School has helped me a lot in my studies. Thanks to the study tips from many experienced teachers and their excellent teaching, my annual exam results were very good. Thank you, 10 Minute School.",
              name: "Zahid Alam",
              school: "Komor Ali High School, Narayanganj",
              bg: "linear-gradient(135deg, #0a1a2a, #050f1a)",
              border: "#1a3a5a",
              icon: "/images/boys_icon.jpg",
            },
            {
              text: "This time I came first combining 5 sections in school. The model tests before the annual exam and the final revision classes were very helpful for me. Thank you, 10 Minute School.",
              name: "Amrito Saha",
              school: "Kantanagar",
              bg: "linear-gradient(135deg, #0a1a2a, #051510)",
              border: "#1a3a3a",
              icon: "/images/boys_icon.jpg",
            },
            {
              text: "I really liked your teaching style and the way you explain topics so simply. Watching your videos and content has helped me a lot in my studies. Especially, thanks to your team for teaching complex topics in a simple way. Your work is truly inspiring for students. I sincerely wish you success and...",
              name: "Tawhidul Rahman",
              school: "Jamshed Ahmed High School, Sylhet",
              bg: "linear-gradient(135deg, #0a1a2a, #051510)",
              border: "#1a3a3a",
              icon: "/images/boys_icon.jpg",
            },
            {
              text: "I've been with 10 Minute School since class 6. I never took any tutor or coaching. I took help from my mother whenever needed. Truly amazing.",
              name: "Swikriti Das Hridika",
              school: "Chittagong Govt. Girls High School",
              bg: "linear-gradient(135deg, #0a1a2a, #051510)",
              border: "#1a3a3a",
              icon: "/images/girls_icon.jpg",
            },
          ]
      ).map((review, i) => (
        <div
          key={i}
          className="flex-shrink-0 flex flex-col justify-between rounded-3xl p-6"
          style={{
            width: "85vw",
            maxWidth: "300px",
            minHeight: "320px",
            background: review.bg,
            border: `1px solid ${review.border}`,
          }}
        >
          <div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              {review.text}
            </p>
            {review.highlight && (
              <span className="text-green-400 text-sm font-semibold cursor-pointer">
                {lang === "BN" ? "আরও দেখুন" : "See More"}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 mt-6">
            <div
              className="w-10 h-10 rounded-full flex-shrink-0 overflow-hidden"
              style={{ background: "#2a2a3a" }}
            >
              <Image
                src={review.icon}
                alt="user"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-white text-sm font-bold">{review.name}</p>
              <p className="text-gray-500 text-xs">{review.school}</p>
            </div>
          </div>
        </div>
      ))}

    </div>
  </div>
</section>


{/* ── App Download Section ── */}
<section ref={downloadSectionRef} className="mb-12 md:mb-20 px-4">
  <div className="max-w-6xl mx-auto">

    {/* Title */}
    <h2 className="text-center text-3xl md:text-4xl font-bold mb-10">
      <span className="text-white">{lang === "BN" ? "ডাউনলোড করুন" : "Download"}</span>
      <span style={{ color: "#f97316" }}>{lang === "BN" ? "আমাদের মোবাইল অ্যাপ," : "our mobile app,"}</span>
      <span className="text-white">{lang === "BN" ? "শেখা শুরু করুন" : "start learning"}</span>
      <span style={{ color: "#f97316" }}>{lang === "BN" ? "আজ থেকেই" : "today"}</span>
    </h2>

    {/* Stats Row */}
    <div className="flex gap-4 justify-center mb-12 flex-wrap">

      {/* Downloads */}
      <div
        className="flex flex-col items-center justify-center rounded-2xl px-10 py-6 min-w-[200px]"
        style={{
          background: "linear-gradient(135deg, #2a1a0a, #1a0f05)",
          border: "1px solid #3a2a1a",
        }}
      >
        <span className="text-3xl mb-2">⬇️</span>
        <p className="text-white text-3xl font-bold">
          {formatIndianNumber(downloadCount)}+
        </p>
        <p className="text-gray-400 text-sm mt-1">{lang === "BN" ? "অ্যাপ ডাউনলোড" : "App Download"}</p>
      </div>

      {/* Rating */}
      <div
        className="flex flex-col items-center justify-center rounded-2xl px-10 py-6 min-w-[200px]"
        style={{
          background: "linear-gradient(135deg, #0a1a2a, #050f1a)",
          border: "1px solid #1a3a4a",
        }}
      >
        <div className="flex gap-1 mb-1">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="text-yellow-400 text-sm">★</span>
          ))}
          <span className="text-yellow-400 text-sm">☆</span>
        </div>
        <p className="text-gray-400 text-xs mb-1">{lang === "BN" ? "গুগল প্লে স্টোরে" : "Google Play Store"}</p>
        <p className="text-white text-3xl font-bold">{lang === "BN" ? "৪.৫+" : "4.5+"}</p>
        <p className="text-gray-400 text-xs mt-1">{lang === "BN" ? "রেটিং দিয়েছে প্রায় ৩,০০,০০০ শিক্ষার্থী" : "Nearly 300,000 students rated"}</p>
      </div>

    </div>

    {/* Main Content */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

      {/* Left — Phone Mockup */}
      <div className="flex justify-center">
        <Image
          src="/images/app_mockup.svg"
          alt="App Mockup"
          width={400}
          height={500}
          className="object-contain"
        />
      </div>

      {/* Right — Features + Buttons */}
      <div className="flex flex-col gap-8">

        {/* Feature 1 */}
        <div>
          <h3 className="text-white text-xl font-bold mb-2">{lang === "BN" ? "একাডেমিক পড়াশোনা" : "Academics"}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            {lang === "BN" ? "ইন্টারেক্টিভ লাইভ ক্লাস, আনলিমিটেড কুইজ, MCQ Question Bank, রেকর্ড ক্লাস এবং আরও অনেক কিছু" : "Interactive Live Classes, Unlimited Quizzes, MCQ Question Bank, Recorded Classes and much more"}
          </p>
        </div>

        {/* Feature 2 */}
        <div>
          <h3 className="text-white text-xl font-bold mb-2">24×7 {lang === "BN" ? "ডাউটসলভ" : "DoubtSolve"}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
           {lang === "BN" ? " ৭ দিন ২৪ ঘণ্টা তোমার ডাউট সলভ করতে SuperSolve" : "SuperSolve to solve your doubts 24/7"}
          </p>
        </div>

        {/* Feature 3 */}
        <div>
          <h3 className="text-white text-xl font-bold mb-2"> {lang === "BN" ? "পড়া চলবে ইন্টারনেট ছাড়াও" : "Studying will continue without the internet."}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
           {lang === "BN" ? " ইন্টারনেট কানেকশন ছাড়াও ডাউনলোড করে দেখতে পারবে রেকর্ডেড ক্লাস ও ক্লাস নোটস" : "You can download and view recorded classes and class notes without an internet connection."}
          </p>
        </div>

        {/* App Store Buttons */}
        <div className="flex gap-4 flex-wrap">
          <Link href="#">
            <Image
              src="/images/googlePlayNew.svg"
              alt="Google Play"
              width={160}
              height={48}
              className="object-contain"
            />
          </Link>
          <Link href="#">
            <Image
              src="/images/appStoreNew.svg"
              alt="App Store"
              width={160}
              height={48}
              className="object-contain"
            />
          </Link>
        </div>

      </div>
    </div>
  </div>
</section>

//Slider
<section className="mb-12 md:mb-20 px-4">
  <div className="max-w-4xl mx-auto">
    <ParentReviewSlider />
  </div>
</section>


    
    <Footer />
    </div>
    
  

  );
}