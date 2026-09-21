import React from 'react';
import type { CatalogListing, DashboardStats } from '../types';
import { ShoppingBag, Eye, TrendingUp, CreditCard, Mic, CheckCircle2, ArrowUpRight, Layers } from 'lucide-react';

interface BusinessDashboardProps {
  stats: DashboardStats;
  listings: CatalogListing[];
  onOpenVoiceAssistant: () => void;
  onAddNewProduct: () => void;
}

export const BusinessDashboard: React.FC<BusinessDashboardProps> = ({
  stats,
  listings,
  onOpenVoiceAssistant,
  onAddNewProduct
}) => {
  return (
    <div className="space-y-8">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500 text-slate-950 uppercase">
                Virtual Business Manager
              </span>
              <span className="text-xs text-amber-300 font-semibold">
                Hands-Free Voice-First Dashboard
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Artisan Performance & Settlement Center
            </h2>
            <p className="text-xs text-slate-400">
              Track year-round digital sales across ONDC DigiHaat, GeM, Meesho & Amazon seamlessly.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenVoiceAssistant}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition-all transform active:scale-95"
            >
              <Mic className="w-4 h-4 fill-current" />
              <span>Voice Assistant "KalaKart"</span>
            </button>
            <button
              onClick={onAddNewProduct}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm border border-slate-700 transition-all"
            >
              <span>+ Add New Product</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Listings */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Active Listings</span>
            <Layers className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">
            {listings.length + stats.totalListings}
          </div>
          <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> 100% ONDC Synchronized
          </div>
        </div>

        {/* Total Impressions / Views */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Buyer Views</span>
            <Eye className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">
            {stats.totalViews.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> +24% from ONDC DigiHaat
          </div>
        </div>

        {/* Orders Received */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Orders Fulfillment</span>
            <ShoppingBag className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">
            {stats.totalOrders}
          </div>
          <div className="text-[11px] text-slate-400 font-semibold">
            0% Return Rate
          </div>
        </div>

        {/* Net Earnings */}
        <div className="bg-gradient-to-tr from-emerald-950/60 to-slate-900 border border-emerald-500/30 rounded-3xl p-5 space-y-2">
          <div className="flex items-center justify-between text-emerald-400">
            <span className="text-xs font-bold uppercase tracking-wider">Total Revenue</span>
            <TrendingUp className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">
            ₹{stats.totalRevenue.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-300 font-semibold flex items-center gap-1">
            <CreditCard className="w-3.5 h-3.5" /> Jan Dhan Account Settled
          </div>
        </div>

      </div>

      {/* Active Listings Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="font-bold text-slate-100 text-base">
            Your Active ONDC & Marketplace Listings
          </h3>
          <span className="text-xs text-slate-400">Showing {listings.length} Catalog items</span>
        </div>

        <div className="space-y-3">
          {listings.map((lst) => (
            <div
              key={lst.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-slate-950/80 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all"
            >
              <div className="flex items-center gap-4">
                <img
                  src={lst.imageUrl || '/images/demo1.png'}
                  alt={lst.productNameEn}
                  className="w-14 h-14 rounded-xl object-cover"
                />
                <div>
                  <h4 className="font-bold text-white text-sm">{lst.productNameEn}</h4>
                  <div className="text-xs text-slate-400">{lst.category} • {lst.ondcTaxonomy}</div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {lst.publishedChannels?.map((ch, idx) => (
                      <span key={idx} className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-500/20">
                        {ch}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 border-slate-800 pt-2 sm:pt-0">
                <div className="text-right">
                  <div className="text-xs text-slate-400 font-semibold">Selling Price</div>
                  <div className="text-lg font-extrabold text-amber-400">₹{lst.suggestedPrice}</div>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Live
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
