import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Zap, 
  Sun, 
  Battery, 
  Home, 
  UtilityPole, 
  Settings, 
  Bell, 
  MapPin, 
  Search, 
  Plus, 
  ChevronLeft,
  AlertCircle,
  Edit2,
  Trash2,
  Calendar,
  Wind,
  CloudSun,
  Monitor,
  LogOut,
  Mail,
  Phone,
  Shield,
  Globe,
  ArrowLeft,
  BarChart3,
  PieChart,
  Info,
  Leaf,
  type LucideIcon
} from 'lucide-react';

// --- Translations Database ---
const translations = {
  en: {
    appName: "Rajasthan Solar",
    location: "Jaipur Control Center",
    overview: "Overview",
    devices: "Devices",
    alerts: "Alerts",
    plantInfo: "Plant Info",
    settings: "Settings",
    profile: "Profile",
    dashboard: "Dashboard",
    realTimePower: "Real-time Power",
    dailyYield: "Daily Yield",
    monthlyYield: "Monthly Yield",
    totalProduction: "Total Production",
    energyArchitecture: "Energy Architecture",
    forecast: "System Status & Forecast",
    powerProfile: "Power Profile",
    usageHistory: "Usage History",
    plantList: "Plant List",
    mapView: "Map View",
    search: "Search plants...",
    newPlant: "New Plant",
    signOut: "Sign Out",
    general: "General",
    notifications: "Notifications",
    security: "Security",
    display: "Display",
    about: "About",
    sysLang: "System Language",
    currency: "Currency",
    saveChanges: "Save Changes",
    carbonReduction: "Carbon Reduction",
    weather: "Weather",
    radiation: "Radiation"
  },
  hi: {
    appName: "राजस्थान सोलर",
    location: "जयपुर नियंत्रण केंद्र",
    overview: "अवलोकन",
    devices: "उपकरण",
    alerts: "चेतावनी",
    plantInfo: "संयंत्र जानकारी",
    settings: "सेटिंग्स",
    profile: "प्रोफ़ाइल",
    dashboard: "डैशबोर्ड",
    realTimePower: "वास्तविक समय शक्ति",
    dailyYield: "दैनिक उत्पादन",
    monthlyYield: "मासिक उत्पादन",
    totalProduction: "कुल उत्पादन",
    energyArchitecture: "ऊर्जा वास्तुकला",
    forecast: "सिस्टम स्थिति और पूर्वानुमान",
    powerProfile: "पावर प्रोफ़ाइल",
    usageHistory: "उपयोग इतिहास",
    plantList: "संयंत्र सूची",
    mapView: "मानचित्र दृश्य",
    search: "संयंत्र खोजें...",
    newPlant: "नया संयंत्र",
    signOut: "साइन आउट",
    general: "सामान्य",
    notifications: "सूचनाएं",
    security: "सुरक्षा",
    display: "प्रदर्शन",
    about: "बारे में",
    sysLang: "सिस्टम भाषा",
    currency: "मुद्रा",
    saveChanges: "परिवर्तन सहेजें",
    carbonReduction: "कार्बन में कमी",
    weather: "मौसम",
    radiation: "विकिरण"
  },
  ta: {
    appName: "ராஜஸ்தான் சோலார்",
    location: "ஜெய்ப்பூர் கட்டுப்பாட்டு மையம்",
    overview: "கண்ணோட்டம்",
    devices: "சாதனங்கள்",
    alerts: "எச்சரிக்கைகள்",
    plantInfo: "ஆலை தகவல்",
    settings: "அமைப்புகள்",
    profile: "சுயவிவரம்",
    dashboard: "முகப்பு",
    realTimePower: "நிகழ்நேர சக்தி",
    dailyYield: "தினசரி உற்பத்தி",
    monthlyYield: "மாதாந்திர உற்பத்தி",
    totalProduction: "மொத்த உற்பத்தி",
    energyArchitecture: "ஆற்றல் கட்டமைப்பு",
    forecast: "கணிக்கப்பட்ட உற்பத்தி",
    powerProfile: "சக்தி விவரம்",
    usageHistory: "பயன்பாட்டு வரலாறு",
    plantList: "ஆலை பட்டியல்",
    mapView: "வரைபடக் காட்சி",
    search: "தேடுக...",
    newPlant: "புதிய ஆலை",
    signOut: "வெளியேறு",
    general: "பொது",
    notifications: "அறிவிப்புகள்",
    security: "பாதுகாப்பு",
    display: "காட்சி",
    about: "பற்றி",
    sysLang: "மொழி",
    currency: "நாணயம்",
    saveChanges: "சேமி",
    carbonReduction: "கார்பன் குறைப்பு",
    weather: "வானிலை",
    radiation: "கதிர்வீச்சு"
  },
  raj: {
    appName: "राजस्थान सोलर",
    location: "जयपुर कंट्रोल सेंटर",
    overview: "देखरेख",
    devices: "उपकरण",
    alerts: "चेतावनी",
    plantInfo: "प्लांट री जानकारी",
    settings: "सेटिंग्स",
    profile: "प्रोफाइल",
    dashboard: "डैशबोर्ड",
    realTimePower: "चालू पावर",
    dailyYield: "आज रो उत्पादन",
    monthlyYield: "महीने रो उत्पादन",
    totalProduction: "सगळो उत्पादन",
    energyArchitecture: "बिजली ढांचो",
    forecast: "सिस्टम स्थिति अर अनुमान",
    powerProfile: "पावर प्रोफाइल",
    usageHistory: "बरतने रो इतिहास",
    plantList: "प्लांट लिस्ट",
    mapView: "नक्शो देख्यो",
    search: "प्लांट ढूंढो...",
    newPlant: "नयो प्लांट",
    signOut: "बारे निकलो",
    general: "सामान्य",
    notifications: "संदेस",
    security: "सुरक्षा",
    display: "दिखावट",
    about: "बारे में",
    sysLang: "सिस्टम री भाषा",
    currency: "मुद्रा",
    saveChanges: "बदलाव सहेजो",
    carbonReduction: "कार्बन कटौती",
    weather: "मौसम",
    radiation: "ताप"
  }
};

// --- Type Definitions ---
interface DataPoint { data: number[]; color: string; isPrediction?: boolean; }
interface BarChartData { label: string; value?: number; solar?: number; wind?: number; cons?: number; isPrediction?: boolean; }
interface FlowNodeProps { icon: LucideIcon; label: string; value: string; status?: string; onClick?: () => void; }
interface StatusCardProps { title: string; value: string; unit: string; bgColor: string; icon: LucideIcon; subtext?: string; }
interface InfoItem { l: string; v: string; full?: boolean; }

// --- Custom SVG Chart Components (Defined Globally) ---

const MultiLineChart = ({ datasets }: { datasets: DataPoint[] }) => {
  const allVals = datasets.flatMap((d: DataPoint) => d.data);
  const maxVal = Math.max(...allVals) * 1.1 || 100; 
  const minVal = Math.min(...allVals) || 0;
  const range = maxVal - minVal || 1;

  const getPoints = (data: number[]) => {
    return data.map((val: number, i: number) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 100 - ((val - minVal) / range) * 100; 
      return `${x},${y}`;
    }).join(' ');
  };

  return (
    <div className="w-full h-full relative">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
        {[0, 25, 50, 75, 100].map(p => (
            <line key={p} x1="0" y1={p} x2="100" y2={p} stroke="#fed7aa" strokeWidth="0.5" strokeOpacity="0.5" />
        ))}
        {datasets.map((ds: DataPoint, idx: number) => {
          const points = getPoints(ds.data);
          const areaPath = `${points} 100,100 0,100`;
           
          return (
            <g key={idx}>
              {!ds.isPrediction && (
                <polygon 
                  points={areaPath} 
                  fill={ds.color} 
                  fillOpacity="0.2" 
                  className="transition-all duration-500 ease-in-out"
                />
              )}
              <polyline
                fill="none"
                stroke={ds.color}
                strokeWidth={ds.isPrediction ? "2" : "2"}
                strokeDasharray={ds.isPrediction ? "4,4" : "0"} 
                points={points}
                vectorEffect="non-scaling-stroke"
                className="transition-all duration-500 ease-in-out shadow-sm"
              />
            </g>
          );
        })}
      </svg>
      <div className="flex justify-between text-[10px] text-stone-500 mt-1 font-serif">
          <span>00:00</span>
          <span>06:00</span>
          <span>12:00</span>
          <span>18:00</span>
          <span>21:00</span>
      </div>
    </div>
  );
};

const CustomBarChart = ({ data }: { data: BarChartData[] }) => {
  const maxVal = 20; 
  const minVal = -20;
  const totalRange = maxVal - minVal;
  const zeroY = (maxVal / totalRange) * 100;

  return (
    <div className="w-full h-full relative">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
         <line x1="0" y1="0" x2="100" y2="0" stroke="#fed7aa" strokeWidth="0.5" strokeOpacity="0.5" />
         <line x1="0" y1="25" x2="100" y2="25" stroke="#fed7aa" strokeWidth="0.5" strokeOpacity="0.5" />
         <line x1="0" y1="50" x2="100" y2="50" stroke="#fdba74" strokeWidth="1" />
         <line x1="0" y1="75" x2="100" y2="75" stroke="#fed7aa" strokeWidth="0.5" strokeOpacity="0.5" />
         <line x1="0" y1="100" x2="100" y2="100" stroke="#fed7aa" strokeWidth="0.5" strokeOpacity="0.5" />

         {data.map((d: BarChartData, i: number) => {
             const barWidth = (100 / data.length) * 0.6;
             const x = (i / data.length) * 100 + (100/data.length * 0.2);
             
             const solarHeight = ((d.solar ?? 0) / totalRange) * 100;
             const solarY = zeroY - solarHeight;
             const windHeight = ((d.wind ?? 0) / totalRange) * 100;
             const windY = solarY - windHeight;
             const consHeight = (Math.abs(d.cons ?? 0) / totalRange) * 100;
             
             const opacity = d.isPrediction ? 0.6 : 1;
             const strokeDash = d.isPrediction ? "2,1" : "0";
             const strokeWidth = d.isPrediction ? "0.5" : "0";

             return (
                 <g key={i}>
                     <rect x={x} y={windY} width={barWidth} height={windHeight} fill="#0ea5e9" fillOpacity={opacity} stroke="#0ea5e9" strokeWidth={strokeWidth} strokeDasharray={strokeDash} rx="1" />
                     <rect x={x} y={solarY} width={barWidth} height={solarHeight} fill="#d97706" fillOpacity={opacity} stroke="#d97706" strokeWidth={strokeWidth} strokeDasharray={strokeDash} rx="1" />
                     <rect x={x} y={zeroY} width={barWidth} height={consHeight} fill="#b45309" fillOpacity={opacity} stroke="#b45309" strokeWidth={strokeWidth} strokeDasharray={strokeDash} rx="1" />
                 </g>
             );
         })}
      </svg>
      <div className="absolute top-0 left-0 text-[9px] text-stone-500 -ml-6 flex flex-col justify-between h-full py-1 font-serif">
          <span>{Math.round(maxVal)}</span>
          <span>{Math.round(maxVal/2)}</span>
          <span>0</span>
          <span>{Math.round(minVal/2)}</span>
          <span>{Math.round(minVal)}</span>
      </div>
       <div className="flex justify-between text-[9px] text-stone-500 mt-1 px-1 font-serif">
          {data.filter((_: BarChartData, i: number) => i % 2 === 0).map((d: BarChartData, i: number) => <span key={i}>{d.label}</span>)}
      </div>
    </div>
  );
};

