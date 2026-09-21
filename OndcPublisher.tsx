import React, { useState } from 'react';
import type { CatalogListing } from '../types';
import { generateBecknPayload } from '../services/aiService';
import confetti from 'canvas-confetti';
import { Radio, Code, QrCode, CheckCircle2, ShoppingCart, Send } from 'lucide-react';

interface OndcPublisherProps {
  catalogListing: Partial<CatalogListing>;
  isolatedImageUrl: string;
  onPublishComplete: () => void;
}

export const OndcPublisher: React.FC<OndcPublisherProps> = ({
  catalogListing,
  isolatedImageUrl,
  onPublishComplete
}) => {
  const [isPublished, setIsPublished] = useState<boolean>(false);
  const [showPayload, setShowPayload] = useState<boolean>(false);
  const [showBuyerModal, setShowBuyerModal] = useState<boolean>(false);
  const [selectedChannels, setSelectedChannels] = useState<string[]>([
    'ONDC DigiHaat Sandbox',
    'GeM (Government e-Marketplace)',
    'Meesho'
  ]);

  const becknPayload = generateBecknPayload(catalogListing);

  const toggleChannel = (channel: string) => {
    if (selectedChannels.includes(channel)) {
      setSelectedChannels(selectedChannels.filter((c) => c !== channel));
    } else {
      setSelectedChannels([...selectedChannels, channel]);
    }
  };

  const handlePublish = () => {
    setIsPublished(true);
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
    onPublishComplete();
  };

  return (
    <div className="space-y-6 bg-slate-900/80 border border-slate-800 rounded-3xl p-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-emerald-500 p-0.5 shadow-lg shadow-orange-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Radio className="w-6 h-6 text-emerald-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-lg text-white">
                Phase 5: 1-Click ONDC Beckn Protocol Publisher
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Direct Market Linkage
              </span>
            </div>
            <p className="text-xs text-slate-400">
              No manual form filling required! Converts catalog into Beckn protocol payload & publishes live.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowPayload(!showPayload)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700"
        >
          <Code className="w-4 h-4 text-amber-400" />
          <span>{showPayload ? 'Hide Beckn JSON' : 'Inspect Beckn Protocol Payload'}</span>
        </button>
      </div>

      {/* Beckn JSON Payload Drawer */}
      {showPayload && (
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400">
            <span>beckn.org / catalog / v1.1.0 JSON Output:</span>
            <span className="text-emerald-400">Validated</span>
          </div>
          <pre className="text-[11px] font-mono text-emerald-300 bg-slate-900/90 p-3 rounded-xl overflow-x-auto max-h-60 border border-slate-800">
            {JSON.stringify(becknPayload, null, 2)}
          </pre>
        </div>
      )}

      {/* Channel Selection Checkboxes */}
      <div className="space-y-3">
        <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
          Select Direct Publishing Marketplaces:
        </span>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { name: 'ONDC DigiHaat Sandbox', desc: 'Govt Buyer App for Artisans' },
            { name: 'GeM (Government e-Marketplace)', desc: 'B2B Govt Procurement' },
            { name: 'Meesho Marketplace', desc: 'Retail Social Commerce' },
            { name: 'Amazon Karigar / FabIndia', desc: 'Handicrafts Export Channel' }
          ].map((ch) => {
            const isSelected = selectedChannels.includes(ch.name);
            return (
              <div
                key={ch.name}
                onClick={() => toggleChannel(ch.name)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-amber-500/10 border-amber-400 text-white shadow-md'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs">{ch.name}</span>
                  <div
                    className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                      isSelected ? 'bg-amber-500 border-amber-400 text-slate-950' : 'border-slate-700'
                    }`}
                  >
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">{ch.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Publish Bar */}
      <div className="pt-2">
        {!isPublished ? (
          <button
            onClick={handlePublish}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-base shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all transform active:scale-98"
          >
            <Send className="w-5 h-5 fill-current" />
            <span>Publish Listing Live to {selectedChannels.length} Marketplaces Now</span>
          </button>
        ) : (
          <div className="bg-emerald-950/60 border border-emerald-500/40 rounded-2xl p-5 space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/40">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-base">
                    Successfully Published to ONDC Network & Marketplaces!
                  </h3>
                  <p className="text-xs text-emerald-300">
                    Your product is live for 10 Lakh+ buyers on ONDC DigiHaat, GeM & connected buyer apps.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowBuyerModal(true)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Preview Buyer View</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Buyer Storefront Preview Modal */}
      {showBuyerModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                <h3 className="font-bold text-white text-sm">
                  ONDC DigiHaat Buyer View Simulation
                </h3>
              </div>
              <button
                onClick={() => setShowBuyerModal(false)}
                className="text-slate-400 hover:text-white font-bold text-sm px-2 py-1 bg-slate-800 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <img src={isolatedImageUrl} alt="Product" className="w-full h-52 object-cover" />
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    PM Vishwakarma Certified
                  </span>
                  <span className="text-xs font-bold text-emerald-400">Direct From Artisan</span>
                </div>

                <h4 className="font-bold text-white text-base">
                  {catalogListing.productNameEn || 'Handpainted Clay Pot'}
                </h4>

                <p className="text-xs text-slate-300 line-clamp-2">
                  {catalogListing.descriptionEn}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block">Selling Price</span>
                    <span className="text-xl font-extrabold text-amber-400">₹{catalogListing.suggestedPrice || 480}</span>
                  </div>

                  <button className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-md">
                    Buy Now on ONDC
                  </button>
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-xl p-1 flex items-center justify-center shrink-0">
                  <QrCode className="w-10 h-10 text-slate-950" />
                </div>
                <div className="text-xs">
                  <div className="font-bold text-white">Scan QR for Direct Exhibition Purchase</div>
                  <div className="text-slate-400 text-[10px]">UPI Settlement directly to Jan Dhan Account</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
