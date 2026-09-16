import React, { useState } from 'react';
import { Layers, ThumbsUp, ThumbsDown, Quote, ChevronRight } from 'lucide-react';
import { AmazonReview, AspectSentiment } from '../types';

interface AspectAnalysisViewProps {
  reviews: AmazonReview[];
  selectedAspectFilter: string | null;
  onSelectAspectFilter: (aspect: string | null) => void;
}

interface AggregatedAspect {
  aspect: string;
  positiveCount: number;
  negativeCount: number;
  neutralCount: number;
  totalMentions: number;
  avgScore: number;
  sampleEvidence: string[];
}

export const AspectAnalysisView: React.FC<AspectAnalysisViewProps> = ({
  reviews,
  selectedAspectFilter,
  onSelectAspectFilter,
}) => {
  const [expandedAspect, setExpandedAspect] = useState<string | null>(null);

  // Aggregate all aspects across all analyzed reviews
  const aspectMap = new Map<string, AggregatedAspect>();

  reviews.forEach((rev) => {
    rev.analysis?.aspects?.forEach((asp: AspectSentiment) => {
      const normalizedName = asp.aspect.trim();
      const existing = aspectMap.get(normalizedName) || {
        aspect: normalizedName,
        positiveCount: 0,
        negativeCount: 0,
        neutralCount: 0,
        totalMentions: 0,
        avgScore: 0,
        sampleEvidence: [],
      };

      if (asp.sentiment === 'positive') existing.positiveCount++;
      else if (asp.sentiment === 'negative') existing.negativeCount++;
      else existing.neutralCount++;

      existing.totalMentions++;
      existing.avgScore += asp.score;
      if (asp.evidence && existing.sampleEvidence.length < 3) {
        existing.sampleEvidence.push(`"${asp.evidence}" (Rating: ${rev.rating}★)`);
      }

      aspectMap.set(normalizedName, existing);
    });
  });

  const aspectList = Array.from(aspectMap.values())
    .map((item) => ({
      ...item,
      avgScore: Number((item.avgScore / item.totalMentions).toFixed(2)),
    }))
    .sort((a, b) => b.totalMentions - a.totalMentions);

  return (
    <div id="aspect-analysis-container" className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 mb-4 border-b border-slate-100 gap-2">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-500" />
            Aspect-Based Sentiment Analysis (ABSA)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            NLP feature-level breakdown: isolated sentiment towards specific product dimensions
          </p>
        </div>

        {selectedAspectFilter && (
          <button
            onClick={() => onSelectAspectFilter(null)}
            className="text-xs text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-md font-medium hover:bg-amber-100 transition-colors self-start sm:self-auto"
          >
            Clear Filter: "{selectedAspectFilter}" ✕
          </button>
        )}
      </div>

      {aspectList.length === 0 ? (
        <div className="text-center py-8 text-slate-400 text-sm">
          No aspect tags available. Run "Deep Re-Analyze All" to extract dimensions.
        </div>
      ) : (
        <div className="space-y-3.5">
          {aspectList.map((item) => {
            const isSelected = selectedAspectFilter === item.aspect;
            const isExpanded = expandedAspect === item.aspect;
            // score from -1 to 1 -> map to 0% - 100%
            const meterPct = Math.round(((item.avgScore + 1) / 2) * 100);

            return (
              <div
                key={item.aspect}
                className={`rounded-lg border transition-all ${
                  isSelected
                    ? 'border-amber-400 bg-amber-50/40 shadow-sm'
                    : 'border-slate-200/80 bg-slate-50/40 hover:bg-slate-50'
                }`}
              >
                <div className="p-3 sm:p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  {/* Left: Title & Tag info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <button
                        onClick={() =>
                          onSelectAspectFilter(isSelected ? null : item.aspect)
                        }
                        className="font-semibold text-sm text-slate-900 hover:text-amber-700 text-left transition-colors flex items-center gap-1.5"
                        title="Click to filter reviews mentioning this aspect"
                      >
                        <span>{item.aspect}</span>
                        <span className="text-[10px] text-slate-400 font-normal">
                          ({item.totalMentions} {item.totalMentions === 1 ? 'mention' : 'mentions'})
                        </span>
                      </button>

                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          item.avgScore >= 0.25
                            ? 'bg-emerald-100 text-emerald-800'
                            : item.avgScore <= -0.25
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {item.avgScore > 0 ? `+${item.avgScore}` : item.avgScore}{' '}
                        {item.avgScore >= 0.25 ? 'Positive' : item.avgScore <= -0.25 ? 'Negative' : 'Neutral'}
                      </span>
                    </div>

                    {/* Sentiment Bar Meter */}
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden relative">
                        <div
                          style={{ width: `${meterPct}%` }}
                          className={`h-full rounded-full transition-all duration-500 ${
                            item.avgScore >= 0.2
                              ? 'bg-emerald-500'
                              : item.avgScore <= -0.2
                              ? 'bg-rose-500'
                              : 'bg-amber-400'
                          }`}
                        />
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                        <span className="flex items-center gap-0.5 text-emerald-700">
                          <ThumbsUp className="w-3 h-3" /> {item.positiveCount}
                        </span>
                        <span className="flex items-center gap-0.5 text-rose-700">
                          <ThumbsDown className="w-3 h-3" /> {item.negativeCount}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Actions: Filter & View Evidence */}
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() =>
                        onSelectAspectFilter(isSelected ? null : item.aspect)
                      }
                      className={`text-xs px-2.5 py-1 rounded font-medium transition-colors ${
                        isSelected
                          ? 'bg-amber-500 text-slate-950 font-semibold'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {isSelected ? 'Filtering' : 'Filter Reviews'}
                    </button>

                    <button
                      onClick={() =>
                        setExpandedAspect(isExpanded ? null : item.aspect)
                      }
                      className="text-xs text-slate-500 hover:text-slate-800 p-1 rounded hover:bg-slate-200/60"
                      title="Toggle sample quotes"
                    >
                      <ChevronRight
                        className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                      />
                    </button>
                  </div>
                </div>

                {/* Evidence quotes accordion */}
                {isExpanded && item.sampleEvidence.length > 0 && (
                  <div className="px-3.5 pb-3.5 pt-1 border-t border-slate-200/60 text-xs text-slate-600 space-y-1.5 bg-white rounded-b-lg">
                    <div className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                      <Quote className="w-3 h-3 text-amber-500" />
                      Customer Quotes Extracted by NLP:
                    </div>
                    {item.sampleEvidence.map((quote, qIdx) => (
                      <div key={qIdx} className="italic text-slate-700 pl-3 border-l-2 border-amber-300">
                        {quote}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
