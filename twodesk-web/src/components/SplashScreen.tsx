'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import { interpolate } from 'flubber';

// SVG paths — from motion_svg files
// T letter (clipped from two.svg, viewBox 0 0 68 88)
const T_PATH =
  'M1 13.1C1 7.9 5.2 3.7 10.4 3.7H58C63.2 3.7 67.4 7.9 67.4 13.1C67.4 18.2 63.2 22.4 58 22.4H54.3C49.1 22.4 44.9 26.7 44.9 31.8V74.9C44.9 80 40.7 84.3 35.5 84.3H33C27.8 84.3 23.6 80 23.6 74.9V31.8C23.6 26.7 19.4 22.4 14.2 22.4H10.4C5.2 22.4 1 18.2 1 13.1Z';

// D letter (clipped from desk.svg, viewBox 0 0 72 86)
const D_PATH =
  'M69.3 29.1C70.3 33.6 70.8 38 70.8 42.1C70.8 52.5 68.7 61.5 64.4 68.9C58.5 79.1 49.2 84.3 36.9 84.3H11.1C5.9 84.3 1.7 80 1.7 74.9V13.1C1.7 7.9 5.9 3.7 11.1 3.7H36.9C41.9 4.3 46 4.3 49.3 5.4C55.1 7.3 59.8 10.9 63.4 16C66.2 20 68.2 24.4 69.3 29.1ZM46.2 27C44.3 23.8 40.4 22.2 34.2 22.2H22.5V65.7H34.2C40.5 65.7 44.7 62.8 47.2 56.5C48.6 52.8 49.4 48.3 49.4 43.2C49.4 36.1 48.3 30.6 46.2 27Z';

// Symbol paths (from symbol.svg, viewBox 0 0 112 88)
const SYMBOL_PATH_1 =
  'm75 15.9c19.6-1.8 36.1 13.7 36.1 32.9v31c0 3.6-2.9 6.5-6.5 6.5h-53c-3.6 0-6.5-2.9-6.5-6.5v-30.2c0-17.2 12.8-32.1 29.9-33.7zm-16.9 32.9v23.2c0.2 0 0.4-0.1 0.7-0.1h39.3v-22.6c0-9.8-6.9-18.6-16.6-20.2-12.6-2.1-23.4 7.6-23.4 19.7z';

const SYMBOL_PATH_2 =
  'm103.9 1.4h-95.1c-4 0-7.3 3.2-7.3 7.2 0 4 3.3 7.2 7.3 7.2 3.9 0 7.2 3.2 7.2 7.2v56.1c0 4 3.2 7.2 7.2 7.2 4 0 7.2-3.2 7.2-7.2v-56.1c0-4 3.2-7.2 7.2-7.2h40.5 25.8c4 0 7.2-3.2 7.2-7.2 0-4-3.2-7.2-7.2-7.2z';

// full two.svg path (viewBox 0 0 252 88)
const TWO_PATH =
  'm1 13.1c0-5.2 4.2-9.4 9.4-9.4h47.6c5.2 0 9.4 4.2 9.4 9.4 0 5.1-4.2 9.3-9.4 9.3h-3.7c-5.2 0-9.4 4.3-9.4 9.4v43.1c0 5.1-4.2 9.4-9.4 9.4h-2.5c-5.2 0-9.4-4.3-9.4-9.4v-43.1c0-5.1-4.2-9.4-9.4-9.4h-3.8c-5.2 0-9.4-4.2-9.4-9.3zm151-9.4h21.8l-22.7 80.6h-19.4l-9.4-46-9.5 46h-18.9l-22.9-80.6h22.5l9.9 42.8l8.4-42.8h21.1l9 43.7zm87.5 7.3c8 7.3 12.1 18.4 12.1 32.9 0 14.1-4.1 25.2-12.2 32.9-6.2 6.3-15.1 9.6-26.5 9.6-11.5 0-20.4-3.3-26.6-9.6-8.1-7.6-12.2-18.7-12.2-32.9 0-14.5 4.2-25.6 12.3-33 6.1-6.3 15-9.5 26.5-9.5 11.4 0 20.4 3.2 26.6 9.6zm-14 50.7c3.3-4 4.9-10 4.9-17.8 0-7.8-1.6-13.8-4.9-17.9-3.1-3.9-7.2-5.8-12.6-5.8-5.4 0-9.6 1.9-12.8 5.8-3.2 4.1-4.9 10.1-4.9 17.9 0 7.7 1.7 13.8 4.9 17.8 3.2 4 7.4 5.9 12.8 5.9 5.4 0 9.5-1.9 12.6-5.9z';

