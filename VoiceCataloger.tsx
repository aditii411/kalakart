import React, { useState, useEffect } from 'react';
import type { BoundingBox, Language, CatalogListing } from '../types';
import { VOICE_SAMPLE_PRESETS } from '../data/mockData';
import { generateCatalogFromVoice } from '../services/aiService';
import { Mic, MicOff, Volume2, Languages, Check, RefreshCw, FileText } from 'lucide-react';

interface VoiceCatalogerProps {
  selectedItem: BoundingBox;
  isolatedImageUrl: string;
  currentLang: Language;
  onCatalogGenerated: (listingData: Partial<CatalogListing>) => void;
}

export const VoiceCataloger: React.FC<VoiceCatalogerProps> = ({
  selectedItem,
  isolatedImageUrl,
  currentLang,
  onCatalogGenerated
}) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [voiceText, setVoiceText] = useState<string>(VOICE_SAMPLE_PRESETS[0].text);
  const [activeTabLang, setActiveTabLang] = useState<'en' | 'hi' | 'regional'>('hi');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedCatalog, setGeneratedCatalog] = useState<Partial<CatalogListing> | null>(null);

  useEffect(() => {
    handleGenerateCatalog(voiceText);
  }, [selectedItem]);

  const handleStartRecording = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Web Speech API is not supported in this browser. Please use the preset sample audio buttons below for full live simulation!');
      return;
    }

    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = currentLang === 'hi' ? 'hi-IN' : currentLang === 'ta' ? 'ta-IN' : currentLang === 'bn' ? 'bn-IN' : 'en-US';

      recognition.onstart = () => {
        setIsRecording(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        setVoiceText(transcript);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognition.start();
    } catch (err) {
      console.error(err);
      setIsRecording(false);
    }
  };

  const handleGenerateCatalog = async (textToUse: string) => {
    setIsGenerating(true);
    const catalog = await generateCatalogFromVoice(textToUse, selectedItem.label, currentLang);
    setGeneratedCatalog(catalog);
    setIsGenerating(false);
    onCatalogGenerated(catalog);
  };

  const handleSpeak = (text: string, lang: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'hi' ? 'hi-IN' : lang === 'ta' ? 'ta-IN' : 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="space-y-6 bg-slate-900/80 border border-slate-800 rounded-3xl p-6">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 p-0.5 shadow-lg shadow-orange-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Mic className="w-6 h-6 text-amber-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-lg text-white">
                Phase 3: Bhashini Voice Auto-Cataloger
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Voice-First UI
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Speak 30 seconds in any Indian language. AI creates SEO titles, categories & descriptions automatically.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-slate-950 p-2.5 rounded-2xl border border-slate-800">
          <img src={isolatedImageUrl} alt={selectedItem.label} className="w-10 h-10 rounded-xl object-cover" />
          <div className="text-xs">
            <div className="text-slate-400 text-[10px] font-bold">Selected Item:</div>
            <div className="font-bold text-amber-400">{selectedItem.label}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        <div className="md:col-span-6 bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-4 text-center flex flex-col items-center justify-center min-h-[220px]">
          
          <button
            onClick={handleStartRecording}
            className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all transform active:scale-95 shadow-xl ${
              isRecording
                ? 'bg-red-500 text-white animate-pulse ring-8 ring-red-500/30'
                : 'bg-gradient-to-tr from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-amber-500/20'
            }`}
          >
            {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
          </button>

          <div>
            <div className="font-bold text-sm text-white">
              {isRecording ? 'Listening to your voice...' : 'Click Mic to Speak or Record Voice Note'}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Supports Hindi, Tamil, Bengali, Telugu, Gujarati, Marathi & English
            </div>
          </div>

          <div className="w-full pt-3 border-t border-slate-800 space-y-2">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Or Click Demo Audio Voice Note Samples:
            </div>
            <div className="flex flex-wrap justify-center gap-1.5">
              {VOICE_SAMPLE_PRESETS.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => {
                    setVoiceText(sample.text);
                    handleGenerateCatalog(sample.text);
                  }}
                  className="px-2.5 py-1 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700"
                >
                  🗣️ {sample.langName}
                </button>
              ))}
            </div>
          </div>

        </div>

        <div className="md:col-span-6 bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3 min-h-[220px] flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                <Languages className="w-4 h-4 text-amber-400" />
                Speech-To-Text Audio Transcript:
              </span>
              <button
                onClick={() => handleGenerateCatalog(voiceText)}
                className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
                Re-Generate AI
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 bg-slate-900/90 p-3 rounded-xl border border-slate-800 italic leading-relaxed min-h-[90px]">
              "{voiceText}"
            </p>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
              <Check className="w-3.5 h-3.5" /> Bhashini API Verified
            </span>
            <span>Auto-translated to 3 languages</span>
          </div>
        </div>

      </div>

      {generatedCatalog && (
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-400" />
              <h3 className="font-bold text-sm text-slate-100">
                AI Auto-Generated E-Commerce Listing Output
              </h3>
            </div>

            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveTabLang('hi')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  activeTabLang === 'hi' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Hindi (हिंदी)
              </button>
              <button
                onClick={() => setActiveTabLang('en')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  activeTabLang === 'en' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setActiveTabLang('regional')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  activeTabLang === 'regional' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Regional
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Product Title:
                </span>
                <h4 className="text-base font-bold text-amber-300">
                  {activeTabLang === 'hi'
                    ? generatedCatalog.productNameHi
                    : activeTabLang === 'en'
                    ? generatedCatalog.productNameEn
                    : generatedCatalog.productNameRegional}
                </h4>
              </div>

              <button
                onClick={() =>
                  handleSpeak(
                    activeTabLang === 'hi'
                      ? generatedCatalog.productNameHi || ''
                      : generatedCatalog.productNameEn || '',
                    activeTabLang
                  )
                }
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 transition-all"
                title="Listen Voice Playback"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                SEO Product Description:
              </span>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800/80 mt-1">
                {activeTabLang === 'hi'
                  ? generatedCatalog.descriptionHi
                  : activeTabLang === 'en'
                  ? generatedCatalog.descriptionEn
                  : generatedCatalog.descriptionRegional}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  ONDC Category Mapping:
                </span>
                <div className="text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1.5 rounded-xl mt-1">
                  {generatedCatalog.ondcTaxonomy}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Auto SEO Hashtags:
                </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {generatedCatalog.tags?.map((tag, i) => (
                    <span key={i} className="text-[10px] font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
