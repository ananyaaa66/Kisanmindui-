import { motion, AnimatePresence } from 'framer-motion'
import { X, FileDown, Volume2, Share2 } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { t, STR } from '../data/i18n.js'
import GrowthLine from './GrowthLine.jsx'
import { farmer, diseaseResult, todayAdvisory } from '../data/mockData.js'

const Section = ({ title, en, hi }) => (
  <div className="mb-5">
    <h3 className="text-cropbright font-semibold mb-1">{title}</h3>
    <GrowthLine className="mb-2 opacity-70" />
    <div className="grid grid-cols-2 gap-3 text-sm">
      <p className="text-[var(--text-dim)]">{en}</p>
      <p>{hi}</p>
    </div>
  </div>
)

export default function ReportModal() {
  const { reportOpen, setReportOpen, lang, speak } = useApp()
  const readAll = () =>
    speak(lang === 'hi'
      ? `${todayAdvisory.title.hi}. ${diseaseResult.name.hi}, ${diseaseResult.treatment.pesticide.hi}.`
      : `${todayAdvisory.title.en}. ${diseaseResult.name.en}, ${diseaseResult.treatment.pesticide.en}.`)

  return (
    <AnimatePresence>
      {reportOpen && (
        <motion.div className="fixed inset-0 z-50 flex items-end justify-center"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={() => setReportOpen(false)}
          style={{ background: 'rgba(0,0,0,0.6)' }}>
          <motion.div
            initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[480px] bg-panel rounded-t-3xl border-t border-crop/30 max-h-[88vh] flex flex-col">
            <div className="flex items-center justify-between p-4 pb-2">
              <h2 className="font-bold text-lg">{t('report', lang)}</h2>
              <button onClick={() => setReportOpen(false)} className="tap !min-h-0 p-2 text-[var(--text-dim)]"><X size={20} /></button>
            </div>
            <div className="overflow-y-auto scrollbar-hide px-4 pb-4 flex-1">
              <p className="text-xs text-[var(--text-dim)] mb-4">{farmer.name[lang]} · {farmer.location[lang]} · 12 Jun 2024</p>
              <Section title={`${STR.todayAdvisory.en} / ${STR.todayAdvisory.hi}`} en={todayAdvisory.body.en} hi={todayAdvisory.body.hi} />
              <Section title={`${STR.scanTitle.en} / ${STR.scanTitle.hi}`}
                en={`${diseaseResult.name.en} (${diseaseResult.affectedPct}% affected). Treatment: ${diseaseResult.treatment.pesticide.en}, ${diseaseResult.treatment.dosage.en}.`}
                hi={`${diseaseResult.name.hi} (${diseaseResult.affectedPct}% प्रभावित)। उपचार: ${diseaseResult.treatment.pesticide.hi}, ${diseaseResult.treatment.dosage.hi}।`} />
              <Section title={`${STR.pricesTitle.en} / ${STR.pricesTitle.hi}`}
                en="Tomato ₹2,450/qtl — recommendation: Sell Now." hi="टमाटर ₹2,450/क्विंटल — सलाह: अभी बेचें।" />
            </div>
            <div className="sticky bottom-0 flex gap-2 p-3 bg-panel border-t border-white/5">
              <button className="tap flex-1 bg-crop text-ink rounded-xl font-semibold flex items-center justify-center gap-2"><FileDown size={18} /> {t('exportPdf', lang)}</button>
              <button onClick={readAll} className="tap px-4 glass !rounded-xl flex items-center justify-center"><Volume2 size={18} /></button>
              <button className="tap px-4 glass !rounded-xl flex items-center justify-center text-lime"><Share2 size={18} /></button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
