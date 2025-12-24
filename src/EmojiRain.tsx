import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const EMOJIS = [
 "❄️", "🎄", "🦌", "🛷", "⭐", "⛄", "🍷", "🎁", "🔔", "🍪"
];

type Drop = {
  id: string;
  emoji: string;
  x0: number;
  drift: number;
  size: number;
  hue: number;
  duration: number;
  delay: number;
};

const rand = (min: number, max: number) => Math.random() * (max - min) + min;
const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

function EmojiRain({
  count = 120,
  topSpawn = 120,
  bottomOvershoot = 140,
  lanes = [0, 300, -300, 200, -200, 400, -400, 600, -600], 
}: {
  count?: number;
  topSpawn?: number;
  bottomOvershoot?: number;
  lanes?: number[];
}) {
  const [vw, setVw] = useState(0);
  const [vh, setVh] = useState(0);

  useEffect(() => {
    const measure = () => {
      setVw(window.innerWidth);
      setVh(window.innerHeight);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const drops: Drop[] = useMemo(() => {
    if (!vw || !vh) return [];
    const cx = vw / 2;

    return Array.from({ length: count }).map((_, i) => {
      const lane = pick(lanes);
      const x0 = cx + lane + rand(-80, 80);

      return {
        id: `${i}-${Math.random().toString(16).slice(2)}`,
        emoji: pick(EMOJIS),
        x0,
        drift: rand(-70, 70),
        size: rand(20, 34),
        hue: Math.floor(rand(0, 360)),
        duration: rand(4.5, 9.5),
        delay: rand(0, 3.0),
      };
    });
  }, [count, lanes, vw, vh]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {drops.map((d) => (
        <motion.span
          key={d.id}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            x: d.x0,
            y: -topSpawn,
            fontSize: d.size,
            color: `hsl(${d.hue}, 80%, 50%)`,
            willChange: "transform",
            userSelect: "none",
            pointerEvents: "none",
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            y: vh + bottomOvershoot,
            x: d.x0 + d.drift,
          }}
          transition={{
            y: {
              duration: d.duration,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
              delay: d.delay,
            },
            x: {
              duration: d.duration,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
              delay: d.delay,
            },
            opacity: { duration: 0.2, delay: d.delay },
          }}
        >
          {d.emoji}
        </motion.span>
      ))}
    </div>
  );
}

export default EmojiRain;