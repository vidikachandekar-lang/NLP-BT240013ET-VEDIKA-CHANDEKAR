import React from 'react';
import { Smile, Frown, Meh, AlertTriangle, Sparkles, TrendingUp, HelpCircle } from 'lucide-react';
import { AmazonReview } from '../types';

interface MetricCardsProps {
  reviews: AmazonReview[];
}

export const MetricCards: React.FC<MetricCardsProps> = ({ reviews }) => {
  const analyzedReviews = reviews.filter((r) => !!r.analysis);
  const total = analyzedReviews.length || 1;

  let positiveCount = 0;
  let negativeCount = 0;
  let neutralOrMixedCount = 0;
  let totalPolarity = 0;
  let totalSubjectivity = 0;
  let sarcasmCount = 0;
  let dissonanceCount = 0;

  analyzedReviews.forEach((r) => {
    const a = r.analysis!;
    if (a.sentiment === 'positive') positiveCount++;
    else if (a.sentiment === 'negative') negativeCount++;
    else neutralOrMixedCount++;

    totalPolarity += a.score;
    totalSubjectivity += a.subjectivity;
    if (a.isSarcastic) sarcasmCount++;
    if (a.ratingDissonance?.detected) dissonanceCount++;
  });

  const positivePct = Math.round((positiveCount / total) * 100);
  const negativePct = Math.round((negativeCount / total) * 100);
  const neutralPct = Math.round((neutralOrMixedCount / total) * 100);
  const netSentimentScore = positivePct - negativePct; // -100 to +100
  const avgPolarity = Number((totalPolarity / total).toFixed(2));
  const avgSubjectivity = Math.round((totalSubjectivity / total) * 100);

  return (
    <div id="sentiment-metrics-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Net Sentiment Score (NSS) */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm relative overflow-hidden flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-1.5">
            <span>Net Sentiment Score (NSS)</span>
            <span
              className="cursor-help"
              title="Calculated as % Positive Sentiment minus % Negative Sentiment (-100 to +100)"
            >
              <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span
              className={`text-3xl font-extrabold tracking-tight ${
                netSentimentScore > 40
                  ? 'text-emerald-600'
                  : netSentimentScore > 0
                  ? 'text-amber-600'
                  : 'text-rose-600'
              }`}
            >
              {netSentimentScore > 0 ? `+${netSentimentScore}` : netSentimentScore}
            </span>
            <span className="text-xs text-slate-400 font-medium">/ 100</span>
          </div>

          <div className="mt-2 text-xs text-slate-600 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
            <span>
              {netSentimentScore > 50
                ? 'Strongly Positive Customer Reception'
                : netSentimentScore > 10
                ? 'Moderately Favorable Sentiment'
                : 'Polarized / Mixed Feedback'}
            </span>
          </div>
        </div>

        {/* Visual score bar */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span>Avg. Polarity:</span>
          <span className="font-semibold text-slate-700">{avgPolarity > 0 ? `+${avgPolarity}` : avgPolarity} (-1 to +1)</span>
        </div>
      </div>

      {/* 2. Sentiment Breakdown Distribution */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm flex flex-col justify-between">
        <div>
          <div className="text-xs text-slate-500 font-medium mb-2">
            Sentiment Distribution
          </div>

          {/* Tri-color bar */}
          <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex mb-2.5">
            <div
              style={{ width: `${positivePct}%` }}
              className="bg-emerald-500 h-full transition-all duration-500"
              title={`Positive: ${positivePct}%`}
            />
            <div
              style={{ width: `${neutralPct}%` }}
              className="bg-amber-400 h-full transition-all duration-500"
              title={`Neutral / Mixed: ${neutralPct}%`}
            />
            <div
              style={{ width: `${negativePct}%` }}
              className="bg-rose-500 h-full transition-all duration-500"
              title={`Negative: ${negativePct}%`}
            />
          </div>

          <div className="grid grid-cols-3 gap-1 text-center">
            <div className="p-1.5 rounded bg-emerald-50 text-emerald-800">
              <div className="flex items-center justify-center gap-1 text-[11px] font-medium">
                <Smile className="w-3 h-3 text-emerald-600" /> Positive
              </div>
              <div className="text-sm font-bold mt-0.5">{positivePct}%</div>
            </div>

            <div className="p-1.5 rounded bg-amber-50 text-amber-800">
              <div className="flex items-center justify-center gap-1 text-[11px] font-medium">
                <Meh className="w-3 h-3 text-amber-600" /> Mixed
              </div>
              <div className="text-sm font-bold mt-0.5">{neutralPct}%</div>
            </div>

            <div className="p-1.5 rounded bg-rose-50 text-rose-800">
              <div className="flex items-center justify-center gap-1 text-[11px] font-medium">
                <Frown className="w-3 h-3 text-rose-600" /> Negative
              </div>
              <div className="text-sm font-bold mt-0.5">{negativePct}%</div>
            </div>
          </div>
        </div>

        <div className="mt-3 pt-2.5 border-t border-slate-100 text-[11px] text-slate-500 flex justify-between">
          <span>Analyzed sample:</span>
          <span className="font-semibold text-slate-700">{analyzedReviews.length} reviews</span>
        </div>
      </div>

      {/* 3. Sarcasm & Irony Detection */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-1.5">
            <span>Sarcasm & Subversion Alert</span>
            <Sparkles className="w-3.5 h-3.5 text-purple-500" />
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold tracking-tight text-purple-700">
              {sarcasmCount}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              flagged {sarcasmCount === 1 ? 'review' : 'reviews'}
            </span>
          </div>

          <p className="mt-2 text-xs text-slate-600 leading-relaxed">
            {sarcasmCount > 0
              ? 'NLP detected rhetorical irony or clickbait phrasing hiding true sentiment.'
              : 'No deceptive sarcastic phrasing detected in current corpus.'}
          </p>
        </div>

        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span>Sarcasm Rate:</span>
          <span className="font-semibold text-purple-700">
            {Math.round((sarcasmCount / total) * 100)}% of reviews
          </span>
        </div>
      </div>

      {/* 4. Rating Dissonance vs Subjectivity */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-1.5">
            <span>Rating-to-Text Dissonance</span>
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold tracking-tight text-amber-600">
              {dissonanceCount}
            </span>
            <span className="text-xs text-slate-500 font-medium">dissonant reviews</span>
          </div>

          <p className="mt-2 text-xs text-slate-600 leading-relaxed">
            {dissonanceCount > 0
              ? 'Customer gave high stars but wrote negative text (or vice versa).'
              : 'Customer star ratings strongly correlate with review narrative tone.'}
          </p>
        </div>

        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span>Subjectivity Index:</span>
          <span className="font-semibold text-slate-700">{avgSubjectivity}% Opinion-driven</span>
        </div>
      </div>
    </div>
  );
};
