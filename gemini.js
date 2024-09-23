import { GoogleGenerativeAI } from '@google/generative-ai'
import { APIKEY } from './config'

const genAI = new GoogleGenerativeAI(APIKEY)

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
})

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: 'text/plain',
}

export async function run(prompt) {
  const chatSession = model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [],
  })

  const result = await chatSession.sendMessage(prompt)
  return result.response.text()
}
