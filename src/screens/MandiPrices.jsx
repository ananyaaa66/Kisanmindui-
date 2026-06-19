import { useState } from 'react'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { MapPin, Navigation, TrendingUp, Clock } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { t } from '../data/i18n.js'
import Screen from '../components/Screen.jsx'
import { crops, priceData, mandis } from '../data/mockData.js'

export default function MandiPrices() {
  const { lang } = useApp()
  const [crop, setCrop] = useState('tomato')
  const d = priceData[crop]
  const list = mandis[crop] || mandis.tomato
  const isSell = d.action.type === 'sell'

  return (
    <Screen title={t('pricesTitle', lang)} subtitle="Agent 2">
      {/* Crop selector pills */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 -mx-1 px-1">
        {crops.map((c) => (
          <button key={c.id} onClick={() => setCrop(c.id)}
            className={`tap !min-h-0 shrink-0 px-4 py-2 rounded-full text-sm font-semibold border transition flex items-center gap-1.5 ${
              crop === c.id ? 'bg-crop text-ink border-crop glow-green' : 'glass text-[var(--text-dim)]'}`}>
            <span>{c.icon}</span> {c.label[lang]}
          </button>
        ))}
      </div>

      {/* Big glowing price */}
      <div className="glass active p-5 mt-3 text-center">
        <p className="text-sm text-[var(--text-dim)]">{crops.find((c) => c.id === crop).label[lang]} · {t('perQuintal', lang)}</p>
        <p className="num text-5xl font-extrabold text-cropbright mt-1" style={{ textShadow: '0 0 24px rgba(46,204,113,0.5)' }}>
          ₹{d.current.toLocaleString('en-IN')}
        </p>
        <span className={`inline-flex items-center gap-1.5 mt-3 px-4 py-1.5 rounded-full text-sm font-bold ${
          isSell ? 'bg-crop text-ink' : 'bg-lime/15 text-lime border border-lime/40'}`}>
          {isSell ? <><TrendingUp size={15} /> {t('sellNow', lang)}</> : <><Clock size={15} /> {t('wait', lang)} {d.action.days} {t('days', lang)}</>}
        </span>
        <p className="text-xs text-[var(--text-dim)] mt-2">{d.action.reason[lang]}</p>
      </div>

      {/* 30-day chart */}
      <div className="glass p-3 mt-3">
        <p className="text-xs text-[var(--text-dim)] mb-2 px-1">{lang === 'hi' ? '30-दिन भाव रुझान' : '30-day price trend'}</p>
        <div className="h-44">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={d.trend} margin={{ top: 6, right: 8, left: -18, bottom: 0 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="day" tick={{ fill: '#5e7066', fontSize: 10 }} tickLine={false} axisLine={false} interval={6} />
              <YAxis tick={{ fill: '#5e7066', fontSize: 10 }} tickLine={false} axisLine={false} domain={['dataMin - 100', 'dataMax + 100']} />
              <Tooltip contentStyle={{ background: '#0D1410', border: '1px solid rgba(46,204,113,0.4)', borderRadius: 12, fontSize: 12 }}
                labelStyle={{ color: '#A8FF60' }} formatter={(v) => [`₹${v}`, 'Price']} />
              <Line type="monotone" dataKey="price" stroke="#A8FF60" strokeWidth={2.5} dot={false}
                style={{ filter: 'drop-shadow(0 0 5px rgba(168,255,96,0.6))' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Nearby mandis */}
      <div className="mt-3">
        <p className="text-sm font-semibold mb-2">{t('nearbyMandi', lang)}</p>
        <div className="space-y-2">
          {[...list].sort((a, b) => b.price - a.price).map((m, i) => (
            <div key={i} className="glass p-3 flex items-center gap-3">
              <span className="grid place-items-center w-9 h-9 rounded-lg bg-crop/10 text-cropbright shrink-0"><MapPin size={18} /></span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{m.name[lang]}</p>
                <p className="text-xs text-[var(--text-dim)]">{m.dist} km · ₹{m.price.toLocaleString('en-IN')}/qtl</p>
              </div>
              <button className="tap !min-h-0 px-3 py-2 rounded-lg text-xs font-semibold text-cropbright border border-crop/30 flex items-center gap-1.5">
                <Navigation size={14} /> {t('directions', lang)}
              </button>
            </div>
          ))}
        </div>
      </div>
    </Screen>
  )
}
