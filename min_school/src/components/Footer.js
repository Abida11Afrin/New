"use client";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { lang } = useLanguage();

  return (
    <footer className="bg-[#0a0a0a] border-t border-[#1a1a1a] pt-16 pb-6 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Col 1 — Logo + App Buttons */}
          <div className="flex flex-col gap-6">
            <Image
              src="/images/logo_white.svg"
              alt="10 Minute School"
              width={140}
              height={50}
              className="object-contain"
            />
            <p className="text-gray-400 text-sm">
              {lang === "BN" ? "ডাউনলোড করুন আমাদের মোবাইল অ্যাপ" : "Download Our Mobile App"}
            </p>
            <div className="flex flex-col gap-3">
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

          {/* Col 2 — কোম্পানি */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold text-base">
              {lang === "BN" ? "কোম্পানি" : "Company"}
            </h4>
            {(lang === "BN"
              ? [
                  "ক্যারিয়ার / নিয়োগ বিজ্ঞপ্তি",
                  "শিক্ষক হিসাবে যোগ দিন",
                  "অ্যাফিলিয়েট রেজিস্ট্রেশন",
                  "প্রাইভেসি পলিসি",
                  "রিফান্ড পলিসি",
                  "ব্যবহারকারীর শর্তাবলি",
                ]
              : [
                  "Career / Job Circular",
                  "Join as a Teacher",
                  "Affiliate Registration",
                  "Privacy Policy",
                  "Refund Policy",
                  "Terms of Use",
                ]
            ).map((item, i) => (
              <Link key={i} href="#" className="text-gray-400 text-sm hover:text-white transition-colors">
                {item}
              </Link>
            ))}
          </div>

          {/* Col 3 — অন্যান্য */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold text-base">
              {lang === "BN" ? "অন্যান্য" : "Others"}
            </h4>
            {(lang === "BN"
              ? [
                  "ফ্রি নোটস ও গাইড",
                  "চাকরির প্রস্তুতি কোর্সমূহ",
                  "সার্টিফিকেট ভেরিফাই করুন",
                  "ফ্রি ডাউনলোড",
                ]
              : [
                  "Free Notes & Guides",
                  "Job Preparation Courses",
                  "Verify Certificate",
                  "Free Downloads",
                ]
            ).map((item, i) => (
              <Link key={i} href="#" className="text-gray-400 text-sm hover:text-white transition-colors">
                {item}
              </Link>
            ))}
          </div>

          {/* Col 4 — যোগাযোগ */}
          <div className="flex flex-col gap-3">
            <h4 className="text-white font-bold text-base">
              {lang === "BN" ? "আমাদের যোগাযোগ মাধ্যম" : "Our Contact Channels"}
            </h4>
            <p className="text-gray-400 text-sm">
              {lang === "BN" ? "কল করুন: " : "Call: "}
              <span className="text-green-400">16910</span> (24x7)
            </p>
            <p className="text-gray-400 text-sm">
              {lang === "BN" ? "হোয়াটসঅ্যাপ: " : "WhatsApp: "}
              <span className="text-green-400">+8801896016252</span> (24x7)
            </p>
            <p className="text-gray-400 text-sm">
              {lang === "BN" ? "দেশের বাহির থেকে: " : "From Outside Bangladesh: "}
              <span className="text-green-400">+880 9610916910</span>
            </p>
            <p className="text-gray-400 text-sm">
              {lang === "BN" ? "ইমেইল: " : "Email: "}
              <span className="text-green-400">support@10minuteschool.com</span>
            </p>
            <p className="text-gray-400 text-sm">
              {lang === "BN" ? "পার্টনারশিপের জন্য: " : "For Partnership: "}
              <span className="text-green-400">partnership@10minuteschool.com</span>
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 mt-2">
              {[
                { src: "/images/facebook_icon.jpg", alt: "Facebook" },
                { src: "/images/instagram_icon.jpg", alt: "Instagram" },
                { src: "/images/linkedin_icon.jpg", alt: "LinkedIn" },
                { src: "/images/youtube_icon.jpg", alt: "YouTube" },
                { src: "/images/Tiktok_icon.jpg", alt: "TikTok" },
              ].map((icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-[#333] flex items-center justify-center hover:border-[#555] transition-colors"
                >
                  <Image
                    src={icon.src}
                    alt={icon.alt}
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                </Link>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#1a1a1a] pt-6 text-center">
          <p className="text-gray-500 text-sm">
            {lang === "BN"
              ? "স্বত্ব © ২০১৫ - ২০২৬ টেন মিনিট স্কুল কর্তৃক সর্বস্বত্ব সংরক্ষিত"
              : "Copyright © 2015 - 2026 10 Minute School. All rights reserved."}
          </p>
        </div>

      </div>
    </footer>
  );
}