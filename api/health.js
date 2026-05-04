// Vercel serverless function — GET /api/health

import { MODEL_NAME } from './_lib/systemInstruction.js'

export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Method not allowed' })
  }
  res.status(200).json({
    ok: true,
    model: MODEL_NAME,
    keySet: Boolean(process.env.GEMINI_API_KEY),
  })
}