const DonutChart = ({ percent, color, label, subLabel }: { percent: number; color: string; label: string; subLabel: string }) => {
  const circumference = 2 * Math.PI * 40; 
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center justify-center">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full transform -rotate-90">
          <circle cx="50%" cy="50%" r="40" stroke="#ffedd5" strokeWidth="12" fill="transparent" />
          <circle
            cx="50%" cy="50%" r="40"
            stroke={color} strokeWidth="12" fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-sm text-stone-500 font-serif">{label}</span>
          <span className="text-lg font-bold text-stone-800 font-serif">{subLabel}</span>
        </div>
      </div>
      <div className="mt-2 text-center">
        <span className="text-2xl font-bold font-serif" style={{ color }}>{percent}%</span>
      </div>
    </div>
  );
};

const FlowNode = ({ icon: Icon, label, value, status = 'neutral', onClick }: FlowNodeProps) => {
  const colors: Record<string, string> = {
    neutral: 'text-stone-700 bg-[#fff7ed] border-orange-200',
    active: 'text-blue-800 bg-blue-50 border-blue-200',
    solar: 'text-amber-700 bg-amber-50 border-amber-200',
    wind: 'text-sky-800 bg-sky-50 border-sky-200',
  };

  const styleClass = colors[status || 'neutral'] || colors.neutral;

  return (
    <div 
      onClick={onClick}
      className={`flex flex-col items-center z-10 p-3 rounded-xl border-2 shadow-sm ${styleClass} w-24 md:w-32 transition-all duration-300 hover:scale-105 hover:shadow-md cursor-pointer group`}
    >
      <Icon size={24} className="mb-2 group-hover:scale-110 transition-transform" />
      <span className="text-xs font-bold uppercase opacity-80 font-serif tracking-wider">{label}</span>
      <span className="text-sm font-bold">{value}</span>
    </div>
  );
};

