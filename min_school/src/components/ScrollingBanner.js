"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

function Banner({ images, direction = "left" }) {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let x = 0;
    let animId;
    let running = true;

    const move = () => {
      if (!running) return;

      x += direction === "left" ? -0.5 : 0.5;

      // অর্ধেক width মানে একটা set শেষ — reset করো
      const half = track.scrollWidth / 2;

      if (direction === "left" && Math.abs(x) >= half) x = 0;
      if (direction === "right" && x >= 0) x = -half;

      track.style.transform = `translateX(${x}px)`;
      animId = requestAnimationFrame(move);
    };

    animId = requestAnimationFrame(move);

    return () => {
      running = false;
      cancelAnimationFrame(animId);
    };
  }, [direction]);

  // duplicate — seamless loop এর জন্য
  const allImages = [...images, ...images];

  return (
    <div className="w-full overflow-hidden py-2">
      <div ref={trackRef} className="flex gap-3 w-max">
        {allImages.map((src, i) => (
          <div
            key={i}
            className="flex-shrink-0 rounded-2xl overflow-hidden"
            style={{
              width: "clamp(170px, 20vw, 250px)",
              height: "clamp(120px, 13vw, 175px)",
            }}
          >
            <Image
              src={src}
              alt={`banner-${i}`}
              width={220}
              height={145}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ScrollingBanner() {
  const leftImages = [
    "/images/600_students_1st.jpg",
    "/images/arman_with_Student.jpeg",
    "/images/hi5.jpeg",
    "/images/3000_students123.jpg",
    "/images/SCR-20251120.jpeg",
  ];

  const rightImages = [
    "/images/redbaby.jpg",
    "/images/hall.jpeg",
    "/images/mic.jpeg",
    "/images/mic2.jpeg",
    "/images/kriti_students.jpg",
  ];

  return (
    <div className="w-full py-4">
      <Banner images={leftImages} direction="left" />
      <Banner images={rightImages} direction="right" />
    </div>
  );
}