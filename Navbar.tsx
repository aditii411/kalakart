import React from 'react';
import type { Language } from '../types';
import { Sparkles, Globe, Radio, Mic, Layers, Play } from 'lucide-react';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  activeTab: 'catalog' | 'dashboard' | 'listings';
  onTabChange: (tab: 'catalog' | 'dashboard' | 'listings') => void;
  onRunAutoSimulation: () => void;
  onToggleVoiceAssistant: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  activeTab,
  onTabChange,
  onRunAutoSimulation,
  onToggleVoiceAssistant
}) => {
  const languages: { code: Language; label: string }[] = [
    { code: 'hi', label: 'हिंदी (Hindi)' },
    { code: 'en', label: 'English' },
    { code: 'ta', label: 'தமிழ் (Tamil)' },
    { code: 'bn', label: 'বাংলা (Bengali)' },
    { code: 'mr', label: 'मराठी (Marathi)' },
    { code: 'gu', label: 'ગુજરાતી (Gujarati)' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Hackathon Tag */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-600 to-emerald-500 p-0.5 shadow-lg shadow-orange-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-amber-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-amber-200 via-orange-300 to-emerald-300 bg-clip-text text-transparent">
                  KalaKart AI
                </h1>
                <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  SIH26090 • MoSJE
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium hidden sm:block">
                Virtual Business Manager & Multi-Product Smart Cataloger
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-800/80 p-1.5 rounded-2xl border border-slate-700/60">
            <button
              onClick={() => onTabChange('catalog')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'catalog'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Multi-Product Studio</span>
            </button>
            <button
              onClick={() => onTabChange('dashboard')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <span>Business Manager</span>
            </button>
          </nav>

          {/* Right Controls: ONDC Live badge, Language Switcher, Guided Simulation Button */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* ONDC Badge */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-semibold">
              <Radio className="w-3.5 h-3.5 animate-ping text-emerald-400" />
              <span>ONDC Sandbox Connected</span>
            </div>

            {/* Guided Simulation Button */}
            <button
              onClick={onRunAutoSimulation}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs sm:text-sm shadow-md shadow-emerald-500/20 transition-all transform active:scale-95"
              title="Click to run 1-Click End-to-End Live Simulation Walkthrough"
            >
              <Play className="w-4 h-4 fill-current" />
              <span className="hidden sm:inline">1-Click Live Demo</span>
            </button>

            {/* Voice Assistant Launcher */}
            <button
              onClick={onToggleVoiceAssistant}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold transition-all"
            >
              <Mic className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Voice Assistant</span>
            </button>

            {/* Language Selector */}
            <div className="relative group">
              <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold cursor-pointer">
                <Globe className="w-4 h-4 text-slate-400" />
                <span className="uppercase font-bold">{currentLang}</span>
              </div>
              
              <div className="absolute right-0 top-full mt-2 w-48 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-2 hidden group-hover:block z-50">
                <div className="text-[10px] font-bold tracking-wider uppercase text-slate-400 px-3 py-1">
                  Select Preferred Language
                </div>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => onLanguageChange(lang.code)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      currentLang === lang.code
                        ? 'bg-amber-500/20 text-amber-400 font-bold'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
