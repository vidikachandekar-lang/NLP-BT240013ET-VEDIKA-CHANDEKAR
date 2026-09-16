import React, { useState } from 'react';
import {
  TestTube2,
  Sparkles,
  Play,
  Star,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Tag,
  Layers,
  HeartHandshake,
  ShoppingBag,
} from 'lucide-react';
import { SentimentAnalysisResult } from '../types';
import { analyzeReviewAPI } from '../utils/nlpClient';

const SAMPLE_REVIEWS = [
  {
    label: 'Sarcastic 1-Star Review',
    title: 'Oh brilliant design!',
    rating: 1,
    text: 'Oh brilliant design! Spent $350 so my music pauses every single time I breathe or adjust my glasses. The plastic headband cracked within 3 weeks of normal use, and customer support told me that wearing them on my head counts as "accidental abuse". Absolute masterclass in engineering!',
  },
  {
    label: 'Rating Dissonance (5★ with complaints)',
    title: 'Great product but courier threw it over my fence',
    rating: 5,
    text: 'The sound quality and ANC are genuinely spectacular, best I have ever owned. However the delivery driver literally tossed the box over my 6-foot fence in pouring rain. Box was soaked and crushed, luckily the hard case saved the gadget. Amazon shipping needs serious improvement.',
  },
  {
    label: 'Mixed / Nuanced Review',
    title: 'Sound is audiophile perfection, but torture for larger heads',
    rating: 3,
    text: 'Acoustically these are phenomenal. The instrument separation and deep controlled bass are worth the high price tag. But the clamp force is relentless. After 45 minutes my ears are throbbing and sweaty. If you have a smaller head you will love them, but for me it is a painful trade-off.',
  },
  {
    label: 'Glowing 5-Star Review',
    title: 'Lifesaver for long international flights',
    rating: 5,
    text: 'Flew 14 hours across the Pacific. The active noise cancellation completely erased the engine roar and screaming toddlers two rows over. Battery still had 60% remaining when we landed. Incredibly comfortable even with my glasses on.',
  },
];

