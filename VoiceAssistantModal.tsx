import React, { useState } from 'react';
import { Mic, MicOff, Volume2, Sparkles, X, MessageSquare } from 'lucide-react';

interface VoiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToCatalog: () => void;
}

export const VoiceAssistantModal: React.FC<VoiceAssistantModalProps> = ({
  isOpen,
  onClose,
  onNavigateToCatalog
}) => {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [spokenQuery, setSpokenQuery] = useState<string>('');
  const [assistantReply, setAssistantReply] = useState<string>(
    'Namaste! Main KalaKart AI Virtual Business Manager hoon. Aap mujhse puch sakte hain: "Mera kitna bika?", "Naya photo add karo", ya "Kitna profit hua?"'
  );

  if (!isOpen) return null;

  const handleQuickCommand = (query: string, response: string, action?: () => void) => {
    setSpokenQuery(query);
    setAssistantReply(response);

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utt = new SpeechSynthesisUtterance(response);
      utt.lang = 'hi-IN';
      window.speechSynthesis.speak(utt);
    }

    if (action) {
      setTimeout(action, 2000);
    }
  };

  const handleStartMic = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech Recognition is not supported. Please click the sample query buttons below!');
      return;
    }

    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const rec = new SpeechRecognition();
      rec.lang = 'hi-IN';
      rec.onstart = () => setIsListening(true);
      rec.onresult = (evt: any) => {
        const text = evt.results[0][0].transcript;
        setSpokenQuery(text);
        if (text.includes('bika') || text.includes('bikri') || text.includes('order')) {
          setAssistantReply('Aapke abhi tak 42 orders complete hue hain aur kul bikri ₹24,650 hui hai. ₹3,200 Jan Dhan bank account me transfer pending hai.');
        } else if (text.includes('naya') || text.includes('add') || text.includes('photo')) {
          setAssistantReply('Ji bilkul! Main aapko Multi-Product Studio page par le chalta hoon jahan aap photo upload kar sakte hain.');
          setTimeout(onNavigateToCatalog, 1500);
        } else {
          setAssistantReply(`Maine suna: "${text}". Aapki sabhi catalog listings ONDC DigiHaat par live hain.`);
        }
      };
      rec.onend = () => setIsListening(false);
      rec.start();
    } catch (err) {
      setIsListening(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-lg flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative overflow-hidden">
        
        {/* Decorative Glow */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">KalaKart Voice Assistant</h3>
              <span className="text-[10px] text-amber-300 font-semibold">Zero-Literacy Voice Navigation</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center font-bold text-sm"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Big Voice Wave Mic Button */}
        <div className="flex flex-col items-center justify-center space-y-4 py-4">
          <button
            onClick={handleStartMic}
            className={`w-24 h-24 rounded-full flex items-center justify-center transition-all shadow-2xl transform active:scale-95 ${
              isListening
                ? 'bg-red-500 text-white animate-pulse ring-8 ring-red-500/30'
                : 'bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-600 text-slate-950 shadow-amber-500/30 ring-8 ring-amber-500/10'
            }`}
          >
            {isListening ? <MicOff className="w-10 h-10" /> : <Mic className="w-10 h-10" />}
          </button>
          
          <div className="text-center">
            <div className="text-sm font-bold text-white">
              {isListening ? 'Listening...' : 'Tap Mic & Ask "KalaKart" Anything'}
            </div>
            <div className="text-xs text-slate-400">Speak naturally in Hindi or your regional language</div>
          </div>
        </div>

        {/* Speech Transcript & AI Voice Response */}
        <div className="space-y-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
          {spokenQuery && (
            <div className="text-xs text-amber-300 font-semibold flex items-center gap-1.5 border-b border-slate-800 pb-2">
              <MessageSquare className="w-3.5 h-3.5" />
              You Spoke: "{spokenQuery}"
            </div>
          )}

          <div className="text-xs text-slate-200 leading-relaxed font-medium flex items-start gap-2">
            <Volume2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>{assistantReply}</span>
          </div>
        </div>

        {/* Quick Sample Voice Commands for Testing */}
        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Quick Voice Commands (Click to Test):
          </span>
          
          <div className="space-y-1.5">
            {[
              {
                q: '🗣️ "Mera kitna bikri aur orders hue?"',
                res: 'Aapke kul 42 orders se ₹24,650 ki sales hui hai. ₹3,200 settlement pending hai.'
              },
              {
                q: '🗣️ "Naya product upload karna hai"',
                res: 'Ji, chaliye Multi-Product Studio kholte hain!',
                action: onNavigateToCatalog
              },
              {
                q: '🗣️ "ONDC par mera item live hai kya?"',
                res: 'Haan! Aapki sabhi 14 catalog listings ONDC DigiHaat Sandbox par fully active hain.'
              }
            ].map((cmd, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickCommand(cmd.q, cmd.res, cmd.action)}
                className="w-full text-left p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-xs font-semibold text-amber-300 border border-slate-700/70 transition-all"
              >
                {cmd.q}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
