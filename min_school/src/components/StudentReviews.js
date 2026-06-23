"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function StudentReviews({ lang }) {
  const [reviews, setReviews] = useState([]);
  const [config, setConfig] = useState({
    section_title_bn: "শিক্ষার্থীদের মতামত",
    section_title_en: "Student Reviews",
    card_width_mobile: "85vw",
    card_width_desktop: "300px",
    card_min_height: "320px",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Config fetch
        const configRes = await fetch("http://127.0.0.1:8000/api/student-review-config/");
        const configData = await configRes.json();
        setConfig(configData);

        // Reviews fetch
        const reviewsRes = await fetch("http://127.0.0.1:8000/api/student-reviews/");
        const reviewsData = await reviewsRes.json();
        setReviews(reviewsData);

        setLoading(false);
      } catch (err) {
        console.error("Student reviews fetch error:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="mb-12 md:mb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">Loading student reviews...</p>
        </div>
      </section>
    );
  }

  if (reviews.length === 0) {
    return null; // No reviews to show
  }

  return (
    <section className="mb-12 md:mb-20 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* Optional: Section Title */}
        {config.section_title_bn && (
          <h2 className="text-center text-2xl md:text-3xl font-bold text-white mb-8">
            {lang === "BN" ? config.section_title_bn : config.section_title_en}
          </h2>
        )}

        {/* Reviews Horizontal Scroll */}
        <div 
          className="flex gap-4 overflow-x-auto pb-4" 
          style={{ scrollbarWidth: "none" }}
        >
          {reviews.map((review) => (
            <div
              key={review.id}
              className="flex-shrink-0 flex flex-col justify-between rounded-3xl p-6"
              style={{
                width: config.card_width_mobile,
                maxWidth: config.card_width_desktop,
                minHeight: config.card_min_height,
                background: review.background_gradient,
                border: `1px solid ${review.border_color}`,
              }}
            >
              {/* Review Text */}
              <div>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  {lang === "BN" ? review.review_text_bn : review.review_text_en}
                </p>
                
                {/* See More Button */}
                {review.is_highlight && (
                  <span className="text-green-400 text-sm font-semibold cursor-pointer">
                    {lang === "BN" ? "আরও দেখুন" : "See More"}
                  </span>
                )}
              </div>

              {/* Student Info */}
              <div className="flex items-center gap-3 mt-6">
                <div
                  className="w-10 h-10 rounded-full flex-shrink-0 overflow-hidden"
                  style={{ background: "#2a2a3a" }}
                >
                  <Image
                    src={review.icon_url}
                    alt={`${review.gender} student`}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-white text-sm font-bold">
                    {lang === "BN" ? review.student_name_bn : review.student_name_en}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {lang === "BN" ? review.school_name_bn : review.school_name_en}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}