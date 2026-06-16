"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const reviews = [
  {
    image: "/images/parent1.jpg",
  },
  {
    image: "/images/parent2.jpg",
  },
  {
    image: "/images/parent3.jpg",
  },
];

export default function ParentReviewSlider() {
  const [current, setCurrent] = useState(0);

  // automatic slider — 3 সেকেন্ড পর পর পরবর্তী slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % reviews.length);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative">

      {/* Card */}
      <div
        className="rounded-3xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1a0a0a, #0d0d0d)",
          border: "1px solid #2a1a1a",
        }}
      >
        <Image
          src={reviews[current].image}
          alt={`parent-review-${current + 1}`}
          width={900}
          height={400}
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-5">
        {reviews.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="rounded-full transition-all"
            style={{
              width: i === current ? "28px" : "8px",
              height: "8px",
              background: i === current ? "#fff" : "#555",
            }}
          />
        ))}
      </div>

    </div>
  );
}