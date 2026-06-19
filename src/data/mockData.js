// Realistic mock data for the 5 agents. Componentized so backend is a drop-in later.

export const farmer = {
  name: { en: 'Ramesh Kumar', hi: 'रमेश कुमार' },
  location: { en: 'Nashik, Maharashtra', hi: 'नासिक, महाराष्ट्र' },
  crop: 'tomato',
}

export const weatherSnapshot = {
  temp: 29,
  rainChance: 65,
  condition: { en: 'Cloudy, light showers', hi: 'बादल, हल्की बौछार' },
}

export const todayAdvisory = {
  title: { en: 'Spray fungicide before evening rain', hi: 'शाम की बारिश से पहले फफूंदनाशक छिड़कें' },
  body: {
    en: 'High humidity + 65% rain expected. Apply Mancozeb to tomato to prevent early blight.',
    hi: 'अधिक नमी और 65% बारिश की संभावना। टमाटर पर अगेती झुलसा रोकने हेतु मैनकोज़ेब डालें।',
  },
  priority: 'high',
}

export const recentReports = [
  { id: 'r1', title: { en: 'Tomato leaf diagnosis', hi: 'टमाटर पत्ती निदान' }, date: '12 Jun 2024' },
  { id: 'r2', title: { en: 'Onion mandi price plan', hi: 'प्याज़ मंडी भाव योजना' }, date: '09 Jun 2024' },
  { id: 'r3', title: { en: 'PM-KISAN eligibility', hi: 'पीएम-किसान पात्रता' }, date: '04 Jun 2024' },
]

// Agent 1: Disease
export const diseaseResult = {
  name: { en: 'Early Blight', hi: 'अगेती झुलसा' },
  severity: 'amber', // green | amber | red
  affectedPct: 38,
  pathogen: 'Alternaria solani',
  treatment: {
    pesticide: { en: 'Mancozeb 75% WP', hi: 'मैनकोज़ेब 75% WP' },
    dosage: { en: '2.5 g per litre of water', hi: '2.5 ग्राम प्रति लीटर पानी' },
    method: { en: 'Foliar spray, cover both leaf sides, repeat in 10 days', hi: 'पत्तियों पर छिड़काव, दोनों ओर, 10 दिन बाद दोहराएँ' },
  },
}

// Agent 2: Market prices
export const crops = [
  { id: 'tomato', label: { en: 'Tomato', hi: 'टमाटर' }, icon: '🍅' },
  { id: 'onion', label: { en: 'Onion', hi: 'प्याज़' }, icon: '🧅' },
  { id: 'wheat', label: { en: 'Wheat', hi: 'गेहूँ' }, icon: '🌾' },
  { id: 'cotton', label: { en: 'Cotton', hi: 'कपास' }, icon: '☁️' },
  { id: 'soybean', label: { en: 'Soybean', hi: 'सोयाबीन' }, icon: '🫘' },
]

const genTrend = (base, vol) =>
  Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    price: Math.round(base + Math.sin(i / 3) * vol + (Math.random() - 0.5) * vol * 0.6),
  }))

export const priceData = {
  tomato: { current: 2450, trend: genTrend(2300, 220), action: { type: 'sell', reason: { en: 'Prices peaked, supply rising next week', hi: 'भाव चरम पर, अगले हफ्ते आवक बढ़ेगी' } } },
  onion: { current: 1820, trend: genTrend(1700, 180), action: { type: 'wait', days: 6, reason: { en: 'Festival demand will lift rates', hi: 'त्योहारी मांग से भाव चढ़ेंगे' } } },
  wheat: { current: 2275, trend: genTrend(2250, 90), action: { type: 'sell', reason: { en: 'MSP level reached, stable demand', hi: 'एमएसपी स्तर, स्थिर मांग' } } },
  cotton: { current: 7150, trend: genTrend(7000, 320), action: { type: 'wait', days: 9, reason: { en: 'Export orders expected to firm prices', hi: 'निर्यात ऑर्डर से भाव मजबूत होंगे' } } },
  soybean: { current: 4680, trend: genTrend(4600, 200), action: { type: 'sell', reason: { en: 'Oil demand strong, sell surplus now', hi: 'तेल मांग मजबूत, अधिशेष अभी बेचें' } } },
}

export const mandis = {
  tomato: [
    { name: { en: 'Pimpalgaon Mandi', hi: 'पिंपळगाव मंडी' }, price: 2510, dist: 12 },
    { name: { en: 'Nashik APMC', hi: 'नासिक एपीएमसी' }, price: 2450, dist: 8 },
    { name: { en: 'Lasalgaon Mandi', hi: 'लासलगाव मंडी' }, price: 2390, dist: 24 },
  ],
}