const NotificationToggle = ({ label, initialActive }: { label: string; initialActive: boolean }) => {
  const [isActive, setIsActive] = useState(initialActive);
  return (
    <div className="flex items-center justify-between p-2 hover:bg-stone-50 rounded">
      <span className="text-stone-600">{label}</span>
      <div 
        onClick={() => setIsActive(!isActive)}
        className={`w-10 h-6 rounded-full p-1 cursor-pointer transition-colors ${isActive ? 'bg-[#15803d]' : 'bg-stone-200'}`}
      >
        <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${isActive ? 'translate-x-4' : ''}`}></div>
      </div>
    </div>
  );
};

// --- Main Application Component ---

export default function App() {
  const [view, setView] = useState('login'); 
  const [activeTab, setActiveTab] = useState('Overview');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [lang, setLang] = useState('en'); 
  
  // Forecast State
  const [forecastDate, setForecastDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const [weatherData, setWeatherData] = useState<{temp: string | number, condition: string}>({ temp: '--', condition: 'Loading...' });
  const [_aiPrediction, setAiPrediction] = useState<number[]>([]);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  // Predictions from backend
  const [solarPredictionValue, setSolarPredictionValue] = useState<number | null>(null);
  const [windPredictionValue, setWindPredictionValue] = useState<number | null>(null);
  
  // Solar input form state
  const [showSolarForm, setShowSolarForm] = useState(false);
  const [solarInputs, setSolarInputs] = useState({ irradiation: 500, ambientTemp: 30, moduleTemp: 35 });
  
  // Wind input form state
  const [showWindForm, setShowWindForm] = useState(false);
  const [windInputs, setWindInputs] = useState({ 
    windSpeed10: 5, windSpeed100: 7, windGust10: 6,
    windDir10: 180, windDir100: 180, ambientTemp: 28
  });

  // Combined prediction page state
  const [predictionInputs, setPredictionInputs] = useState({
    solar_irradiation: 0.03,
    solar_ambient_temp: 30,
    solar_module_temp: 35,
    wind_speed_10: 5,
    wind_speed_100: 7,
    wind_gust_10: 6,
    wind_dir_10m: 180,
    wind_dir_100m: 180,
    wind_ambient_temp: 28,
  });
  
  const [predictionResults, setPredictionResults] = useState<{
    solar?: number; wind?: number; battery?: number; home?: number; grid?: number
  }>({});
  
  const [isPredicting, setIsPredicting] = useState(false);

  const t = (key: string): string => (translations[lang as keyof typeof translations] as Record<string, string>)[key] || key;

  // --- API INTEGRATION ---
  useEffect(() => {
    if (!isAuthenticated) return;
    const lat = 26.9124;
    const lon = 75.7873;
    
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&hourly=temperature_2m,shortwave_radiation&timezone=auto`)
      .then(res => res.json())
      .then(data => {
        if (data && data.current) {
          setWeatherData({
            temp: data.current.temperature_2m,
            condition: getWeatherDescription(data.current.weather_code)
          });
        }
      })
      .catch(err => console.error("Weather fetch failed:", err));
  }, [isAuthenticated]);

  // Fetch live weather data from backend and auto-populate prediction form
  const fetchLiveWeather = async (): Promise<void> => {
    try {
      const response = await fetch('http://127.0.0.1:5000/weather');
      const data = await response.json();
      
      if (data.error) {
        console.error("Weather API error:", data.error);
        return;
      }
      
      // Auto-populate prediction inputs with live data
      setPredictionInputs(prev => ({
        ...prev,
        solar_irradiation: data.current.estimated_irradiation,
        solar_ambient_temp: Math.round(data.current.temperature_2m * 100) / 100,
        solar_module_temp: Math.round((data.current.temperature_2m + 5) * 100) / 100, // Slightly higher than ambient
        wind_speed_10: Math.round(data.hourly.wind_speed_10m * 100) / 100,
        wind_speed_100: Math.round(data.hourly.wind_speed_100m * 100) / 100,
        wind_gust_10: Math.round(data.hourly.wind_gust_10m * 100) / 100,
        wind_dir_10m: Math.round(data.hourly.wind_direction_10m * 100) / 100,
        wind_dir_100m: Math.round(data.hourly.wind_direction_100m * 100) / 100,
        wind_ambient_temp: Math.round(data.current.temperature_2m * 100) / 100,
      }));
    } catch (err) {
      console.error("Failed to fetch live weather:", err);
    }
  };

  // Combined prediction function for the comprehensive page
  const performFullPrediction = async (): Promise<void> => {
    setIsPredicting(true);
    try {
      // Call solar predict
      const solarRes = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          IRRADIATION: Number(predictionInputs.solar_irradiation),
          AMBIENT_TEMPERATURE: Number(predictionInputs.solar_ambient_temp),
          MODULE_TEMPERATURE: Number(predictionInputs.solar_module_temp),
          timestamp: new Date().toISOString(),
        }),
      });
      const solarData = await solarRes.json();
      const solarPower = Number(solarData.prediction ?? 0);

      // Call wind predict
      const windRes = await fetch('http://127.0.0.1:5000/wind/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          wind_speed_10: Number(predictionInputs.wind_speed_10),
          wind_speed_100: Number(predictionInputs.wind_speed_100),
          wind_gust_10: Number(predictionInputs.wind_gust_10),
          wind_dir_10m_deg: Number(predictionInputs.wind_dir_10m),
          wind_dir_100m_deg: Number(predictionInputs.wind_dir_100m),
          AMBIENT_TEMPERATURE: Number(predictionInputs.wind_ambient_temp),
          timestamp: new Date().toISOString(),
        }),
      });
      const windData = await windRes.json();
      const windPower = Number(windData.wind_prediction ?? 0);

      // Calculate derived values
      const totalGeneration = solarPower + windPower;
      const homeConsumption = Math.min(150, totalGeneration * 0.6); // 60% of generation
      const gridPower = Math.max(0, totalGeneration - homeConsumption);
      const batteryCharge = Math.max(0, Math.min(100, 68 + (totalGeneration - homeConsumption) * 0.5)); // battery SOC

      setPredictionResults({
        solar: solarPower,
        wind: windPower,
        battery: batteryCharge,
        home: homeConsumption,
        grid: gridPower,
      });
    } catch (err) {
      console.error('Full prediction error', err);
    } finally {
      setIsPredicting(false);
    }
  };

  // Call backend solar prediction endpoint
  const callSolarPredict = async (): Promise<void> => {
    setIsLoadingAI(true);
    try {
      const payload = {
        IRRADIATION: Number(solarInputs.irradiation),
        AMBIENT_TEMPERATURE: Number(solarInputs.ambientTemp),
        MODULE_TEMPERATURE: Number(solarInputs.moduleTemp),
        timestamp: new Date().toISOString(),
      };

      const res = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (res.ok) {
        setSolarPredictionValue(Number(json.prediction ?? 0));
        setShowSolarForm(false);
      } else console.error('Solar predict failed', json);
    } catch (err) {
      console.error('Solar predict error', err);
    } finally {
      setIsLoadingAI(false);
    }
  };
  const callWindPredict = async (): Promise<void> => {
    setIsLoadingAI(true);
    try {
      const payload = {
        wind_speed_10: Number(windInputs.windSpeed10),
        wind_speed_100: Number(windInputs.windSpeed100),
        wind_gust_10: Number(windInputs.windGust10),
        wind_dir_10m_deg: Number(windInputs.windDir10),
        wind_dir_100m_deg: Number(windInputs.windDir100),
        AMBIENT_TEMPERATURE: Number(windInputs.ambientTemp),
        timestamp: new Date().toISOString(),
      };

      const res = await fetch('http://127.0.0.1:5000/wind/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (res.ok) {
        setWindPredictionValue(Number(json.wind_prediction ?? 0));
        setShowWindForm(false);
      } else console.error('Wind predict failed', json);
    } catch (err) {
      console.error('Wind predict error', err);
    } finally {
      setIsLoadingAI(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    const fetchAIPrediction = async () => {
      setIsLoadingAI(true);
      try {
        // fetch recent solar history from backend and use as prediction/sample series
        const res = await fetch('http://127.0.0.1:5000/solar/history');
        if (!res.ok) throw new Error('Failed to fetch solar history');
        const payload = await res.json();
        const history = payload.history || [];
        // map to numeric energy values (robustly find the energy column)
        const series = history.map((h: any) => {
          const energyKey = Object.keys(h).find(k => /energy|power|kwh/i.test(k)) || Object.keys(h)[1];
          return Number(h[energyKey] ?? 0);
        });
        setAiPrediction(series);
      } catch (error) {
        console.error('AI prediction fetch failed', error);
      } finally {
        setIsLoadingAI(false);
      }
    };
    fetchAIPrediction();
  }, [isAuthenticated]);

  // --- Functions ---
  const getWeatherDescription = (code: number): string => {
    if (code === 0) return "Clear Desert Sky";
    if (code < 3) return "Partly Cloudy";
    if (code < 50) return "Dusty/Fog";
    if (code < 80) return "Monsoon Rain";
    return "Sandstorm";
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticated(true);
    setView('dashboard');
  };

  const handleNodeClick = (componentType: string) => {
    setSelectedComponent(componentType);
    setView('component-detail');
  };

  const getDailyForecast = (date: Date) => {
    const day = date.getDate();
    const solarBase = 6.4;
    const windBase = 2.5;
    const batBase = 68;
    
    const modifier = (day % 5) * 0.5;
    
    return {
      solar: (solarBase + modifier).toFixed(1),
      wind: (windBase - modifier * 0.2).toFixed(1),
      bat: Math.min(100, Math.max(20, Math.round(batBase + modifier * 5)))
    };
  };

  const getAIRecommendation = (date: Date) => {
    const day = date.getDate();
    if (day % 3 === 0) return {
      text: "High solar generation expected. Schedule heavy loads (irrigation pumps) for mid-day (11 AM - 3 PM).",
      icon: Sun,
      type: 'solar',
      reason: "High Irradiance"
    };
    if (day % 3 === 1) return {
      text: "Wind speeds forecast to drop. Conserve battery usage for evening peak hours.",
      icon: Battery,
      type: 'warning',
      reason: "Low Wind"
    };
    return {
      text: "Optimal weather conditions detected. Grid export is recommended to maximize revenue.",
      icon: UtilityPole,
      type: 'grid',
      reason: "Stable Grid"
    };
  };

  const currentForecast = getDailyForecast(forecastDate);
  const aiRecommendation = getAIRecommendation(forecastDate);

  // --- Components DEFINED BEFORE USAGE ---

  const Header = () => (
    <div className="bg-[#fff7ed] border-b border-orange-200 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('dashboard')}>
              <span className="text-3xl font-serif font-bold text-[#9f1239] tracking-tight">{t('appName')}</span>
            </div>
            <div className="hidden md:flex items-center text-stone-600 text-sm bg-orange-100 px-3 py-1 rounded-full border border-orange-200 font-serif">
              <MapPin size={14} className="mr-1 text-orange-600" />
              {t('location')}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-700 font-serif">
              <span className="hover:text-[#9f1239] cursor-pointer" onClick={() => { setView('detail'); setActiveTab('Overview'); }}>{t('overview')}</span>
              <span className="hover:text-[#9f1239] cursor-pointer px-3 py-1 bg-amber-50 rounded-full border border-amber-200" onClick={() => setView('prediction')}>Predict</span>
              <span className="hover:text-[#9f1239] cursor-pointer" onClick={() => setView('settings')}><Settings size={20} /></span>
            </div>
            <div 
              className="h-9 w-9 bg-[#1e3a8a] rounded-full flex items-center justify-center text-white font-bold border-2 border-orange-100 shadow-sm font-serif cursor-pointer hover:scale-105 transition-transform"
              onClick={() => setView('profile')}
            >
              R
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const StatusCard = ({ title, value, unit, bgColor, icon: Icon, subtext }: StatusCardProps) => (
    <div className={`${bgColor} text-white rounded-xl p-5 shadow-lg relative overflow-hidden cursor-pointer h-full border border-white/20`} onClick={() => { setView('detail'); setActiveTab('Overview'); }}>
      <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-10 -mt-10 blur-xl"></div>
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2 opacity-90">
            <Icon size={20} className="opacity-90" />
            <span className="text-sm font-medium font-serif tracking-wide">{title}</span>
          </div>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-3xl font-bold tracking-tight font-serif">{value}</span>
            <span className="text-sm font-medium opacity-80 font-serif">{unit}</span>
          </div>
        </div>
        {subtext && <div className="mt-4 text-xs font-medium text-right opacity-90 font-serif italic">{subtext}</div>}
      </div>
    </div>
  );

  const OverviewTab = () => {
    // FIX: Assign icon to capitalized variable for React rendering
    const RecommendationIcon = aiRecommendation.icon;

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-[#fff7ed] p-6 rounded-xl shadow-md border border-orange-100 relative min-h-[400px]">
             <div className="flex justify-between items-center mb-8">
                <h3 className="font-bold text-[#7c2d12] font-serif text-lg">{t('energyArchitecture')}</h3>
                <div className="flex items-center gap-2 text-xs bg-white text-[#9f1239] px-3 py-1 rounded-full border border-orange-200 shadow-sm font-serif">
                  <span className="w-2 h-2 bg-[#9f1239] rounded-full animate-pulse"></span>
                  AI Optimized
                </div>
             </div>
             <div className="relative h-64 md:h-80 w-full select-none">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                   <defs>
                     <path id="path-solar" d="M 15 25 L 35 25 Q 38 25 38 28 L 38 46 Q 38 49 41 49 L 43 49" />
                     <path id="path-grid" d="M 85 25 L 65 25 Q 62 25 62 28 L 62 46 Q 62 49 59 49 L 57 49" />
                     <path id="path-battery" d="M 15 75 L 35 75 Q 38 75 38 72 L 38 54 Q 38 51 41 51 L 43 51" />
                     <path id="path-home" d="M 57 51 L 62 51 Q 62 51 62 54 L 62 72 Q 62 75 65 75 L 85 75" />
                     <path id="path-wind" d="M 50 5 L 50 42" />
                   </defs>
                   <use href="#path-solar" stroke="#78350f" strokeWidth="1.5" fill="none" strokeDasharray="5,5" opacity="0.4" />
                   <use href="#path-grid" stroke="#ef4444" strokeWidth="1.5" fill="none" strokeDasharray="5,5" opacity="0.6" />
                   <use href="#path-battery" stroke="#78350f" strokeWidth="1.5" fill="none" strokeDasharray="5,5" opacity="0.4" />
                   <use href="#path-home" stroke="#78350f" strokeWidth="1.5" fill="none" strokeDasharray="5,5" opacity="0.4" />
                   <use href="#path-wind" stroke="#78350f" strokeWidth="1.5" fill="none" strokeDasharray="5,5" opacity="0.4" />
                   <circle r="2" fill="#d97706"><animateMotion dur="3s" repeatCount="indefinite"><mpath href="#path-solar" /></animateMotion></circle> 
                   <circle r="2" fill="#15803d"><animateMotion dur="5s" repeatCount="indefinite"><mpath href="#path-battery" /></animateMotion></circle> 
                   <circle r="2" fill="#1e40af"><animateMotion dur="3s" repeatCount="indefinite"><mpath href="#path-home" /></animateMotion></circle> 
                   <circle r="2" fill="#0ea5e9"><animateMotion dur="4s" repeatCount="indefinite"><mpath href="#path-wind" /></animateMotion></circle> 
                </svg>

                <div className="absolute top-0 left-[5%] md:left-[10%]"><FlowNode icon={Sun} label="0.00 W" value="Solar" status="solar" onClick={() => handleNodeClick('Solar')} /></div>
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2"><FlowNode icon={Wind} label="0.00 W" value="Wind" status="wind" onClick={() => handleNodeClick('Wind')} /></div>
                <div className="absolute top-0 right-[5%] md:right-[10%] text-center">
                   <div className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform" onClick={() => handleNodeClick('Grid')}>
                      <UtilityPole size={32} className="text-stone-400 mb-2" />
                      <span className="font-bold text-stone-500">0 W</span>
                      <span className="text-xs text-red-500 font-bold bg-red-50 px-2 py-0.5 rounded mt-1 border border-red-100">Off-grid</span>
                   </div>
                </div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                   <div className="flex flex-col items-center bg-white border-2 border-[#1e3a8a] p-4 rounded-xl shadow-xl w-32 h-32 justify-center">
                      <div className="bg-[#1e3a8a] p-2 rounded-lg mb-2 shadow-md"><Zap className="text-white" size={24} /></div>
                      <span className="font-medium text-[#1e3a8a] font-serif">Inverter</span>
                   </div>
                </div>
                <div className="absolute bottom-0 left-[5%] md:left-[10%]"><FlowNode icon={Battery} label="68%" value="256 W" status="neutral" onClick={() => handleNodeClick('Battery')} /></div>
                <div className="absolute bottom-0 right-[5%] md:right-[10%]"><FlowNode icon={Home} label="Home" value="150 W" status="neutral" onClick={() => handleNodeClick('Home')} /></div>
             </div>
          </div>
          <div className="flex flex-col gap-6">
             <div className="bg-[#fff7ed] p-6 rounded-xl shadow-md border border-orange-100 flex flex-col justify-center gap-4 h-full relative">
                 <div className="flex justify-between items-start">
                     <h3 className="font-bold text-[#7c2d12] font-serif text-lg">{t('forecast')}</h3>
                     
                     {/* Calendar Icon and Popup */}
                     <button 
                       onClick={() => setShowCalendar(!showCalendar)} 
                       className="text-[#9f1239] hover:bg-orange-100 p-1 rounded transition-colors relative"
                     >
                         <Calendar size={20} />
                         {showCalendar && (
                             <div className="absolute right-0 top-8 bg-white border border-orange-200 shadow-xl rounded-lg p-3 z-50 w-64">
                                 <div className="font-bold text-stone-700 mb-2 border-b border-orange-100 pb-1 text-left">Select Date</div>
                                 <div className="grid grid-cols-7 gap-1 text-xs text-center">
                                     {['S','M','T','W','T','F','S'].map((d, i) => <div key={i} className="text-stone-400">{d}</div>)}
                                     {Array.from({length: 30}, (_, i) => i + 1).map(day => (
                                         <div 
                                             key={day} 
                                             onClick={(e) => {
                                                 e.stopPropagation();
                                                 const newDate = new Date();
                                                 newDate.setDate(day); 
                                                 setForecastDate(newDate);
                                                 setShowCalendar(false);
                                             }}
                                             className={`p-1 rounded cursor-pointer hover:bg-orange-50 ${forecastDate.getDate() === day ? 'bg-[#9f1239] text-white' : 'text-stone-600'}`}
                                         >
                                             {day}
                                         </div>
                                     ))}
                                 </div>
                             </div>
                         )}
                     </button>
                 </div>
                 
                 <div className="text-xs text-stone-500 font-serif italic -mt-2 mb-2">
                   Data for {forecastDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                 </div>

                 <div className="flex items-center justify-between">
                    <div className="text-sm text-stone-500 font-serif flex items-center gap-2"><Sun size={16} className="text-[#d97706]" /> Solar Forecast</div>
                    <div className="text-xl font-bold text-[#d97706] font-serif">{isLoadingAI ? "..." : `${currentForecast.solar}`} <span className="text-xs text-stone-500 font-normal">kWh</span></div>
                 </div>
                 <div className="h-px bg-orange-200 w-full"></div>
                 <div className="flex items-center justify-between">
                    <div className="text-sm text-stone-500 font-serif flex items-center gap-2"><Wind size={16} className="text-[#0ea5e9]" /> Wind Forecast</div>
                    <div className="text-xl font-bold text-[#0ea5e9] font-serif">{isLoadingAI ? "..." : `${currentForecast.wind}`} <span className="text-xs text-stone-500 font-normal">kWh</span></div>
                 </div>
                 <div className="h-px bg-orange-200 w-full"></div>
                 <div className="flex items-center justify-between">
                    <div className="text-sm text-stone-500 font-serif flex items-center gap-2"><Battery size={16} className="text-[#15803d]" /> Battery SOC</div>
                    <div className="text-xl font-bold text-[#15803d] font-serif">{currentForecast.bat}<span className="text-xs text-stone-500 font-normal">%</span></div>
                 </div>
                 
                 {/* AI Recommendation Section - UPDATED */}
                 <div className="bg-white p-4 rounded-xl border border-orange-100 mt-2 relative overflow-hidden group hover:shadow-md transition-all duration-300">
                   {/* Decorative background glow based on type */}
                   <div className={`absolute -right-4 -top-4 w-16 h-16 rounded-full blur-2xl opacity-20 transition-colors duration-500 ${
                      aiRecommendation.type === 'solar' ? 'bg-amber-500' :
                      aiRecommendation.type === 'warning' ? 'bg-red-500' :
                      'bg-blue-500'
                   }`}></div>

                   <div className="flex items-start gap-3 relative z-10">
                       <div className={`p-2.5 rounded-full shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 ${
                          aiRecommendation.type === 'solar' ? 'bg-amber-100 text-amber-600' :
                          aiRecommendation.type === 'warning' ? 'bg-red-50 text-red-600' :
                          'bg-blue-100 text-blue-600'
                       }`}>
                         <RecommendationIcon size={20} className={aiRecommendation.type === 'solar' ? 'animate-[spin_10s_linear_infinite]' : ''} />
                       </div>
                       <div className="flex-1">
                           <div className="flex justify-between items-center mb-1">
                             <div className="text-xs font-bold text-[#7c2d12] uppercase tracking-wide">AI Insight</div>
                             <div className="text-[10px] px-2 py-0.5 rounded-full bg-stone-100 text-stone-500 border border-stone-200 group-hover:bg-[#fff7ed] group-hover:text-[#9f1239] group-hover:border-orange-200 transition-colors">
                               {aiRecommendation.reason}
                             </div>
                           </div>
                           <div className="text-sm text-stone-600 leading-relaxed font-medium">
                             {aiRecommendation.text}
                           </div>
                       </div>
                   </div>
                 </div>
             </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-orange-100">
                   <div className="text-sm text-stone-500 mb-1 font-serif">{t('weather')}</div>
                   <div className="flex items-center gap-2">
                      <CloudSun className="text-orange-500" size={24} />
                      <span className="text-xl font-bold block font-serif text-stone-800">{weatherData.temp}°C</span>
                   </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-orange-100">
                   <div className="text-sm text-stone-500 mb-1 font-serif">{t('radiation')}</div>
                   <div className="flex items-center gap-2">
                      <Sun className="text-amber-500" size={20} />
                      <span className="text-xl font-bold font-serif text-stone-800">High</span>
                   </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-orange-100 col-span-2"> 
                  <div className="text-sm text-stone-500 mb-1 font-serif">{t('carbonReduction')}</div>
                  <div className="flex items-center gap-2">
                      <Leaf className="text-green-500" size={24} />
                      <span className="text-xl font-bold block font-serif text-stone-800">128 <span className="text-sm font-normal text-stone-500">kg</span></span>
                  </div>
                </div>
             </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#fff7ed] p-6 rounded-xl shadow-md border border-orange-100">
            <div className="flex justify-between items-center mb-6">
               <h3 className="text-lg font-bold text-[#7c2d12] font-serif">{t('powerProfile')}</h3>
               {isLoadingAI && <span className="text-xs text-[#9f1239] animate-pulse">Updating model...</span>}
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-[10px] text-stone-600 mb-4 font-serif">
               <div className="flex items-center gap-1"><span className="w-4 h-0.5 border-t-2 border-dashed border-[#d97706]"></span> Pred. Solar</div>
               <div className="flex items-center gap-1"><span className="w-4 h-0.5 border-t-2 border-dashed border-[#0ea5e9]"></span> Pred. Wind</div>
               <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#15803d]"></span> Battery SOC</div>
            </div>
            <div className="h-64">
               <MultiLineChart datasets={[
                 { 
                   color: "#d97706", 
                   data: [0, 0, 0, 5, 20, 45, 65, 80, 85, 80, 60, 40, 20, 5, 0, 0, 0], 
                   isPrediction: true 
                 },
                 { 
                   color: "#0ea5e9", 
                   data: [40, 35, 45, 50, 55, 40, 30, 25, 20, 25, 40, 55, 60, 50, 45, 40, 35], 
                   isPrediction: true 
                 },
                 { 
                   color: "#15803d", 
                   data: [60, 58, 55, 52, 50, 48, 55, 65, 75, 85, 90, 95, 92, 88, 80, 75, 70], 
                   isPrediction: false 
                 }
               ]} />
            </div>
          </div>
          <div className="bg-[#fff7ed] p-6 rounded-xl shadow-md border border-orange-100">
            <div className="flex justify-between items-center mb-6">
               <h3 className="text-lg font-bold text-[#7c2d12] font-serif">{t('usageHistory')}</h3>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-[10px] text-stone-600 mb-4 font-serif">
               <div className="flex items-center gap-1"><span className="w-2 h-2 bg-[#d97706]"></span> Solar</div>
               <div className="flex items-center gap-1"><span className="w-2 h-2 bg-[#0ea5e9]"></span> Wind</div>
               <div className="flex items-center gap-1"><span className="w-2 h-2 bg-[#b45309]"></span> Cons.</div>
               <div className="flex items-center gap-1"><span className="w-4 h-0.5 border-t-2 border-dashed border-stone-400"></span> Pred.</div>
            </div>
            <div className="h-64 pl-4">
               <CustomBarChart data={[
                 {label: '1', solar: 8, wind: 3, cons: -11, isPrediction: false}, 
                 {label: '2', solar: 9, wind: 3, cons: -12, isPrediction: false}, 
                 {label: '3', solar: 10, wind: 3, cons: -13, isPrediction: false}, 
                 {label: '4', solar: 12, wind: 4, cons: -12, isPrediction: true}, 
                 {label: '5', solar: 11, wind: 4, cons: -11, isPrediction: true}, 
                 {label: '6', solar: 10, wind: 3, cons: -10, isPrediction: true}
               ]} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const PlantInfoTab = () => (
    <div className="bg-[#fff7ed] rounded-xl shadow-md border border-orange-100 p-8 space-y-10 font-serif">
       {[
         { title: "Solar PV System", 
           image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80",
           items: [
             { l: "Grid connection type", v: "Hybrid / Storage" },
             { l: "Total PV Capacity", v: "6.0 kWp" },
             { l: "Module Type", v: "Monocrystalline 450W" },
             { l: "Number of Strings", v: "2" },
             { l: "Inverter Model", v: "Deye SUN-6K-SG03LP1" }
         ]},
         { title: "Wind Turbine System", 
           image: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?auto=format&fit=crop&w=800&q=80",
           items: [
             { l: "Turbine Model", v: "Ventus-X 5kW" },
             { l: "Rated Power", v: "5.0 kW" },
             { l: "Rotor Diameter", v: "4.2 meters" },
             { l: "Cut-in Wind Speed", v: "2.5 m/s" },
             { l: "Mounting Height", v: "15 meters" }
         ]},
         { title: "Battery Storage", 
           image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=800&q=80",
           items: [
             { l: "Battery Technology", v: "Lithium Iron Phosphate (LFP)" },
             { l: "Total Capacity", v: "10.24 kWh" },
             { l: "Nominal Voltage", v: "51.2 V" },
             { l: "Max Discharge Current", v: "120 A" },
             { l: "Cycle Life", v: "> 6000 Cycles" }
         ]},
         { title: "Yield Info", items: [
             { l: "Currency", v: "INR" },
             { l: "Unit Price", v: "₹ 7.50 / kWh" },
             { l: "Total Investment", v: "₹ 4,50,000" }
         ]}
       ].map((section, idx) => (
         <div key={idx}>
            <h2 className="text-lg font-bold text-[#7c2d12] border-l-4 border-[#7c2d12] pl-3 mb-6">{section.title}</h2>
            <div className="flex flex-col md:flex-row gap-8">
              {section.image && (
                <div className="w-full md:w-64 h-40 bg-orange-50 rounded-lg overflow-hidden border border-orange-200 shadow-sm flex-shrink-0">
                  <img src={section.image} alt={section.title} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-y-8 gap-x-4">
                 {section.items.map((item: InfoItem, i: number) => (
                   <div key={i} className={item.full ? "col-span-1 md:col-span-3" : ""}>
                      <label className="block text-xs text-stone-500 mb-1 uppercase tracking-wide">{item.l}</label>
                      <div className="text-stone-800 font-medium border-b border-orange-100 pb-1">{item.v}</div>
                   </div>
                 ))}
              </div>
            </div>
         </div>
       ))}
    </div>
  );

  const DevicesTab = () => (
    <div className="space-y-6 font-serif">
       <div className="bg-[#fff7ed] rounded-xl shadow-md border border-orange-100 overflow-hidden">
         <div className="p-6 border-b border-orange-200 flex justify-between items-center">
            <h3 className="text-lg font-bold text-[#7c2d12]">{t('devices')} List</h3>
            <button className="text-sm text-[#9f1239] hover:underline font-medium">+ Add Device</button>
         </div>
         <table className="w-full text-left text-sm">
            <thead className="bg-[#ffedd5] text-[#9f1239] font-bold">
               <tr>
                  <th className="p-4">Device Type</th>
                  <th className="p-4">Serial Number</th>
                  <th className="p-4">Model</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Last Update</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-orange-100">
               {[
                  { type: 'Inverter', sn: '23041999', model: 'SUN-6K-SG03LP1-EU', status: 'Normal', time: '2025-12-03 19:39:11' },
                  { type: 'Solar Panels', sn: 'PV-998877', model: 'Mono-450W (14x)', status: 'Normal', time: '2025-12-03 19:39:11' },
                  { type: 'Wind Turbine', sn: 'WT-554433', model: 'Ventus-X 5kW', status: 'Normal', time: '2025-12-03 19:39:11' },
                  { type: 'Battery', sn: 'BAT-88210', model: 'Deye-5.12kWh', status: 'Normal', time: '2025-12-03 19:39:11' },
                  { type: 'Smart Meter', sn: 'MTR-1123', model: 'SDM630', status: 'Offline', time: '2025-12-03 14:20:00' },
               ].map((device, idx) => (
                  <tr key={idx} className="hover:bg-orange-50 transition-colors">
                     <td className="p-4 font-medium text-stone-800 flex items-center gap-2">
                        {device.type === 'Inverter' && <Zap size={16} className="text-[#b45309]" />}
                        {device.type === 'Solar Panels' && <Sun size={16} className="text-[#d97706]" />}
                        {device.type === 'Wind Turbine' && <Wind size={16} className="text-[#0ea5e9]" />}
                        {device.type === 'Battery' && <Battery size={16} className="text-[#15803d]" />}
                        {device.type === 'Smart Meter' && <UtilityPole size={16} className="text-[#1e40af]" />}
                        {device.type}
                     </td>
                     <td className="p-4 text-stone-600">{device.sn}</td>
                     <td className="p-4 text-stone-600">{device.model}</td>
                     <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold border ${
                           device.status === 'Normal' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'
                        }`}>
                           {device.status}
                        </span>
                     </td>
                     <td className="p-4 text-right text-stone-500">{device.time}</td>
                  </tr>
               ))}
            </tbody>
         </table>
       </div>
    </div>
  );

  const AlertsTab = () => (
    <div className="space-y-6 font-serif">
       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#fff7ed] p-4 rounded-xl border border-orange-100 shadow-sm flex items-center gap-4">
             <div className="p-3 bg-red-100 text-red-600 rounded-full"><AlertCircle size={24} /></div>
             <div>
                <div className="text-2xl font-bold text-stone-800">0</div>
                <div className="text-xs text-stone-500 uppercase tracking-wide">Active Faults</div>
             </div>
          </div>
          <div className="bg-[#fff7ed] p-4 rounded-xl border border-orange-100 shadow-sm flex items-center gap-4">
             <div className="p-3 bg-amber-100 text-amber-600 rounded-full"><AlertCircle size={24} /></div>
             <div>
                <div className="text-2xl font-bold text-stone-800">2</div>
                <div className="text-xs text-stone-500 uppercase tracking-wide">Warnings (24h)</div>
             </div>
          </div>
          <div className="bg-[#fff7ed] p-4 rounded-xl border border-orange-100 shadow-sm flex items-center gap-4">
             <div className="p-3 bg-blue-100 text-blue-600 rounded-full"><Bell size={24} /></div>
             <div>
                <div className="text-2xl font-bold text-stone-800">5</div>
                <div className="text-xs text-stone-500 uppercase tracking-wide">Total Events</div>
             </div>
          </div>
       </div>

       <div className="bg-[#fff7ed] rounded-xl shadow-md border border-orange-100 overflow-hidden">
         <div className="p-6 border-b border-orange-200">
            <h3 className="text-lg font-bold text-[#7c2d12]">{t('alerts')} History</h3>
         </div>
         <div className="divide-y divide-orange-100">
            {[
               { msg: "Grid Frequency High", type: "Warning", time: "2025-12-03 14:22:10", status: "Resolved" },
               { msg: "Battery Communication Error", type: "Critical", time: "2025-12-02 09:15:00", status: "Resolved" },
               { msg: "System Startup", type: "Info", time: "2025-12-01 06:00:00", status: "Info" },
            ].map((alert, idx) => (
               <div key={idx} className="p-4 hover:bg-orange-50 transition-colors flex items-start gap-4">
                  <div className={`mt-1 w-2 h-2 rounded-full ${
                     alert.type === 'Critical' ? 'bg-red-500' : alert.type === 'Warning' ? 'bg-amber-500' : 'bg-blue-500'
                  }`}></div>
                  <div className="flex-1">
                     <div className="flex justify-between items-start">
                        <h4 className="font-bold text-stone-800">{alert.msg}</h4>
                        <span className="text-xs text-stone-400">{alert.time}</span>
                     </div>
                     <div className="flex gap-2 mt-1">
                        <span className={`text-xs px-2 py-0.5 rounded border ${
                           alert.type === 'Critical' ? 'bg-red-50 text-red-600 border-red-100' : 
                           alert.type === 'Warning' ? 'bg-amber-50 text-amber-600 border-amber-100' : 
                           'bg-blue-50 text-blue-600 border-blue-100'
                        }`}>{alert.type}</span>
                        <span className="text-xs text-stone-500 px-2 py-0.5 border border-stone-200 rounded bg-white">{alert.status}</span>
                     </div>
                  </div>
               </div>
            ))}
         </div>
       </div>
    </div>
  );

  const ComponentDetailPage = () => {
    if (!selectedComponent) return null;

    const getComponentData = (type: string) => {
      switch(type) {
        case 'Solar':
          return {
            title: "Solar Generation Analytics",
            color: "#d97706",
            icon: Sun,
            stats: [
              { label: "Today's Yield", val: "24.5 kWh" },
              { label: "Peak Power", val: "4.2 kW" },
              { label: "Efficiency", val: "98.5%" }
            ],
            chartData: { color: "#d97706", data: [0,0,5,15,40,65,80,85,70,50,20,5,0] },
            donut: { val: 75, label: "Direct Use" }
          };
        case 'Wind':
          return {
            title: "Wind Turbine Analytics",
            color: "#0ea5e9",
            icon: Wind,
            stats: [
              { label: "Today's Yield", val: "12.8 kWh" },
              { label: "Avg Wind Speed", val: "6.5 m/s" },
              { label: "Peak Power", val: "3.1 kW" }
            ],
            chartData: { color: "#0ea5e9", data: [20,25,15,10,30,45,50,40,35,55,60,50,45] },
            donut: { val: 100, label: "To Battery" }
          };
        case 'Battery':
          return {
            title: "Battery Storage Status",
            color: "#15803d",
            icon: Battery,
            stats: [
              { label: "Current SOC", val: "68%" },
              { label: "Discharged Today", val: "5.2 kWh" },
              { label: "Cycles (Total)", val: "412" }
            ],
            chartData: { color: "#15803d", data: [40,38,35,32,30,45,60,75,85,90,80,75,68] },
            donut: { val: 68, label: "Charge Lvl" }
          };
        case 'Grid':
          return {
            title: "Grid Interaction Details",
            color: "#ef4444",
            icon: UtilityPole,
            stats: [
              { label: "Imported Today", val: "0.0 kWh" },
              { label: "Exported Today", val: "15.4 kWh" },
              { label: "Grid Status", val: "Off-Grid" }
            ],
            chartData: { color: "#ef4444", data: [0,0,0,0,0,0,0,0,0,0,0,0,0] },
            donut: { val: 0, label: "Dependency" }
          };
        case 'Home':
          return {
            title: "Home Consumption",
            color: "#1e40af",
            icon: Home,
            stats: [
              { label: "Total Load", val: "18.2 kWh" },
              { label: "Peak Load", val: "3.5 kW" },
              { label: "Green Energy", val: "100%" }
            ],
            chartData: { color: "#1e40af", data: [10,10,12,15,20,35,40,25,20,18,35,40,20] },
            donut: { val: 92, label: "Self-Suf." }
          };
        default: return {};
      }
    };

    const data = getComponentData(selectedComponent);
    const Icon = data.icon || Zap;

    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex items-center justify-between bg-[#fff7ed] p-6 rounded-xl border border-orange-200 shadow-sm">
          <div className="flex items-center gap-4">
             <div className="p-3 rounded-full bg-white border border-orange-100 shadow-sm" style={{ color: data.color }}>
               <Icon size={32} />
             </div>
             <div>
                <h1 className="text-2xl font-bold text-[#7c2d12] font-serif">{data.title}</h1>
                <p className="text-stone-500 text-sm font-serif">Detailed Performance Metrics</p>
             </div>
          </div>
          <button onClick={() => setView('detail')} className="flex items-center gap-2 text-[#9f1239] hover:bg-orange-50 px-4 py-2 rounded-lg transition-colors font-medium">
             <ArrowLeft size={20} /> Back to Overview
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.stats && data.stats.map((stat, i) => (
             <div key={i} className="bg-[#fff7ed] p-6 rounded-xl shadow-md border border-orange-100 hover:shadow-lg transition-shadow">
                <div className="text-xs text-stone-500 uppercase tracking-wider mb-2 font-serif font-bold">{stat.label}</div>
                <div className="text-3xl font-bold font-serif" style={{ color: data.color }}>{stat.val}</div>
             </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 bg-[#fff7ed] p-8 rounded-xl shadow-md border border-orange-100">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="text-lg font-bold text-[#7c2d12] font-serif flex items-center gap-2">
                    <BarChart3 size={20} /> Past Generation & Consumption
                 </h3>
                 <select className="bg-white border border-orange-200 text-stone-600 text-sm rounded px-3 py-1 outline-none font-serif">
                    <option>Last 24 Hours</option>
                    <option>Last 7 Days</option>
                    <option>Last Month</option>
                 </select>
              </div>
              <div className="h-72">
                 {data.chartData && (
                   <MultiLineChart datasets={[
                      { color: data.color, data: data.chartData.data, isPrediction: false },
                      { color: data.color, data: data.chartData.data.map(v => v * 1.1), isPrediction: true } 
                   ]} />
                 )}
              </div>
              <div className="flex justify-center gap-6 mt-4 text-xs text-stone-500 font-serif">
                 <div className="flex items-center gap-2"><span className="w-3 h-1" style={{ backgroundColor: data.color }}></span> Actual Data</div>
                 <div className="flex items-center gap-2"><span className="w-3 h-1 border-t-2 border-dashed" style={{ borderColor: data.color }}></span> AI Forecast</div>
              </div>
           </div>

           <div className="bg-[#fff7ed] p-8 rounded-xl shadow-md border border-orange-100 flex flex-col items-center justify-center">
              <h3 className="text-lg font-bold text-[#7c2d12] font-serif mb-6 flex items-center gap-2">
                 <PieChart size={20} /> Efficiency Split
              </h3>
              {data.donut && <DonutChart percent={data.donut.val} color={data.color} label={data.donut.label} subLabel={`${data.donut.val}%`} />}
              <div className="mt-8 text-center text-sm text-stone-600 font-serif">
                 <p className="mb-2 font-bold">System Health</p>
                 <div className="flex gap-1 justify-center">
                    {[1,2,3,4,5].map(star => <div key={star} className={`w-2 h-2 rounded-full ${star < 5 ? 'bg-green-500' : 'bg-stone-300'}`}></div>)}
                 </div>
                 <p className="text-xs text-stone-400 mt-1">Optimal Performance</p>
              </div>
           </div>
        </div>
      </div>
    );
  };

  const PlantDetailView = () => (
    <div className="min-h-screen bg-[#fff7ed] pb-20 font-serif">
      <div className="bg-white border-b border-orange-200 px-4 sm:px-8 py-3 sticky top-16 z-40 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
           <div className="flex items-center gap-3">
             <button onClick={() => view === 'component-detail' ? setView('detail') : setView('dashboard')} className="md:hidden"><ChevronLeft/></button>
             <h1 className="text-xl font-bold text-[#7c2d12]">Ponnaiyan</h1>
             <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1 text-[#15803d] font-medium"><div className="w-2 h-2 bg-[#15803d] rounded-full"></div> Online</span>
                <span className="font-bold text-stone-600">6kWp</span>
             </div>
           </div>
           {view !== 'component-detail' && (
             <div className="flex gap-6 text-sm font-medium text-stone-500 overflow-x-auto">
                {['Overview', 'Devices', 'Alerts', 'Plant Info'].map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)} className={`pb-2 whitespace-nowrap transition-colors ${activeTab === tab ? 'text-[#9f1239] border-b-2 border-[#9f1239] font-bold' : 'hover:text-[#9f1239]'}`}>{t(tab.toLowerCase().replace(" ", ""))}</button>
                ))}
             </div>
           )}
        </div>
        <div className="text-xs text-stone-400 mt-1">Last update 2025-12-03 19:40:11 (UTC+05:30)</div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
         {view !== 'component-detail' && activeTab === 'Overview' && <OverviewTab />}
         {view !== 'component-detail' && activeTab === 'Plant Info' && <PlantInfoTab />}
         {view !== 'component-detail' && activeTab === 'Devices' && <DevicesTab />}
         {view !== 'component-detail' && activeTab === 'Alerts' && <AlertsTab />}
         
         {view === 'component-detail' && <ComponentDetailPage />}
      </div>
    </div>
  );

  const PredictionPage = () => (
    <div className="max-w-6xl mx-auto px-4 py-8 font-serif space-y-8">
      {/* Header */}
      <div className="flex items-center gap-2 text-stone-500 mb-4 cursor-pointer hover:text-[#9f1239]" onClick={() => setView('dashboard')}>
        <ChevronLeft size={20} /> Back to Dashboard
      </div>
      
      <h1 className="text-3xl font-bold text-[#9f1239]">Energy Prediction & Analysis</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Form */}
        <div className="lg:col-span-1 bg-[#fff7ed] p-6 rounded-xl shadow-md border border-orange-100 h-fit">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-[#7c2d12]">Input Parameters</h2>
            <button onClick={fetchLiveWeather} className="px-3 py-1.5 bg-amber-500 text-white text-xs font-bold rounded-md hover:bg-amber-600 transition-colors">
              📡 Auto Fill
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1 uppercase">SOLAR SECTION</label>
              <div className="border-b-2 border-orange-200 mb-3"></div>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Irradiation (W/m²)</label>
              <input type="number" step="0.01" value={predictionInputs.solar_irradiation} onChange={(e) => setPredictionInputs({...predictionInputs, solar_irradiation: Number(e.target.value)})} className="w-full px-3 py-2 border border-orange-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#9f1239]" />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Ambient Temp (°C)</label>
              <input type="number" step="0.01" value={predictionInputs.solar_ambient_temp} onChange={(e) => setPredictionInputs({...predictionInputs, solar_ambient_temp: Number(e.target.value)})} className="w-full px-3 py-2 border border-orange-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#9f1239]" />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Module Temp (°C)</label>
              <input type="number" step="0.01" value={predictionInputs.solar_module_temp} onChange={(e) => setPredictionInputs({...predictionInputs, solar_module_temp: Number(e.target.value)})} className="w-full px-3 py-2 border border-orange-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#9f1239]" />
            </div>

            <div className="mt-5">
              <label className="block text-xs font-bold text-stone-700 mb-1 uppercase">WIND SECTION</label>
              <div className="border-b-2 border-orange-200 mb-3"></div>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Wind Speed @ 10m (m/s)</label>
              <input type="number" step="0.01" value={predictionInputs.wind_speed_10} onChange={(e) => setPredictionInputs({...predictionInputs, wind_speed_10: Number(e.target.value)})} className="w-full px-3 py-2 border border-orange-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#9f1239]" />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Wind Speed @ 100m (m/s)</label>
              <input type="number" step="0.01" value={predictionInputs.wind_speed_100} onChange={(e) => setPredictionInputs({...predictionInputs, wind_speed_100: Number(e.target.value)})} className="w-full px-3 py-2 border border-orange-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#9f1239]" />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Wind Gust @ 10m (m/s)</label>
              <input type="number" step="0.01" value={predictionInputs.wind_gust_10} onChange={(e) => setPredictionInputs({...predictionInputs, wind_gust_10: Number(e.target.value)})} className="w-full px-3 py-2 border border-orange-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#9f1239]" />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Wind Dir @ 10m (°)</label>
              <input type="number" step="0.01" value={predictionInputs.wind_dir_10m} onChange={(e) => setPredictionInputs({...predictionInputs, wind_dir_10m: Number(e.target.value)})} className="w-full px-3 py-2 border border-orange-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#9f1239]" />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Wind Dir @ 100m (°)</label>
              <input type="number" step="0.01" value={predictionInputs.wind_dir_100m} onChange={(e) => setPredictionInputs({...predictionInputs, wind_dir_100m: Number(e.target.value)})} className="w-full px-3 py-2 border border-orange-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#9f1239]" />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Ambient Temp (°C)</label>
              <input type="number" step="0.01" value={predictionInputs.wind_ambient_temp} onChange={(e) => setPredictionInputs({...predictionInputs, wind_ambient_temp: Number(e.target.value)})} className="w-full px-3 py-2 border border-orange-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#9f1239]" />
            </div>

            <button onClick={performFullPrediction} disabled={isPredicting} className="w-full mt-6 px-4 py-3 bg-[#9f1239] text-white rounded-lg font-bold hover:bg-[#881337] disabled:bg-stone-400 transition-colors">
              {isPredicting ? 'Predicting...' : 'Predict Energy Output'}
            </button>
          </div>
        </div>

        {/* Results - Energy Architecture Diagram */}
        <div className="lg:col-span-2">
          {Object.keys(predictionResults).length > 0 ? (
            <div className="bg-[#fff7ed] p-8 rounded-xl shadow-md border border-orange-100">
              <h2 className="text-lg font-bold text-[#7c2d12] mb-6">Energy Architecture</h2>
              
              <div className="relative w-full h-96 bg-white rounded-lg border border-orange-100 flex items-center justify-center">
                {/* Grid representing the system */}
                <svg viewBox="0 0 1000 400" className="w-full h-full" style={{ maxHeight: '400px' }}>
                  {/* SVG Flow Diagram */}
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                      <polygon points="0 0, 10 3, 0 6" fill="#9f1239" />
                    </marker>
                  </defs>

                  {/* Solar Node */}
                  <g>
                    <rect x="50" y="100" width="120" height="80" fill="#fff9e6" stroke="#d97706" strokeWidth="2" rx="5" />
                    <text x="110" y="130" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#d97706">☀️</text>
                    <text x="110" y="155" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1f2937">{(predictionResults.solar ?? 0).toFixed(2)} kW</text>
                    <text x="110" y="173" textAnchor="middle" fontSize="11" fill="#666">Solar</text>
                  </g>

                  {/* Wind Node */}
                  <g>
                    <rect x="300" y="50" width="120" height="80" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="2" rx="5" />
                    <text x="360" y="80" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0ea5e9">🌪️</text>
                    <text x="360" y="105" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1f2937">{(predictionResults.wind ?? 0).toFixed(2)} kW</text>
                    <text x="360" y="123" textAnchor="middle" fontSize="11" fill="#666">Wind</text>
                  </g>

                  {/* Inverter */}
                  <g>
                    <rect x="500" y="150" width="100" height="100" fill="#1e3a8a" stroke="#1e3a8a" strokeWidth="2" rx="5" />
                    <text x="550" y="190" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#fff">⚡</text>
                    <text x="550" y="220" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#fff">Inverter</text>
                  </g>

                  {/* Arrows to Inverter */}
                  <line x1="170" y1="140" x2="500" y2="190" stroke="#9f1239" strokeWidth="2" markerEnd="url(#arrowhead)" />
                  <line x1="360" y1="130" x2="530" y2="180" stroke="#0ea5e9" strokeWidth="2" markerEnd="url(#arrowhead)" />

                  {/* Battery */}
                  <g>
                    <rect x="50" y="250" width="120" height="100" fill="#f0fdf4" stroke="#15803d" strokeWidth="2" rx="5" />
                    <text x="110" y="290" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#15803d">{(predictionResults.battery ?? 0).toFixed(0)}%</text>
                    <text x="110" y="310" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1f2937">{((predictionResults.battery ?? 0) * 2.56).toFixed(0)} Wh</text>
                    <text x="110" y="330" textAnchor="middle" fontSize="11" fill="#666">Battery</text>
                  </g>

                  {/* Grid Export */}
                  <g>
                    <rect x="850" y="150" width="100" height="100" fill="#fef2f2" stroke="#ef4444" strokeWidth="2" rx="5" />
                    <text x="900" y="180" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ef4444">Grid</text>
                    <text x="900" y="205" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1f2937">{(predictionResults.grid ?? 0).toFixed(2)} kW</text>
                    <text x="900" y="225" textAnchor="middle" fontSize="10" fill="#666">Export</text>
                  </g>

                  {/* Home Load */}
                  <g>
                    <rect x="300" y="280" width="120" height="80" fill="#fef3c7" stroke="#b45309" strokeWidth="2" rx="5" />
                    <text x="360" y="310" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#b45309">🏠</text>
                    <text x="360" y="335" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1f2937">{(predictionResults.home ?? 0).toFixed(2)} kW</text>
                    <text x="360" y="353" textAnchor="middle" fontSize="11" fill="#666">Home</text>
                  </g>

                  {/* Arrows from Inverter */}
                  <line x1="550" y1="250" x2="110" y2="280" stroke="#15803d" strokeWidth="2" markerEnd="url(#arrowhead)" />
                  <line x1="550" y1="230" x2="360" y2="280" stroke="#b45309" strokeWidth="2" markerEnd="url(#arrowhead)" />
                  <line x1="600" y1="190" x2="850" y2="190" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowhead)" />
                </svg>
              </div>

              {/* Summary Stats */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-white p-4 rounded-lg border border-orange-100">
                  <div className="text-sm text-stone-600 font-medium">Total Generation</div>
                  <div className="text-2xl font-bold text-[#9f1239] mt-1">{((predictionResults.solar ?? 0) + (predictionResults.wind ?? 0)).toFixed(2)} kW</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-orange-100">
                  <div className="text-sm text-stone-600 font-medium">Home Consumption</div>
                  <div className="text-2xl font-bold text-[#b45309] mt-1">{(predictionResults.home ?? 0).toFixed(2)} kW</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#fff7ed] p-8 rounded-xl shadow-md border border-orange-100 text-center">
              <p className="text-stone-600">Fill in the parameters and click "Predict Energy Output" to see results</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const ProfilePage = () => (
    <div className="max-w-4xl mx-auto px-4 py-8 font-serif space-y-6">
      <div className="flex items-center gap-2 text-stone-500 mb-4 cursor-pointer hover:text-[#9f1239]" onClick={() => setView('dashboard')}>
        <ChevronLeft size={20} /> Back to Dashboard
      </div>
      <div className="bg-white rounded-xl shadow-md border border-orange-100 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-[#9f1239] to-[#b45309]"></div>
        <div className="px-8 pb-8">
          <div className="relative flex justify-between items-end -mt-12 mb-6">
            <div className="flex items-end gap-6">
              <div className="w-24 h-24 bg-[#fff7ed] rounded-full p-1 shadow-lg">
                <div className="w-full h-full bg-[#1e3a8a] rounded-full flex items-center justify-center text-white text-3xl font-bold">R</div>
              </div>
              <div className="mb-1">
                <h1 className="text-2xl font-bold text-stone-800">Ponnaiyan Estate Owner</h1>
                <p className="text-stone-500">Administrator</p>
              </div>
            </div>
            <button className="bg-white border border-stone-200 text-stone-700 px-4 py-2 rounded-lg font-medium hover:bg-stone-50 shadow-sm">Edit Profile</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-bold text-[#7c2d12] border-b border-orange-100 pb-2">Contact Information</h3>
              <div className="flex items-center gap-3 text-stone-600"><Mail size={18} className="text-[#9f1239]" /><span>admin@rajasthansolar.com</span></div>
              <div className="flex items-center gap-3 text-stone-600"><Phone size={18} className="text-[#9f1239]" /><span>+91 98765 43210</span></div>
              <div className="flex items-center gap-3 text-stone-600"><MapPin size={18} className="text-[#9f1239]" /><span>Jaipur, Rajasthan, India</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const SettingsPage = () => {
    const [settingsTab, setSettingsTab] = useState('General');

    const renderSettingsContent = () => {
      switch(settingsTab) {
        case 'General':
          return (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100">
              <h3 className="font-bold text-lg text-stone-800 mb-4 flex items-center gap-2"><Globe size={20} className="text-[#b45309]" /> {t('sysLang')} & Region</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-stone-500 mb-1">{t('sysLang')}</label>
                  <select 
                    value={lang} 
                    onChange={(e) => setLang(e.target.value)}
                    className="w-full p-2 border border-stone-200 rounded-md bg-white text-stone-800 outline-none focus:border-[#b45309]"
                  >
                    <option value="en">English (India)</option>
                    <option value="hi">Hindi</option>
                    <option value="ta">Tamil</option>
                    <option value="raj">Rajasthani</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-stone-500 mb-1">{t('currency')}</label>
                  <select className="w-full p-2 border border-stone-200 rounded-md bg-white text-stone-800 outline-none focus:border-[#b45309]">
                    <option>INR (₹)</option>
                    <option>USD ($)</option>
                  </select>
                </div>
              </div>
            </div>
          );
        case 'Notifications':
          return (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100">
              <h3 className="font-bold text-lg text-stone-800 mb-4 flex items-center gap-2"><Bell size={20} className="text-[#b45309]" /> {t('notifications')}</h3>
              <div className="space-y-3">
                {['Email Alerts for Critical Faults', 'Daily Production Report', 'Weekly Efficiency Summary', 'Marketing & Offers'].map((pref, i) => (
                  <NotificationToggle key={i} label={pref} initialActive={i < 2} />
                ))}
              </div>
            </div>
          );
        case 'Security':
          return (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100">
              <h3 className="font-bold text-lg text-stone-800 mb-4 flex items-center gap-2"><Shield size={20} className="text-[#b45309]" /> {t('security')}</h3>
              <div className="space-y-6">
                <div>
                   <h4 className="text-sm font-bold text-stone-700 mb-2">Change Password</h4>
                   <input type="password" placeholder="Current Password" className="w-full mb-2 p-2 border border-stone-200 rounded bg-white" />
                   <input type="password" placeholder="New Password" className="w-full mb-2 p-2 border border-stone-200 rounded bg-white" />
                   <input type="password" placeholder="Confirm New Password" className="w-full p-2 border border-stone-200 rounded bg-white" />
                   <button className="mt-2 bg-[#1e3a8a] text-white px-4 py-1 rounded text-sm hover:bg-blue-900">Update</button>
                </div>
                <div className="flex items-center justify-between">
                   <div>
                      <div className="text-stone-700 font-medium">Two-Factor Authentication</div>
                      <div className="text-xs text-stone-500">Add an extra layer of security to your account.</div>
                   </div>
                   <button className="text-[#9f1239] text-sm font-bold border border-[#9f1239] px-3 py-1 rounded hover:bg-red-50">Enable</button>
                </div>
              </div>
            </div>
          );
        case 'Display':
          return (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100">
              <h3 className="font-bold text-lg text-stone-800 mb-4 flex items-center gap-2"><Monitor size={20} className="text-[#b45309]" /> {t('display')}</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                   <span className="text-stone-600">Dark Mode</span>
                   <button className="w-10 h-6 bg-stone-200 rounded-full p-1"><div className="w-4 h-4 bg-white rounded-full shadow-md"></div></button>
                </div>
                <div>
                   <label className="block text-sm text-stone-500 mb-1">Content Density</label>
                   <div className="flex gap-2">
                      <button className="flex-1 py-2 border border-[#b45309] text-[#b45309] bg-orange-50 rounded font-medium text-sm">Comfortable</button>
                      <button className="flex-1 py-2 border border-stone-200 text-stone-600 rounded font-medium text-sm hover:bg-stone-50">Compact</button>
                   </div>
                </div>
              </div>
            </div>
          );
        case 'About':
          return (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                 <Info size={32} className="text-[#9f1239]" />
              </div>
              <h3 className="font-bold text-xl text-[#9f1239] mb-1">Rajasthan Solar App</h3>
              <p className="text-stone-500 text-sm mb-6">Version 2.4.0 (Beta)</p>
              <div className="space-y-2 text-sm text-stone-600">
                 <div className="flex justify-between border-b border-stone-100 pb-2"><span>Terms of Service</span><ArrowLeft className="rotate-180" size={16}/></div>
                 <div className="flex justify-between border-b border-stone-100 pb-2"><span>Privacy Policy</span><ArrowLeft className="rotate-180" size={16}/></div>
                 <div className="flex justify-between pt-2"><span>Licenses</span><ArrowLeft className="rotate-180" size={16}/></div>
              </div>
            </div>
          );
        default: return null;
      }
    };

    return (
      <div className="max-w-4xl mx-auto px-4 py-8 font-serif space-y-6">
        <div className="flex items-center gap-2 text-stone-500 mb-4 cursor-pointer hover:text-[#9f1239]" onClick={() => setView('dashboard')}>
          <ChevronLeft size={20} /> Back to Dashboard
        </div>
        
        <h1 className="text-2xl font-bold text-[#7c2d12] mb-6">{t('settings')}</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-2">
            {['General', 'Notifications', 'Security', 'Display', 'About'].map((item, idx) => (
              <div 
                key={idx} 
                onClick={() => setSettingsTab(item)}
                className={`p-3 rounded-lg cursor-pointer font-medium transition-colors ${settingsTab === item ? 'bg-[#fff7ed] text-[#9f1239] border border-orange-200' : 'text-stone-600 hover:bg-stone-50'}`}
              >
                {t(item.toLowerCase())}
              </div>
            ))}
            <div className="pt-4 mt-4 border-t border-stone-100">
              <button onClick={() => { setIsAuthenticated(false); setView('login'); }} className="flex items-center gap-2 text-red-600 px-3 py-2 hover:bg-red-50 w-full rounded-lg transition-colors"><LogOut size={18} /> {t('signOut')}</button>
            </div>
          </div>

          <div className="md:col-span-2 space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              {renderSettingsContent()}
          </div>
        </div>
      </div>
    );
  };

  const SignupPage = () => (
    <div className="min-h-screen bg-[#fff7ed] flex items-center justify-center font-serif relative overflow-hidden">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-orange-100 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#b45309] mb-2">Join the Network</h1>
          <p className="text-stone-500">Create your solar management account</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div><label className="block text-sm font-medium text-stone-700 mb-1">Full Name</label><input type="text" className="w-full px-4 py-2 border border-orange-200 rounded-lg" placeholder="Rana Pratap" /></div>
          <div><label className="block text-sm font-medium text-stone-700 mb-1">Email</label><input type="email" className="w-full px-4 py-2 border border-orange-200 rounded-lg" placeholder="rana@rajasthansolar.com" /></div>
          <div><label className="block text-sm font-medium text-stone-700 mb-1">Password</label><input type="password" className="w-full px-4 py-2 border border-orange-200 rounded-lg" placeholder="••••••••" /></div>
          <button type="submit" className="w-full bg-[#b45309] text-white py-2 rounded-lg font-bold hover:bg-[#92400e] transition-colors shadow-md">Create Account</button>
        </form>
        <div className="mt-6 text-center text-sm text-stone-500">
          Already a member? <span className="text-[#9f1239] font-bold cursor-pointer hover:underline" onClick={() => setView('login')}>Sign In</span>
        </div>
      </div>
    </div>
  );

  const LoginPage = () => (
    <div className="min-h-screen bg-[#fff7ed] flex items-center justify-center font-serif relative overflow-hidden">
      <div className="absolute top-[-100px] left-[-100px] w-64 h-64 bg-orange-200 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-80 h-80 bg-red-200 rounded-full opacity-30 blur-3xl"></div>
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-orange-100 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#9f1239] mb-2">{t('appName')}</h1>
          <p className="text-stone-500">Sign in to manage your estate</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Email / Plant ID</label>
            <input type="text" className="w-full px-4 py-2 border border-orange-200 rounded-lg focus:ring-2 focus:ring-[#9f1239] focus:outline-none" placeholder="admin@rajasthansolar.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Password</label>
            <input type="password" className="w-full px-4 py-2 border border-orange-200 rounded-lg focus:ring-2 focus:ring-[#9f1239] focus:outline-none" placeholder="••••••••" />
          </div>
          <button type="submit" className="w-full bg-[#9f1239] text-white py-2 rounded-lg font-bold hover:bg-[#881337] transition-colors shadow-md">Sign In</button>
        </form>
        <div className="mt-6 text-center text-sm text-stone-500">
          Don't have an account? <span className="text-[#b45309] font-bold cursor-pointer hover:underline" onClick={() => setView('signup')}>Sign Up</span>
        </div>
      </div>
    </div>
  );

  const PlantListView = () => (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Solar Input Form Modal */}
      {showSolarForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md border border-orange-100">
            <h2 className="text-lg font-bold text-[#9f1239] mb-4">Solar Prediction Input</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Irradiation (W/m²)</label>
                <input type="number" value={solarInputs.irradiation} onChange={(e) => setSolarInputs({...solarInputs, irradiation: Number(e.target.value)})} className="w-full px-3 py-2 border border-orange-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#9f1239]" placeholder="500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Ambient Temp (°C)</label>
                <input type="number" value={solarInputs.ambientTemp} onChange={(e) => setSolarInputs({...solarInputs, ambientTemp: Number(e.target.value)})} className="w-full px-3 py-2 border border-orange-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#9f1239]" placeholder="30" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Module Temp (°C)</label>
                <input type="number" value={solarInputs.moduleTemp} onChange={(e) => setSolarInputs({...solarInputs, moduleTemp: Number(e.target.value)})} className="w-full px-3 py-2 border border-orange-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#9f1239]" placeholder="35" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowSolarForm(false)} className="flex-1 px-4 py-2 border border-orange-200 rounded-md text-stone-700 hover:bg-orange-50">Cancel</button>
              <button onClick={callSolarPredict} className="flex-1 px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600">{isLoadingAI ? 'Predicting...' : 'Predict'}</button>
            </div>
          </div>
        </div>
      )}

      {/* Wind Input Form Modal */}
      {showWindForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md border border-orange-100 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold text-[#0ea5e9] mb-4">Wind Prediction Input</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Wind Speed @ 10m (m/s)</label>
                <input type="number" value={windInputs.windSpeed10} onChange={(e) => setWindInputs({...windInputs, windSpeed10: Number(e.target.value)})} className="w-full px-3 py-2 border border-orange-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0ea5e9]" placeholder="5" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Wind Speed @ 100m (m/s)</label>
                <input type="number" value={windInputs.windSpeed100} onChange={(e) => setWindInputs({...windInputs, windSpeed100: Number(e.target.value)})} className="w-full px-3 py-2 border border-orange-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0ea5e9]" placeholder="7" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Wind Gust @ 10m (m/s)</label>
                <input type="number" value={windInputs.windGust10} onChange={(e) => setWindInputs({...windInputs, windGust10: Number(e.target.value)})} className="w-full px-3 py-2 border border-orange-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0ea5e9]" placeholder="6" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Wind Direction @ 10m (°)</label>
                <input type="number" value={windInputs.windDir10} onChange={(e) => setWindInputs({...windInputs, windDir10: Number(e.target.value)})} className="w-full px-3 py-2 border border-orange-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0ea5e9]" placeholder="180" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Wind Direction @ 100m (°)</label>
                <input type="number" value={windInputs.windDir100} onChange={(e) => setWindInputs({...windInputs, windDir100: Number(e.target.value)})} className="w-full px-3 py-2 border border-orange-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0ea5e9]" placeholder="180" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Ambient Temp (°C)</label>
                <input type="number" value={windInputs.ambientTemp} onChange={(e) => setWindInputs({...windInputs, ambientTemp: Number(e.target.value)})} className="w-full px-3 py-2 border border-orange-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0ea5e9]" placeholder="28" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowWindForm(false)} className="flex-1 px-4 py-2 border border-orange-200 rounded-md text-stone-700 hover:bg-orange-50">Cancel</button>
              <button onClick={callWindPredict} className="flex-1 px-4 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600">{isLoadingAI ? 'Predicting...' : 'Predict'}</button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatusCard title={t('realTimePower')} value="0" unit="W" bgColor="bg-[#b45309]" icon={Zap} subtext="Capacity: 6 kWp" />
        <StatusCard title={t('dailyYield')} value="8.6" unit="kWh" bgColor="bg-[#0369a1]" icon={Sun} subtext="" />
        <StatusCard title={t('monthlyYield')} value="24.3" unit="kWh" bgColor="bg-[#be123c]" icon={Calendar} subtext="" />
        <StatusCard title={t('totalProduction')} value="208" unit="kWh" bgColor="bg-[#3f6212]" icon={LayoutDashboard} subtext="" />
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-[#fff7ed] p-4 rounded-xl shadow-sm border border-orange-100">
        <div className="flex gap-2 w-full md:w-auto">
           <div className="flex rounded bg-orange-100 p-1">
             <button className="px-6 py-1.5 text-sm font-medium text-[#9f1239] bg-white shadow-sm rounded font-serif">{t('plantList')}</button>
             <button className="px-6 py-1.5 text-sm font-medium text-stone-600 hover:text-[#9f1239] font-serif">{t('mapView')}</button>
           </div>
        </div>
        <div className="flex gap-2 w-full md:w-auto items-center">
           <div className="relative flex-grow md:flex-grow-0">
             <input type="text" placeholder={t('search')} className="pl-4 pr-10 py-2 border border-orange-200 rounded-md w-full md:w-64 text-sm focus:outline-none focus:ring-1 focus:ring-[#9f1239] bg-white" />
             <Search size={16} className="absolute right-3 top-2.5 text-[#9f1239]" />
           </div>

           <div className="flex items-center gap-3">
             <button onClick={callSolarPredict} className="px-3 py-1.5 bg-amber-500 text-white rounded-md text-sm hover:bg-amber-600 transition-colors">Predict Solar</button>
             <div className="text-sm text-stone-700">{solarPredictionValue !== null ? `${solarPredictionValue.toFixed(2)} kW` : '—'}</div>

             <button onClick={callWindPredict} className="px-3 py-1.5 bg-sky-500 text-white rounded-md text-sm hover:bg-sky-600 transition-colors">Predict Wind</button>
             <div className="text-sm text-stone-700">{windPredictionValue !== null ? `${windPredictionValue.toFixed(2)} kW` : '—'}</div>
           </div>

           <div className="flex items-center gap-3">
             <button onClick={() => setShowSolarForm(true)} className="px-3 py-1.5 bg-amber-500 text-white rounded-md text-sm hover:bg-amber-600 transition-colors">Predict Solar</button>
             <div className="text-sm text-stone-700">{solarPredictionValue !== null ? `${solarPredictionValue.toFixed(2)} kW` : '—'}</div>

             <button onClick={() => setShowWindForm(true)} className="px-3 py-1.5 bg-sky-500 text-white rounded-md text-sm hover:bg-sky-600 transition-colors">Predict Wind</button>
             <div className="text-sm text-stone-700">{windPredictionValue !== null ? `${windPredictionValue.toFixed(2)} kW` : '—'}</div>
           </div>

           <button className="flex items-center gap-1 bg-[#9f1239] text-white px-4 py-2 rounded-md text-sm hover:bg-[#881337] font-medium font-serif shadow-md transition-all">
             <Plus size={16} /> {t('newPlant')}
           </button>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-orange-100 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm font-serif">
          <thead className="bg-[#ffedd5] text-[#9f1239] font-bold border-b border-orange-200">
            <tr>
              <th className="p-4 w-1/4">Name</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-center">Alerts</th>
              <th className="p-4 text-right">Capacity (kWp)</th>
              <th className="p-4 text-right">Current (kW)</th>
              <th className="p-4 hidden md:table-cell text-center">Trend</th>
              <th className="p-4 text-right">Daily (kWh)</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-orange-50 transition-colors cursor-pointer border-b border-orange-50" onClick={() => { setView('detail'); setActiveTab('Overview'); }}>
              <td className="p-4">
                <div className="font-bold text-stone-800 text-base">Ponnaiyan Estate</div>
                <div className="text-xs text-stone-500 mt-1">Meenachipalayam</div>
              </td>
              <td className="p-4 text-center"><div className="w-3 h-3 rounded-full bg-green-600 mx-auto shadow-sm"></div></td>
              <td className="p-4 text-center"><div className="w-3 h-3 rounded-full bg-green-600 mx-auto shadow-sm"></div></td>
              <td className="p-4 text-right text-stone-700 font-bold">6.0</td>
              <td className="p-4 text-right text-stone-700 font-bold">0.0</td>
              <td className="p-4 hidden md:table-cell w-32">
                <div className="h-8 w-24 mx-auto opacity-70">
                  <svg viewBox="0 0 50 20" className="w-full h-full stroke-[#b45309] fill-orange-50">
                    <polyline points="0,20 5,15 10,18 15,5 20,12 25,8 30,15 35,18 40,10 45,5 50,20" fill="none" strokeWidth="1.5" />
                  </svg>
                </div>
              </td>
              <td className="p-4 text-right text-stone-700 font-bold">8.6</td>
              <td className="p-4 text-center">
                <div className="flex justify-center gap-4 text-[#9f1239]">
                  <Edit2 size={16} className="cursor-pointer hover:text-[#881337]" />
                  <Trash2 size={16} className="cursor-pointer hover:text-red-600" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  if (!isAuthenticated) {
    return view === 'signup' ? <SignupPage /> : <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-[#fffaf0] font-sans text-slate-800">
      <Header />
      {view === 'dashboard' && <PlantListView />}
      {view === 'prediction' && <PredictionPage />}
      {(view === 'detail' || view === 'component-detail') && <PlantDetailView />}
      {view === 'profile' && <ProfilePage />}
      {view === 'settings' && <SettingsPage />}
    </div>
  );
}