// full desk.svg path (viewBox 0 0 292 86)
const DESK_PATH =
  'm69.3 29.1c1 4.5 1.5 8.9 1.5 13 0 10.4-2.1 19.4-6.4 26.8-5.9 10.2-15.2 15.4-27.5 15.4h-25.8c-5.2 0-9.4-4.3-9.4-9.4v-61.8c0-5.2 4.2-9.4 9.4-9.4h25.8c5 0 9.1 0.6 12.4 1.7h0.1c5.8 1.9 10.5 5.5 14.1 10.6 2.8 4 4.8 8.4 5.8 13.1zm-23.1-2.1c-1.9-3.2-5.8-4.8-12-4.8h-11.7v43.5h11.7c6.3 0 10.5-2.9 13-9.2 1.4-3.7 2.2-8.2 2.2-13.3 0-7.1-1.1-12.6-3.2-16.2zm52.2 38.3h41.6v19h-62.4v-80.6h60.5v18.7h-39.7v10.5h36.5v18.5h-36.5zm112.4-5.7c0 7.7-3 14.2-8.9 19.2-5.8 5-14 7.5-24.3 7.5-10.5 0-18.9-2.5-25-7.3-6.3-5-9.5-11.9-9.5-20.6v-2.7h20.1l0.3 2.3q0.6 4.4 2.2 6.3c2.1 2.5 5.9 3.7 11.3 3.7 3.5 0 6.3-0.4 8.3-1.1 4.3-1.5 4.9-4 4.9-6.1 0-1.5-0.6-2.6-2-3.4-1.9-1.2-5.1-2.2-9.6-3.2l-8.1-1.8c-8.4-1.8-14.1-3.8-17.5-6.2-5.8-4-8.7-10.2-8.7-18.5 0-7.5 2.8-13.8 8.3-18.8 5.4-4.9 13.4-7.4 23.7-7.4 8.5 0 16 2.3 22.1 6.9 6.3 4.7 9.7 11.5 10 20.4l0.1 2.8h-20.5l-0.2-2.6c-0.2-3.5-1.6-5.9-4.5-7.3-2.1-1.1-4.9-1.6-8.1-1.6-3.6 0-6.4 0.6-8.4 2-1.8 1.1-2.5 2.5-2.5 4.5 0 1.7 0.6 2.8 2.2 3.6 0.8 0.5 3 1.4 9.3 2.9l13.2 3.1c6.2 1.4 10.8 3.4 14.1 5.9 5.1 4.1 7.7 10 7.7 17.5zm46-22l34.3 46.7h-27.1l-22-31.2-4.5 4.5v26.7h-20.9v-80.6h20.9v26.8l25.1-26.8h28.1z';

type Phase = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

const spring = { type: 'spring' as const, stiffness: 80, damping: 14 };
const smooth = { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] };
const GREY = '#9d9fa2';

