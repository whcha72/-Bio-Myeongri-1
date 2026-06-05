import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { AnalysisResult } from "../types";

interface MindSpaceProps {
  data: AnalysisResult;
}

export default function MindSpace({ data }: MindSpaceProps) {
  const { heallingFrequency, healingType } = data;
  const [isPlaying, setIsPlaying] = useState(false);
  const [breathState, setBreathState] = useState<"inhale" | "hold" | "exhale">("inhale");
  const [breathSecondary, setBreathSecondary] = useState(4); // seconds countdown

  // Breathing pacer loop
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    const breathCycles = () => {
      interval = setInterval(() => {
        setBreathSecondary((prev) => {
          if (prev <= 1) {
            // Transition state
            setBreathState((current) => {
              if (current === "inhale") {
                setBreathSecondary(4); // hold for 4s
                return "hold";
              } else if (current === "hold") {
                setBreathSecondary(5); // exhale for 5s
                return "exhale";
              } else {
                setBreathSecondary(4); // inhale for 4s
                return "inhale";
              }
            });
            return 4;
          }
          return prev - 1;
        });
      }, 1000);
    };

    breathCycles();
    return () => clearInterval(interval);
  }, [breathState]);

  return (
    <div className="space-y-16 py-6 pb-20">
      
      {/* Emotional Healing wave player block */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-5 space-y-6">
          <div>
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest block mb-2 font-sans">
              EMOTIONAL RESONANCE
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-white font-medium leading-tight">
              오늘의 미학적 치유 주파수
            </h2>
            <p className="font-sans text-sm md:text-base text-white/70 leading-relaxed mt-4">
              신체의 불평형 맥을 편안히 잠재우기 위해 설계된 <strong className="text-[#D4AF37]">{heallingFrequency} ({healingType})</strong> 자연 조화 솔루션을 내보냅니다. 스트레스를 풀고 장부 기운을 고루 펴기 위하여 따뜻한 차와 함께 청취해 보세요.
            </p>
          </div>

          <div className="bg-[#121212]/80 backdrop-blur-xl p-5 rounded-[20px] border border-white/10 space-y-4 font-sans text-xs text-white/70 max-w-sm shadow-[0_12px_30px_rgba(0,0,0,0.3)]">
            <div className="flex gap-2.5 items-center">
              <span className="material-symbols-outlined text-[#D4AF37] text-xl">audiotrack</span>
              <div>
                <p className="font-semibold text-white">Nature Solfeggio Healing Wave</p>
                <p className="text-[10px] text-white/40">{heallingFrequency} Deep Ambient Resonance</p>
              </div>
            </div>
          </div>
        </div>

        {/* Music Player Interactive UI Glass Card */}
        <div className="lg:col-span-7 flex justify-center">
          <div className="w-full max-w-[440px] bg-[#121212]/80 backdrop-blur-xl border border-white/10 p-8 rounded-[28px] shadow-[0_15px_40px_rgba(0,0,0,0.5)] flex flex-col items-center justify-between relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#D4AF37]"></div>
            
            <div className="text-center w-full space-y-3 mb-8">
              <span className="text-[10px] font-bold text-[#D4AF37] bg-white/5 border border-white/10 px-3.5 py-1 rounded-full uppercase font-sans">
                Acoustic Meditation
              </span>
              <h3 className="font-serif text-xl font-medium mt-3 text-white">치유의 진동 오케스트라</h3>
              <p className="text-sm font-sans font-bold text-[#D4AF37] italic">{heallingFrequency} Solfeggio Tone</p>
            </div>

            {/* Simulated Animated Waveform based on isPlaying state */}
            <div className="w-full bg-white/5 p-6 rounded-2xl border border-white/10 mb-8 flex flex-col items-center justify-center">
              <div className="flex items-end justify-center gap-1.5 h-16 w-full px-4 mb-4 select-none">
                {Array.from({ length: 14 }).map((_, idx) => {
                  const delay = (idx * 0.15).toFixed(1);
                  return (
                    <motion.div
                      key={idx}
                      className="w-1 bg-[#D4AF37] rounded-full shadow-[0_0_10px_rgba(212,175,55,0.4)]"
                      animate={isPlaying ? { height: [5, 45, 5] } : { height: 6 }}
                      transition={isPlaying ? { repeat: Infinity, duration: 1.2, delay: parseFloat(delay), ease: "easeInOut" } : { duration: 0.5 }}
                      style={{ height: 6 }}
                    />
                  );
                })}
              </div>

              {/* Player control buttons */}
              <div className="flex items-center justify-center gap-8 w-full font-sans">
                <button className="text-white/50 hover:text-[#D4AF37] focus:outline-none hover:scale-110 active:scale-95 transition-all cursor-pointer">
                  <span className="material-symbols-outlined text-2xl">skip_previous</span>
                </button>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-14 h-14 bg-[#D4AF37] text-black rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xl focus:outline-none cursor-pointer"
                >
                  <span className="material-symbols-outlined text-3xl">
                    {isPlaying ? "pause" : "play_arrow"}
                  </span>
                </button>
                <button className="text-white/50 hover:text-[#D4AF37] focus:outline-none hover:scale-110 active:scale-95 transition-all cursor-pointer">
                  <span className="material-symbols-outlined text-2xl">skip_next</span>
                </button>
              </div>
            </div>

            {/* Embedded Zen Aesthetics Landscape */}
            <div className="w-full h-28 rounded-[16px] overflow-hidden relative group">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt="Meditation misty forest landscape"
                referrerPolicy="no-referrer"
                src="https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=1325&auto=format&fit=crop"
              />
              <div className="absolute inset-0 bg-[#000000]/30 flex items-center justify-center">
                <span className="text-white text-[10px] font-bold tracking-[0.25em] uppercase font-sans">
                  Deep Zen Healing Ground
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive breathing pacer circle for real breathing exercises! */}
      <section className="bg-[#121212]/80 backdrop-blur-xl border border-white/10 rounded-[28px] p-8 md:p-12 shadow-[0_15px_45px_rgba(0,0,0,0.5)] space-y-8 flex flex-col items-center">
        <div className="text-center space-y-2 max-w-md mx-auto">
          <h3 className="font-serif text-2xl text-[#D4AF37] font-semibold">장부 청화(淸化) 4-4-5 호흡 훈련기</h3>
          <p className="font-sans text-xs text-white/70 leading-relaxed">
            심폐 및 오장육부에 쌓인 스트레스 가스를 비워내고 맑은 우주 에너지를 충원하는 4-4-5 동양식 전통 호흡법을 지원합니다.
          </p>
        </div>

        {/* Breathing Circle animation widget */}
        <div className="relative w-48 h-48 md:w-56 md:h-56 flex items-center justify-center select-none">
          {/* Animated concentric outline pulse circles */}
          <motion.div
            className="absolute rounded-full border border-[#D4AF37]/20"
            animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.05, 0.3] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            style={{ width: "100%", height: "100%" }}
          />

          {/* Core breathing circle expanding/shrinking based on breathState */}
          <motion.div
            className={`rounded-full flex flex-col items-center justify-center text-center shadow-lg transition-all duration-1000 ${
              breathState === "inhale" 
                ? "bg-[#D4AF37]/20 border border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.3)]" 
                : (breathState === "hold" ? "bg-white/5 border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)]" : "bg-neutral-900/60 border border-neutral-800")
            }`}
            animate={{
              scale: breathState === "inhale" ? 1.2 : (breathState === "hold" ? 1.25 : 0.85)
            }}
            transition={{ duration: breathState === "exhale" ? 5 : 4, ease: "easeInOut" }}
            style={{ width: "75%", height: "75%" }}
          >
            <div className="space-y-1">
              <span className="font-serif text-base md:text-lg font-bold tracking-tight text-white block">
                {breathState === "inhale" ? "들이쉬고 (Inhale)" : (breathState === "hold" ? "지그시 멈춤 (Hold)" : "내쉬고 (Exhale)")}
              </span>
              <span className="font-sans text-2xl md:text-3xl font-black text-[#D4AF37]">
                {breathSecondary}s
              </span>
            </div>
          </motion.div>
        </div>

        <div className="flex gap-4 font-sans text-[11px] font-bold tracking-wider uppercase text-white/50 select-none text-center justify-center max-w-md mx-auto">
          <div className={`px-4 py-2.5 rounded-xl border transition-all ${breathState === "inhale" ? "border-[#D4AF37] text-[#D4AF37] font-extrabold bg-[#D4AF37]/10" : "border-white/5 text-white/40"}`}>
            Inhale (4s)
          </div>
          <div className={`px-4 py-2.5 rounded-xl border transition-all ${breathState === "hold" ? "border-[#D4AF37] text-[#D4AF37] font-extrabold bg-[#D4AF37]/10" : "border-white/5 text-white/40"}`}>
            Hold (4s)
          </div>
          <div className={`px-4 py-2.5 rounded-xl border transition-all ${breathState === "exhale" ? "border-[#D4AF37] text-[#D4AF37] font-extrabold bg-[#D4AF37]/10" : "border-white/5 text-white/40"}`}>
            Exhale (5s)
          </div>
        </div>
      </section>
    </div>
  );
}
