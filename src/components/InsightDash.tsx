import React from "react";
import { motion } from "motion/react";
import { AnalysisResult } from "../types";

interface InsightDashProps {
  data: AnalysisResult;
  onNavigateTab: (tab: string) => void;
}

export default function InsightDash({ data, onNavigateTab }: InsightDashProps) {
  const { wellnessScore, constitution, fiveElements, summary, dailyCoaching } = data;

  // Radar chart mathematical coordinate calculations mapping to SVG x,y
  const cx = 200;
  const cy = 200;
  const maxR = 120;

  const getCoordinates = (value: number, angleDegrees: number) => {
    const angleRadians = (angleDegrees - 90) * (Math.PI / 180);
    const r = (value / 50) * maxR; // scale max value (assuming max factor of 50 for layout balance)
    const x = cx + r * Math.cos(angleRadians);
    const y = cy + r * Math.sin(angleRadians);
    return { x, y };
  };

  // 5 items vertices coordinates
  const pWood = getCoordinates(fiveElements.wood, 0);       // Wood (Top)
  const pFire = getCoordinates(fiveElements.fire, 72);      // Fire (Top Right)
  const pEarth = getCoordinates(fiveElements.earth, 144);   // Bottom Right
  const pMetal = getCoordinates(fiveElements.metal, 216);   // Bottom Left
  const pWater = getCoordinates(fiveElements.water, 288);   // Top Left

  const polygonPoints = `${pWood.x},${pWood.y} ${pFire.x},${pFire.y} ${pEarth.x},${pEarth.y} ${pMetal.x},${pMetal.y} ${pWater.x},${pWater.y}`;

  // Find lowest and highest elements to display tailored quick feedback
  const elementsList = [
    { key: "wood", label: "목 (나무)", value: fiveElements.wood, text: "간(肝) 건강 및 신체 활력 대사" },
    { key: "fire", label: "화 (불)", value: fiveElements.fire, text: "심장(心) 건강 및 상체 혈행 순환" },
    { key: "earth", label: "토 (흙)", value: fiveElements.earth, text: "비위(脾胃) 기능 및 영양 소화 대사" },
    { key: "metal", label: "금 (쇠)", value: fiveElements.metal, text: "폐(肺)와 기관지 면역 및 수렴 작용" },
    { key: "water", label: "수 (물)", value: fiveElements.water, text: "신장(腎) 기능 및 피로 회복 자정력" }
  ];

  const sortedElements = [...elementsList].sort((a, b) => a.value - b.value);
  const lowestElement = sortedElements[0];

  return (
    <div className="space-y-16 py-6 pb-20">
      {/* Today's Score & Radar Feature */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-5 space-y-6">
          <div>
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest block mb-1">
              Your Vitality
            </span>
            <h1 className="font-serif text-3xl md:text-5xl text-white font-medium leading-[1.25]">
              오늘의 웰니스 스코어: <span className="font-bold border-b-2 border-[#D4AF37] pb-1 text-[#D4AF37]">{wellnessScore}점</span>
            </h1>
            <p className="font-sans text-base md:text-lg text-white/70 leading-relaxed mt-4">
              체질 맞춤 분석 결과, <strong className="text-white font-semibold">{constitution}</strong> 체질의 복합적인 기운이 작용 중입니다. 아래 오행 레이더 분석 맵을 통해 오장육부의 미세 흐름 지표를 확인하시고, 보강 리듬을 정교히 조화시켜 보세요.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 pt-2">
            <button 
              onClick={() => onNavigateTab("body")}
              className="px-8 py-3.5 bg-[#D4AF37] text-black rounded-full font-sans text-xs font-bold hover:bg-[#eac551] transition-all tracking-wider shadow-sm uppercase active:scale-95 duration-200"
            >
              장부 에너지 맵 진단
            </button>
            <button 
              onClick={() => onNavigateTab("mind")}
              className="px-8 py-3.5 border border-white/20 text-white rounded-full font-sans text-xs font-bold hover:bg-white/5 transition-all tracking-wider uppercase italic active:scale-95 duration-200"
            >
              힐링 명상 시작
            </button>
          </div>
        </div>

        {/* Beautiful Dynamic SVG Radar Chart */}
        <div className="lg:col-span-7 flex justify-center items-center">
          <motion.div 
            className="w-full max-w-[480px] bg-[#121212]/80 backdrop-blur-xl border border-white/10 p-6 md:p-10 rounded-[32px] shadow-[0_12px_40px_rgba(0,0,0,0.5)] relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <svg viewBox="0 0 400 400" className="w-full h-auto">
              {/* Polar circular grids for modern look */}
              <circle cx="200" cy="200" r="120" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" fill="none" />
              <circle cx="200" cy="200" r="80" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" fill="none" strokeDasharray="4 4" />
              <circle cx="200" cy="200" r="40" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" fill="none" />

              {/* Axis rays */}
              <line x1="200" y1="200" x2="200" y2="50" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="200" y1="200" x2={200 + maxR * Math.cos(18 * Math.PI / 180)} y2={200 + maxR * Math.sin(18 * Math.PI / 180)} stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="200" y1="200" x2={200 + maxR * Math.cos(90 * Math.PI / 180)} y2={200 + maxR * Math.sin(90 * Math.PI / 180)} stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="200" y1="200" x2={200 - maxR * Math.cos(90 * Math.PI / 180)} y2={200 + maxR * Math.sin(90 * Math.PI / 180)} stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="200" y1="200" x2={200 - maxR * Math.cos(18 * Math.PI / 180)} y2={200 + maxR * Math.sin(18 * Math.PI / 180)} stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" strokeDasharray="3 3" />

              {/* Polygon represent value */}
              <motion.polygon
                points={polygonPoints}
                className="fill-[#D4AF37]/15 stroke-[#D4AF37] stroke-[2.5]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              />

              {/* Interactive vertices */}
              <circle cx={pWood.x} cy={pWood.y} r="5.5" className="fill-[#4CAF50] stroke-[#121212] stroke-2 shadow" />
              <circle cx={pFire.x} cy={pFire.y} r="5.5" className="fill-[#FF5722] stroke-[#121212] stroke-2 shadow" />
              <circle cx={pEarth.x} cy={pEarth.y} r="5.5" className="fill-[#FFC107] stroke-[#121212] stroke-2 shadow" />
              <circle cx={pMetal.x} cy={pMetal.y} r="5.5" className="fill-[#9E9E9E] stroke-[#121212] stroke-2 shadow" />
              <circle cx={pWater.x} cy={pWater.y} r="5.5" className="fill-[#2196F3] stroke-[#121212] stroke-2 shadow" />

              {/* Labels with matching native Eastern character styles */}
              <text x="200" y="38" className="text-xs font-serif font-bold text-center fill-[#4CAF50]" textAnchor="middle">목(木)</text>
              <text x="360" y="155" className="text-xs font-serif font-bold text-center fill-[#FF5722]" textAnchor="start">화(火)</text>
              <text x="310" y="335" className="text-xs font-serif font-bold text-center fill-[#FFC107]" textAnchor="start">토(土)</text>
              <text x="90" y="335" className="text-xs font-serif font-bold text-center fill-[#9E9E9E]" textAnchor="end">금(金)</text>
              <text x="40" y="155" className="text-xs font-serif font-bold text-center fill-[#2196F3]" textAnchor="end">수(水)</text>

              {/* Subtle score labels on plot points */}
              <text x="200" y={pWood.y - 10} className="font-sans text-[10px] font-bold fill-white/80" textAnchor="middle">{fiveElements.wood}</text>
              <text x={pFire.x + 12} y={pFire.y + 4} className="font-sans text-[10px] font-bold fill-white/80" textAnchor="start">{fiveElements.fire}</text>
              <text x={pEarth.x + 10} y={pEarth.y + 12} className="font-sans text-[10px] font-bold fill-white/80" textAnchor="start">{fiveElements.earth}</text>
              <text x={pMetal.x - 10} y={pMetal.y + 12} className="font-sans text-[10px] font-bold fill-white/80" textAnchor="end">{fiveElements.metal}</text>
              <text x={pWater.x - 12} y={pWater.y + 4} className="font-sans text-[10px] font-bold fill-white/80" textAnchor="end">{fiveElements.water}</text>
            </svg>
          </motion.div>
        </div>
      </section>

      {/* Dynamic Element Insight */}
      <section className="space-y-8">
        <div className="flex items-end justify-between border-b border-white/10 pb-4">
          <h2 className="font-serif text-2xl text-white font-medium">오행 에너지 분석</h2>
          <span className="font-sans text-xs text-[#D4AF37] tracking-wider">실시간 체질 보강 리듬</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Focus Card: Weakest Element */}
          <div className="md:col-span-2 bg-[#121212]/80 backdrop-blur-xl border border-white/10 p-8 rounded-[24px] flex flex-col md:flex-row gap-8 relative overflow-hidden group">
            <div className="w-full md:w-3/5 space-y-4 flex flex-col justify-between">
              <div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold bg-red-950/40 text-red-300 border border-red-900/40 uppercase tracking-wider font-sans">
                  우선 보강 필요
                </span>
                <h3 className="font-serif text-2xl text-white font-medium mt-3 leading-relaxed">
                  {lowestElement.label} 기운이 가장 약화되어 있습니다.
                </h3>
                <p className="font-sans text-sm text-white/70 leading-relaxed mt-2">
                  선천적으로 조절되는 기운 중 <strong className="text-[#D4AF37]">{lowestElement.label} ({lowestElement.value})</strong> 관련 장부의 기능이 전반적으로 침체된 국면입니다. 신체 에너지를 보강하는 데 있어 <strong className="text-white font-semibold">{lowestElement.text}</strong> 조치들을 우선 권고 드립니다.
                </p>
              </div>
              <button 
                onClick={() => onNavigateTab("heal")}
                className="text-xs font-bold text-[#D4AF37] flex items-center gap-1.5 focus:outline-none hover:translate-x-1.5 transition-transform font-sans"
              >
                더 자세히 알아보기
                <span className="material-symbols-outlined text-sm leading-none font-bold">arrow_forward</span>
              </button>
            </div>
            
            {/* Visualizer widget representing biological cycle */}
            <div className="w-full md:w-2/5 min-h-[160px] bg-black/40 rounded-[18px] p-6 flex flex-col items-center justify-center border border-white/10 relative overflow-hidden">
              <span className="font-serif text-[100px] absolute -right-6 -bottom-10 opacity-[0.03] select-none text-[#ffffff]">
                精
              </span>
              <div className="text-center relative z-10 space-y-2">
                <span className="material-symbols-outlined text-[#D4AF37] text-4xl block animate-pulse">
                  clinical_feeling
                </span>
                <p className="font-serif text-lg text-white italic">명의동원 진액비</p>
                <div className="flex justify-center items-baseline gap-1 font-sans">
                  <span className="text-2xl font-bold text-white">{wellnessScore}</span>
                  <span className="text-xs text-white/50">/ 100 VP</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sandy Gold Core Guide Card */}
          <div className="bg-[#1c1303] border border-[#ffc107]/20 text-white p-8 rounded-[24px] space-y-6 flex flex-col justify-between shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#ffc107]/5 rounded-full blur-2xl pointer-events-none"></div>
            
            <div className="space-y-4">
              <h3 className="font-serif text-xl tracking-tight leading-relaxed text-[#D4AF37] font-semibold">
                균형 잡힌 오늘의 가이드
              </h3>
              <div className="space-y-4 font-sans text-sm">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-sm text-[#D4AF37] mt-0.5 filter drop-shadow">
                    lightbulb
                  </span>
                  <p className="text-white/80 leading-relaxed">
                    조식 전 미온수로 내부 상체를 깨우고, 율동적인 가벼운 근육 스트레칭으로 순환을 유도하세요.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-sm text-[#D4AF37] mt-0.5 filter drop-shadow">
                    restaurant
                  </span>
                  <p className="text-white/80 leading-relaxed">
                    찬 음료나 무거운 유제품 대신 녹색 신선 채소 및 향긋한 구기자 발효 음포를 권장 드립니다.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-sm text-[#D4AF37] mt-0.5 filter drop-shadow">
                    shield_moon
                  </span>
                  <p className="text-white/80 leading-relaxed">
                    자정 무렵은 기혈을 해독 정주하는 리셋기이니, 정화 에너지를 위해 오후 11시 전에 포근한 숙면에 집중하세요.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="text-[12px] opacity-60 tracking-wider text-[#D4AF37] font-sans">
              * 동양의학 상수 데이터에 기반한 안락 처방
            </div>
          </div>
        </div>
      </section>

      {/* Daily Coaching Tips Section */}
      <section className="space-y-8">
        <h2 className="font-serif text-2xl text-white font-medium border-b border-white/10 pb-4">
          데일리 명의 라이프 팁
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dailyCoaching.map((item, index) => (
            <motion.div
              key={index}
              className="bg-[#121212]/80 backdrop-blur-xl border border-white/10 p-6 rounded-[20px] shadow-[0_4px_24px_rgba(0,0,0,0.4)] hover:bg-white/5 hover:-translate-y-1 transition-all duration-300 group"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <div className="w-12 h-12 rounded-[14px] bg-white/5 flex items-center justify-center text-[#D4AF37] group-hover:scale-105 transition-transform mb-4">
                <span className="material-symbols-outlined text-2xl">
                  {item.icon}
                </span>
              </div>
              <h4 className="font-sans text-base font-semibold text-white mb-2">
                {item.title}
              </h4>
              <p className="font-sans text-xs text-white/60 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Ambient Large Card Section */}
      <section className="bg-black/40 border border-white/10 rounded-[28px] overflow-hidden min-h-[380px] relative flex items-center justify-center p-8 md:p-14">
        {/* Ambient image background matching Zen-tech medical standard */}
        <div className="absolute inset-0 z-0">
          <img 
            alt="Zen Ambient Natural Garden"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-30 grayscale-[30%] brightness-75"
            src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1470&auto=format&fit=crop"
          />
          <div className="absolute inset-0 bg-[#050505]/80 mix-blend-multiply"></div>
        </div>

        <div className="relative z-10 text-center space-y-6 max-w-xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl text-white leading-tight font-medium">
            동의보감 명의동원(名醫同源)<br />나를 비추는 참된 조화
          </h2>
          <p className="font-sans text-sm md:text-base text-white/70 leading-relaxed">
            나의 고유한 생체 상수가 속삭이는 지표를 따라, 몸과 마음 구석진 자락까지 깃든 고요를 찾아보세요. 일상의 작지만 정화 가득한 한잔의 차와 은은한 명상이 깊은 쉼의 뿌리로 인도합니다.
          </p>
          <button 
            onClick={() => onNavigateTab("mind")}
            className="px-10 py-4 bg-[#D4AF37] text-black rounded-full font-sans text-xs font-bold hover:bg-[#eac551] transition-transform hover:scale-105 shadow-md uppercase tracking-wider cursor-pointer"
          >
            맞춤 명상 가이드 체험
          </button>
        </div>
      </section>
    </div>
  );
}
