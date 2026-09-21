import React, { useState, useRef, useEffect } from 'react';
import type { DemoImagePreset, BoundingBox, StudioSettings } from '../types';
import { DEMO_PRESETS } from '../data/mockData';
import { applyStudioEffectsToCanvas, detectObjectsInImage } from '../services/aiService';
import { Upload, Sparkles, Sliders, CheckCircle, Crop, Sun, Image as ImageIcon } from 'lucide-react';

interface MultiProductStudioProps {
  onSelectProductForItem: (item: BoundingBox, imageUrl: string) => void;
  selectedPreset: DemoImagePreset;
  onSelectPreset: (preset: DemoImagePreset) => void;
}

export const MultiProductStudio: React.FC<MultiProductStudioProps> = ({
  onSelectProductForItem,
  selectedPreset,
  onSelectPreset
}) => {
  const [selectedBox, setSelectedBox] = useState<BoundingBox>(selectedPreset.items[0]);
  const [isCustomUpload, setIsCustomUpload] = useState<boolean>(false);
  const [customImageUrl, setCustomImageUrl] = useState<string | null>(null);
  const [customBoxes, setCustomBoxes] = useState<BoundingBox[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  // Studio Settings state
  const [studioSettings, setStudioSettings] = useState<StudioSettings>({
    background: 'warm',
    brightness: 100,
    contrast: 100,
    shadow: true,
    sharpness: 100
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!isCustomUpload) {
      setSelectedBox(selectedPreset.items[0]);
    }
  }, [selectedPreset, isCustomUpload]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = isCustomUpload && customImageUrl ? customImageUrl : selectedPreset.url;

    img.onload = () => {
      canvas.width = 600;
      canvas.height = 450;

      applyStudioEffectsToCanvas(ctx, canvas.width, canvas.height, studioSettings);

      const sourceX = (selectedBox.x / 100) * img.width;
      const sourceY = (selectedBox.y / 100) * img.height;
      const sourceWidth = (selectedBox.width / 100) * img.width;
      const sourceHeight = (selectedBox.height / 100) * img.height;

      const padding = 40;
      const targetW = canvas.width - padding * 2;
      const targetH = canvas.height - padding * 2;

      const scale = Math.min(targetW / sourceWidth, targetH / sourceHeight);
      const drawWidth = sourceWidth * scale;
      const drawHeight = sourceHeight * scale;

      const destX = (canvas.width - drawWidth) / 2;
      const destY = (canvas.height - drawHeight) / 2;

      if (studioSettings.shadow) {
        ctx.save();
        ctx.shadowColor = 'rgba(0,0,0,0.35)';
        ctx.shadowBlur = 25;
        ctx.shadowOffsetY = 15;
      }

      ctx.drawImage(
        img,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        destX,
        destY,
        drawWidth,
        drawHeight
      );

      if (studioSettings.shadow) {
        ctx.restore();
      }
    };
  }, [selectedPreset, selectedBox, studioSettings, isCustomUpload, customImageUrl]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (evt) => {
      const dataUrl = evt.target?.result as string;
      setCustomImageUrl(dataUrl);
      setIsCustomUpload(true);
      setIsAnalyzing(true);

      const detected = await detectObjectsInImage(dataUrl);
      setCustomBoxes(detected);
      setSelectedBox(detected[0]);
      setIsAnalyzing(false);
    };
    reader.readAsDataURL(file);
  };

  const activeBoxes = isCustomUpload ? customBoxes : selectedPreset.items;
  const activeImage = isCustomUpload && customImageUrl ? customImageUrl : selectedPreset.url;

  return (
    <div className="space-y-8">

      {/* Feature Explanation Header */}
      <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-emerald-500/10 border border-amber-500/20 rounded-3xl p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1 z-10">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500 text-slate-950 uppercase tracking-wider">
                SIH26090 Enhancement
              </span>
              <span className="text-xs text-amber-300 font-semibold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Multi-Product Segmentation AI
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Phase 1 & 2: Upload Photo with Multiple Products
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl">
              Take a single photo of your stall or products. Our AI automatically detects, isolates, crops each product, and transforms simple snapshots into professional e-commerce studio listings!
            </p>
          </div>

          <div className="flex items-center gap-2 z-10">
            <label className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm cursor-pointer shadow-lg shadow-amber-500/20 transition-all transform active:scale-95">
              <Upload className="w-4 h-4" />
              <span>Upload Your Photo</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
            </label>
          </div>
        </div>
      </div>

      {/* Demo Image Selector */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <ImageIcon className="w-4 h-4 text-amber-400" />
            Or Select Pre-Loaded Multi-Product Sample Photos:
          </span>
          {isCustomUpload && (
            <button
              onClick={() => setIsCustomUpload(false)}
              className="text-xs text-amber-400 font-semibold hover:underline"
            >
              Reset to Preset Samples
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {DEMO_PRESETS.map((preset) => (
            <div
              key={preset.id}
              onClick={() => {
                setIsCustomUpload(false);
                onSelectPreset(preset);
              }}
              className={`group relative rounded-2xl overflow-hidden border-2 cursor-pointer transition-all ${
                !isCustomUpload && selectedPreset.id === preset.id
                  ? 'border-amber-400 ring-4 ring-amber-500/20 shadow-xl'
                  : 'border-slate-800 hover:border-slate-700 bg-slate-900/60'
              }`}
            >
              <div className="h-32 overflow-hidden relative">
                <img
                  src={preset.url}
                  alt={preset.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-white">
                  <span className="text-xs font-bold truncate">{preset.title}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500/90 text-slate-950">
                    {preset.items.length} Items
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Column: Bounding Box Overlay */}
        <div className="lg:col-span-6 bg-slate-900/80 border border-slate-800 rounded-3xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Crop className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-slate-100 text-sm sm:text-base">
                1. Multi-Product AI Segmentation
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-medium">
              Click a box to select item
            </span>
          </div>

          <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 aspect-[4/3] flex items-center justify-center">
            {isAnalyzing ? (
              <div className="flex flex-col items-center gap-3 text-amber-400">
                <Sparkles className="w-8 h-8 animate-spin" />
                <span className="text-xs font-bold">AI Detecting Products in Image...</span>
              </div>
            ) : (
              <>
                <img
                  src={activeImage}
                  alt="Multi Product Snapshot"
                  className="w-full h-full object-cover"
                />

                {activeBoxes.map((box) => {
                  const isSelected = selectedBox.id === box.id;
                  return (
                    <div
                      key={box.id}
                      onClick={() => setSelectedBox(box)}
                      style={{
                        left: `${box.x}%`,
                        top: `${box.y}%`,
                        width: `${box.width}%`,
                        height: `${box.height}%`
                      }}
                      className={`absolute rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                        isSelected
                          ? 'border-amber-400 bg-amber-400/20 shadow-[0_0_20px_rgba(251,191,36,0.6)] z-20 scale-[1.02]'
                          : 'border-emerald-400/80 bg-emerald-400/10 hover:border-emerald-300 hover:bg-emerald-400/20 z-10'
                      }`}
                    >
                      <div className="absolute -top-7 left-0 bg-slate-900/90 text-white border border-slate-700 px-2 py-0.5 rounded-md text-[10px] font-bold flex items-center gap-1 shadow-lg whitespace-nowrap">
                        <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                        {box.label}
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>

          <div className="space-y-2">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
              Detected Items in this Photo ({activeBoxes.length}):
            </span>
            <div className="flex flex-wrap gap-2">
              {activeBoxes.map((box, idx) => (
                <button
                  key={box.id}
                  onClick={() => setSelectedBox(box)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                    selectedBox.id === box.id
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-slate-950 text-amber-400 flex items-center justify-center text-[10px]">
                    #{idx + 1}
                  </span>
                  <span>{box.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: AI Photo Studio Preview */}
        <div className="lg:col-span-6 bg-slate-900/80 border border-slate-800 rounded-3xl p-5 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sun className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-slate-100 text-sm sm:text-base">
                  2. AI Studio Enhancement & Background Studio
                </h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Isolated Item
              </span>
            </div>

            <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 aspect-[4/3] flex items-center justify-center shadow-2xl">
              <canvas ref={canvasRef} className="w-full h-full object-contain" />
              
              <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-slate-700 text-[11px] text-amber-300 font-semibold flex items-center gap-1.5 shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Studio Background: <span className="capitalize font-bold text-white">{studioSettings.background}</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                Select AI Backdrop Preset:
              </span>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'warm', name: 'Warm Studio' },
                  { id: 'wood', name: 'Rustic Wood' },
                  { id: 'white', name: 'Clean White' },
                  { id: 'dark', name: 'Dark Luxury' }
                ].map((bg) => (
                  <button
                    key={bg.id}
                    onClick={() => setStudioSettings({ ...studioSettings, background: bg.id as any })}
                    className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all text-center ${
                      studioSettings.background === bg.id
                        ? 'border-amber-400 ring-2 ring-amber-400/40 text-amber-300 bg-slate-800'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {bg.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-950/60 rounded-2xl border border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-amber-400" />
                <span className="text-slate-300 font-medium">AI Soft Drop Shadow</span>
              </div>
              <button
                onClick={() => setStudioSettings({ ...studioSettings, shadow: !studioSettings.shadow })}
                className={`px-3 py-1 rounded-full font-bold text-xs transition-all ${
                  studioSettings.shadow
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : 'bg-slate-800 text-slate-500'
                }`}
              >
                {studioSettings.shadow ? 'ENABLED' : 'DISABLED'}
              </button>
            </div>
          </div>

          <button
            onClick={() => {
              const canvas = canvasRef.current;
              const imageUrl = canvas ? canvas.toDataURL('image/png') : activeImage;
              onSelectProductForItem(selectedBox, imageUrl);
            }}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold text-sm sm:text-base shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 transition-all transform active:scale-98"
          >
            <span>Catalog Selected Product ({selectedBox.label})</span>
            <CheckCircle className="w-5 h-5 fill-current" />
          </button>
        </div>

      </div>

    </div>
  );
};
