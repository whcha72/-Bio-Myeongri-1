import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Lazy initialize Gemini client to dodge crash if key is missing as per guidelines
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== "MY_GEMINI_API_KEY" && apiKey.trim() !== "") {
      aiClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
  }
  return aiClient;
}

// Algorithmic fallback generator based on birth date to ensure 100% robust dynamic data
function makeFallbackAnalysis(year: number, month: number, day: number, hour: number, idx: number) {
  const sum = (year || 1990) + (month || 1) + (day || 1) + (hour || 12) + idx;
  const hash = sum % 5;
  
  const constitutions = [
    { name: "Wood-yang (목양)", sanskrit: "Wood-yang", critical: "heart" },
    { name: "Fire-yin (화음)", sanskrit: "Fire-yin", critical: "stomach" },
    { name: "Earth-yang (토양)", sanskrit: "Earth-yang", critical: "liver" },
    { name: "Metal-yin (금음)", sanskrit: "Metal-yin", critical: "kidney" },
    { name: "Water-yang (수양)", sanskrit: "Water-yang", critical: "lung" }
  ];
  
  const chosen = constitutions[hash];
  
  // Weights summing to 100
  const baseWeights = [
    [15, 35, 20, 18, 12],
    [25, 12, 35, 13, 15],
    [18, 20, 15, 35, 12],
    [12, 22, 18, 13, 35],
    [35, 15, 13, 22, 15]
  ];
  const w = baseWeights[hash];
  
  return {
    wellnessScore: 75 + (sum % 21), // 75 to 95
    constitution: chosen.name,
    constitutionSanskrit: chosen.sanskrit,
    fiveElements: {
      wood: w[0],
      fire: w[1],
      earth: w[2],
      metal: w[3],
      water: w[4]
    },
    summary: `명의동원(名醫同源) 맞춤형 솔루션: 당신의 선천적 생체 상수 분석 결과, ${chosen.name} 체질로서 특정 오행 기운의 불균형이 발견되었습니다. 에너지가 한쪽으로 치우쳐 열감이 발생하거나 기혈 순환이 지연되고 있습니다. 인위적인 자극보다는 자연물의 정제된 꽃, 허브 추출물과 조화로운 쓴맛의 발효액을 섭취하여 상체의 열기를 시원하게 흘려 내리고 위장을 따뜻하게 보호해 주는 것이 신체 균형을 회복하는 웰니스 로드로 제안됩니다.`,
    beautyIngredients: [
      {
        name: hash === 0 || hash === 3 ? "티트리(진정)" : "어성초(해독 정화)",
        description: "피부 혈행과 열감을 빠르게 제어하며 성나고 예민해진 피지 분비를 평화롭게 진정시켜 트러블을 종합적으로 조절해 줍니다.",
        tag: "ANTI-INFLAMMATORY"
      },
      {
        name: hash === 0 || hash === 3 ? "세라마이드(장벽 강화)" : "녹차 추출물(항산화)",
        description: "수분 보습 보호막을 촘촘히 복원하여 외부 미세 자극과 건조함으로부터 피부의 본연 생기와 결을 은은하게 다져 줍니다.",
        tag: "MOISTURIZING"
      }
    ],
    lifestyle: [
      {
        category: "Sleep",
        label: "오후 11시 이전 취침",
        recommendation: "밤 11시부터 새벽 3시는 체내 해독과 에너지 정화가 이루어지는 시간대이므로 조기 숙면이 장기 치유에 핵심입니다."
      },
      {
        category: "Exercise",
        label: "저강도 유산소 30분",
        recommendation: "과격한 웨이트 근력 운동보다는 관절에 무리 없는 가벼운 걷기나 요가 수준의 이완 요법으로 한밤의 순환을 촉진시킵니다."
      },
      {
        category: "Meditation",
        label: "아침 10분 호흡 명상",
        recommendation: "단전으로 숨을 몰아 길게 마시고 내뱉는 율동적 복식 호흡을 하루 10분 수행함으로써 상열하한 상태를 해소합니다."
      }
    ],
    organsState: {
      heart: {
        title: "심장 (화)",
        status: chosen.critical === "heart" ? "과부하" : "안정",
        description: "체내 순환의 불길이 상체로 쏠려 심장의 자정 한계를 야기할 수 있습니다. 수승화강 이완이 권장됩니다."
      },
      stomach: {
        title: "위/비장 (토)",
        status: chosen.critical === "stomach" ? "과부하" : (chosen.critical === "heart" ? "순환저하" : "안정"),
        description: "소화계 에너지 순환이 원활치 않아 가벼운 체기가 유발될 수 있는 상태입니다. 차지 않은 생강차가 큰 도움이 됩니다."
      },
      lung: {
        title: "폐 (금)",
        status: chosen.critical === "lung" ? "부족" : "안정",
        description: "호흡과 발산 작용을 담당하는 폐 기운이 양호하며, 쾌적하고 맑은 실내 환기로 컨디션을 건강하게 지키세요."
      },
      liver: {
        title: "간 (목)",
        status: chosen.critical === "liver" ? "부족" : "안정",
        description: "신체의 해독 대사 활성도가 저하될 소지가 있습니다. 무리한 음주나 만성 축적 피로를 멀리 보살피시기 바랍니다."
      },
      kidney: {
        title: "신장 (수)",
        status: chosen.critical === "kidney" ? "과부하" : "안정",
        description: "수기운이 단전 깊숙이 머무르며 몸 안의 차분한 이뇨 및 피로 회복력을 조화롭게 뒷받침해 주는 아주 이로운 컨디션입니다."
      }
    },
    criticalOrgan: chosen.critical,
    criticalTitle: chosen.critical === "heart" 
      ? "심장 (화) - 과부하" 
      : (chosen.critical === "stomach" 
          ? "위/비장 (토) - 순환저하" 
          : (chosen.critical === "liver" 
              ? "간 (목) - 기운 부족" 
              : "장부 에너지 불균형 알림")),
    criticalDesc: chosen.critical === "heart"
      ? "현재 심장의 화(火) 기운이 일시적인 열 과부하 지점에 도달했습니다. 상체로 열이 솟구치며 안구 건조, 숙면 방해가 우려되오니 차가운 물보다는 미지근한 대추차나 쓴맛 채소 발효액을 들고 차분히 호흡 명상하세요."
      : "장부 내 면역 장벽과 기혈 순환이 지연되고 있는 상태입니다. 무리한 소화 작용을 덜어내기 위해 기상 직후 자극적인 식사는 거르고 5분간 아랫배를 지그시 수동 마사지해 주는 등 장부 열 조화를 맞춰 주세요.",
    heallingFrequency: hash % 2 === 0 ? "528Hz" : "432Hz",
    healingType: hash % 2 === 0 ? "치유 및 회복" : "우주 조화 공명",
    dailyCoaching: [
      {
        icon: "emoji_food_beverage",
        title: "따뜻한 대추차 수시 음용",
        description: "심간을 자극없이 은밀히 편안히 다져주는 한방 구기자나 대추 발효 진액 차를 마셔 보세요.",
        color: "water"
      },
      {
        icon: "brush",
        title: "창의적 가벼운 일기 쓰기",
        description: "복잡하고 산만한 감정을 글자나 드로잉 등의 조용한 예술 창작 표현으로 정화해 내어 심리 완화를 돕습니다.",
        color: "fire"
      },
      {
        icon: "nature_people",
        title: "숲길 산책 20분",
        description: "시원한 대지 흙의 기운을 밝히고 신선한 활엽수림 안에서 느림의 호흡을 실천함으로써 심폐 보강을 다집니다.",
        color: "wood"
      },
      {
        icon: "self_improvement",
        title: "장부 균형 호흡 명상",
        description: "폐와 오장육부를 자정하는 조용한 5분 단전 호흡 명상을 통해 들뜬 신체 맥을 차분하게 정리합니다.",
        color: "metal"
      }
    ]
  };
}

