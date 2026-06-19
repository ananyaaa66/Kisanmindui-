import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CloudRain, ScanLine, TrendingUp, FileBadge, CloudSun, FileText, ChevronRight } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { t } from '../data/i18n.js'
import GrowthLine from '../components/GrowthLine.jsx'
import SpeakButton from '../components/SpeakButton.jsx'
import { farmer, weatherSnapshot, todayAdvisory, recentReports } from '../data/mockData.js'

const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' })

const tiles = [
  { to: '/scan', icon: ScanLine, label: { en: 'Disease Scan', hi: 'रोग जाँच' } },
  { to: '/prices', icon: TrendingUp, label: { en: 'Mandi Prices', hi: 'मंडी भाव' } },
  { to: '/schemes', icon: FileBadge, label: { en: 'Schemes', hi: 'योजनाएँ' } },
  { to: '/weather', icon: CloudSun, label: { en: 'Weather', hi: 'मौसम' } },
]

export default function Home() {
  const { lang, setReportOpen } = useApp()
  return (
    <div className="px-4 pt-4 pb-32 space-y-4 animate-sprout">
      {/* Greeting card */}
      <div className="glass p-4 relative overflow-hidden">
        <span className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-crop to-lime" />
        <p className="text-[var(--text-dim)] text-sm">{t('greeting', lang)} 🙏</p>
        <h2 className="text-2xl font-bold mt-0.5">{farmer.name[lang]}</h2>
        <p className="text-sm text-[var(--text-dim)] mt-1">{farmer.location[lang]} · {today}</p>
        <GrowthLine className="mt-3 opacity-70" />
      </div>

      {/* Weather snapshot strip */}
      <div className="glass p-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CloudRain className="text-lime" size={28} />
          <div>
            <p className="num text-2xl font-bold">{weatherSnapshot.temp}°C</p>
            <p className="text-xs text-[var(--text-dim)]">{weatherSnapshot.condition[lang]}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="num text-xl font-bold text-lime">{weatherSnapshot.rainChance}%</p>
          <p className="text-xs text-[var(--text-dim)]">{t('rain', lang)}</p>
        </div>
      </div>

      {/* Today's advisory hero */}
      <div className="glass active p-4 relative overflow-hidden">
        <span className="absolute left-0 top-0 h-full w-1.5 bg-lime glow-green" />
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-wider text-lime font-semibold">{t('todayAdvisory', lang)}</p>
          <SpeakButton text={todayAdvisory.body[lang]} label="" />
        </div>
        <h3 className="font-bold text-lg mt-1.5">{todayAdvisory.title[lang]}</h3>
        <p className="text-sm text-[var(--text-dim)] mt-1">{todayAdvisory.body[lang]}</p>
      </div>

      {/* Quick action tiles */}
      <div>
        <p className="text-sm font-semibold mb-2">{t('quickActions', lang)}</p>
        <div className="grid grid-cols-2 gap-3">
          {tiles.map(({ to, icon: Icon, label }) => (
            <motion.div key={to} whileTap={{ scale: 0.96 }}>
              <Link to={to} className="glass p-4 flex flex-col gap-3 active:border-crop/60 transition">
                <span className="grid place-items-center w-11 h-11 rounded-xl bg-crop/15 text-cropbright">
                  <Icon size={22} />
                </span>
                <span className="font-semibold text-sm">{label[lang]}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent reports */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-semibold">{t('recentReports', lang)}</p>
        </div>
        <div className="space-y-2">
          {recentReports.map((r) => (
            <button key={r.id} onClick={() => setReportOpen(true)}
              className="glass w-full p-3 flex items-center gap-3 text-left">
              <FileText size={18} className="text-cropbright shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{r.title[lang]}</p>
                <p className="text-xs text-[var(--text-dim)]">{r.date}</p>
              </div>
              <ChevronRight size={18} className="text-[var(--text-dim)]" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
