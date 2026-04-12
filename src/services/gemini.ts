import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const generateAppCode = async (prompt: string, agentSystemPrompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: prompt,
      config: {
        systemInstruction: agentSystemPrompt + "\n\nYou are a master React developer. When asked to build an app, provide the complete source code for a single-file React component (App.js) using Tailwind CSS. \n\nIMPORTANT:\n1. Use Tailwind CSS utility classes for all styling.\n2. Use 'lucide-react' for icons (import from 'lucide-react').\n3. Use 'framer-motion' for animations (import from 'framer-motion').\n4. Provide the code in a single file.\n5. Wrap the code in triple backticks with 'jsx' or 'tsx' language identifier.\n6. Ensure the component is exported as 'default export function App()'.\n7. Do not include any other text outside the code block."
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

export const generateVideo = async (prompt: string, options?: { style?: string }, onProgress?: (status: string) => void) => {
  try {
    // Check if API key is selected
    if (!(window as any).aistudio?.hasSelectedApiKey()) {
      await (window as any).aistudio?.openSelectKey();
    }

    // Re-initialize to use the selected key
    const videoAi = new GoogleGenAI({ apiKey: process.env.API_KEY || process.env.GEMINI_API_KEY || "" });

    onProgress?.("Initializing neural video synthesis...");
    
    const finalPrompt = options?.style && options.style !== 'none' 
      ? `${prompt}, in ${options.style} style` 
      : prompt;

    let operation = await videoAi.models.generateVideos({
      model: 'veo-3.1-lite-generate-preview',
      prompt: finalPrompt,
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: '16:9'
      }
    });

    onProgress?.("Synthesizing temporal vectors...");
    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 5000));
      operation = await videoAi.operations.getVideosOperation({ operation: operation });
      onProgress?.("Processing neural frames...");
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!downloadLink) throw new Error("No video URI returned from operation");

    onProgress?.("Finalizing video stream...");
    const response = await fetch(downloadLink, {
      method: 'GET',
      headers: {
        'x-goog-api-key': process.env.API_KEY || process.env.GEMINI_API_KEY || "",
      },
    });

    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("Video Generation Error:", error);
    throw error;
  }
};

export const generateImage = async (prompt: string, options?: { aspectRatio?: string, negativePrompt?: string }) => {
  try {
    const finalPrompt = options?.negativePrompt ? `${prompt} [NEGATIVE PROMPT: ${options.negativePrompt}]` : prompt;
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: finalPrompt,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: options?.aspectRatio || "16:9",
          imageSize: "1K",
        },
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64EncodeString = part.inlineData.data;
        return `data:image/png;base64,${base64EncodeString}`;
      }
    }
    throw new Error("No image data returned from model");
  } catch (error) {
    console.error("Image Generation Error:", error);
    throw error;
  }
};

export const chatWithAgent = async (prompt: string, systemPrompt: string, history: { role: 'user' | 'agent', text: string }[]) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-preview",
      contents: [
        ...history.map(h => ({
          role: h.role === 'user' ? 'user' : 'model',
          parts: [{ text: h.text }]
        })),
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: systemPrompt
      }
    });

    return response.text || "Neural link stable, but no data received.";
  } catch (error) {
    console.error("Agent Chat Error:", error);
    throw error;
  }
};
