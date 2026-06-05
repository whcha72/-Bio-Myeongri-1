import React, { useState } from "react";
import { motion } from "motion/react";

interface OnboardingProps {
  onAnalyze: (dateInfo: {
    year: string;
    month: string;
    day: string;
    hour: string;
    minute: string;
  }) => void;
  isLoading: boolean;
}

export default function Onboarding({ onAnalyze, isLoading }: OnboardingProps) {
  const [year, setYear] = useState("1996");
  const [month, setMonth] = useState("05");
  const [day, setDay] = useState("20");
  const [hour, setHour] = useState("10");
  const [minute, setMinute] = useState("30");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnalyze({ year, month, day, hour, minute });
  };

  return (
    <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-8 md:py-16 min-h-[calc(100vh-80px)] flex flex-col justify-center items-center">
      {/* Hero Branding */}
      <header className="text-center mb-10 space-y-3">
        <motion.h1 
          className="font-serif text-3xl md:text-5xl text-white tracking-tight font-medium"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          선천적 상수 데이터 분석
        </motion.h1>
        <motion.p 
          className="font-sans text-base md:text-lg text-[#D4AF37] tracking-[0.1em] opacity-90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          생년월일시를 입력하세요
        </motion.p>
      </header>

      {/* Input Glass Card */}
      <motion.div 
        className="w-full max-w-2xl bg-[#121212]/80 backdrop-blur-xl border border-white/10 p-8 md:p-14 rounded-[32px] md:rounded-[40px] shadow-[0_12px_40px_0_rgba(0,0,0,0.5)] relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#D4AF37] opacity-10 rounded-full blur-3xl pointer-events-none"></div>
        
        <form onSubmit={handleSubmit} className="relative z-10 space-y-10">
          {/* Date Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col space-y-2">
              <label className="font-sans text-xs font-semibold text-white/70 tracking-widest uppercase">
                Year (년)
              </label>
              <input
                className="bg-transparent border-0 border-b border-white/20 font-serif text-xl md:text-2xl py-2 focus:outline-none focus:border-[#D4AF37] transition-colors focus:ring-0 text-white"
                placeholder="YYYY"
                required
                type="number"
                min="1900"
                max="2030"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="font-sans text-xs font-semibold text-white/70 tracking-widest uppercase">
                Month (월)
              </label>
              <select
                className="bg-transparent border-0 border-b border-white/20 font-serif text-xl md:text-2xl py-2 cursor-pointer focus:outline-none focus:border-[#D4AF37] transition-colors focus:ring-0 text-white"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              >
                {Array.from({ length: 12 }, (_, i) => {
                  const m = String(i + 1).padStart(2, "0");
                  return <option key={m} value={m} className="bg-[#121212] text-white">{m}</option>;
                })}
              </select>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="font-sans text-xs font-semibold text-white/70 tracking-widest uppercase">
                Day (일)
              </label>
              <input
                className="bg-transparent border-0 border-b border-white/20 font-serif text-xl md:text-2xl py-2 focus:outline-none focus:border-[#D4AF37] transition-colors focus:ring-0 text-white"
                placeholder="DD"
                required
                type="number"
                min="1"
                max="31"
                value={day}
                onChange={(e) => setDay(e.target.value)}
              />
            </div>
          </div>

          {/* Time Grid */}
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col space-y-2">
              <label className="font-sans text-xs font-semibold text-white/70 tracking-widest uppercase">
                Hour (시)
              </label>
              <input
                className="bg-transparent border-0 border-b border-white/20 font-serif text-xl md:text-2xl py-2 focus:outline-none focus:border-[#D4AF37] transition-colors focus:ring-0 text-white"
                placeholder="HH"
                required
                type="number"
                min="0"
                max="23"
                value={hour}
                onChange={(e) => setHour(e.target.value)}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="font-sans text-xs font-semibold text-white/70 tracking-widest uppercase">
                Minute (분)
              </label>
              <input
                className="bg-transparent border-0 border-b border-white/20 font-serif text-xl md:text-2xl py-2 focus:outline-none focus:border-[#D4AF37] transition-colors focus:ring-0 text-white"
                placeholder="MM"
                required
                type="number"
                min="0"
                max="59"
                value={minute}
                onChange={(e) => setMinute(e.target.value)}
              />
            </div>
          </div>

          {/* Analyze Button */}
          <div className="pt-6 flex justify-center">
            <button
              className="w-32 h-32 md:w-36 md:h-36 bg-[#D4AF37] text-black rounded-full flex flex-col items-center justify-center transition-all duration-300 shadow-[0_4px_24px_rgba(212,175,55,0.3)] hover:shadow-[0_4px_35px_rgba(212,175,55,0.5)] hover:scale-105 active:scale-95 group focus:outline-none relative disabled:opacity-80 font-bold"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="material-symbols-outlined text-4xl mb-2 animate-spin text-black">
                    sync
                  </span>
                  <span className="font-sans text-xs font-bold tracking-wider text-black">
                    ANALYZING
                  </span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-4xl mb-2 transition-transform group-hover:scale-110 text-black">
                    auto_awesome
                  </span>
                  <span className="font-sans text-xs font-bold tracking-widest text-black">
                    ANALYZE
                  </span>
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>

      {/* Morphing Particle Area with large character 命 */}
      <section className="mt-16 w-full max-w-4xl h-56 relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none select-none">
          {/* Large Background Character 命 (Fate) */}
          <span className="font-serif text-[160px] md:text-[200px] leading-none text-[#D4AF37]">
            命
          </span>
        </div>

        <div className="relative w-full h-full flex flex-col items-center justify-center space-y-4">
          <div className="text-center space-y-6">
            <p className="font-sans text-xs text-white/50 tracking-[0.3em] uppercase">
              Real-time Constitutional Synthesis
            </p>
            
            <div className="flex justify-center space-x-6 md:space-x-12 select-none">
              <motion.div 
                className="text-center"
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              >
                <span className="block font-serif text-2xl text-[#4CAF50] font-medium font-bold">木</span>
                <span className="text-[10px] tracking-wider text-white/40 font-bold">WOOD</span>
              </motion.div>

              <motion.div 
                className="text-center"
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.8 }}
              >
                <span className="block font-serif text-2xl text-[#FF5722] font-medium font-bold">火</span>
                <span className="text-[10px] tracking-wider text-white/40 font-bold">FIRE</span>
              </motion.div>

              <motion.div 
                className="text-center"
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1.6 }}
              >
                <span className="block font-serif text-2xl text-[#FFC107] font-medium font-bold">土</span>
                <span className="text-[10px] tracking-wider text-white/40 font-bold">EARTH</span>
              </motion.div>

              <motion.div 
                className="text-center"
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 2.4 }}
              >
                <span className="block font-serif text-2xl text-[#9E9E9E] font-medium font-bold">金</span>
                <span className="text-[10px] tracking-wider text-white/40 font-bold">METAL</span>
              </motion.div>

              <motion.div 
                className="text-center"
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 3.2 }}
              >
                <span className="block font-serif text-2xl text-[#2196F3] font-medium font-bold">水</span>
                <span className="text-[10px] tracking-wider text-white/40 font-bold">WATER</span>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
