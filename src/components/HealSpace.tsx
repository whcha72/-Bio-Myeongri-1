import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AnalysisResult } from "../types";

interface HealSpaceProps {
  data: AnalysisResult;
}

export default function HealSpace({ data }: HealSpaceProps) {
  const { beautyIngredients, lifestyle, constitution } = data;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isOrdered, setIsOrdered] = useState(false);

  // Derive customized formula based on constitution
  const activeFormula = `${constitution.split(" ")[0]} Active Care Formula (Botanical Centella & Ceramide complex)`;

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOrdered(true);
    setTimeout(() => {
      // Clear or succeed state
    }, 4000);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsOrdered(false);
    setName("");
    setPhone("");
    setAddress("");
  };

  return (
    <div className="space-y-16 py-6 pb-20">
      
      {/* Beauty Ingredients Section */}
      <section className="space-y-8">
        <div className="flex items-end justify-between border-b border-white/10 pb-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest block font-sans">
              Analysis Prescription
            </span>
            <h2 className="font-serif text-3xl text-white font-medium mt-1">
              추천 뷰티 성분
            </h2>
          </div>
          <span className="font-sans text-[11px] text-white/50 tracking-wider uppercase font-semibold hidden md:block">
            Based on Constitutional Balance
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {beautyIngredients.map((item, index) => (
            <motion.div
              key={index}
              className="bg-[#121212]/80 backdrop-blur-xl border border-white/10 p-8 rounded-[24px] flex flex-col gap-5 hover:scale-[1.01] transition-transform duration-300 shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
            >
              <div className="w-12 h-12 bg-white/5 text-[#D4AF37] rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">
                  {index === 0 ? "spa" : "shield_moon"}
                </span>
              </div>
              <div className="space-y-2">
                <h4 className="font-sans text-lg font-bold text-white">
                  {item.name}
                </h4>
                <p className="font-sans text-sm text-white/75 leading-relaxed">
                  {item.description}
                </p>
              </div>
              <div className="pt-2 border-t border-white/10 mt-auto flex">
                <span className="bg-white/5 border border-white/10 text-[#D4AF37] text-[9px] px-2.5 py-1 rounded-md uppercase font-bold tracking-wider font-sans">
                  {item.tag}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Detailed Lifestyle Prescription */}
      <section className="space-y-8">
        <div className="border-b border-white/10 pb-4">
          <h2 className="font-serif text-2xl text-white font-medium">
            체질 라이프스타일 요법
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {lifestyle.map((item, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-[#121212]/80 backdrop-blur-xl border border-white/5 rounded-[20px] shadow-[0_12px_30px_rgba(0,0,0,0.3)] hover:border-white/10 hover:scale-[1.02] transition-all"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <div className="w-10 h-10 bg-white/5 text-[#D4AF37] rounded-full flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-xl">
                  {item.category === "Sleep" ? "bedtime" : (item.category === "Exercise" ? "fitness_center" : "self_improvement")}
                </span>
              </div>
              <h5 className="font-serif text-lg text-white tracking-tight mb-2">
                {item.category}
              </h5>
              <p className="font-sans text-[#D4AF37] text-xs font-semibold uppercase tracking-wider mb-3">
                {item.label}
              </p>
              <p className="font-sans text-xs text-white/70 leading-relaxed">
                {item.recommendation}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Immersive CTA Block */}
      <section>
        <div className="bg-[#050505] border border-[#D4AF37]/35 text-white rounded-[28px] p-8 md:p-14 text-center relative overflow-hidden flex flex-col items-center shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
          <div className="absolute inset-0 z-0 opacity-15 mix-blend-overlay">
            <img 
              alt="Cosmetics dropper" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1287&auto=format&fit=crop"
            />
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[100px]"></div>

          <div className="relative z-10 space-y-6 max-w-xl mx-auto">
            <span className="inline-block bg-white/5 border border-white/10 px-3 py-1 rounded-full text-[10px] tracking-widest font-bold text-[#D4AF37] uppercase font-sans">
              Dynamic Botanical dispenser
            </span>
            <h2 className="font-serif text-3xl md:text-4xl leading-tight font-medium">
              당신만을 위한 처방화장품이 조제 준비되었습니다
            </h2>
            <p className="font-sans text-sm md:text-base text-white/85 leading-relaxed">
              분석된 피부 장벽 및 {constitution} 체질 데이터를 기반으로 전문 한방 약초 성분이 조화된 최적 처방 에센스를 즉시 연구실에서 조합합니다.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-10 py-4.5 bg-[#D4AF37] text-black rounded-full font-sans text-xs font-bold hover:bg-[#eac551] hover:scale-105 transition-all shadow-xl uppercase tracking-wider cursor-pointer"
            >
              맞춤형 화장품 주문하기
            </button>
          </div>
        </div>
      </section>

      {/* Checkout Drawer Modals */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              onClick={closeModal}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal Body */}
            <motion.div
              className="bg-[#0b0b0b] w-full max-w-lg rounded-[28px] border border-white/10 shadow-[0_24px_50px_rgba(0,0,0,0.8)] relative z-10 overflow-hidden"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
            >
              {/* Header */}
              <div className="bg-[#121212] border-b border-white/5 text-white p-6 relative">
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-white/75 hover:text-white hover:scale-110 active:scale-90 transition-all font-bold"
                >
                  <span className="material-symbols-outlined text-xl">close</span>
                </button>
                <span className="text-[10px] tracking-widest uppercase font-sans text-[#D4AF37]">
                  Personal Prescription Dispatch
                </span>
                <h4 className="font-serif text-xl font-medium mt-1 text-white">
                  맞춤형 화장품 처방 요청
                </h4>
              </div>

              <div className="p-8 space-y-6 max-h-[80vh] overflow-y-auto no-scrollbar">
                {!isOrdered ? (
                  <form onSubmit={handleOrderSubmit} className="space-y-6">
                    {/* Prescription Card details */}
                    <div className="bg-white/5 p-5 rounded-[18px] border border-white/10 space-y-3 font-sans text-xs text-white/80">
                      <div className="flex justify-between items-baseline pb-2 border-b border-white/5">
                        <span className="font-semibold text-white/60">처방명</span>
                        <span className="font-serif font-bold text-sm text-[#D4AF37]">{constitution.split(" ")[0]} 밸런스 에센스</span>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <span className="text-white/60">주요 조제 성분</span>
                        <span className="text-right text-white font-medium">{beautyIngredients.map(b => b.name.split("(")[0]).join(" + ")}</span>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <span className="text-white/60">액티브 농도</span>
                        <span className="text-white font-medium">94.8% Botanical Active Complex</span>
                      </div>
                      <div className="flex justify-between items-baseline pt-2 border-t border-white/5 text-sm font-semibold text-[#D4AF37]">
                        <span>예상가</span>
                        <span>48,000 KRW (분석가 무료 혜택)</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex flex-col space-y-1.5">
                        <label className="text-[10px] font-bold text-white/60 tracking-wider uppercase font-sans">수령인 성함</label>
                        <input
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="홍길동"
                          className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 font-sans text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                          type="text"
                        />
                      </div>

                      <div className="flex flex-col space-y-1.5">
                        <label className="text-[10px] font-bold text-white/60 tracking-wider uppercase font-sans">연락처</label>
                        <input
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="010-1234-5678"
                          className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 font-sans text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                          type="tel"
                        />
                      </div>

                      <div className="flex flex-col space-y-1.5">
                        <label className="text-[10px] font-bold text-white/60 tracking-wider uppercase font-sans">배송 주소</label>
                        <textarea
                          required
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="서울특별시 강남구 테헤란로 123"
                          rows={2}
                          className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 font-sans text-sm focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-[#D4AF37] text-black rounded-full font-serif text-sm font-bold tracking-wider hover:bg-[#eac551] transition-all uppercase cursor-pointer"
                    >
                      맞춤형 화장품 주문 전송
                    </button>
                  </form>
                ) : (
                  <motion.div
                    className="text-center py-6 space-y-5"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="w-16 h-16 bg-[#D4AF37]/10 text-[#D4AF37] rounded-full border border-[#D4AF37]/35 flex items-center justify-center mx-auto shadow-sm">
                      <span className="material-symbols-outlined text-3xl animate-bounce">
                        check
                      </span>
                    </div>
                    <div className="space-y-2">
                      <h5 className="font-serif text-2xl font-semibold text-[#D4AF37]">
                        주문이 성공적으로 접수되었습니다
                      </h5>
                      <p className="font-sans text-sm text-white/70 leading-relaxed max-w-sm mx-auto">
                        감사합니다, <strong className="text-white">{name}</strong>님. 분석된 기혈 순환에 최적 조합된 <strong className="text-[#D4AF37]">{constitution.split(" ")[0]} 에센스</strong>가 은밀하게 조제되기 위해 Bio-Myeongri 에코 연구소실에 전달되었습니다. 수일 내로 기탁해 드립니다.
                      </p>
                    </div>
                    <button
                      onClick={closeModal}
                      className="px-8 py-3.5 border border-white/20 text-[#D4AF37] rounded-full font-sans text-xs font-bold hover:bg-white/5 transition-all tracking-wider uppercase cursor-pointer"
                    >
                      목록으로 돌아가기
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