// Morph component using flubber
function MorphPath({
  from,
  to,
  duration = 1.2,
  fill = GREY,
}: {
  from: string;
  to: string;
  duration?: number;
  fill?: string;
}) {
  const progress = useMotionValue(0);
  const [interpolator, setInterpolator] = useState<((t: number) => string) | null>(null);

  useEffect(() => {
    const interp = interpolate(from, to, { maxSegmentLength: 2 });
    setInterpolator(() => interp);
    animate(progress, 1, { duration, ease: [0.4, 0, 0.2, 1] });
  }, [from, to, duration, progress]);

  const d = useTransform(progress, (v) => {
    if (!interpolator) return from;
    return interpolator(v);
  });

  return <motion.path d={d} fill={fill} fillRule="evenodd" />;
}

// Bubble shape (speech bubble outline)
const BUBBLE = 'M5 5 Q5 0 12 0 L38 0 Q45 0 45 5 L45 22 Q45 27 38 27 L18 27 L10 35 L12 27 Q5 27 5 22 Z';

// Icons inside bubbles — pairs that cycle
const BUBBLE_ICONS = [
  // Round 1: บ้าน + ตึก
  {
    left: 'M16 22 L25 12 L34 22 L34 27 L16 27 Z M22 27 L22 21 L28 21 L28 27',
    right: 'M18 27 L18 8 L32 8 L32 27 M22 12 L22 15 M26 12 L26 15 M22 18 L22 21 M26 18 L26 21',
  },
  // Round 2: ตลับเมตร + ดินสอไม้ฉาก
  {
    left: 'M14 14 L36 14 Q38 14 38 16 L38 24 Q38 26 36 26 L14 26 Q12 26 12 24 L12 16 Q12 14 14 14 Z M18 14 L18 26 M22 18 L22 22 M26 18 L26 22 M30 18 L30 22',
    right: 'M16 8 L18 8 L18 27 L16 27 Z M18 27 L34 27 L34 25 L18 25 M16 8 L28 8 L16 20',
  },
  // Round 3: บ้าน + ตลับเมตร (สลับ)
  {
    left: 'M16 22 L25 12 L34 22 L34 27 L16 27 Z M22 27 L22 21 L28 21 L28 27',
    right: 'M14 14 L36 14 Q38 14 38 16 L38 24 Q38 26 36 26 L14 26 Q12 26 12 24 L12 16 Q12 14 14 14 Z M18 14 L18 26 M22 18 L22 22 M26 18 L26 22 M30 18 L30 22',
  },
];

