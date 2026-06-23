"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

function Banner({ images, direction = "left", speed = 0.5, config }) {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let x = 0;
    let animId;
    let running = true;

    const move = () => {
      if (!running) return;

      // Left direction = scroll right to left (negative)
      // Right direction = scroll left to right (positive)
      x += direction === "left" ? -speed : speed;

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
  }, [direction, speed]);

  const allImages = [...images, ...images];

  return (
    <div className="w-full overflow-hidden py-2">
      <div 
        ref={trackRef} 
        className="flex w-max"
        style={{ gap: `${config.gap_between_images || 12}px` }}
      >
        {allImages.map((img, i) => (
          <div
            key={i}
            className="flex-shrink-0 rounded-2xl overflow-hidden"
            style={{
              width: `clamp(${config.image_width_min}px, 20vw, ${config.image_width_max}px)`,
              height: `clamp(${config.image_height_min}px, 13vw, ${config.image_height_max}px)`,
            }}
          >
            <Image
              src={img}
              alt={`banner-${i}`}
              width={config.image_width_max || 250}
              height={config.image_height_max || 175}
              className="w-full h-full object-cover"
              unoptimized={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ScrollingBanner() {
  const [leftImages, setLeftImages] = useState([]);
  const [rightImages, setRightImages] = useState([]);
  const [config, setConfig] = useState({
    left_scroll_speed: 0.5,
    right_scroll_speed: 0.5,
    image_width_min: 170,
    image_width_max: 250,
    image_height_min: 120,
    image_height_max: 175,
    gap_between_images: 12,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Config fetch
        const configRes = await fetch("http://127.0.0.1:8000/api/banner-config/");
        const configData = await configRes.json();
        setConfig(configData);

        // Left direction images (scroll →)
        const leftRes = await fetch("http://127.0.0.1:8000/api/banner-images/?direction=left");
        const leftData = await leftRes.json();
        setLeftImages(leftData.map(img => img.image_url));

        // Right direction images (scroll ←)
        const rightRes = await fetch("http://127.0.0.1:8000/api/banner-images/?direction=right");
        const rightData = await rightRes.json();
        setRightImages(rightData.map(img => img.image_url));

        setLoading(false);
      } catch (err) {
        console.error("Banner fetch error:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="w-full py-4 text-center text-gray-400">
        Loading banners...
      </div>
    );
  }

  if (leftImages.length === 0 && rightImages.length === 0) {
    return null;
  }

  return (
    <div className="w-full py-4">
      {/* First row: Left direction (scroll right to left ←) */}
      {leftImages.length > 0 && (
        <Banner 
          images={leftImages} 
          direction="left" 
          speed={config.left_scroll_speed}
          config={config}
        />
      )}

      {/* Second row: Right direction (scroll left to right →) */}
      {rightImages.length > 0 && (
        <Banner 
          images={rightImages} 
          direction="right" 
          speed={config.right_scroll_speed}
          config={config}
        />
      )}
    </div>
  );
}