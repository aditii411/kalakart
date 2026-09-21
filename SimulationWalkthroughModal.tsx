import React from 'react';
import { Sparkles, Layers, Mic, IndianRupee, Radio, ArrowRight, X } from 'lucide-react';

interface SimulationWalkthroughModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartSimulation: () => void;
}

export const SimulationWalkthroughModal: React.FC<SimulationWalkthroughModalProps> = ({
  isOpen,
  onClose,
  onStartSimulation
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-lg flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-extrabold shadow-lg">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-lg">
                SIH26090 Architecture & Live Simulation Flow
              </h3>
              <p className="text-xs text-amber-300 font-medium">
                Ministry of Social Justice & Empowerment (MoSJE) Solution Workflow
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center font-bold text-sm"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 5 Phases Steps */}
        <div className="space-y-4">
          
          {[
            {
              step: 'Phase 1',
              title: 'Multi-Product Segmentation AI',
              icon: Layers,
              desc: 'Upload a single snapshot with 2-3 products (e.g. clay pot, silk scarf, brass diya). AI detects and crops individual products into distinct items.'
            },
            {
              step: 'Phase 2',
              title: 'Generative AI Studio Photo Enhancer',
              icon: Sparkles,
              desc: 'Cleans cluttered backgrounds, applies studio backdrop lighting presets (Warm, Wood, White, Dark Luxury), and adds drop shadows.'
            },
            {
              step: 'Phase 3',
              title: 'Bhashini Multilingual Voice Cataloger',
              icon: Mic,
              desc: 'Listens to voice notes in regional Indian languages (Hindi, Tamil, Bengali, English). Auto-generates SEO titles, bullet points, tags, and ONDC taxonomy.'
            },
            {
              step: 'Phase 4',
              title: 'Dynamic Pricing Assistant',
              icon: IndianRupee,
              desc: 'Analyzes raw materials + labor hours, benchmarking against live ONDC, Meesho & Amazon prices while guaranteeing 75%+ profit retained by artisan.'
            },
            {
              step: 'Phase 5',
              title: '1-Click ONDC Beckn Protocol Publishing',
              icon: Radio,
              desc: 'Generates Beckn-compliant JSON payload and publishes to ONDC Sandbox, GeM & connected buyer apps instantly.'
            }
          ].map((phase, idx) => {
            const IconComponent = phase.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0 font-bold text-amber-400">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      {phase.step}
                    </span>
                    <h4 className="font-bold text-white text-sm">{phase.title}</h4>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{phase.desc}</p>
                </div>
              </div>
            );
          })}

        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={() => {
              onStartSimulation();
              onClose();
            }}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-sm sm:text-base shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all transform active:scale-98"
          >
            <span>Start Interactive Live Simulation Walkthrough</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
};
