/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SAMPLE_PRODUCTS } from './data/mockProducts';
import { ProductDataset, AmazonReview } from './types';
import { Header } from './components/Header';
import { ProductHero } from './components/ProductHero';
import { MetricCards } from './components/MetricCards';
import { AspectAnalysisView } from './components/AspectAnalysisView';
import { EmotionSpectrum } from './components/EmotionSpectrum';
import { ExecutiveSummaryCard } from './components/ExecutiveSummaryCard';
import { ReviewsView } from './components/ReviewsView';
import { LiveReviewSandbox } from './components/LiveReviewSandbox';
import { BatchImportModal } from './components/BatchImportModal';
import { ExportReportModal } from './components/ExportReportModal';
import { analyzeReviewAPI, batchSynthesizeAPI } from './utils/nlpClient';

export default function App() {
  const [products, setProducts] = useState<ProductDataset[]>(SAMPLE_PRODUCTS);
  const [selectedProductId, setSelectedProductId] = useState<string>(SAMPLE_PRODUCTS[0].id);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'sandbox' | 'batch'>('dashboard');

  const [selectedAspectFilter, setSelectedAspectFilter] = useState<string | null>(null);
  const [analyzingReviewId, setAnalyzingReviewId] = useState<string | null>(null);
  const [isAnalyzingBatch, setIsAnalyzingBatch] = useState(false);
  const [isSynthesizingExecutive, setIsSynthesizingExecutive] = useState(false);

  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Executive summary state per product
  const [executiveSummaries, setExecutiveSummaries] = useState<
    Record<
      string,
      {
        topStrengths: string[];
        topPainPoints: string[];
        executiveVerdict: string;
        actionableInsights: string[];
      }
    >
  >({
    'sony-wh1000xm5': {
      topStrengths: [
        'Industry-defining Active Noise Cancellation on flights and daily commutes',
        'Exceptional 30+ hour battery life with rapid USB-C replenishment',
        'Audiophile-grade acoustic resolution when streaming with high-res LDAC'
      ],
      topPainPoints: [
        'Speak-to-Chat auto-pause sensor false positives triggered by yawning or coughing',
        'Synthetic earcups generate heat during multi-hour desk sessions',
        'Headband pivot yoke reported brittle under tension with warranty disputes'
      ],
      executiveVerdict:
        'A market leader in noise cancellation and battery longevity. Best suited for frequent travelers and office professionals who turn off Speak-to-Chat sensor sensitivity.',
      actionableInsights: [
        'Push firmware update dampening Speak-to-Chat sensitivity threshold during Zoom calls.',
        'Review plastic structural resilience on adjustment hinges in revision batch.',
        'Offer breathable mesh replacement earcups for hot office environments.'
      ]
    },
    'kindle-paperwhite-11': {
      topStrengths: [
        'Adjustable warm light eliminates late-night reading eye fatigue',
        'Legendary battery endurance lasting 6+ weeks on casual daily reading',
        'IPX8 waterproof chassis is bathtub and beach safe'
      ],
      topPainPoints: [
        'Intrusive lockscreen ads require extra $20 payment to remove',
        'Home screen firmware cluttered with sponsored book recommendations',
        'Sideloaded EPUB file indexing occasionally slow'
      ],
      executiveVerdict:
        'The gold standard of e-readers for bookworms. Hardware is virtually flawless, though consumers resent software ad upsells.',
      actionableInsights: [
        'Streamline Home view to offer a minimalist "Library-Only" toggle for avid readers.',
        'Reduce lockscreen ad friction or provide ad-free promos during Prime Day.',
        'Optimize local storage indexing speed for sideloaded documents.'
      ]
    },
    'ninja-air-fryer-pro': {
      topStrengths: [
        'Extremely fast 14-minute crispy frying with minimal oil needed',
        'Ceramic nonstick basket rinses clean in seconds without scrubbing',
        'Compact footprint fits under standard kitchen cabinets'
      ],
      topPainPoints: [
        'Strong plastic/chemical odor reported during initial 5-6 heat cycles',
        '4-Quart basket fills quickly when prepping meals for families of 3 or more',
        'Crisper plate rubber feet can tear after repeated dishwasher cycles'
      ],
      executiveVerdict:
        'A high-performing, high-efficiency kitchen upgrade. Advise buyers to run multiple outdoor lemon/vinegar burn-in cycles before first culinary use.',
      actionableInsights: [
        'Improve factory pre-bake degassing procedure to eliminate residual plastic smell.',
        'Include extra replacement silicone feet for the crisper plate in the box.',
        'Cross-sell 5.5-quart size more prominently for multi-person households.'
      ]
    }
  });

  const currentProduct =
    products.find((p) => p.id === selectedProductId) || products[0];

  const currentSummary = executiveSummaries[currentProduct.id] || {
    topStrengths: [
      'High consumer ratings for build quality and primary feature reliability',
      'Straightforward setup and dependable performance out of the box',
      'Strong value retention compared to competing price tier'
    ],
    topPainPoints: [
      'Occasional firmware or software setting learning curve',
      'Packaging vulnerability during third-party transit',
      'Customer support turnaround time for return authorization'
    ],
    executiveVerdict:
      'Solid consumer satisfaction driven by reliable core functionality, tempered by isolated quality control and warranty service friction.',
    actionableInsights: [
      'Refine packaging padding to reduce transit shock damage.',
      'Enhance digital onboarding guides to mitigate user setup confusion.',
      'Implement proactive warranty claim ticketing for verified purchasers.'
    ]
  };

  // Re-analyze a single review on the fly
  const handleReanalyzeSingle = async (reviewId: string) => {
    const targetRev = currentProduct.reviews.find((r) => r.id === reviewId);
    if (!targetRev) return;

    setAnalyzingReviewId(reviewId);

    try {
      const response = await analyzeReviewAPI(
        targetRev.reviewText,
        targetRev.reviewTitle,
        targetRev.rating
      );

      setProducts((prevProducts) =>
        prevProducts.map((p) => {
          if (p.id !== currentProduct.id) return p;
          return {
            ...p,
            reviews: p.reviews.map((r) => {
              if (r.id !== reviewId) return r;
              return {
                ...r,
                analysis: response.result
              };
            })
          };
        })
      );
    } catch (err) {
      console.error('Failed to re-analyze single review:', err);
    } finally {
      setAnalyzingReviewId(null);
    }
  };

  // Batch re-analyze all reviews for current product
  const handleReanalyzeAll = async () => {
    setIsAnalyzingBatch(true);

    try {
      const updatedReviews = await Promise.all(
        currentProduct.reviews.map(async (rev) => {
          try {
            const resp = await analyzeReviewAPI(
              rev.reviewText,
              rev.reviewTitle,
              rev.rating
            );
            return {
              ...rev,
              analysis: resp.result
            };
          } catch (err) {
            return rev;
          }
        })
      );

      setProducts((prev) =>
        prev.map((p) => {
          if (p.id !== currentProduct.id) return p;
          return {
            ...p,
            reviews: updatedReviews
          };
        })
      );

      // Trigger executive synthesis
      handleRefreshExecutive(updatedReviews);
    } catch (err) {
      console.error('Batch analysis error:', err);
    } finally {
      setIsAnalyzingBatch(false);
    }
  };

  // Refresh executive insights
  const handleRefreshExecutive = async (
    customReviews?: AmazonReview[]
  ) => {
    setIsSynthesizingExecutive(true);
    const reviewsToAnalyze = customReviews || currentProduct.reviews;

    try {
      const resp = await batchSynthesizeAPI(
        reviewsToAnalyze.map((r) => ({
          id: r.id,
          reviewerName: r.reviewerName,
          rating: r.rating,
          reviewTitle: r.reviewTitle,
          reviewText: r.reviewText,
          verifiedPurchase: r.verifiedPurchase,
          helpfulVotes: r.helpfulVotes
        })),
        currentProduct.title
      );

      setExecutiveSummaries((prev) => ({
        ...prev,
        [currentProduct.id]: {
          topStrengths: resp.topStrengths,
          topPainPoints: resp.topPainPoints,
          executiveVerdict: resp.executiveVerdict,
          actionableInsights: resp.actionableInsights
        }
      }));
    } catch (err) {
      console.error('Failed to synthesize executive insights:', err);
    } finally {
      setIsSynthesizingExecutive(false);
    }
  };

  // Import custom dataset
  const handleImportCustomDataset = (newProduct: ProductDataset) => {
    setProducts((prev) => [newProduct, ...prev]);
    setSelectedProductId(newProduct.id);
    setSelectedAspectFilter(null);
    setActiveTab('dashboard');

    // Trigger initial batch analysis on newly imported reviews
    setTimeout(async () => {
      setIsAnalyzingBatch(true);
      try {
        const analyzedReviews = await Promise.all(
          newProduct.reviews.map(async (rev) => {
            try {
              const resp = await analyzeReviewAPI(
                rev.reviewText,
                rev.reviewTitle,
                rev.rating
              );
              return { ...rev, analysis: resp.result };
            } catch {
              return rev;
            }
          })
        );

        setProducts((prev) =>
          prev.map((p) => (p.id === newProduct.id ? { ...p, reviews: analyzedReviews } : p))
        );

        handleRefreshExecutive(analyzedReviews);
      } finally {
        setIsAnalyzingBatch(false);
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-slate-100/60 text-slate-800 flex flex-col font-sans selection:bg-amber-500/20 selection:text-amber-900">
      {/* Header */}
      <Header
        products={products}
        selectedProductId={selectedProductId}
        onSelectProduct={(id) => {
          setSelectedProductId(id);
          setSelectedAspectFilter(null);
        }}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenBatchModal={() => setIsBatchModalOpen(true)}
        onOpenExportModal={() => setIsExportModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {activeTab === 'dashboard' ? (
          <>
            {/* Product Hero Info */}
            <ProductHero
              product={currentProduct}
              onReanalyzeAll={handleReanalyzeAll}
              isAnalyzingBatch={isAnalyzingBatch}
            />

            {/* High-Level Sentiment KPIs & Metrics */}
            <MetricCards reviews={currentProduct.reviews} />

            {/* Deep NLP Analytics Grid: Aspects & Emotion Spectrum */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              {/* Aspect-Based Sentiment Analysis (ABSA) */}
              <AspectAnalysisView
                reviews={currentProduct.reviews}
                selectedAspectFilter={selectedAspectFilter}
                onSelectAspectFilter={setSelectedAspectFilter}
              />

              {/* Emotional Breakdown & Profiling */}
              <EmotionSpectrum reviews={currentProduct.reviews} />
            </div>

            {/* Executive Summary & Seller Recommendations */}
            <ExecutiveSummaryCard
              productTitle={currentProduct.title}
              summaryData={currentSummary}
              onRefreshInsights={() => handleRefreshExecutive()}
              isLoading={isSynthesizingExecutive}
            />

            {/* Customer Reviews Feed with Filter & Sentiment Tags */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-bold text-slate-900">
                  Individual Customer Review Signals
                </h2>
                <span className="text-xs text-slate-500">
                  NLP extracted sentiment, sarcasm badges & key phrases
                </span>
              </div>

              <ReviewsView
                reviews={currentProduct.reviews}
                onReanalyzeSingle={handleReanalyzeSingle}
                analyzingReviewId={analyzingReviewId}
                selectedAspectFilter={selectedAspectFilter}
                onClearAspectFilter={() => setSelectedAspectFilter(null)}
              />
            </div>
          </>
        ) : (
          /* Single Review NLP Sandbox Tab */
          <LiveReviewSandbox />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            Amazon Product Sentiment Analysis using Natural Language Processing (NLP)
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Aspect-Based Sentiment (ABSA)</span>
            <span>•</span>
            <span>Sarcasm Classification</span>
            <span>•</span>
            <span>Gemini 3.8 Flash Neural Engine</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <BatchImportModal
        isOpen={isBatchModalOpen}
        onClose={() => setIsBatchModalOpen(false)}
        onImportCustomDataset={handleImportCustomDataset}
      />

      <ExportReportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        product={currentProduct}
        executiveSummary={currentSummary}
      />
    </div>
  );
}
