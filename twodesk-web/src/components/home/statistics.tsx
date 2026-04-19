"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";

const STATS = [
  { value: 5, suffix: "+", key: "statYears" },
  { value: 30, suffix: "+", key: "statProjects" },
  { value: 4, suffix: "", key: "statTeam" },
  { value: 5, suffix: "", key: "statServices" },
] as const;

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const duration = 800;
    const steps = 40;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, target]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export default function Statistics() {
  const t = useTranslations("home");
  const locale = useLocale();
  const isTh = locale === "th";

  return (
    <div className="bg-black">
      <section className="relative mx-auto flex flex-wrap md:flex-nowrap max-w-[1440px] justify-center overflow-hidden px-5 py-10 md:p-20">
        {/* TD Watermark */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none opacity-[0.03]">
          <Image
            src="/logo-symbol.svg"
            alt=""
            width={300}
            height={240}
            className="h-[160px] md:h-[240px] w-auto brightness-0 invert"
            aria-hidden="true"
          />
        </div>

        {STATS.map((stat, i) => (
          <div
            key={i}
            className={`w-1/2 md:flex-1 py-4 md:py-6 text-center ${
              i % 2 === 0 ? "border-r border-white/15" : ""
            } ${
              i < 2 ? "md:border-r md:border-white/15 border-b md:border-b-0 border-white/15" : ""
            } ${
              i === 2 ? "md:border-r md:border-white/15" : ""
            }`}
          >
            <div className="mb-1.5 md:mb-2 text-3xl md:text-5xl font-bold text-white">
              <CountUp target={stat.value} suffix={stat.suffix} />
            </div>
            <div className="text-xs md:text-sm text-white/60" style={isTh ? { fontSize: "18px" } : undefined}>{t(stat.key)}</div>
          </div>
        ))}
      </section>
    </div>
  );
}
