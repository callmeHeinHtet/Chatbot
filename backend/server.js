/**
 * RSU Library AI — backend proxy
 *
 * Holds the Gemini API key server-side so it's never exposed to the browser.
 * Also serves the static frontend so dev + prod both run on a single port.
 *
 * Endpoints:
 *   POST /api/chat   { history: [{role, parts:[{text}]}], message: string }
 *                    -> { reply: string }
 *   GET  /api/health -> { ok: true }
 *
 * Env vars (set in backend/.env):
 *   GEMINI_API_KEY  – Google AI Studio key
 *   PORT            – default 8765
 */

import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { GoogleGenerativeAI } from '@google/generative-ai'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PROJECT_ROOT = path.resolve(__dirname, '..')

const PORT = process.env.PORT || 8765
const API_KEY = process.env.GEMINI_API_KEY

if (!API_KEY) {
  console.error('FATAL: GEMINI_API_KEY is not set. Add it to backend/.env')
  process.exit(1)
}

const SYSTEM_INSTRUCTION = `You are the AI librarian for Rangsit University Library in Pathumthani, Thailand.

VOICE
- Direct, concise, helpful. Not chatty.
- Don't greet the user on every reply. No "Hi there!" or "Welcome to..." after the first message.
- Don't reintroduce yourself once the conversation has started.
- Keep replies under 80 words unless the question genuinely needs more detail.
- No markdown, asterisks, or hashtags. Plain prose only.
- Use bullet points only when listing 3+ discrete items.
- Never claim to be human. If asked, you're an AI assistant.

SCOPE
- Answer library questions only: books, hours, services, databases, study rooms, printing, research help, citations.
- For anything else (math homework, general chat, code, weather), politely redirect:
  "I can only help with library questions. Anything you'd like to find at the library?"
- The user can ask in English or Thai. Reply in whichever language they used.

FACTS (these are correct, use them as-is)
- Hours: Mon-Fri 8:00-20:00, Sat-Sun 9:00-17:00
- Location: Building 7, Muang-Ake Campus, RSU
- Phone: 02-997-2222 ext. 3461
- Email: library@rsu.ac.th
- Borrowing: bring books to the circulation desk with your student ID. Standard loan is 7 days for students, renewable online up to 3 times.
- Study rooms: bookable online or at the desk. About 20 group rooms, 100+ individual carrels.
- Online databases: Access Pharmacy (health), BioMed Central (medical, open access), Business Source Ultimate (business), ScienceDirect (sciences), Scopus (citation index), IEEE Xplore (engineering), EBSCO Discovery (all-in-one search), Turnitin (plagiarism).
- Citation managers (free for students): Zotero, Mendeley.
- Off-campus database access: contact the library for credentials.

If you don't know something specific (a particular book's location, a faculty-specific policy, etc.), say so and point them to the circulation desk or the email/phone above.`

// ------------------------------------------------------------------
// Simple in-memory rate limit — per-IP, sliding window.
// Survives only as long as the process; for production behind a load
// balancer use Redis or the platform's built-in rate limiter.
// ------------------------------------------------------------------
const RATE_LIMIT_WINDOW_MS = 60_000 // 1 minute
const RATE_LIMIT_MAX = 30           // 30 requests per minute per IP
const ipBuckets = new Map()

function rateLimit(req, res, next) {
  const ip = req.ip || req.headers['x-forwarded-for'] || 'unknown'
  const now = Date.now()
  const bucket = ipBuckets.get(ip) ?? []
  const fresh = bucket.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS)
  if (fresh.length >= RATE_LIMIT_MAX) {
    return res.status(429).json({
      error: 'Too many requests. Please slow down.',
      retryAfterMs: RATE_LIMIT_WINDOW_MS - (now - fresh[0]),
    })
  }
  fresh.push(now)
  ipBuckets.set(ip, fresh)
  next()
}

// Periodic cleanup of stale IP buckets
setInterval(() => {
  const cutoff = Date.now() - RATE_LIMIT_WINDOW_MS
  for (const [ip, bucket] of ipBuckets.entries()) {
    const fresh = bucket.filter((ts) => ts > cutoff)
    if (fresh.length === 0) ipBuckets.delete(ip)
    else ipBuckets.set(ip, fresh)
  }
}, RATE_LIMIT_WINDOW_MS)

// ------------------------------------------------------------------
// Gemini setup
// ------------------------------------------------------------------
const genAI = new GoogleGenerativeAI(API_KEY)
const model = genAI.getGenerativeModel({
  model: 'gemini-2.5-flash-lite',
  systemInstruction: SYSTEM_INSTRUCTION,
})

// ------------------------------------------------------------------
// Express app
// ------------------------------------------------------------------
const app = express()
app.set('trust proxy', 1)
app.use(cors())
app.use(express.json({ limit: '32kb' }))

// Health check
app.get('/api/health', (req, res) => {
  res.json({ ok: true, model: 'gemini-2.5-flash-lite' })
})

// Chat endpoint
app.post('/api/chat', rateLimit, async (req, res) => {
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
    // Cap history to last 20 turns to bound token usage
    const trimmedHistory = history.slice(-20)

    const chat = model.startChat({
      history: trimmedHistory,
      generationConfig: {
        temperature: 0.6,
        maxOutputTokens: 512,
      },
    })

    const result = await chat.sendMessage(message)
    const reply = result.response.text()

    res.json({ reply })
  } catch (err) {
    console.error('Gemini error:', err)
    const status = err?.status || (err?.message?.includes('429') ? 429 : 500)
    res.status(status).json({
      error: 'AI service error',
      detail: err?.message?.slice(0, 200) ?? 'unknown',
    })
  }
})

// Static frontend — serves index.html, css/, js/, assets/, etc.
app.use(express.static(PROJECT_ROOT, { extensions: ['html'] }))

app.listen(PORT, () => {
  console.log(`RSU Library AI listening on http://localhost:${PORT}`)
  console.log(`  Static root: ${PROJECT_ROOT}`)
  console.log(`  Chat endpoint: POST /api/chat`)
})
