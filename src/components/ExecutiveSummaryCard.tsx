import React from 'react';
import { CheckCircle2, AlertCircle, Award, Target, Sparkles, RefreshCw } from 'lucide-react';

interface ExecutiveSummaryProps {
  productTitle: string;
  summaryData: {
    topStrengths: string[];
    topPainPoints: string[];
    executiveVerdict: string;
    actionableInsights: string[];
  };
  onRefreshInsights: () => void;
  isLoading: boolean;
}

export const ExecutiveSummaryCard: React.FC<ExecutiveSummaryProps> = ({
  productTitle,
  summaryData,
  onRefreshInsights,
  isLoading,
}) => {
  return (
    <div id="executive-summary-panel" className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 text-white rounded-xl p-5 border border-slate-800 shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-1.5">
              Executive NLP Intelligence Report
              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                AI Synthesis
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Aggregated strategic insights from customer review signals
            </p>
          </div>
        </div>

        <button
          onClick={onRefreshInsights}
          disabled={isLoading}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors disabled:opacity-50 self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-amber-400' : ''}`} />
          {isLoading ? 'Synthesizing...' : 'Regenerate Insights'}
        </button>
      </div>

      {/* Executive Verdict Banner */}
      <div className="bg-slate-800/70 border border-slate-700/80 rounded-lg p-3.5 mb-5">
        <div className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          Executive Verdict & Buyer Decision Guidance
        </div>
        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
          {summaryData.executiveVerdict}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Confirmed Strengths */}
        <div className="bg-emerald-950/30 border border-emerald-900/50 rounded-lg p-3.5">
          <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Top Confirmed Strengths
          </div>
          <ul className="space-y-2 text-xs text-emerald-100/90">
            {summaryData.topStrengths.map((s, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold text-xs mt-0.5">•</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Critical Pain Points */}
        <div className="bg-rose-950/30 border border-rose-900/50 rounded-lg p-3.5">
          <div className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-rose-400" />
            Critical Pain Points & Failure Modes
          </div>
          <ul className="space-y-2 text-xs text-rose-100/90">
            {summaryData.topPainPoints.map((p, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-rose-400 font-bold text-xs mt-0.5">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Actionable Recommendations for Brand Sellers */}
      <div className="bg-slate-800/40 border border-slate-700/60 rounded-lg p-3.5">
        <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Target className="w-4 h-4 text-amber-400" />
          Actionable Brand / Seller Recommendations
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-slate-300">
          {summaryData.actionableInsights.map((action, idx) => (
            <div key={idx} className="bg-slate-900/60 p-2.5 rounded border border-slate-800 flex items-start gap-2">
              <span className="text-amber-400 font-bold text-xs">#{idx + 1}</span>
              <span>{action}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
