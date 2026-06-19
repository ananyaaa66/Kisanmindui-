import { motion } from 'framer-motion'
import { ChevronLeft, AlertCircle, CheckCircle, Clock } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { t } from '../data/i18n.js'
import { advisoryReports } from '../data/mockData.js'
import SpeakButton from '../components/SpeakButton.jsx'
import DataCard from '../components/DataCard.jsx'
import InfoSection from '../components/InfoSection.jsx'

const severityColors = {
  green: 'bg-green-500/20 border-green-500/30 text-green-300',
  amber: 'bg-amber-500/20 border-amber-500/30 text-amber-300',
  red: 'bg-red-500/20 border-red-500/30 text-red-300',
}

const statusIcons = {
  resolved: CheckCircle,
  ongoing: Clock,
}

export default function AdvisoryReports({ onBack }) {
  const { lang } = useApp()

  const handleReportClick = (report) => {
    // Could expand to show details
    console.log('Clicked report:', report)
  }

  return (
    <div className="px-4 pt-4 pb-32 space-y-4 animate-sprout">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ChevronLeft size={20} />
          <span className="text-sm">{t('back', lang)}</span>
        </button>
        <SpeakButton text={t('advisoryReports', lang)} />
      </div>

      <div className="glass p-4">
        <h1 className="text-2xl font-bold mb-1">{t('advisoryReports', lang)}</h1>
        <p className="text-sm text-gray-400">{advisoryReports.length} {t('reports', lang)}</p>
      </div>

      {/* Reports list */}
      <div className="space-y-3">
        {advisoryReports.map((report, idx) => {
          const StatusIcon = statusIcons[report.status]
          return (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => handleReportClick(report)}
              className="cursor-pointer"
            >
              <div className={`glass p-4 border border-white/10 hover:border-white/20 transition-all rounded-xl`}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-white text-sm mb-1">{report.title[lang]}</h3>
                    <p className="text-xs text-gray-400 mb-2">{report.date}</p>
                  </div>
                  {StatusIcon && (
                    <StatusIcon size={18} className={report.status === 'resolved' ? 'text-green-400' : 'text-amber-400'} />
                  )}
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium border ${severityColors[report.severity]}`}>
                    {report.severity === 'green' ? '✓ Mild' : report.severity === 'amber' ? '⚠️ Moderate' : '🔴 Severe'}
                  </span>
                  <span className="text-xs text-gray-400">{report.crop}</span>
                </div>

                <InfoSection title="Treatment" icon="💊">
                  <p className="text-xs text-gray-300 font-mono bg-black/30 p-2 rounded">{report.treatment}</p>
                </InfoSection>

                <div className="mt-3">
                  <p className="text-xs font-semibold text-gray-400 mb-2">{t('recommendations', lang)}</p>
                  <ul className="space-y-1">
                    {report.recommendations[lang].slice(0, 2).map((rec, i) => (
                      <li key={i} className="text-xs text-gray-300 flex gap-2">
                        <span className="text-lime">•</span> {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
