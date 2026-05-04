// Vercel serverless function — POST /api/chat
// Replaces the Express endpoint in backend/server.js when deployed to Vercel.

import { GoogleGenerativeAI } from '@google/generative-ai'
import { SYSTEM_INSTRUCTION, MODEL_NAME } from './_lib/systemInstruction.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return res.status(500).json({
      error: 'GEMINI_API_KEY is not set on the server',
    })
  }

  try {
    const { history = [], message } = req.body ?? {}

    if (typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'message is required' })
    }
    if (message.length > 2000) {
      return res.status(400).json({ error: 'message too long (max 2000 chars)' })
    }
    if (!Array.isArray(history)) {
      return res.status(400).json({ error: 'history must be an array' })
    }

    const trimmedHistory = history.slice(-20)

    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({
      model: MODEL_NAME,
      systemInstruction: SYSTEM_INSTRUCTION,
    })

    const chat = model.startChat({
      history: trimmedHistory,
      generationConfig: { temperature: 0.6, maxOutputTokens: 512 },
    })

    const result = await chat.sendMessage(message)
    const reply = result.response.text()

    return res.status(200).json({ reply })
  } catch (err) {
    console.error('Gemini error:', err)
    const status = err?.status || (err?.message?.includes('429') ? 429 : 500)
    return res.status(status).json({
      error: 'AI service error',
      detail: err?.message?.slice(0, 200) ?? 'unknown',
    })
  }
}
