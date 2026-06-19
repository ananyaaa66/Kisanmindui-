import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { PhoneOff, Captions, Mic } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../context/AppContext.jsx'
import { t } from '../data/i18n.js'

// Simple intent routing → which agent screen to surface behind the overlay
const ROUTES = [
  { kw: ['disease', 'leaf', 'रोग', 'पत्ती', 'बीमारी'], path: '/scan',
    reply: { en: 'Opening the disease scanner. Show me the affected leaf.', hi: 'रोग जाँच खोल रहा हूँ। प्रभावित पत्ती दिखाएँ।' } },
  { kw: ['price', 'mandi', 'sell', 'भाव', 'मंडी', 'बेच'], path: '/prices',
    reply: { en: 'Here are the latest mandi prices for your crop.', hi: 'आपकी फसल के ताज़ा मंडी भाव यहाँ हैं।' } },
  { kw: ['scheme', 'yojana', 'loan', 'योजना', 'ऋण', 'सरकार'], path: '/schemes',
    reply: { en: 'Checking government schemes you may be eligible for.', hi: 'आपकी पात्र सरकारी योजनाएँ देख रहा हूँ।' } },
  { kw: ['weather', 'rain', 'मौसम', 'बारिश', 'पानी'], path: '/weather',
    reply: { en: 'Showing the 5-day weather and field actions.', hi: '5-दिन का मौसम और कार्य दिखा रहा हूँ।' } },
]

const SAMPLE = {
  en: 'My tomato leaves have brown spots, what should I do?',
  hi: 'मेरे टमाटर की पत्तियों पर भूरे धब्बे हैं, क्या करूँ?',
}

export default function VoiceOverlay() {
  const { voiceOpen, setVoiceOpen, lang, speak } = useApp()
  const navigate = useNavigate()
  const [phase, setPhase] = useState('listening') // listening | thinking | replying
  const [transcript, setTranscript] = useState('')
  const [showCaption, setShowCaption] = useState(true)
  const [reply, setReply] = useState('')
  const timers = useRef([])

  useEffect(() => {
    if (!voiceOpen) return
    setPhase('listening'); setTranscript(''); setReply('')
    const full = SAMPLE[lang]
    // simulate live STT transcription (Bhashini/Sarvam stub)
    let i = 0
    const typer = setInterval(() => {
      i += 2
      setTranscript(full.slice(0, i))
      if (i >= full.length) {
        clearInterval(typer)
        timers.current.push(setTimeout(() => setPhase('thinking'), 400))
        timers.current.push(setTimeout(() => {
          const match = ROUTES.find((r) => r.kw.some((k) => full.toLowerCase().includes(k))) || ROUTES[0]
          navigate(match.path)
          const r = match.reply[lang]
          setReply(r); setPhase('replying'); speak(r) // barge-in supported via speechSynthesis.cancel on next speak
        }, 1500))
      }
    }, 45)
    timers.current.push(typer)
    return () => { timers.current.forEach(clearTimeout); clearInterval(typer); window.speechSynthesis?.cancel() }
  }, [voiceOpen, lang]) // eslint-disable-line

  const end = () => { window.speechSynthesis?.cancel(); setVoiceOpen(false) }

  return (
    <AnimatePresence>
      {voiceOpen && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-between py-12 px-6"
          style={{ background: 'radial-gradient(circle at 50% 35%, rgba(46,204,113,0.18), rgba(10,15,10,0.96) 60%)', backdropFilter: 'blur(8px)' }}
        >
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-cropbright/80">{t('appName', lang)}</p>
            <p className="text-[var(--text-dim)] text-sm mt-1">
              {phase === 'replying' ? t('appName', lang) : t('listening', lang)} · {lang === 'hi' ? 'हिंदी' : 'English'}
            </p>
          </div>

          {/* Pulsing orb + waveform */}
          <div className="relative grid place-items-center">
            <span className="absolute w-64 h-64 rounded-full bg-crop/10 animate-pulsering" />
            <span className="absolute w-64 h-64 rounded-full bg-crop/10 animate-pulsering" style={{ animationDelay: '1s' }} />
            <motion.div
              animate={{ scale: phase === 'listening' ? [1, 1.08, 1] : 1 }}
              transition={{ repeat: Infinity, duration: 1.6 }}
              className="relative w-40 h-40 rounded-full grid place-items-center glow-green"
              style={{ background: 'radial-gradient(circle at 50% 40%, #3DDC84, #1d7a48)' }}
            >
              <Mic size={48} className="text-ink" />
            </motion.div>
            {phase === 'listening' && (
              <div className="absolute -bottom-10 flex items-end gap-1 h-8">
                {Array.from({ length: 9 }).map((_, i) => (
                  <motion.span key={i} className="w-1.5 rounded-full bg-lime"
                    animate={{ height: [6, 26, 10, 30, 8] }}
                    transition={{ repeat: Infinity, duration: 1.1, delay: i * 0.08 }} />
                ))}
              </div>
            )}
          </div>

          <div className="w-full max-w-sm">
            {phase === 'replying' && reply && (
              <p className="text-center text-cropbright mb-3 animate-sprout">{reply}</p>
            )}
            {showCaption && (
              <div className="glass p-3 text-center min-h-[52px] flex items-center justify-center">
                <p className="text-sm">{transcript || t('speakNow', lang) + (lang === 'hi' ? ' हिंदी' : ' English')}<span className="animate-pulse">|</span></p>
              </div>
            )}
            <div className="flex items-center justify-center gap-3 mt-5">
              <button onClick={() => setShowCaption((s) => !s)}
                className="tap glass !rounded-full px-4 flex items-center gap-2 text-sm">
                <Captions size={18} /> {t('transcript', lang)}
              </button>
              <button onClick={end}
                className="tap rounded-full px-6 py-3 flex items-center gap-2 font-semibold border border-crop text-cropbright hover:bg-crop hover:text-ink transition">
                <PhoneOff size={18} /> {t('endCall', lang)}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