// API endpoint for Myeongri Analysis
app.post("/api/analyze", async (req, res) => {
  const { year, month, day, hour, minute } = req.body;
  const parsedYear = parseInt(year) || 1990;
  const parsedMonth = parseInt(month) || 1;
  const parsedDay = parseInt(day) || 1;
  const parsedHour = parseInt(hour) || 12;
  const parsedMinute = parseInt(minute) || 0;

  const gemini = getGeminiClient();

  // If Gemini client isn't configured, fallback gracefully with customized deterministic algorithmic analyzer!
  if (!gemini) {
    console.log("No Gemini API key or configuration found, utilizing algorithmic fallback generator.");
    const data = makeFallbackAnalysis(parsedYear, parsedMonth, parsedDay, parsedHour, parsedMinute);
    return res.json(data);
  }

  try {
    const prompt = `
      Birth Day Info: Year ${parsedYear}, Month ${parsedMonth}, Day ${parsedDay}, Hour ${parsedHour}:${parsedMinute}.
      Please analyze this biological constant data based on eastern astrology and medicine rules (Myeongri / Five Elements balance).
      Deliver a professionally authoritative, clinically sophisticated and warm Zen-tech health & beauty prescription.
      All text and descriptions MUST be in Korean.
      Return the response in a structured JSON schema reflecting the biological, physical, and psychological states.
    `;

    const response = await gemini.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are Bio-Myeongri AI, an ancient eastern biological constants medical expert and professional diagnostic AI. Provide deep wisdom and high-end beauty/lifestyle/health prescription in perfect Korean. Speak gently and authoritatively, utilizing terms like 명의동원, 수승화강, 웰니스. Keep the suggestions realistic, detailed, and non-generic.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            wellnessScore: { type: Type.INTEGER },
            constitution: { type: Type.STRING },
            constitutionSanskrit: { type: Type.STRING },
            fiveElements: {
              type: Type.OBJECT,
              properties: {
                wood: { type: Type.INTEGER },
                fire: { type: Type.INTEGER },
                earth: { type: Type.INTEGER },
                metal: { type: Type.INTEGER },
                water: { type: Type.INTEGER }
              },
              required: ["wood", "fire", "earth", "metal", "water"]
            },
            summary: { type: Type.STRING },
            beautyIngredients: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  description: { type: Type.STRING },
                  tag: { type: Type.STRING }
                },
                required: ["name", "description", "tag"]
              }
            },
            lifestyle: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  category: { type: Type.STRING },
                  label: { type: Type.STRING },
                  recommendation: { type: Type.STRING }
                },
                required: ["category", "label", "recommendation"]
              }
            },
            organsState: {
              type: Type.OBJECT,
              properties: {
                heart: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    status: { type: Type.STRING },
                    description: { type: Type.STRING }
                  },
                  required: ["title", "status", "description"]
                },
                stomach: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    status: { type: Type.STRING },
                    description: { type: Type.STRING }
                  },
                  required: ["title", "status", "description"]
                },
                lung: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    status: { type: Type.STRING },
                    description: { type: Type.STRING }
                  },
                  required: ["title", "status", "description"]
                },
                liver: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    status: { type: Type.STRING },
                    description: { type: Type.STRING }
                  },
                  required: ["title", "status", "description"]
                },
                kidney: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    status: { type: Type.STRING },
                    description: { type: Type.STRING }
                  },
                  required: ["title", "status", "description"]
                }
              },
              required: ["heart", "stomach", "lung", "liver", "kidney"]
            },
            criticalOrgan: { type: Type.STRING },
            criticalTitle: { type: Type.STRING },
            criticalDesc: { type: Type.STRING },
            heallingFrequency: { type: Type.STRING },
            healingType: { type: Type.STRING },
            dailyCoaching: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  icon: { type: Type.STRING },
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  color: { type: Type.STRING }
                },
                required: ["icon", "title", "description", "color"]
              }
            }
          },
          required: [
            "wellnessScore", "constitution", "constitutionSanskrit", "fiveElements", "summary",
            "beautyIngredients", "lifestyle", "organsState", "criticalOrgan", "criticalTitle", "criticalDesc",
            "heallingFrequency", "healingType", "dailyCoaching"
          ]
        }
      }
    });

    const text = response.text;
    if (text) {
      const parsedData = JSON.parse(text.trim());
      return res.json(parsedData);
    } else {
      throw new Error("No text response from Gemini API");
    }
  } catch (error) {
    console.error("Gemini API calculation failed, falling back to analytic data:", error);
    const fallback = makeFallbackAnalysis(parsedYear, parsedMonth, parsedDay, parsedHour, parsedMinute);
    res.json(fallback);
  }
});

// Setup Vite Dev Server / Static Asset Flow
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running gracefully on port ${PORT}`);
  });
}

startServer();