// Agent 3: Schemes
export const indianStates = ['Maharashtra', 'Punjab', 'Uttar Pradesh', 'Karnataka', 'Gujarat', 'Madhya Pradesh', 'Rajasthan', 'Bihar']

export const schemes = [
  {
    id: 's1',
    name: { en: 'PM-KISAN Samman Nidhi', hi: 'पीएम-किसान सम्मान निधि' },
    benefit: { en: '₹6,000/year income support', hi: '₹6,000/वर्ष आय सहायता' },
    eligible: true,
    documents: { en: ['Aadhaar card', 'Land records (7/12)', 'Bank passbook'], hi: ['आधार कार्ड', 'भूमि रिकॉर्ड (7/12)', 'बैंक पासबुक'] },
    steps: { en: ['Register on pmkisan.gov.in', 'eKYC verification', 'Link bank account'], hi: ['pmkisan.gov.in पर रजिस्टर करें', 'ई-केवाईसी सत्यापन', 'बैंक खाता जोड़ें'] },
    deadline: { en: 'Rolling — apply anytime', hi: 'कभी भी आवेदन करें' },
  },
  {
    id: 's2',
    name: { en: 'Pradhan Mantri Fasal Bima Yojana', hi: 'प्रधानमंत्री फसल बीमा योजना' },
    benefit: { en: 'Crop insurance, low premium', hi: 'फसल बीमा, कम प्रीमियम' },
    eligible: true,
    documents: { en: ['Aadhaar', 'Sowing certificate', 'Bank details'], hi: ['आधार', 'बुवाई प्रमाणपत्र', 'बैंक विवरण'] },
    steps: { en: ['Apply via bank/CSC', 'Pay premium share', 'Get policy receipt'], hi: ['बैंक/सीएससी से आवेदन', 'प्रीमियम भरें', 'पॉलिसी रसीद लें'] },
    deadline: { en: '31 Jul 2024 (Kharif)', hi: '31 जुलाई 2024 (खरीफ)' },
  },
  {
    id: 's3',
    name: { en: 'Kisan Credit Card', hi: 'किसान क्रेडिट कार्ड' },
    benefit: { en: 'Low-interest crop loan up to ₹3 lakh', hi: '₹3 लाख तक कम ब्याज ऋण' },
    eligible: false,
    documents: { en: ['ID proof', 'Land ownership proof', 'Photo'], hi: ['पहचान प्रमाण', 'भूमि स्वामित्व', 'फोटो'] },
    steps: { en: ['Visit bank branch', 'Submit KCC form', 'Verification & approval'], hi: ['बैंक शाखा जाएँ', 'केसीसी फॉर्म भरें', 'सत्यापन व मंज़ूरी'] },
    deadline: { en: 'Rolling', hi: 'कभी भी' },
  },
]

// Agent 4: Weather
export const forecast = [
  { day: { en: 'Mon', hi: 'सोम' }, temp: 29, rain: 65, icon: 'rain' },
  { day: { en: 'Tue', hi: 'मंगल' }, temp: 31, rain: 20, icon: 'cloud' },
  { day: { en: 'Wed', hi: 'बुध' }, temp: 33, rain: 5, icon: 'sun' },
  { day: { en: 'Thu', hi: 'गुरु' }, temp: 30, rain: 40, icon: 'cloud' },
  { day: { en: 'Fri', hi: 'शुक्र' }, temp: 28, rain: 70, icon: 'rain' },
]

export const actionTimeline = [
  { type: 'spray', when: { en: 'Today, before 5 PM', hi: 'आज, शाम 5 बजे से पहले' }, text: { en: 'Spray fungicide before rain', hi: 'बारिश से पहले फफूंदनाशक छिड़कें' } },
  { type: 'irrigate', when: { en: 'Wed (dry spell)', hi: 'बुध (सूखा दौर)' }, text: { en: 'Light irrigation in morning', hi: 'सुबह हल्की सिंचाई' } },
  { type: 'harvest', when: { en: 'Next week', hi: 'अगले हफ्ते' }, text: { en: 'Harvest ripe tomato batches', hi: 'पके टमाटर की तुड़ाई' } },
]

export const soilTip = {
  en: 'Moist black soil + warm season favours fungal growth. Ensure drainage and avoid overhead watering in evening.',
  hi: 'नम काली मिट्टी और गर्म मौसम फफूंद बढ़ाते हैं। जल निकासी रखें और शाम को ऊपर से सिंचाई न करें।',
}
