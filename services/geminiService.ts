
import { GoogleGenAI, Type } from "@google/genai";
import { ParentData } from "../types.ts";

export async function getPersonalizedAdvice(data: ParentData) {
  // Check for API key existence safely
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    console.warn("API_KEY is missing. Returning fallback advice.");
    return getFallbackAdvice();
  }

  const prompt = `
    Generate empathetic return-to-work advice and nursery interview questions for a UK parent.
    CONTEXT: The year is 2026. The UK Government has fully rolled out 30 hours of free childcare for eligible working parents of children from 9 months old up to school age.
    
    Child Name: ${data.childName}
    Child Age (approx): ${Math.floor((new Date().getTime() - new Date(data.childDob).getTime()) / (1000 * 60 * 60 * 24 * 30.44))} months
    Returning to work on: ${data.returnDate}
    Weekly Hours: ${data.weeklyHours}
    Working Status: ${data.workingParent ? 'Eligible for 30 hours' : 'Eligible for Universal 15 hours only (if 3+)'}
    
    The parent is feeling a mix of guilt and stress. 
    Provide:
    1. A short, highly empathetic supportive message.
    2. 5 critical questions to ask a potential nursery specifically about the 30-hour funding, 'stretched' vs 'term-time' hours, and flexibility.
    3. 3 questions to ask their employer about the return-to-work transition and flexible working rights.
  `;

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            supportMessage: { type: Type.STRING },
            nurseryQuestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            employerQuestions: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
            }
          },
          required: ["supportMessage", "nurseryQuestions", "employerQuestions"]
        }
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini Error:", error);
    return getFallbackAdvice();
  }
}

function getFallbackAdvice() {
  return {
    supportMessage: "You're doing an amazing job. Returning to work is a big transition, but with the 30-hour funding now fully available for younger children, the financial path is clearer. Your career and your family can both thrive.",
    nurseryQuestions: [
      "How do you apply the 30 hours funding—can I 'stretch' it over the whole year (52 weeks)?",
      "What are the daily 'consumables' or service charges for funded sessions?",
      "How many spaces do you have allocated for the 9-month-old 30-hour entitlement?",
      "What is your policy on changing days if my work requirements shift?",
      "Do you assist with the HMRC re-confirmation codes every 3 months?"
    ],
    employerQuestions: [
      "Is there a phased return-to-work option available to help with nursery settling-in?",
      "What is the current policy for emergency family leave for minor illnesses?",
      "How will my performance targets be adjusted during the transition period?"
    ]
  };
}
