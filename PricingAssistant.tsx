import React, { useState, useEffect } from 'react';
import type { CatalogListing } from '../types';
import { calculateDynamicPrice } from '../services/aiService';
import { IndianRupee, TrendingUp, ShieldCheck, DollarSign, AlertCircle, ShoppingBag } from 'lucide-react';

interface PricingAssistantProps {
  catalogData: Partial<CatalogListing>;
  onPricingUpdated: (pricing: {
    rawCost: number;
    laborHours: number;
    hourlyRate: number;
    packagingCost: number;
    suggestedPrice: number;
    artisanMargin: number;
  }) => void;
}

export const PricingAssistant: React.FC<PricingAssistantProps> = ({
  catalogData,
  onPricingUpdated
}) => {
  const [rawCost, setRawCost] = useState<number>(catalogData.rawMaterialCost || 120);
  const [laborHours, setLaborHours] = useState<number>(catalogData.laborHours || 3);
  const hourlyRate = catalogData.hourlyRate || 80;
  const [packagingCost, setPackagingCost] = useState<number>(catalogData.packagingCost || 40);

  const priceCalc = calculateDynamicPrice(rawCost, laborHours, hourlyRate, packagingCost);

  useEffect(() => {
    onPricingUpdated({
      rawCost,
      laborHours,
      hourlyRate,
      packagingCost,
      suggestedPrice: priceCalc.suggestedPrice,
      artisanMargin: priceCalc.artisanProfitShare
    });
  }, [rawCost, laborHours, hourlyRate, packagingCost]);

  return (
    <div className="space-y-6 bg-slate-900/80 border border-slate-800 rounded-3xl p-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 p-0.5 shadow-lg shadow-emerald-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <IndianRupee className="w-6 h-6 text-emerald-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-lg text-white">
                Phase 4: Dynamic AI Pricing & Profit Assistant
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                Transparent Pricing
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Input material & labor costs. AI calculates fair price while guaranteeing 75%+ profit retained by artisan.
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Input Sliders | Price Recommendation & Benchmark Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Column: Cost Input Sliders */}
        <div className="lg:col-span-6 bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-5">
          <h3 className="font-bold text-sm text-slate-200 border-b border-slate-800 pb-2 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-emerald-400" />
            Cost Breakdown Sliders
          </h3>

          {/* Raw Material Cost */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-300">Raw Material Cost (Terracotta/Clay/Thread):</span>
              <span className="text-amber-400 font-bold">₹{rawCost}</span>
            </div>
            <input
              type="range"
              min="20"
              max="1500"
              step="10"
              value={rawCost}
              onChange={(e) => setRawCost(Number(e.target.value))}
              className="w-full accent-amber-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
          </div>

          {/* Labor Hours */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-300">Artisan Work Duration:</span>
              <span className="text-amber-400 font-bold">{laborHours} Hours (@ ₹{hourlyRate}/hr)</span>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              step="0.5"
              value={laborHours}
              onChange={(e) => setLaborHours(Number(e.target.value))}
              className="w-full accent-amber-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
          </div>

          {/* Packaging Cost */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-300">Packaging & Eco-Box Cost:</span>
              <span className="text-amber-400 font-bold">₹{packagingCost}</span>
            </div>
            <input
              type="range"
              min="10"
              max="300"
              step="5"
              value={packagingCost}
              onChange={(e) => setPackagingCost(Number(e.target.value))}
              className="w-full accent-amber-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
          </div>

          {/* Total Cost Summary */}
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center text-xs font-bold">
            <span className="text-slate-400">Total Input Cost (Base Cost):</span>
            <span className="text-slate-200 text-sm">₹{priceCalc.totalBaseCost}</span>
          </div>
        </div>

        {/* Right Column: AI Price Recommendation & Market Benchmark */}
        <div className="lg:col-span-6 bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="font-bold text-sm text-slate-200 border-b border-slate-800 pb-2 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              AI Recommended Selling Price
            </h3>

            {/* Price Highlight Banner */}
            <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border border-emerald-500/40 rounded-2xl p-4 text-center space-y-1">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-400">
                Suggested ONDC Selling Price
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-white">
                ₹{priceCalc.suggestedPrice}
              </div>
              <div className="text-xs text-emerald-300 font-medium flex items-center justify-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Artisan Profit Retained: <span className="font-bold text-white">{priceCalc.artisanProfitShare}%</span> (No Middleman Cut)
              </div>
            </div>

            {/* Marketplace Comparison Bars */}
            <div className="space-y-2">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                Marketplace Price Benchmarks:
              </span>
              
              <div className="space-y-2 text-xs">
                {[
                  { name: 'ONDC DigiHaat (Our App)', price: priceCalc.marketPrices.ondc, badge: 'Direct Buyer', isBest: true },
                  { name: 'Government GeM Portal', price: priceCalc.marketPrices.gem, badge: 'B2B Govt', isBest: false },
                  { name: 'Meesho', price: priceCalc.marketPrices.meesho, badge: 'Retail', isBest: false },
                  { name: 'Amazon India', price: priceCalc.marketPrices.amazon, badge: 'High Commission', isBest: false }
                ].map((mp, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4 text-slate-400" />
                      <span className="font-semibold text-slate-200">{mp.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-slate-400">{mp.badge}</span>
                      <span className={`font-extrabold ${mp.isBest ? 'text-emerald-400 text-sm' : 'text-slate-300'}`}>
                        ₹{mp.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Middleman Savings Badge */}
          <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/30 text-xs text-amber-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Traditional middlemen charge 60-70% markup. ONDC direct connection saves you <strong>₹{Math.round(priceCalc.suggestedPrice * 0.45)}</strong> per item!</span>
          </div>
        </div>

      </div>

    </div>
  );
};
