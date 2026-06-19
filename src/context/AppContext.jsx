import { createContext, useContext, useState, useCallback } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [lang, setLang] = useState('en') // 'en' | 'hi' only
  const [voiceOpen, setVoiceOpen] = useState(false)
  const [reportOpen, setReportOpen] = useState(false)

  const toggleLang = useCallback(() => setLang((l) => (l === 'en' ? 'hi' : 'en')), [])

  // Web Speech API TTS stub — EN + HI only (placeholder for Bhashini/Sarvam)
  const speak = useCallback((text) => {
    try {
      if (!('speechSynthesis' in window)) return
      window.speechSynthesis.cancel()
      const u = new SpeechSynthesisUtterance(text)
      u.lang = lang === 'hi' ? 'hi-IN' : 'en-IN'
      u.rate = 0.95
      window.speechSynthesis.speak(u)
    } catch (e) { /* TTS unavailable in this environment */ }
  }, [lang])

  const value = {
    lang, setLang, toggleLang,
    voiceOpen, setVoiceOpen,
    reportOpen, setReportOpen,
    speak,
  }
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useApp = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
