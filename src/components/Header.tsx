import React, { useEffect, useState } from 'react';
import { Sparkles, BrainCircuit, BarChart3, TestTube2, Upload, FileText, CheckCircle2 } from 'lucide-react';
import { ProductDataset } from '../types';

interface HeaderProps {
  products: ProductDataset[];
  selectedProductId: string;
  onSelectProduct: (id: string) => void;
  activeTab: 'dashboard' | 'sandbox' | 'batch';
  onTabChange: (tab: 'dashboard' | 'sandbox' | 'batch') => void;
  onOpenBatchModal: () => void;
  onOpenExportModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  products,
  selectedProductId,
  onSelectProduct,
  activeTab,
  onTabChange,
  onOpenBatchModal,
  onOpenExportModal,
}) => {
  const [engineStatus, setEngineStatus] = useState<{ hasKey: boolean; loading: boolean }>({
    hasKey: false,
    loading: true,
  });

  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => {
        setEngineStatus({ hasKey: !!data.hasGeminiKey, loading: false });
      })
      .catch(() => {
        setEngineStatus({ hasKey: false, loading: false });
      });
  }, []);

  const currentProduct = products.find((p) => p.id === selectedProductId) || products[0];

  return (
    <header id="app-header" className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-slate-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-3.5 gap-3">
          {/* Logo and App Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-inner">
              <BrainCircuit className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-white flex items-center gap-1.5">
                  Amazon Review <span className="text-amber-400">NLP</span>
                </span>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  Sentiment Engine
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Aspect extraction, sarcasm detection, and buyer intent intelligence
              </p>
            </div>
          </div>

          {/* Engine Status & Product Switcher */}
          <div className="flex items-center flex-wrap gap-2.5">
            {/* Gemini NLP badge */}
            <div
              id="nlp-engine-status-pill"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border ${
                engineStatus.hasKey
                  ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800/80'
                  : 'bg-indigo-950/60 text-indigo-300 border-indigo-800/80'
              }`}
              title={
                engineStatus.hasKey
                  ? 'Gemini 3.8 Flash Neural NLP is actively powering aspect and sentiment extraction'
                  : 'VADER-based lexicon & pattern NLP engine is active (or set GEMINI_API_KEY for Gemini)'
              }
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{engineStatus.hasKey ? 'Gemini 3.8 Flash Active' : 'Neural Lexicon NLP Active'}</span>
              <CheckCircle2 className="w-3 h-3 ml-0.5 opacity-80" />
            </div>

            {/* Product Selector */}
            <div className="flex items-center gap-2">
              <label htmlFor="product-select" className="text-xs text-slate-400 font-medium hidden sm:inline">
                Product:
              </label>
              <select
                id="product-select"
                value={selectedProductId}
                onChange={(e) => onSelectProduct(e.target.value)}
                className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500 max-w-[200px] sm:max-w-[240px] truncate"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Action Buttons */}
            <button
              id="open-batch-import-btn"
              onClick={onOpenBatchModal}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
              title="Import or paste your own Amazon reviews"
            >
              <Upload className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Import Reviews</span>
            </button>

            <button
              id="export-report-btn"
              onClick={onOpenExportModal}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition-colors"
              title="Export sentiment and aspect analysis report"
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export Report</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 border-t border-slate-800/80 pt-2 pb-1">
          <button
            id="nav-tab-dashboard"
            onClick={() => onTabChange('dashboard')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'dashboard'
                ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            Product Sentiment & Aspect Breakdown
          </button>

          <button
            id="nav-tab-sandbox"
            onClick={() => onTabChange('sandbox')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'sandbox'
                ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <TestTube2 className="w-3.5 h-3.5" />
            Single Review NLP Lab
          </button>
        </div>
      </div>
    </header>
  );
};
