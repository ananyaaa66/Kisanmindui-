import { useState } from 'react'
import { motion } from 'framer-motion'
import { Camera, ImageUp, FlaskConical, Droplets, Sprout, MessageCircle } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { t } from '../data/i18n.js'
import Screen from '../components/Screen.jsx'
import LeafSpinner from '../components/LeafSpinner.jsx'
import RadialGauge from '../components/RadialGauge.jsx'
import SpeakButton from '../components/SpeakButton.jsx'
import { diseaseResult as D } from '../data/mockData.js'

const sevColor = { green: 'text-cropbright border-crop/40 bg-crop/10', amber: 'text-lime border-lime/40 bg-lime/10', red: 'text-red-400 border-red-500/40 bg-red-500/10' }
const sevLabel = { green: { en: 'Mild', hi: 'हल्का' }, amber: { en: 'Moderate', hi: 'मध्यम' }, red: { en: 'Severe', hi: 'गंभीर' } }

export default function DiseaseScan() {
  const { lang } = useApp()
  const [state, setState] = useState('idle') // idle | scanning | result

  const run = () => { setState('scanning'); setTimeout(() => setState('result'), 2200) }

  return (
    <Screen title={t('scanTitle', lang)} subtitle="Agent 1">
      {state === 'idle' && (
        <div className="space-y-3">
          <div className="glass aspect-[4/3] grid place-items-center text-[var(--text-dim)]">
            <div className="text-center px-6">
              <Sprout className="mx-auto text-crop/50" size={40} />
              <p className="text-sm mt-2">{lang === 'hi' ? 'पत्ती की साफ फोटो लें' : 'Take a clear photo of the leaf'}</p>
            </div>
          </div>
          <button onClick={run} className="tap w-full rounded-2xl py-4 font-bold text-ink flex items-center justify-center gap-2"
            style={{ background: 'linear-gradient(90deg,#2ECC71,#3DDC84)' }}>
            <Camera size={20} /> {t('capture', lang)}
          </button>
          <button onClick={run} className="tap w-full glass !rounded-2xl py-3 font-semibold flex items-center justify-center gap-2 text-[var(--text-dim)]">
            <ImageUp size={18} /> {t('gallery', lang)}
          </button>
        </div>
      )}

      {state === 'scanning' && (
        <div className="glass aspect-[4/3] grid place-items-center relative overflow-hidden">
          <motion.span className="absolute left-0 w-full h-0.5 bg-lime glow-green"
            animate={{ top: ['10%', '90%', '10%'] }} transition={{ repeat: Infinity, duration: 2 }} />
          <div className="text-center">
            <LeafSpinner size={36} />
            <p className="text-sm text-cropbright mt-3 font-medium">{t('analyzing', lang)}</p>
          </div>
        </div>
      )}

      {state === 'result' && (
        <div className="space-y-3 animate-sprout">
          {/* Disease identification card */}
          <div className="glass active p-4">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs text-[var(--text-dim)]">{D.pathogen}</p>
                <h3 className="text-xl font-bold">{D.name[lang]}</h3>
              </div>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${sevColor[D.severity]}`}>
                {t('severity', lang)}: {sevLabel[D.severity][lang]}
              </span>
            </div>
            
            {/* Before-After comparison */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="aspect-square rounded-lg bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-xs text-green-300 mb-1">{lang === 'hi' ? 'सामान्य' : 'Healthy'}</p>
                  <p className="text-2xl">🍃</p>
                </div>
              </div>
              <div className="aspect-square rounded-lg bg-gradient-to-br from-amber-500/20 to-red-600/20 border border-amber-500/30 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-xs text-amber-300 mb-1">{lang === 'hi' ? 'संक्रमित' : 'Infected'}</p>
                  <p className="text-2xl">🦠</p>
                </div>
              </div>
            </div>

            {/* Confidence & Affected area */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <p className="text-xs text-[var(--text-dim)] mb-1">{lang === 'hi' ? 'विश्वास स्तर' : 'Confidence'}</p>
                <p className="text-lg font-bold text-lime">92%</p>
              </div>
              <div className="flex items-center gap-2">
                <RadialGauge value={D.affectedPct} severity={D.severity} />
              </div>
            </div>

            <p className="text-sm text-[var(--text-dim)]">{lang === 'hi' ? 'पत्ती पर मध्यम स्तर का संक्रमण देखा गया। तुरंत उपचार अनुशंसित है।' : 'Moderate infection detected on the leaf surface. Immediate treatment recommended.'}</p>
            <div className="mt-3"><SpeakButton text={`${D.name[lang]}, ${D.affectedPct}% ${t('affected', lang)}, confidence 92%`} /></div>
          </div>

          <div className="glass p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold">{t('treatment', lang)}</h4>
              <SpeakButton text={`${D.treatment.pesticide[lang]}, ${D.treatment.dosage[lang]}, ${D.treatment.method[lang]}`} label="" />
            </div>
            <Row icon={FlaskConical} label={D.treatment.pesticide[lang]} sub={lang==='hi'?'फफूंदनाशक':'Fungicide'} />
            <Row icon={Droplets} label={D.treatment.dosage[lang]} sub={t('dosage', lang)} />
            <Row icon={Sprout} label={D.treatment.method[lang]} sub={t('method', lang)} />
          </div>

          <button className="tap w-full glass !rounded-2xl py-3 font-semibold flex items-center justify-center gap-2 text-cropbright">
            <MessageCircle size={18} /> {t('askFollowup', lang)}
          </button>
          <button onClick={() => setState('idle')} className="tap w-full text-sm text-[var(--text-dim)] py-2">↺ {lang==='hi'?'फिर से जाँचें':'Scan again'}</button>
        </div>
      )}
    </Screen>
  )
}

function Row({ icon: Icon, label, sub }) {
  return (
    <div className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
      <span className="grid place-items-center w-9 h-9 rounded-lg bg-crop/10 text-cropbright shrink-0"><Icon size={18} /></span>
      <div>
        <p className="text-xs text-[var(--text-dim)]">{sub}</p>
        <p className="text-sm font-medium">{label}</p>
      </div>
    </div>
  )
}
