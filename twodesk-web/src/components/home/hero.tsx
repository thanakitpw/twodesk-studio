"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

const BANNERS = [
  "https://ivslfjtahzkpdgoqjobh.supabase.co/storage/v1/object/public/projects/banners/banner-01.webp",
  "https://ivslfjtahzkpdgoqjobh.supabase.co/storage/v1/object/public/projects/banners/banner-02.webp",
  "https://ivslfjtahzkpdgoqjobh.supabase.co/storage/v1/object/public/projects/banners/banner-03.webp",
  "https://ivslfjtahzkpdgoqjobh.supabase.co/storage/v1/object/public/projects/banners/banner-04.webp",
  "https://ivslfjtahzkpdgoqjobh.supabase.co/storage/v1/object/public/projects/banners/banner-05.webp",
  "https://ivslfjtahzkpdgoqjobh.supabase.co/storage/v1/object/public/projects/banners/banner-06.webp",
  "https://ivslfjtahzkpdgoqjobh.supabase.co/storage/v1/object/public/projects/banners/banner-07.webp",
  "https://ivslfjtahzkpdgoqjobh.supabase.co/storage/v1/object/public/projects/banners/banner-08.webp",
  "https://ivslfjtahzkpdgoqjobh.supabase.co/storage/v1/object/public/projects/banners/banner-09.webp",
];

const INTERVAL_MS = 4000;

interface HeroProps {
  /** override จาก site_settings (Pages > Home); ว่าง = ใช้ค่า i18n เดิม */
  title?: string;
  subtitle?: string;
}

export default function Hero({ title, subtitle }: HeroProps = {}) {
  const t = useTranslations("home");
  const locale = useLocale();
  const isTh = locale === "th";
  const [index, setIndex] = useState(0);

  const heroTitle = title?.trim() ? title : t("heroTitle");
  const heroSubtitle = subtitle?.trim() ? subtitle : t("heroSubtitle");

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % BANNERS.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative h-[420px] md:h-[85vh] overflow-hidden">
      {/* Slides */}
      <AnimatePresence mode="sync">
        <motion.img
          key={BANNERS[index]}
          src={BANNERS[index]}
          alt="Hero"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>

      {/* Gradient Overlay */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-[200px] md:h-[360px]"
        style={{
          background:
            "linear-gradient(to top, rgba(250,250,248,0.95) 0%, rgba(250,250,248,0.7) 50%, transparent 100%)",
        }}
      />

      {/* Text */}
      <div className="absolute bottom-10 md:bottom-16 left-5 md:left-20 right-5 md:right-auto">
        <h1
          className={`mb-3 md:mb-4 font-bold text-[#1a1a1a] ${
            isTh
              ? "th-display"
              : "text-[32px] md:text-[56px] leading-[38px] md:leading-[64px] tracking-tight"
          }`}
        >
          {heroTitle
            .split("\n")
            .map((line, i) => (
              <span key={i}>
                {line}
                {i === 0 && <br />}
              </span>
            ))}
        </h1>
        <p
          className={`font-light text-[#4a4a4a] ${
            isTh ? "th-body-lg" : "text-[14px] md:text-[17px]"
          }`}
        >
          {heroSubtitle}
        </p>
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 right-5 md:right-20 flex gap-1.5 md:gap-2">
        {BANNERS.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-6 bg-[#1a1a1a]" : "w-1.5 bg-[#1a1a1a]/30"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
