import { useState } from 'react';
import type { Language, DemoImagePreset, BoundingBox, CatalogListing, DashboardStats } from './types';
import { DEMO_PRESETS, INITIAL_DASHBOARD_STATS, INITIAL_LISTINGS } from './data/mockData';
import { Navbar } from './components/Navbar';
import { MultiProductStudio } from './components/MultiProductStudio';
import { VoiceCataloger } from './components/VoiceCataloger';
import { PricingAssistant } from './components/PricingAssistant';
import { OndcPublisher } from './components/OndcPublisher';
import { BusinessDashboard } from './components/BusinessDashboard';
import { VoiceAssistantModal } from './components/VoiceAssistantModal';
import { SimulationWalkthroughModal } from './components/SimulationWalkthroughModal';
import { CheckCircle2, ArrowRight, RotateCcw, Layers, Mic, IndianRupee, Radio } from 'lucide-react';

export function App() {
  const [currentLang, setCurrentLang] = useState<Language>('hi');
  const [activeTab, setActiveTab] = useState<'catalog' | 'dashboard' | 'listings'>('catalog');
  const [stepIndex, setStepIndex] = useState<number>(1);

  // Selected Demo Preset & Product Item
  const [selectedPreset, setSelectedPreset] = useState<DemoImagePreset>(DEMO_PRESETS[0]);
  const [selectedItem, setSelectedItem] = useState<BoundingBox>(DEMO_PRESETS[0].items[0]);
  const [isolatedImageUrl, setIsolatedImageUrl] = useState<string>('/images/demo1.png');

  // Catalog & Pricing State
  const [currentListing, setCurrentListing] = useState<Partial<CatalogListing>>({
    productNameEn: 'Handpainted Terracotta Clay Pot',
    productNameHi: 'हस्तनिर्मित मटका (टेराकोटा पॉट)',
    descriptionEn: 'Authentic eco-friendly terracotta clay water pot hand-painted with traditional folk motifs.',
    rawMaterialCost: 120,
    laborHours: 3,
    hourlyRate: 80,
    packagingCost: 40,
    suggestedPrice: 480
  });

  // All listings & stats
  const [listings, setListings] = useState<CatalogListing[]>(INITIAL_LISTINGS);
  const [stats, setStats] = useState<DashboardStats>(INITIAL_DASHBOARD_STATS);

  // Modals
  const [isVoiceAssistantOpen, setIsVoiceAssistantOpen] = useState<boolean>(false);
  const [isWalkthroughOpen, setIsWalkthroughOpen] = useState<boolean>(false);

  const handleProductSelectedFromStudio = (item: BoundingBox, croppedUrl: string) => {
    setSelectedItem(item);
    setIsolatedImageUrl(croppedUrl);
    setStepIndex(2);
  };

  const handleCatalogGenerated = (catalogData: Partial<CatalogListing>) => {
    setCurrentListing((prev) => ({ ...prev, ...catalogData }));
  };

  const handlePricingUpdated = (pricing: any) => {
    setCurrentListing((prev) => ({
      ...prev,
      rawMaterialCost: pricing.rawCost,
      laborHours: pricing.laborHours,
      hourlyRate: pricing.hourlyRate,
      packagingCost: pricing.packagingCost,
      suggestedPrice: pricing.suggestedPrice,
      artisanMargin: pricing.artisanMargin
    }));
  };

  const handlePublishComplete = () => {
    const newListing: CatalogListing = {
      id: `lst-${Date.now()}`,
      productNameEn: currentListing.productNameEn || selectedItem.label,
      productNameHi: currentListing.productNameHi || selectedItem.label,
      productNameRegional: currentListing.productNameRegional || selectedItem.label,
      descriptionEn: currentListing.descriptionEn || '',
      descriptionHi: currentListing.descriptionHi || '',
      descriptionRegional: currentListing.descriptionRegional || '',
      category: currentListing.category || 'Handicrafts',
      subCategory: currentListing.subCategory || 'General',
      ondcTaxonomy: currentListing.ondcTaxonomy || 'home-and-kitchen/pottery',
      materials: currentListing.materials || ['Eco Clay'],
      tags: currentListing.tags || ['#Handcrafted'],
      careInstructions: 'Handle with care',
      rawMaterialCost: currentListing.rawMaterialCost || 120,
      laborHours: currentListing.laborHours || 3,
      hourlyRate: currentListing.hourlyRate || 80,
      packagingCost: currentListing.packagingCost || 40,
      suggestedPrice: currentListing.suggestedPrice || 480,
      marketPrices: {
        ondc: currentListing.suggestedPrice || 480,
        meesho: Math.round((currentListing.suggestedPrice || 480) * 1.15),
        amazon: Math.round((currentListing.suggestedPrice || 480) * 1.35),
        gem: Math.round((currentListing.suggestedPrice || 480) * 0.98)
      },
      artisanMargin: currentListing.artisanMargin || 75,
      status: 'published',
      publishedChannels: ['ONDC DigiHaat', 'GeM Portal', 'Meesho'],
      createdAt: new Date().toISOString().split('T')[0],
      imageUrl: isolatedImageUrl
    };

    setListings([newListing, ...listings]);
    setStats((prev) => ({
      ...prev,
      totalListings: prev.totalListings + 1,
      totalViews: prev.totalViews + 120
    }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 pb-20">
      
      {/* Top Header Navbar */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onRunAutoSimulation={() => setIsWalkthroughOpen(true)}
        onToggleVoiceAssistant={() => setIsVoiceAssistantOpen(true)}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-8">
        
        {activeTab === 'catalog' ? (
          <div className="space-y-8">
            
            {/* Step Wizard Bar */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-4 sm:p-5">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { step: 1, title: '1. Multi-Product AI Studio', icon: Layers },
                  { step: 2, title: '2. Multilingual Voice Catalog', icon: Mic },
                  { step: 3, title: '3. Dynamic AI Pricing', icon: IndianRupee },
                  { step: 4, title: '4. 1-Click ONDC Publish', icon: Radio }
                ].map((s) => {
                  const isActive = stepIndex === s.step;
                  const isDone = stepIndex > s.step;

                  return (
                    <button
                      key={s.step}
                      onClick={() => setStepIndex(s.step)}
                      className={`flex items-center gap-2.5 p-3 rounded-2xl text-left border transition-all ${
                        isActive
                          ? 'bg-amber-500 text-slate-950 border-amber-400 font-extrabold shadow-lg shadow-amber-500/20'
                          : isDone
                          ? 'bg-emerald-950/60 text-emerald-400 border-emerald-500/40 font-bold'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 font-medium'
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-xs font-extrabold ${
                          isActive
                            ? 'bg-slate-950 text-amber-400'
                            : isDone
                            ? 'bg-emerald-500 text-slate-950'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {isDone ? <CheckCircle2 className="w-4 h-4 stroke-[3]" /> : s.step}
                      </div>
                      <span className="text-xs sm:text-sm truncate">{s.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step Content Panes */}
            {stepIndex === 1 && (
              <div className="space-y-6">
                <MultiProductStudio
                  selectedPreset={selectedPreset}
                  onSelectPreset={setSelectedPreset}
                  onSelectProductForItem={handleProductSelectedFromStudio}
                />
              </div>
            )}

            {stepIndex === 2 && (
              <div className="space-y-6">
                <VoiceCataloger
                  selectedItem={selectedItem}
                  isolatedImageUrl={isolatedImageUrl}
                  currentLang={currentLang}
                  onCatalogGenerated={handleCatalogGenerated}
                />

                <div className="flex justify-between items-center pt-4">
                  <button
                    onClick={() => setStepIndex(1)}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-700"
                  >
                    <RotateCcw className="w-4 h-4" /> Back to Studio
                  </button>

                  <button
                    onClick={() => setStepIndex(3)}
                    className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-amber-500/20"
                  >
                    <span>Proceed to Dynamic Pricing</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {stepIndex === 3 && (
              <div className="space-y-6">
                <PricingAssistant
                  catalogData={currentListing}
                  onPricingUpdated={handlePricingUpdated}
                />

                <div className="flex justify-between items-center pt-4">
                  <button
                    onClick={() => setStepIndex(2)}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-700"
                  >
                    <RotateCcw className="w-4 h-4" /> Back to Voice Catalog
                  </button>

                  <button
                    onClick={() => setStepIndex(4)}
                    className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-amber-500/20"
                  >
                    <span>Proceed to 1-Click ONDC Publish</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {stepIndex === 4 && (
              <div className="space-y-6">
                <OndcPublisher
                  catalogListing={currentListing}
                  isolatedImageUrl={isolatedImageUrl}
                  onPublishComplete={handlePublishComplete}
                />

                <div className="flex justify-between items-center pt-4">
                  <button
                    onClick={() => setStepIndex(3)}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-700"
                  >
                    <RotateCcw className="w-4 h-4" /> Back to Pricing
                  </button>

                  <button
                    onClick={() => setActiveTab('dashboard')}
                    className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-emerald-500/20"
                  >
                    <span>View Business Manager Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

          </div>
        ) : (
          <BusinessDashboard
            stats={stats}
            listings={listings}
            onOpenVoiceAssistant={() => setIsVoiceAssistantOpen(true)}
            onAddNewProduct={() => {
              setActiveTab('catalog');
              setStepIndex(1);
            }}
          />
        )}

      </main>

      <VoiceAssistantModal
        isOpen={isVoiceAssistantOpen}
        onClose={() => setIsVoiceAssistantOpen(false)}
        onNavigateToCatalog={() => {
          setIsVoiceAssistantOpen(false);
          setActiveTab('catalog');
          setStepIndex(1);
        }}
      />

      <SimulationWalkthroughModal
        isOpen={isWalkthroughOpen}
        onClose={() => setIsWalkthroughOpen(false)}
        onStartSimulation={() => {
          setActiveTab('catalog');
          setStepIndex(1);
        }}
      />

    </div>
  );
}

export default App;
