
import { GoogleGenAI, Type } from "@google/genai";
import { ParentData } from "../types.ts";

export async function getPersonalizedAdvice(data: ParentData) {
  const apiKey = process.env.API_KEY;
  
  // Check for API key existence safely (handle empty string from shim)
  if (!apiKey || apiKey.trim() === '') {
    console.warn("API_KEY is missing. Returning dynamic fallback advice.");
    return getFallbackAdvice(data);
  }

  const prompt = `
    Generate highly specific, empathetic return-to-work advice and nursery interview questions for a UK parent.
    CONTEXT: The year is 2026. The UK Government has fully rolled out 30 hours of free childcare for eligible working parents of children from 9 months old.
    
    STRICT REQUIREMENT: You MUST mention the child's name "${data.childName}" in the support message.
    
    DATA:
    - Child Name: ${data.childName}
    - Child Age (approx): ${Math.floor((new Date().getTime() - new Date(data.childDob).getTime()) / (1000 * 60 * 60 * 24 * 30.44))} months
    - Returning to work on: ${data.returnDate}
    - Weekly Hours: ${data.weeklyHours}
    - Working Status: ${data.workingParent ? 'Eligible for 30 hours' : 'Eligible for Universal 15 hours only (if 3+)'}
    
    The parent is feeling a mix of guilt and stress. 
    Provide:
    1. A short (max 3 sentences), highly empathetic supportive message that mentions ${data.childName} and their upcoming return date of ${data.returnDate}.
    2. 5 critical questions for a nursery about 30-hour funding and 'stretched' vs 'term-time' hours.
    3. 3 questions for their employer about the return-to-work transition.
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
    return getFallbackAdvice(data);
  }
}

function getFallbackAdvice(data: ParentData) {
  const name = data.childName || "your little one";
  const fundingText = data.workingParent 
    ? "the full 30-hour funding now available for children from 9 months" 
    : "the universal funding entitlements";

  return {
    supportMessage: `You're doing an amazing job preparing for your return to work. While it's natural to feel some transition stress, having a plan for ${name} and utilizing ${fundingText} will make a world of difference for your family's new chapter.`,
    nurseryQuestions: [
      `How do you apply the 30 hours funding for ${name}—can I 'stretch' it over the whole year (52 weeks)?`,
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
