import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { AnalysisResult } from "../types";

interface BodyMapProps {
  data: AnalysisResult;
  onNavigateTab: (tab: string) => void;
}

export default function BodyMap({ data, onNavigateTab }: BodyMapProps) {
  const { organsState, criticalOrgan } = data;
  const [selectedOrgan, setSelectedOrgan] = useState<string>("heart");

  // Sync with data's critical organ initially
  useEffect(() => {
    if (criticalOrgan) {
      setSelectedOrgan(criticalOrgan);
    }
  }, [criticalOrgan]);

  const currentlySelected = organsState[selectedOrgan] || organsState.heart;

  const organList = [
    { id: "heart", label: "심장(화)", status: organsState.heart.status },
    { id: "stomach", label: "위/비장(토)", status: organsState.stomach.status },
    { id: "lung", label: "폐(금)", status: organsState.lung.status },
    { id: "liver", label: "간(목)", status: organsState.liver.status },
    { id: "kidney", label: "신장(수)", status: organsState.kidney.status }
  ];

  return (
    <div className="space-y-12 py-6 pb-20">
      <section className="space-y-3">
        <h2 className="font-serif text-3xl text-white font-medium leading-tight">
          장부 에너지 맵
        </h2>
        <p className="font-sans text-sm md:text-base text-white/70 leading-relaxed">
          열지도 기반 정밀 진단 시스템으로 내장 오장육부의 오행 기운 편차를 한눈에 알아봅니다. 각 부위를 터치하거나 클릭하여 상세 불균형 지표와 기혈 대처안을 조율해 보세요.
        </p>
      </section>

      {/* Interactive Human Visualization Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Interactive SVG Body Map Container */}
        <div className="lg:col-span-7 bg-[#121212]/80 backdrop-blur-xl border border-white/10 rounded-[28px] p-8 min-h-[500px] flex md:flex-row flex-col justify-center items-center relative overflow-hidden gap-8 shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
          <div className="absolute top-6 left-6 z-10 flex flex-col gap-2 font-sans text-[11px] font-bold">
            <div className="flex items-center gap-2 px-3 py-1 bg-red-950/40 border border-red-900/30 rounded-full text-red-300">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0 animate-ping"></span>
              <span>과다 (Excess / 상체열)</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-neutral-900/60 border border-white/5 rounded-full text-white/50">
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-400 shrink-0"></span>
              <span>균형 (Balanced)</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-blue-950/40 border border-blue-900/30 rounded-full text-blue-300">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0 animate-pulse"></span>
              <span>부족 (Deficiency / 복부냉)</span>
            </div>
          </div>

          <div className="relative w-full max-w-[280px] h-[400px] flex items-center justify-center">
            {/* Outline human body and glowing vector organs */}
            <svg viewBox="0 0 200 400" className="w-full h-full drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] select-none">
              {/* Human Outline */}
              <path 
                d="M100,20 Q118,20 125,35 Q132,48 122,60 Q138,70 144,90 L155,160 Q162,200 154,240 L140,320 L148,390 Q125,395 115,390 L105,330 L95,330 L85,390 Q75,395 52,390 L60,320 L46,240 Q38,200 45,160 L56,90 Q62,70 78,60 Q68,48 75,35 Q82,20 100,20 Z" 
                fill="none" 
                stroke="rgba(255, 255, 255, 0.15)" 
                strokeWidth="2.5" 
              />

              {/* Lungs (Metal) */}
              <motion.path 
                onClick={() => setSelectedOrgan("lung")}
                className="cursor-pointer transition-all hover:scale-105 origin-center"
                style={{ transformOrigin: "100px 105px" }}
                d="M70,85 Q100,68 130,85 L140,128 Q100,140 60,128 Z" 
                fill={selectedOrgan === "lung" ? "#9E9E9E" : "#1a1a1a"} 
                stroke={selectedOrgan === "lung" ? "#D4AF37" : "none"}
                strokeWidth="1.5"
                opacity={selectedOrgan === "lung" ? 1 : 0.65}
              />

              {/* Heart (Fire) - Excess color pulse */}
              <motion.path 
                onClick={() => setSelectedOrgan("heart")}
                className="cursor-pointer transition-all origin-center"
                style={{ transformOrigin: "100px 125px" }}
                animate={organsState.heart.status === "과부하" ? { scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] } : {}}
                transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                d="M100,105 Q118,92 122,112 Q118,135 100,146 Q82,135 78,112 Q82,92 100,105" 
                fill={selectedOrgan === "heart" ? "#ba1a1a" : (organsState.heart.status === "과부하" ? "#5c2a2a" : "#1a1a1a")} 
                stroke={selectedOrgan === "heart" ? "#D4AF37" : "none"}
                strokeWidth="1.5"
                opacity={selectedOrgan === "heart" ? 1 : 0.65}
              />

              {/* Liver (Wood) */}
              <motion.path 
                onClick={() => setSelectedOrgan("liver")}
                className="cursor-pointer transition-all origin-center hover:scale-105"
                style={{ transformOrigin: "100px 172px" }}
                d="M58,155 Q100,142 142,155 L132,185 Q100,195 68,185 Z" 
                fill={selectedOrgan === "liver" ? "#4CAF50" : "#1a1a1a"} 
                stroke={selectedOrgan === "liver" ? "#D4AF37" : "none"}
                strokeWidth="1.5"
                opacity={selectedOrgan === "liver" ? 1 : 0.65}
              />

              {/* Stomach (Earth) - cold pulse color */}
              <motion.path 
                onClick={() => setSelectedOrgan("stomach")}
                className="cursor-pointer transition-all origin-center"
                style={{ transformOrigin: "100px 212px" }}
                animate={organsState.stomach.status === "부족" || organsState.stomach.status === "순환저하" ? { scale: [1, 1.03, 1] } : {}}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                d="M78,198 Q100,190 122,198 L118,238 Q100,248 82,238 Z" 
                fill={selectedOrgan === "stomach" ? (organsState.stomach.status === "부족" || organsState.stomach.status === "순환저하" ? "#2196F3" : "#FFC107") : "#1a1a1a"} 
                stroke={selectedOrgan === "stomach" ? "#D4AF37" : "none"}
                strokeWidth="1.5"
                opacity={selectedOrgan === "stomach" ? 1 : 0.65}
              />

              {/* Kidney (Water) */}
              <motion.path 
                onClick={() => setSelectedOrgan("kidney")}
                className="cursor-pointer transition-all origin-center hover:scale-105"
                style={{ transformOrigin: "100px 270px" }}
                d="M72,258 Q82,252 92,262 L87,285 M108,262 Q118,252 128,258 L123,285" 
                fill={selectedOrgan === "kidney" ? "#1976D2" : "#1a1a1a"} 
                stroke={selectedOrgan === "kidney" ? "#D4AF37" : "none"}
                strokeWidth="1.5"
                opacity={selectedOrgan === "kidney" ? 1 : 0.65}
              />
            </svg>
          </div>

          {/* Quick Click helper labels */}
          <div className="flex flex-col gap-2.5 shrink-0 select-none font-sans md:w-auto w-full">
            {organList.map((item) => {
              const isSelected = selectedOrgan === item.id;
              const isAbnormal = item.status !== "안정" && item.status !== "설정안됨";
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedOrgan(item.id)}
                  className={`px-4 py-3 rounded-[12px] text-xs font-semibold text-left border flex items-center justify-between transition-all focus:outline-none ${
                    isSelected 
                      ? "bg-[#D4AF37] text-black border-[#D4AF37]" 
                      : "bg-[#1a1a1a]/50 text-white/80 border-white/5 hover:border-white/20"
                  }`}
                >
                  <span>{item.label}</span>
                  <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
                    isSelected 
                      ? "bg-black/10 text-black" 
                      : (isAbnormal ? "bg-red-950/50 text-red-300 border border-red-900/30" : "bg-white/5 text-white/50")
                  }`}>
                    {item.status}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side Diagnosis Details */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-[#121212]/80 backdrop-blur-xl border border-white/10 rounded-[28px] p-6 md:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
            <div className="flex justify-between items-start mb-5">
              <div>
                <span className="font-sans text-[10px] text-[#D4AF37] tracking-widest uppercase block mb-1">
                  CURRENT DIAGNOSIS STATE
                </span>
                <h3 className="font-serif text-2xl text-white font-medium leading-normal">
                  {currentlySelected.title} - <span className="font-bold text-[#D4AF37]">{currentlySelected.status}</span>
                </h3>
              </div>
              {currentlySelected.status !== "안정" ? (
                <span className="material-symbols-outlined text-red-400 text-3xl shrink-0 animate-pulse">
                  warning_amber
                </span>
              ) : (
                <span className="material-symbols-outlined text-green-400 text-3xl shrink-0">
                  check_circle
                </span>
              )}
            </div>

            <p className="font-sans text-sm text-white/70 leading-relaxed mb-6">
              {currentlySelected.description}
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 border border-white/10 rounded-[14px]">
                <span className="font-sans text-[10px] text-white/40 block mb-1">장부 기혈지수</span>
                <span className="font-sans text-lg font-bold text-white">88% Active</span>
              </div>
              <div className="p-4 bg-white/5 border border-white/10 rounded-[14px]">
                <span className="font-sans text-[10px] text-white/40 block mb-1">불균형 정도</span>
                <span className={`font-sans text-lg font-bold ${currentlySelected.status !== "안정" ? "text-red-400" : "text-green-400"}`}>
                  {currentlySelected.status !== "안정" ? "집중관찰" : "조화로움"}
                </span>
              </div>
            </div>
          </div>

          {/* Quick elements grid bento block */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#121212]/80 backdrop-blur-xl border border-white/10 p-5 rounded-[18px] flex flex-col justify-between hover:bg-white/5 transition-all">
              <span className="material-symbols-outlined text-[#4CAF50] text-xl">eco</span>
              <div className="mt-4">
                <p className="text-[10px] text-white/40 font-sans">Wood (木 / 간)</p>
                <p className="text-sm font-semibold text-white">{organsState.liver.status}</p>
              </div>
            </div>
            
            <div className="bg-[#121212]/80 backdrop-blur-xl border border-white/10 p-5 rounded-[18px] flex flex-col justify-between hover:bg-white/5 transition-all">
              <span className="material-symbols-outlined text-[#FF5722] text-xl">local_fire_department</span>
              <div className="mt-4">
                <p className="text-[10px] text-white/40 font-sans">Fire (火 / 심)</p>
                <p className={`text-sm font-semibold ${organsState.heart.status !== "안정" ? "text-red-400" : "text-white"}`}>
                  {organsState.heart.status}
                </p>
              </div>
            </div>

            <div className="bg-[#121212]/80 backdrop-blur-xl border border-white/10 p-5 rounded-[18px] flex flex-col justify-between hover:bg-white/5 transition-all">
              <span className="material-symbols-outlined text-[#FFC107] text-xl">grass</span>
              <div className="mt-4">
                <p className="text-[10px] text-white/40 font-sans">Earth (土 / 비위)</p>
                <p className={`text-sm font-semibold ${organsState.stomach.status !== "안정" ? "text-blue-400" : "text-white"}`}>
                  {organsState.stomach.status}
                </p>
              </div>
            </div>

            <div className="bg-[#121212]/80 backdrop-blur-xl border border-white/10 p-5 rounded-[18px] flex flex-col justify-between hover:bg-white/5 transition-all">
              <span className="material-symbols-outlined text-[#9E9E9E] text-xl">shield</span>
              <div className="mt-4">
                <p className="text-[10px] text-white/40 font-sans">Metal (金 / 폐)</p>
                <p className="text-sm font-semibold text-white">{organsState.lung.status}</p>
              </div>
            </div>
          </div>

          {/* Action button leading to beauty & lifestyle prescription */}
          <button 
            onClick={() => onNavigateTab("heal")}
            className="w-full py-4.5 bg-[#D4AF37] text-black rounded-full font-sans text-xs font-bold hover:bg-[#eac551] transition-all flex items-center justify-center gap-2 shadow-md group tracking-wide focus:outline-none uppercase active:scale-95 duration-200 cursor-pointer"
          >
            맞춤형 라이프스타일 처방 보기
            <span className="material-symbols-outlined text-sm leading-none group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
