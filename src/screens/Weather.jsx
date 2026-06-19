import { Sun, Cloud, CloudRain, SprayCan, Droplets, Scissors, Sprout, Wind, Droplet } from 'lucide-react'
import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext.jsx'
import { t } from '../data/i18n.js'
import Screen from '../components/Screen.jsx'
import SpeakButton from '../components/SpeakButton.jsx'
import { forecast, actionTimeline, soilTip, extendedForecast } from '../data/mockData.js'

const wIcon = { sun: Sun, cloud: Cloud, rain: CloudRain }
const aIcon = { spray: SprayCan, irrigate: Droplets, harvest: Scissors }

export default function Weather() {
  const { lang } = useApp()
  return (
    <Screen title={t('weatherTitle', lang)} subtitle="Agent 4">
      {/* 7-day forecast detailed */}
      <p className="text-sm font-semibold mb-3">{t('sevenDayForecast', lang)}</p>
      <div className="space-y-2 mb-4">
        {extendedForecast.map((f, i) => {
          const Icon = wIcon[f.icon]
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass p-3 flex items-center justify-between"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="w-12 text-center">
                  <p className="text-xs text-[var(--text-dim)]">{f.day}</p>
                </div>
                <Icon size={20} className={f.icon === 'rain' ? 'text-lime' : 'text-cropbright'} />
              </div>
              <div className="flex items-center gap-4 flex-1">
                <div className="text-right">
                  <p className="text-xs text-[var(--text-dim)]">{lang === 'hi' ? 'तापमान' : 'Temp'}</p>
                  <p className="num text-sm font-bold">{f.minTemp}°-{f.temp}°C</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-[var(--text-dim)]">{lang === 'hi' ? 'वर्षा' : 'Rain'}</p>
                <p className="text-sm font-semibold text-lime">{f.rain}%</p>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Action timeline — nodes connected by an animated vine/stem */}
      <p className="text-sm font-semibold mt-5 mb-3">{t('actionTimeline', lang)}</p>
      <div className="relative pl-9">
        <span className="absolute left-[14px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-crop via-lime to-crop/20" />
        <div className="space-y-4">
          {actionTimeline.map((a, i) => {
            const Icon = aIcon[a.type]
            return (
              <div key={i} className="relative">
                <span className="absolute -left-9 top-0 grid place-items-center w-7 h-7 rounded-full bg-panel border border-crop/50 text-cropbright glow-green">
                  <Icon size={15} />
                </span>
                <div className="glass p-3">
                  <p className="text-[11px] uppercase tracking-wide text-lime font-semibold">{a.when[lang]}</p>
                  <p className="text-sm mt-0.5">{a.text[lang]}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Soil tip */}
      <div className="glass active p-4 mt-5">
        <div className="flex items-center justify-between mb-1">
          <p className="flex items-center gap-2 font-semibold"><Sprout size={18} className="text-cropbright" /> {t('soilTip', lang)}</p>
          <SpeakButton text={soilTip[lang]} label="" />
        </div>
        <p className="text-sm text-[var(--text-dim)]">{soilTip[lang]}</p>
      </div>
    </Screen>
  )
}
