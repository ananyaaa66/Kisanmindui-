import { Sun, Cloud, CloudRain, SprayCan, Droplets, Scissors, Sprout } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { t } from '../data/i18n.js'
import Screen from '../components/Screen.jsx'
import SpeakButton from '../components/SpeakButton.jsx'
import { forecast, actionTimeline, soilTip } from '../data/mockData.js'

const wIcon = { sun: Sun, cloud: Cloud, rain: CloudRain }
const aIcon = { spray: SprayCan, irrigate: Droplets, harvest: Scissors }

export default function Weather() {
  const { lang } = useApp()
  return (
    <Screen title={t('weatherTitle', lang)} subtitle="Agent 4">
      {/* 5-day forecast strip */}
      <p className="text-sm font-semibold mb-2">{t('forecast', lang)}</p>
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {forecast.map((f, i) => {
          const Icon = wIcon[f.icon]
          return (
            <div key={i} className="glass shrink-0 w-[72px] p-3 flex flex-col items-center gap-1.5">
              <span className="text-xs text-[var(--text-dim)]">{f.day[lang]}</span>
              <Icon size={24} className={f.icon === 'rain' ? 'text-lime' : 'text-cropbright'} />
              <span className="num text-lg font-bold">{f.temp}°</span>
              <span className="text-[10px] text-lime">{f.rain}%</span>
            </div>
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
