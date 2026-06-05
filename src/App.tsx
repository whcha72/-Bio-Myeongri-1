import React, { useState } from "react";
import Onboarding from "./components/Onboarding";
import InsightDash from "./components/InsightDash";
import BodyMap from "./components/BodyMap";
import HealSpace from "./components/HealSpace";
import MindSpace from "./components/MindSpace";
import { AnalysisResult } from "./types";

export default function App() {
  const [step, setStep] = useState<"onboarding" | "dashboard">("onboarding");
  const [activeTab, setActiveTab] = useState<"insight" | "body" | "heal" | "mind">("insight");
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Birth date details cache for debug reference
  const [birthDate, setBirthDate] = useState<{
    year: string;
    month: string;
    day: string;
    hour: string;
    minute: string;
  } | null>(null);

  const handleAnalyze = async (dateInfo: {
    year: string;
    month: string;
    day: string;
    hour: string;
    minute: string;
  }) => {
    setIsLoading(true);
    setError(null);
    setBirthDate(dateInfo);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dateInfo),
      });

      if (!response.ok) {
        throw new Error("Myeongri server calculation request failed");
      }

      const data = (await response.json()) as AnalysisResult;
      setAnalysisResult(data);
      setStep("dashboard");
      setActiveTab("insight");
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "분석 가동 도중 잠시 지연이 발생했습니다. 다시 빌드해 주시기 바랍니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setStep("onboarding");
    setAnalysisResult(null);
    setBirthDate(null);
    setActiveTab("insight");
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#ffffff] font-sans antialiased overflow-x-hidden transition-all duration-500">
      
      {/* Dynamic atmospheric back blurs matching Sophisticated Dark gold/space guidelines */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[140px] mix-blend-screen"></div>
        <div className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-[#ffffff]/3 rounded-full blur-[160px] mix-blend-screen"></div>
      </div>

      {/* Top Header Appbar */}
      <header className="fixed top-0 left-0 w-full z-40 bg-[#121212]/70 backdrop-blur-xl border-b border-light-white border-white/10 shadow-sm px-6 py-4 flex justify-between items-center select-none">
        <div className="flex items-center gap-3">
          {step === "dashboard" ? (
            <button 
              onClick={handleReset}
              className="w-10 h-10 rounded-full bg-[#121212] border border-white/10 flex items-center justify-center hover:bg-[#1a1a1a] active:scale-90 transition-all focus:outline-none text-white"
              title="다시 분석하기"
            >
              <span className="material-symbols-outlined font-semibold text-lg leading-none">
                chevron_left
              </span>
            </button>
          ) : (
            <div className="w-10 h-10 rounded-full bg-[#1c1c1c] overflow-hidden flex items-center justify-center border border-white/10 shadow-inner">
              <span className="material-symbols-outlined text-[#D4AF37] text-xl font-bold">
                spa
              </span>
            </div>
          )}
          
          <div className="flex flex-col">
            <span className="font-serif text-xl italic font-bold tracking-[0.1em] text-white leading-none py-1">
              Bio-Myeongri
            </span>
          </div>
        </div>

        {/* Action icons bar */}
        <div className="flex items-center gap-4">
          <button 
            className="w-10 h-10 flex items-center justify-center rounded-full text-[#ffffff]/85 hover:bg-white/5 active:scale-95 transition-all focus:outline-none relative" 
            title="알림 내역"
          >
            <span className="material-symbols-outlined text-xl leading-none">
              notifications
            </span>
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#D4AF37] rounded-full"></span>
          </button>
        </div>
      </header>

      {/* Main Container Area */}
      <main className="relative z-10 pt-20 pb-28 max-w-container-max mx-auto px-6 min-h-screen">
        {error && (
          <div className="my-6 max-w-2xl mx-auto p-4 bg-red-950/40 text-red-300 rounded-xl border border-red-900/50 text-xs font-semibold flex items-center gap-2 font-sans select-none animate-bounce">
            <span className="material-symbols-outlined font-bold text-sm">error</span>
            <span>{error}</span>
          </div>
        )}

        {step === "onboarding" ? (
          <Onboarding onAnalyze={handleAnalyze} isLoading={isLoading} />
        ) : (
          analysisResult && (
            <div className="fade-in transition-opacity duration-700">
              {/* Profile details summary card heading dashboard */}
              <div className="mb-10 text-center md:text-left border-b border-white/10 pb-6">
                <span className="text-[10px] font-bold text-[#D4AF37] tracking-[0.2em] uppercase font-sans">
                  Analysis Prescription Report
                </span>
                <h2 className="font-serif text-3xl md:text-4xl text-white font-medium leading-tight mt-1.5">
                  AI 개인 맞춤 솔루션
                </h2>
                <p className="font-sans text-xs md:text-sm text-white/60 leading-relaxed mt-2">
                  생년월일시: <strong className="text-white font-medium">{birthDate?.year}년 {birthDate?.month}월 {birthDate?.day}일 ({birthDate?.hour}시 {birthDate?.minute}분)</strong> 정밀 사주 분석 결과에 기반한 조화 처방전입니다.
                </p>
              </div>

              {/* Render dynamic tab view content blocks */}
              {activeTab === "insight" && (
                <InsightDash data={analysisResult} onNavigateTab={(tab) => setActiveTab(tab as any)} />
              )}
              {activeTab === "body" && (
                <BodyMap data={analysisResult} onNavigateTab={(tab) => setActiveTab(tab as any)} />
              )}
              {activeTab === "heal" && (
                <HealSpace data={analysisResult} />
              )}
              {activeTab === "mind" && (
                <MindSpace data={analysisResult} />
              )}
            </div>
          )
        )}
      </main>

      {/* Navigation bottom shell bar */}
      {step === "dashboard" && (
        <nav className="fixed bottom-0 left-0 w-full z-40 flex justify-around items-center px-4 pb-6 pt-3 bg-[#111111]/80 backdrop-blur-2xl border-t border-white/10 shadow-[0_-4px_24px_rgba(0,0,0,0.4)] select-none">
          <button
            onClick={() => setActiveTab("insight")}
            className={`flex flex-col items-center justify-center gap-1 focus:outline-none transition-all ${
              activeTab === "insight" 
                ? "text-[#D4AF37] scale-105 font-extrabold" 
                : "text-white/50 hover:text-white/80"
            }`}
          >
            <span className={`material-symbols-outlined text-xl ${activeTab === "insight" ? "fill-1" : ""}`}>
              insights
            </span>
            <span className="font-sans text-[10px] tracking-wide font-bold">Insight</span>
          </button>

          <button
            onClick={() => setActiveTab("body")}
            className={`flex flex-col items-center justify-center gap-1 focus:outline-none transition-all ${
              activeTab === "body" 
                ? "text-[#D4AF37] scale-105 font-extrabold" 
                : "text-white/50 hover:text-white/80"
            }`}
          >
            <span className={`material-symbols-outlined text-xl ${activeTab === "body" ? "fill-1" : ""}`}>
              accessibility_new
            </span>
            <span className="font-sans text-[10px] tracking-wide font-bold">Body</span>
          </button>

          <button
            onClick={() => setActiveTab("heal")}
            className={`flex flex-col items-center justify-center gap-1 focus:outline-none transition-all ${
              activeTab === "heal" 
                ? "text-[#D4AF37] scale-105 font-extrabold" 
                : "text-white/50 hover:text-white/80"
            }`}
          >
            <span className={`material-symbols-outlined text-xl ${activeTab === "heal" ? "fill-1" : ""}`}>
              content_paste_search
            </span>
            <span className="font-sans text-[10px] tracking-wide font-bold">Heal</span>
          </button>

          <button
            onClick={() => setActiveTab("mind")}
            className={`flex flex-col items-center justify-center gap-1 focus:outline-none transition-all ${
              activeTab === "mind" 
                ? "text-[#D4AF37] scale-105 font-extrabold" 
                : "text-white/50 hover:text-white/80"
            }`}
          >
            <span className={`material-symbols-outlined text-xl ${activeTab === "mind" ? "fill-1" : ""}`}>
              self_improvement
            </span>
            <span className="font-sans text-[10px] tracking-wide font-bold">Mind</span>
          </button>
        </nav>
      )}
    </div>
  );
}
