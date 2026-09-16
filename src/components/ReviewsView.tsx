import React, { useState, useMemo } from 'react';
import {
  Star,
  Search,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  RefreshCw,
  ThumbsUp,
  Tag,
  ShieldCheck,
  ShoppingBag,
} from 'lucide-react';
import { AmazonReview } from '../types';

interface ReviewsViewProps {
  reviews: AmazonReview[];
  onReanalyzeSingle: (reviewId: string) => Promise<void>;
  analyzingReviewId: string | null;
  selectedAspectFilter: string | null;
  onClearAspectFilter: () => void;
}

export const ReviewsView: React.FC<ReviewsViewProps> = ({
  reviews,
  onReanalyzeSingle,
  analyzingReviewId,
  selectedAspectFilter,
  onClearAspectFilter,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sentimentFilter, setSentimentFilter] = useState<'all' | 'positive' | 'negative' | 'neutral' | 'mixed'>('all');
  const [starFilter, setStarFilter] = useState<number | 'all'>('all');
  const [sarcasmOnly, setSarcasmOnly] = useState(false);
  const [dissonanceOnly, setDissonanceOnly] = useState(false);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'helpful' | 'lowestSentiment' | 'highestSentiment' | 'newest'>('helpful');

  // Filtered and sorted reviews
  const filteredReviews = useMemo(() => {
    return reviews
      .filter((rev) => {
        // Aspect filter from ABSA view
        if (selectedAspectFilter) {
          const hasAspect = rev.analysis?.aspects?.some(
            (a) => a.aspect.toLowerCase() === selectedAspectFilter.toLowerCase()
          );
          if (!hasAspect) return false;
        }

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = rev.reviewTitle.toLowerCase().includes(q);
          const matchText = rev.reviewText.toLowerCase().includes(q);
          const matchAuthor = rev.reviewerName.toLowerCase().includes(q);
          const matchAspect = rev.analysis?.aspects?.some((a) =>
            a.aspect.toLowerCase().includes(q)
          );
          if (!matchTitle && !matchText && !matchAuthor && !matchAspect) {
            return false;
          }
        }

        // Sentiment filter
        if (sentimentFilter !== 'all') {
          if (sentimentFilter === 'neutral') {
            if (rev.analysis?.sentiment !== 'neutral' && rev.analysis?.sentiment !== 'mixed') {
              return false;
            }
          } else if (rev.analysis?.sentiment !== sentimentFilter) {
            return false;
          }
        }

        // Star filter
        if (starFilter !== 'all' && rev.rating !== starFilter) {
          return false;
        }

        // Sarcasm flag
        if (sarcasmOnly && !rev.analysis?.isSarcastic) {
          return false;
        }

        // Dissonance flag
        if (dissonanceOnly && !rev.analysis?.ratingDissonance?.detected) {
          return false;
        }

        // Verified purchase
        if (verifiedOnly && !rev.verifiedPurchase) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'lowestSentiment') {
          return (a.analysis?.score ?? 0) - (b.analysis?.score ?? 0);
        }
        if (sortBy === 'highestSentiment') {
          return (b.analysis?.score ?? 0) - (a.analysis?.score ?? 0);
        }
        if (sortBy === 'newest') {
          return new Date(b.reviewDate).getTime() - new Date(a.reviewDate).getTime();
        }
        return b.helpfulVotes - a.helpfulVotes; // default helpful
      });
  }, [
    reviews,
    selectedAspectFilter,
    searchQuery,
    sentimentFilter,
    starFilter,
    sarcasmOnly,
    dissonanceOnly,
    verifiedOnly,
    sortBy,
  ]);

  return (
    <div id="reviews-feed-container" className="space-y-4">
      {/* Search & Filter Toolbar */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search reviews, aspects, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 text-slate-800"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Sentiment Quick Filters */}
          <div className="flex items-center gap-1.5 flex-wrap w-full md:w-auto">
            <span className="text-xs text-slate-400 font-medium mr-1">Sentiment:</span>
            {[
              { id: 'all', label: 'All' },
              { id: 'positive', label: 'Positive' },
              { id: 'neutral', label: 'Mixed / Neutral' },
              { id: 'negative', label: 'Negative' },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => setSentimentFilter(s.id as any)}
                className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors ${
                  sentimentFilter === s.id
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Sort selector */}
          <div className="flex items-center gap-1.5 w-full md:w-auto justify-end">
            <span className="text-xs text-slate-400 font-medium">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-md px-2 py-1 text-slate-700 focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              <option value="helpful">Most Helpful Votes</option>
              <option value="lowestSentiment">Lowest Sentiment First (Pain Points)</option>
              <option value="highestSentiment">Highest Sentiment First</option>
              <option value="newest">Most Recent</option>
            </select>
          </div>
        </div>

        {/* Secondary Filter Flags */}
        <div className="flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-slate-400 font-medium">Ratings:</span>
            {(['all', 5, 4, 3, 2, 1] as const).map((star) => (
              <button
                key={String(star)}
                onClick={() => setStarFilter(star)}
                className={`px-2 py-0.5 rounded text-[11px] font-medium border ${
                  starFilter === star
                    ? 'bg-amber-50 border-amber-300 text-amber-900 font-bold'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {star === 'all' ? 'All Stars' : `${star}★`}
              </button>
            ))}

            <div className="h-3 w-px bg-slate-200 mx-1 hidden sm:block" />

            {/* Sarcasm flag toggle */}
            <label className="flex items-center gap-1.5 cursor-pointer text-purple-800 bg-purple-50 px-2 py-0.5 rounded border border-purple-200 hover:bg-purple-100 transition-colors">
              <input
                type="checkbox"
                checked={sarcasmOnly}
                onChange={(e) => setSarcasmOnly(e.target.checked)}
                className="rounded text-purple-600 focus:ring-0 w-3 h-3"
              />
              <span className="font-medium text-[11px]">Sarcasm Only</span>
            </label>

            {/* Dissonance flag toggle */}
            <label className="flex items-center gap-1.5 cursor-pointer text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 hover:bg-amber-100 transition-colors">
              <input
                type="checkbox"
                checked={dissonanceOnly}
                onChange={(e) => setDissonanceOnly(e.target.checked)}
                className="rounded text-amber-600 focus:ring-0 w-3 h-3"
              />
              <span className="font-medium text-[11px]">Rating Dissonance</span>
            </label>

            {/* Verified toggle */}
            <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 hover:bg-slate-200 transition-colors">
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                className="rounded text-slate-600 focus:ring-0 w-3 h-3"
              />
              <span className="font-medium text-[11px]">Verified Purchase</span>
            </label>
          </div>

          <div className="text-slate-500 font-medium">
            Showing <span className="font-bold text-slate-800">{filteredReviews.length}</span> of {reviews.length} reviews
          </div>
        </div>

        {selectedAspectFilter && (
          <div className="bg-amber-50 border border-amber-200 rounded-md p-2 flex items-center justify-between text-xs text-amber-900">
            <span>
              Filtering by Aspect: <strong>"{selectedAspectFilter}"</strong>
            </span>
            <button
              onClick={onClearAspectFilter}
              className="text-amber-800 underline font-semibold hover:text-amber-950"
            >
              Clear aspect filter
            </button>
          </div>
        )}
      </div>

      {/* Reviews List */}
      {filteredReviews.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-500 text-sm">
          No customer reviews matched your search criteria or active filters.
        </div>
      ) : (
        <div className="space-y-3.5">
          {filteredReviews.map((rev) => {
            const a = rev.analysis;
            const isAnalyzing = analyzingReviewId === rev.id;

            return (
              <div
                key={rev.id}
                id={`review-card-${rev.id}`}
                className="bg-white rounded-xl border border-slate-200/80 p-4 sm:p-5 shadow-sm hover:border-slate-300 transition-all space-y-3"
              >
                {/* Review Header: Stars, Sentiment Badge, Re-analyze action */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    {/* Stars */}
                    <div className="flex text-amber-400">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= rev.rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-200 fill-slate-200'
                          }`}
                        />
                      ))}
                    </div>

                    <span className="font-bold text-slate-900 text-sm">{rev.reviewTitle}</span>
                  </div>

                  {/* Sentiment Pill & Score */}
                  {a && (
                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <span
                        className={`text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                          a.sentiment === 'positive'
                            ? 'bg-emerald-100 text-emerald-800'
                            : a.sentiment === 'negative'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        <span>{a.sentiment.toUpperCase()}</span>
                        <span className="text-[10px] font-mono opacity-80">
                          ({a.score > 0 ? `+${a.score}` : a.score})
                        </span>
                      </span>

                      {/* Live re-analyze button */}
                      <button
                        onClick={() => onReanalyzeSingle(rev.id)}
                        disabled={isAnalyzing}
                        className="text-[11px] text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 p-1.5 rounded transition-colors flex items-center gap-1"
                        title="Re-run deep NLP on this review"
                      >
                        <RefreshCw className={`w-3 h-3 ${isAnalyzing ? 'animate-spin text-amber-600' : ''}`} />
                        <span className="hidden sm:inline">{isAnalyzing ? 'Analyzing...' : 'Re-Analyze'}</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Author & Purchase Metadata */}
                <div className="flex items-center gap-2 text-xs text-slate-500 flex-wrap">
                  <span className="font-medium text-slate-700">{rev.reviewerName}</span>
                  <span>•</span>
                  <span>{rev.reviewDate}</span>
                  {rev.verifiedPurchase && (
                    <>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-emerald-700 font-medium">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        Verified Purchase
                      </span>
                    </>
                  )}
                  {rev.productVariant && (
                    <>
                      <span>•</span>
                      <span className="text-slate-500">Variant: {rev.productVariant}</span>
                    </>
                  )}
                </div>

                {/* Sarcasm Warning Banner */}
                {a?.isSarcastic && (
                  <div className="bg-purple-50 border border-purple-200 text-purple-900 rounded-lg px-3 py-2 text-xs flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">NLP Sarcasm Detection:</span>{' '}
                      {a.sarcasmReason || 'Review contains rhetorical sarcasm or satirical praise masking negative sentiment.'}
                    </div>
                  </div>
                )}

                {/* Rating Dissonance Banner */}
                {a?.ratingDissonance?.detected && (
                  <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-lg px-3 py-2 text-xs flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">Rating Dissonance:</span>{' '}
                      {a.ratingDissonance.explanation}
                    </div>
                  </div>
                )}

                {/* Review Body */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {rev.reviewText}
                </p>

                {/* Extracted Key Phrases */}
                {a?.keyPhrases && a.keyPhrases.length > 0 && (
                  <div className="flex items-center gap-1.5 flex-wrap pt-1">
                    <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                      <Tag className="w-3 h-3" /> Key Phrases:
                    </span>
                    {a.keyPhrases.map((kp, idx) => (
                      <span
                        key={idx}
                        className={`text-[11px] px-2 py-0.5 rounded font-medium border ${
                          kp.sentiment === 'positive'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : kp.sentiment === 'negative'
                            ? 'bg-rose-50 text-rose-800 border-rose-200'
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        {kp.phrase}
                      </span>
                    ))}
                  </div>
                )}

                {/* Aspect mentions */}
                {a?.aspects && a.aspects.length > 0 && (
                  <div className="flex items-center gap-1.5 flex-wrap pt-1 border-t border-slate-100">
                    <span className="text-[11px] text-slate-400 font-medium">Aspects:</span>
                    {a.aspects.map((asp, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded flex items-center gap-1"
                        title={asp.evidence}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            asp.sentiment === 'positive'
                              ? 'bg-emerald-500'
                              : asp.sentiment === 'negative'
                              ? 'bg-rose-500'
                              : 'bg-amber-400'
                          }`}
                        />
                        <span className="font-semibold text-slate-800">{asp.aspect}</span>
                        <span className="text-slate-500">
                          ({asp.score > 0 ? `+${asp.score}` : asp.score})
                        </span>
                      </span>
                    ))}
                  </div>
                )}

                {/* Footer: Helpful votes & Buyer Recommendation */}
                <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="w-3.5 h-3.5 text-slate-400" />
                    <span>{rev.helpfulVotes} people found this helpful</span>
                  </div>

                  {a?.buyerRecommendation && (
                    <div className="flex items-center gap-1 text-[11px]">
                      <ShoppingBag className="w-3 h-3 text-slate-400" />
                      <span className="font-medium">Recommendation:</span>
                      <span
                        className={`font-bold ${
                          a.buyerRecommendation === 'Strongly Buy'
                            ? 'text-emerald-700'
                            : a.buyerRecommendation === 'Avoid'
                            ? 'text-rose-700'
                            : 'text-amber-700'
                        }`}
                      >
                        {a.buyerRecommendation}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
