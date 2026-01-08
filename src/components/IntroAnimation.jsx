import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import {
  SiSpringboot,
  SiMysql,
  SiGit,
  SiPostgresql,
  SiDocker,
  SiHibernate,
  SiReact,
  SiJavascript,
} from "react-icons/si";
import { FaJava, FaGithub } from "react-icons/fa";

const IntroAnimation = ({ onComplete }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
    }, 5200);
    const exitTimer = setTimeout(() => {
      onComplete();
    }, 6000);
    return () => {
      clearTimeout(timer);
      clearTimeout(exitTimer);
    };
  }, [onComplete]);

  const icons = useMemo(
    () => [
      { Icon: FaJava, color: "#f89820" },
      { Icon: SiSpringboot, color: "#6db33f" },
      { Icon: SiReact, color: "#61dafb" },
      { Icon: SiJavascript, color: "#f7df1e" },
      { Icon: SiPostgresql, color: "#336791" },
      { Icon: SiDocker, color: "#2496ed" },
      { Icon: SiGit, color: "#f05032" },
      { Icon: SiHibernate, color: "#59666c" },
      { Icon: FaGithub, color: "#ffffff" },
      { Icon: SiMysql, color: "#4479a1" },
    ],
    []
  );

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050B1B]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.08, filter: "blur(16px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="relative flex items-center justify-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative z-20 flex items-center justify-center w-24 h-24 md:w-28 md:h-28 bg-[#0A1124] rounded-full border border-primary/40 shadow-[0_0_40px_rgba(59,130,246,0.35)]"
            >
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-primary/25 to-purple-500/25 blur-[2px]" />
              <span className="text-3xl font-bold text-primary tracking-widest font-mono">
                BG
              </span>
            </motion.div>

            <motion.div
              className="absolute rounded-full w-64 h-64 md:w-80 md:h-80 border border-primary/25"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, rotate: 360 }}
              transition={{
                opacity: { duration: 0.8, ease: "easeOut" },
                rotate: { duration: 18, repeat: Infinity, ease: "linear" },
              }}
            >
              {icons.slice(0, Math.ceil(icons.length / 2)).map((item, index) => {
                const angle = (index / Math.ceil(icons.length / 2)) * 360;
                const transform = `translate(-50%, -50%) rotate(${angle}deg) translate(120px) rotate(-${angle}deg)`;
                return (
                  <div
                    key={`inner-${index}`}
                    className="absolute top-1/2 left-1/2 p-2 rounded-full bg-[#0A1124]/80 border border-white/10 shadow-lg"
                    style={{
                      transform,
                      boxShadow: `0 0 18px ${item.color}33`,
                    }}
                  >
                    <item.Icon
                      className="w-6 h-6"
                      style={{ color: item.color }}
                    />
                  </div>
                );
              })}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_#3B82F6]" />
            </motion.div>

            <motion.div
              className="absolute rounded-full w-96 h-96 md:w-[28rem] md:h-[28rem] border border-purple-500/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, rotate: -360 }}
              transition={{
                opacity: { duration: 1, ease: "easeOut" },
                rotate: { duration: 28, repeat: Infinity, ease: "linear" },
              }}
            >
              {icons.slice(Math.ceil(icons.length / 2)).map((item, index) => {
                const angle =
                  (index / (icons.length - Math.ceil(icons.length / 2))) * 360;
                const transform = `translate(-50%, -50%) rotate(${angle}deg) translate(170px) rotate(-${angle}deg)`;
                return (
                  <div
                    key={`outer-${index}`}
                    className="absolute top-1/2 left-1/2 p-2.5 rounded-full bg-[#0A1124]/80 border border-white/10 shadow-lg"
                    style={{
                      transform,
                      boxShadow: `0 0 20px ${item.color}33`,
                    }}
                  >
                    <item.Icon
                      className="w-7 h-7"
                      style={{ color: item.color }}
                    />
                  </div>
                );
              })}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2.5 h-2.5 bg-purple-500 rounded-full shadow-[0_0_12px_#A855F7]" />
            </motion.div>

            <motion.div
              className="absolute inset-0 rounded-full blur-3xl"
              animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.25, 0.1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              style={{
                background:
                  "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(168,85,247,0.1) 60%, transparent 70%)",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroAnimation;
