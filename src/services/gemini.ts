import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const generateAppCode = async (prompt: string, agentSystemPrompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: prompt,
      config: {
        systemInstruction: agentSystemPrompt + "\n\nYou are a master React developer. When asked to build an app, provide the complete source code for a single-file React component (App.tsx) using Tailwind CSS. Wrap the code in triple backticks with 'tsx' language identifier. Do not include any other text outside the code block unless necessary for explanation."
      }
    });

    const text = response.text || "";
    
    // Extract code block
    const codeMatch = text.match(/```tsx\n([\s\S]*?)```/) || text.match(/```jsx\n([\s\S]*?)```/) || text.match(/```javascript\n([\s\S]*?)```/);
    return codeMatch ? codeMatch[1] : text;
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw error;
  }
};