function CyclingBubbles() {
  const [round, setRound] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setRound(1), 1000);
    const t2 = setTimeout(() => setRound(2), 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const icons = BUBBLE_ICONS[round];

  return (
    <div className="absolute flex justify-between" style={{ width: '300px', top: 'calc(50% - 85px)' }}>
      {/* Left bubble */}
      <motion.svg
        key={`left-${round}`}
        viewBox="0 0 50 40"
        className="h-[44px] w-auto"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 12 }}
      >
        <path d={BUBBLE} fill="none" stroke="#c8c9cb" strokeWidth="1.5" strokeLinejoin="round" />
        <path d={icons.left} fill="none" stroke="#c8c9cb" strokeWidth="1" strokeLinejoin="round" strokeLinecap="round" />
      </motion.svg>
      {/* Right bubble */}
      <motion.svg
        key={`right-${round}`}
        viewBox="0 0 50 40"
        className="h-[44px] w-auto"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 12, delay: 0.15 }}
      >
        <path d={BUBBLE} fill="none" stroke="#c8c9cb" strokeWidth="1.5" strokeLinejoin="round" />
        <path d={icons.right} fill="none" stroke="#c8c9cb" strokeWidth="1" strokeLinejoin="round" strokeLinecap="round" />
      </motion.svg>
    </div>
  );
}

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<Phase>(1);

  const handleComplete = useCallback(() => onComplete(), [onComplete]);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(2), 1000),   // Scene 1 → 2
      setTimeout(() => setPhase(3), 1800),   // Scene 2 → 3a (T+D converge)
      setTimeout(() => setPhase(4), 2800),   // Scene 3 → 4 (T stretch + D rotate) — เร็วขึ้น
      setTimeout(() => setPhase(5), 3800),   // Scene 4 → 4b (crossfade to symbol) — เร็วขึ้น
      setTimeout(() => setPhase(6), 4400),   // Scene 4b → 5 (people)
      setTimeout(() => setPhase(7), 6100),   // Scene 5 → 6 (chat bubbles cycling)
      setTimeout(() => setPhase(8), 9200),   // Scene 6 → 7 (fade sketch) — 3.1s สำหรับ 3 รอบ
      setTimeout(() => setPhase(9), 9600),   // Scene 7 → 8 (move corner)
      setTimeout(() => setPhase(10), 10200),  // Scene 8 → done
      setTimeout(() => handleComplete(), 10600),
    ];
    return () => timers.forEach(clearTimeout);
  }, [handleComplete]);

  return (
    <AnimatePresence>
      {phase < 10 && (
        <motion.div
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-white"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{ willChange: 'opacity' }}
        >
          {/* ===== Scene 1: TWO slides left, DESK slides right ===== */}
          {phase === 1 && (
            <div className="flex items-center gap-[16px]">
              <motion.svg
                viewBox="0 0 252 88"
                className="h-[40px] md:h-[56px] w-auto"
                initial={{ x: -80, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={spring}
                style={{ willChange: 'transform, opacity' }}
              >
                <path fill={GREY} fillRule="evenodd" d={TWO_PATH} />
              </motion.svg>
              <motion.svg
                viewBox="0 0 292 86"
                className="h-[39px] md:h-[55px] w-auto"
                initial={{ x: 80, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ ...spring, delay: 0.15 }}
                style={{ willChange: 'transform, opacity' }}
              >
                <path fill={GREY} fillRule="evenodd" d={DESK_PATH} />
              </motion.svg>
            </div>
          )}

          {/* ===== Scene 2: WO + ESK become outline ===== */}
          {phase === 2 && (
            <div className="flex items-center gap-[16px]">
              <svg viewBox="0 0 252 88" className="h-[40px] md:h-[56px] w-auto">
                <defs>
                  <clipPath id="clip-t"><rect x="0" y="0" width="68" height="88" /></clipPath>
                  <clipPath id="clip-wo"><rect x="68" y="0" width="184" height="88" /></clipPath>
                </defs>
                <path fill={GREY} fillRule="evenodd" d={TWO_PATH} clipPath="url(#clip-t)" />
                <motion.path
                  fillRule="evenodd" d={TWO_PATH} clipPath="url(#clip-wo)"
                  stroke={GREY} strokeWidth="1"
                  initial={{ fill: GREY, opacity: 1 }}
                  animate={{ fill: 'rgba(157,159,162,0)', opacity: 0.4 }}
                  transition={{ duration: 0.6 }}
                  style={{ willChange: 'opacity' }}
                />
              </svg>
              <svg viewBox="0 0 292 86" className="h-[39px] md:h-[55px] w-auto">
                <defs>
                  <clipPath id="clip-d"><rect x="0" y="0" width="72" height="86" /></clipPath>
                  <clipPath id="clip-esk"><rect x="72" y="0" width="220" height="86" /></clipPath>
                </defs>
                <path fill={GREY} fillRule="evenodd" d={DESK_PATH} clipPath="url(#clip-d)" />
                <motion.path
                  fillRule="evenodd" d={DESK_PATH} clipPath="url(#clip-esk)"
                  stroke={GREY} strokeWidth="1"
                  initial={{ fill: GREY, opacity: 1 }}
                  animate={{ fill: 'rgba(157,159,162,0)', opacity: 0.4 }}
                  transition={{ duration: 0.6 }}
                  style={{ willChange: 'opacity' }}
                />
              </svg>
            </div>
          )}

          {/* ===== Scene 3: T+D converge (move close together) ===== */}
          {phase === 3 && (
            <div className="flex items-center gap-0">
              <motion.svg
                viewBox="0 0 68 88"
                className="h-[40px] md:h-[56px] w-auto"
                initial={{ x: -30 }}
                animate={{ x: -8 }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                style={{ willChange: 'transform' }}
              >
                <path fill={GREY} fillRule="evenodd" d={T_PATH} />
              </motion.svg>
              <motion.svg
                viewBox="0 0 72 86"
                className="h-[39px] md:h-[55px] w-auto"
                initial={{ x: 30 }}
                animate={{ x: 8 }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                style={{ willChange: 'transform' }}
              >
                <path fill={GREY} fillRule="evenodd" d={D_PATH} />
              </motion.svg>
            </div>
          )}

          {/* ===== Scene 4: T stretches right + D rotates CCW (NO fade) ===== */}
          {phase === 4 && (
            <div className="flex items-center gap-0">
              <motion.svg
                viewBox="0 0 68 88"
                className="h-[40px] md:h-[56px] w-auto"
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 1.5 }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                style={{ willChange: 'transform', transformOrigin: 'left center' }}
              >
                <path fill={GREY} fillRule="evenodd" d={T_PATH} />
              </motion.svg>
              <motion.svg
                viewBox="0 0 72 86"
                className="h-[39px] md:h-[55px] w-auto"
                initial={{ rotate: 0 }}
                animate={{ rotate: -90 }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                style={{ willChange: 'transform' }}
              >
                <path fill={GREY} fillRule="evenodd" d={D_PATH} />
              </motion.svg>
            </div>
          )}

          {/* ===== Scene 5: crossfade T+D → symbol ===== */}
          {phase === 5 && (
            <div className="relative flex items-center justify-center">
              {/* T+D stretched/rotated state — fading out */}
              <motion.div
                className="absolute flex items-center gap-0"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{ willChange: 'opacity' }}
              >
                <svg
                  viewBox="0 0 68 88"
                  className="h-[40px] md:h-[56px] w-auto"
                  style={{ transform: 'scaleX(1.5)', transformOrigin: 'left center' }}
                >
                  <path fill={GREY} fillRule="evenodd" d={T_PATH} />
                </svg>
                <svg
                  viewBox="0 0 72 86"
                  className="h-[39px] md:h-[55px] w-auto"
                  style={{ transform: 'rotate(-90deg)' }}
                >
                  <path fill={GREY} fillRule="evenodd" d={D_PATH} />
                </svg>
              </motion.div>
              {/* Symbol fading in */}
              <motion.svg
                viewBox="0 0 112 88"
                className="h-[56px] md:h-[72px] w-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                style={{ willChange: 'opacity' }}
              >
                <path fill={GREY} fillRule="evenodd" d={SYMBOL_PATH_1} />
                <path fill={GREY} d={SYMBOL_PATH_2} />
              </motion.svg>
            </div>
          )}

          {/* ===== Scene 6-9: Symbol stays → fade out ===== */}
          {phase >= 6 && phase <= 9 && (
            <motion.div
              className="absolute"
              initial={{ opacity: 1 }}
              animate={{ opacity: phase === 9 ? 0 : 1 }}
              transition={{ duration: 0.6 }}
              style={{ willChange: 'opacity' }}
            >
              <svg viewBox="0 0 112 88" className="h-[56px] md:h-[72px] w-auto">
                <path fill={GREY} fillRule="evenodd" d={SYMBOL_PATH_1} />
                <path fill={GREY} d={SYMBOL_PATH_2} />
              </svg>
            </motion.div>
          )}

          {/* ===== Scene 6-8: People sitting on chairs beside symbol (table) ===== */}
          {(phase === 6 || phase === 7 || phase === 8) && (
            <motion.div
              className="absolute flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === 8 ? 0 : 1 }}
              transition={{ duration: 0.4 }}
              style={{ willChange: 'opacity' }}
            >
              {/* Person LEFT — sitting on chair, facing right, arm on table */}
              <motion.svg
                viewBox="0 0 70 100"
                className="h-[90px] md:h-[115px] w-auto"
                style={{ marginRight: '-4px' }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                {/* Head */}
                <motion.circle cx="28" cy="20" r="7" fill="none" stroke="#c8c9cb" strokeWidth="1.8"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />
                {/* Body — leaning forward slightly */}
                <motion.path d="M28 27 L32 48" fill="none" stroke="#c8c9cb" strokeWidth="1.8" strokeLinecap="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3, delay: 0.1, ease: 'easeOut' }}
                />
                {/* Arm reaching to table */}
                <motion.path d="M30 34 Q40 36 52 32" fill="none" stroke="#c8c9cb" strokeWidth="1.8" strokeLinecap="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3, delay: 0.2, ease: 'easeOut' }}
                />
                {/* Other arm behind */}
                <motion.path d="M30 36 Q22 42 18 38" fill="none" stroke="#c8c9cb" strokeWidth="1.5" strokeLinecap="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.2, delay: 0.25, ease: 'easeOut' }}
                />
                {/* Upper leg (sitting) */}
                <motion.path d="M32 48 L42 56" fill="none" stroke="#c8c9cb" strokeWidth="1.8" strokeLinecap="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.2, delay: 0.3, ease: 'easeOut' }}
                />
                {/* Lower leg */}
                <motion.path d="M42 56 L38 72" fill="none" stroke="#c8c9cb" strokeWidth="1.8" strokeLinecap="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.2, delay: 0.35, ease: 'easeOut' }}
                />
                {/* Chair — seat + back + legs */}
                <motion.path d="M20 52 L44 52 M20 52 L18 72 M44 52 L44 72 M20 52 L20 34" fill="none" stroke="#c8c9cb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, delay: 0.4, ease: 'easeOut' }}
                />
              </motion.svg>

              {/* Gap for symbol (table) — already rendered by Scene 6-9 */}
              <div className="w-[56px] md:w-[72px]" />

              {/* Person RIGHT — sitting on chair, facing left, arm on table */}
              <motion.svg
                viewBox="0 0 70 100"
                className="h-[90px] md:h-[115px] w-auto"
                style={{ marginLeft: '-4px', transform: 'scaleX(-1)' }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                {/* Mirror of left person */}
                <motion.circle cx="28" cy="20" r="7" fill="none" stroke="#c8c9cb" strokeWidth="1.8"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
                />
                <motion.path d="M28 27 L32 48" fill="none" stroke="#c8c9cb" strokeWidth="1.8" strokeLinecap="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3, delay: 0.15, ease: 'easeOut' }}
                />
                <motion.path d="M30 34 Q40 36 52 32" fill="none" stroke="#c8c9cb" strokeWidth="1.8" strokeLinecap="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3, delay: 0.25, ease: 'easeOut' }}
                />
                <motion.path d="M30 36 Q22 42 18 38" fill="none" stroke="#c8c9cb" strokeWidth="1.5" strokeLinecap="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.2, delay: 0.3, ease: 'easeOut' }}
                />
                <motion.path d="M32 48 L42 56" fill="none" stroke="#c8c9cb" strokeWidth="1.8" strokeLinecap="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.2, delay: 0.35, ease: 'easeOut' }}
                />
                <motion.path d="M42 56 L38 72" fill="none" stroke="#c8c9cb" strokeWidth="1.8" strokeLinecap="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.2, delay: 0.4, ease: 'easeOut' }}
                />
                <motion.path d="M20 52 L44 52 M20 52 L18 72 M44 52 L44 72 M20 52 L20 34" fill="none" stroke="#c8c9cb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, delay: 0.45, ease: 'easeOut' }}
                />
              </motion.svg>
            </motion.div>
          )}

          {/* ===== Scene 7: Chat bubbles cycling 3 rounds ===== */}
          {phase === 7 && <CyclingBubbles />}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