export const LiveReviewSandbox: React.FC = () => {
  const [reviewTitle, setReviewTitle] = useState(
    'Oh wonderful, spending $400 for headphones that randomly pause!'
  );
  const [rating, setRating] = useState(2);
  const [reviewText, setReviewText] = useState(
    'Oh wonderful, spending $400 for headphones that randomly pause whenever I clear my throat or yawn. The auto-speak-to-chat feature is completely neurotic. The faux leather earcups turned into a sauna after 35 minutes of light desk work. Sound quality is rich, but the software quirks make daily Zoom calls infuriating.'
  );

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<SentimentAnalysisResult | null>(null);
  const [nlpSource, setNlpSource] = useState<string | null>(null);

  const handleRunAnalysis = async () => {
    if (!reviewText.trim()) return;
    setIsLoading(true);
    setError(null);

    try {
      const data = await analyzeReviewAPI(reviewText, reviewTitle, rating);
      setAnalysisResult(data.result);
      setNlpSource(data.source);
    } catch (err: any) {
      setError(err?.message || 'Failed to analyze review');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadSample = (sample: (typeof SAMPLE_REVIEWS)[0]) => {
    setReviewTitle(sample.title);
    setRating(sample.rating);
    setReviewText(sample.text);
    setAnalysisResult(null);
  };

  return (
    <div id="nlp-sandbox-container" className="space-y-6">
      {/* Sandbox Header */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-4 border-b border-slate-100 gap-2">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <TestTube2 className="w-5 h-5 text-amber-500" />
              Single Review Interactive NLP Lab
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Paste or draft any Amazon review to test polarity scores, sarcasm detection, subjectivity, and aspect extraction in real time.
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Neural NLP Pipeline</span>
          </div>
        </div>

        {/* Quick Sample Presets */}
        <div className="mb-4">
          <span className="text-xs font-semibold text-slate-500 block mb-2">
            Load Challenging Linguistic Samples:
          </span>
          <div className="flex items-center gap-2 flex-wrap">
            {SAMPLE_REVIEWS.map((s, idx) => (
              <button
                key={idx}
                onClick={() => handleLoadSample(s)}
                className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-amber-50 hover:border-amber-200 hover:text-amber-900 text-slate-700 transition-colors font-medium"
              >
                {s.label} ({s.rating}★)
              </button>
            ))}
          </div>
        </div>

        {/* Input Form */}
        <div className="space-y-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Review Title */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Review Headline / Title
              </label>
              <input
                type="text"
                value={reviewTitle}
                onChange={(e) => setReviewTitle(e.target.value)}
                placeholder="e.g. Great headphones but flimsy cable"
                className="w-full text-xs rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500/30 text-slate-800"
              />
            </div>

            {/* Star Rating */}
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Star Rating: {rating} / 5
              </label>
              <div className="flex items-center gap-1 py-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="text-amber-400 hover:scale-110 transition-transform p-0.5"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        star <= rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-200 fill-slate-200'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Review Body */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Review Body (Amazon Customer Feedback)
            </label>
            <textarea
              rows={4}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Paste full review content here..."
              className="w-full text-xs rounded-lg border border-slate-200 p-3 focus:outline-none focus:ring-2 focus:ring-amber-500/30 text-slate-800 font-normal leading-relaxed"
            />
          </div>

          {/* Run Action */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] text-slate-400">
              Analyzes sentiment polarity (-1 to +1), subjectivity, ABSA dimensions & emotions
            </span>

            <button
              onClick={handleRunAnalysis}
              disabled={isLoading || !reviewText.trim()}
              className="flex items-center gap-2 px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-950 font-bold text-xs shadow-sm transition-all disabled:opacity-50"
            >
              <Play className={`w-3.5 h-3.5 ${isLoading ? 'animate-pulse' : ''}`} />
              {isLoading ? 'Running NLP Analysis...' : 'Run NLP Analysis'}
            </button>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-lg">
              {error}
            </div>
          )}
        </div>
      </div>

      {/* Analysis Results Display */}
      {analysisResult && (
        <div id="nlp-sandbox-results" className="space-y-4">
          {/* Top Level Diagnostic Summary */}
          <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-100 gap-2">
              <div className="flex items-center gap-2.5">
                <span
                  className={`text-sm font-extrabold px-3 py-1 rounded-full uppercase tracking-wide flex items-center gap-1.5 ${
                    analysisResult.sentiment === 'positive'
                      ? 'bg-emerald-100 text-emerald-800'
                      : analysisResult.sentiment === 'negative'
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {analysisResult.sentiment} Sentiment
                </span>

                <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded">
                  Polarity: {analysisResult.score > 0 ? `+${analysisResult.score}` : analysisResult.score}
                </span>

                <span className="text-xs text-slate-500">
                  (Confidence: {Math.round(analysisResult.confidence * 100)}%)
                </span>
              </div>

              {nlpSource && (
                <div className="text-[11px] font-medium text-slate-500 bg-slate-50 px-2 py-1 rounded border border-slate-200">
                  Engine: <span className="font-semibold text-slate-700">{nlpSource}</span>
                </div>
              )}
            </div>

            {/* Sarcasm & Dissonance Badges */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              <div
                className={`p-3 rounded-lg border text-xs ${
                  analysisResult.isSarcastic
                    ? 'bg-purple-50 border-purple-200 text-purple-900'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                <div className="font-bold flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                  Sarcasm / Irony Detection:{' '}
                  {analysisResult.isSarcastic ? 'DETECTED' : 'None Detected'}
                </div>
                <p className="text-[11px] text-slate-600">
                  {analysisResult.sarcasmReason ||
                    'Review uses straightforward literal language.'}
                </p>
              </div>

              <div
                className={`p-3 rounded-lg border text-xs ${
                  analysisResult.ratingDissonance?.detected
                    ? 'bg-amber-50 border-amber-200 text-amber-900'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                <div className="font-bold flex items-center gap-1.5 mb-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  Rating Dissonance:{' '}
                  {analysisResult.ratingDissonance?.detected ? 'DISCORDANT' : 'Aligned'}
                </div>
                <p className="text-[11px] text-slate-600">
                  {analysisResult.ratingDissonance?.explanation ||
                    `Star rating (${rating}★) is coherent with narrative sentiment.`}
                </p>
              </div>
            </div>

            {/* Analytical Summary & Buyer Recommendation */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-3.5 mb-4">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                One-Sentence NLP Summary:
              </div>
              <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                "{analysisResult.summary}"
              </p>

              <div className="mt-3 pt-2.5 border-t border-slate-200/70 flex items-center justify-between text-xs">
                <span className="text-slate-500">Subjectivity Index:</span>
                <span className="font-semibold text-slate-700">
                  {Math.round(analysisResult.subjectivity * 100)}%{' '}
                  {analysisResult.subjectivity > 0.6 ? '(Strongly Opinionated)' : '(Fact-Focused)'}
                </span>

                <span className="text-slate-500">Buyer Decision Recommendation:</span>
                <span
                  className={`font-bold px-2 py-0.5 rounded ${
                    analysisResult.buyerRecommendation === 'Strongly Buy'
                      ? 'bg-emerald-100 text-emerald-800'
                      : analysisResult.buyerRecommendation === 'Avoid'
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {analysisResult.buyerRecommendation}
                </span>
              </div>
            </div>

            {/* Aspects & Key Phrases */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Aspects Extracted */}
              <div className="border border-slate-200 rounded-lg p-3.5">
                <div className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-amber-500" />
                  Extracted Aspects (ABSA)
                </div>
                {analysisResult.aspects.length === 0 ? (
                  <div className="text-xs text-slate-400">No distinct aspects extracted.</div>
                ) : (
                  <div className="space-y-2">
                    {analysisResult.aspects.map((asp, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-50 p-2 rounded border border-slate-100 text-xs"
                      >
                        <div className="flex items-center justify-between font-semibold text-slate-800">
                          <span>{asp.aspect}</span>
                          <span
                            className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                              asp.sentiment === 'positive'
                                ? 'bg-emerald-100 text-emerald-800'
                                : asp.sentiment === 'negative'
                                ? 'bg-rose-100 text-rose-800'
                                : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            {asp.score > 0 ? `+${asp.score}` : asp.score} {asp.sentiment}
                          </span>
                        </div>
                        {asp.evidence && (
                          <div className="text-[11px] text-slate-500 italic mt-0.5">
                            "{asp.evidence}"
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Emotions & Key Phrases */}
              <div className="border border-slate-200 rounded-lg p-3.5 space-y-3">
                <div>
                  <div className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                    <HeartHandshake className="w-3.5 h-3.5 text-rose-500" />
                    Emotion Breakdown
                  </div>
                  <div className="space-y-1.5">
                    {Object.entries(analysisResult.emotions).map(([emo, val]) => (
                      <div key={emo} className="flex items-center gap-2 text-xs">
                        <span className="w-24 capitalize text-slate-600 text-[11px]">{emo}</span>
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            style={{ width: `${val}%` }}
                            className={`h-full rounded-full ${
                              emo === 'joy' || emo === 'trust'
                                ? 'bg-emerald-500'
                                : emo === 'disappointment' || emo === 'frustration'
                                ? 'bg-rose-500'
                                : 'bg-purple-500'
                            }`}
                          />
                        </div>
                        <span className="text-[10px] font-mono text-slate-500 w-7 text-right">
                          {val}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Phrases */}
                {analysisResult.keyPhrases && analysisResult.keyPhrases.length > 0 && (
                  <div className="pt-2 border-t border-slate-100">
                    <div className="text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-slate-400" />
                      Key Linguistic Phrases
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {analysisResult.keyPhrases.map((kp, idx) => (
                        <span
                          key={idx}
                          className={`text-[10px] px-2 py-0.5 rounded font-medium border ${
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
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
