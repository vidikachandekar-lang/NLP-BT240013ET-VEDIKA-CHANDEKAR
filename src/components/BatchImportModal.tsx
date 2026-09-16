import React, { useState } from 'react';
import { X, Upload, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { ProductDataset, AmazonReview } from '../types';

interface BatchImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportCustomDataset: (newProduct: ProductDataset) => void;
}

export const BatchImportModal: React.FC<BatchImportModalProps> = ({
  isOpen,
  onClose,
  onImportCustomDataset,
}) => {
  const [productTitle, setProductTitle] = useState('Apple AirPods Pro (2nd Generation) with MagSafe');
  const [category, setCategory] = useState('Electronics > Audio');
  const [price, setPrice] = useState('$249.00');
  const [rawText, setRawText] = useState(`5★ | Best noise cancelling earbuds ever made | The H2 chip transparency mode is revolutionary, feels like nothing is in my ear.
2★ | Falling out during jogging | Sound is good but silicone tips slide out constantly as soon as I start sweating.
5★ | Lifesaver on the subway | Total silence in rush hour. Battery easily lasts 6 hours per charge.
1★ | Left earbud started buzzing | After 3 months a loud static crackle developed. Apple store wanted $89 for replacement.
4★ | Great upgrade from Gen 1 | Better bass and volume swipe controls are super handy, case speaker helps find it.`);

  if (!isOpen) return null;

  const handleImport = () => {
    if (!productTitle.trim() || !rawText.trim()) return;

    // Parse lines
    const lines = rawText.split('\n').filter((l) => l.trim().length > 0);
    const parsedReviews: AmazonReview[] = lines.map((line, idx) => {
      // Try parsing formats like "5★ | Title | Body" or "Rating: 5 - Body" or plain text
      let rating = 5;
      let title = 'Customer Review';
      let body = line;

      if (line.includes('|')) {
        const parts = line.split('|').map((p) => p.trim());
        if (parts.length >= 3) {
          const starMatch = parts[0].match(/([1-5])/);
          if (starMatch) rating = parseInt(starMatch[1], 10);
          title = parts[1];
          body = parts.slice(2).join(' | ');
        } else if (parts.length === 2) {
          const starMatch = parts[0].match(/([1-5])/);
          if (starMatch) {
            rating = parseInt(starMatch[1], 10);
            body = parts[1];
          } else {
            title = parts[0];
            body = parts[1];
          }
        }
      } else {
        const starMatch = line.match(/^([1-5])\s*[\*\u2605]/);
        if (starMatch) {
          rating = parseInt(starMatch[1], 10);
          body = line.replace(/^([1-5])\s*[\*\u2605]\s*[-:]?\s*/, '');
        }
      }

      return {
        id: `custom-rev-${Date.now()}-${idx}`,
        reviewerName: `Amazon Customer #${idx + 1}`,
        rating,
        reviewTitle: title,
        reviewText: body,
        reviewDate: new Date().toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }),
        verifiedPurchase: true,
        helpfulVotes: Math.floor(Math.random() * 25) + 1,
      };
    });

    const newProduct: ProductDataset = {
      id: `custom-prod-${Date.now()}`,
      asin: 'B0CUSTOM' + Math.floor(Math.random() * 10000),
      title: productTitle,
      category,
      price,
      image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600&auto=format&fit=crop&q=80',
      overallRating: Number(
        (
          parsedReviews.reduce((acc, r) => acc + r.rating, 0) /
          (parsedReviews.length || 1)
        ).toFixed(1)
      ),
      totalReviewsCount: parsedReviews.length,
      reviews: parsedReviews,
    };

    onImportCustomDataset(newProduct);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl border border-slate-200 max-w-xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-600">
              <Upload className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Import Amazon Reviews for NLP
              </h3>
              <p className="text-xs text-slate-500">
                Paste raw review transcripts or custom product feedback lines
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Product Title
              </label>
              <input
                type="text"
                value={productTitle}
                onChange={(e) => setProductTitle(e.target.value)}
                className="w-full text-xs rounded-lg border border-slate-200 p-2 focus:ring-1 focus:ring-amber-500 text-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Category & Price
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Category"
                  className="w-full text-xs rounded-lg border border-slate-200 p-2 text-slate-800"
                />
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="$ Price"
                  className="w-full text-xs rounded-lg border border-slate-200 p-2 text-slate-800"
                />
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-700">
                Review Lines (Format: <code className="text-amber-700">Rating★ | Title | Review Body</code>)
              </label>
              <span className="text-[11px] text-slate-400">One per line</span>
            </div>
            <textarea
              rows={8}
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              className="w-full text-xs font-mono rounded-lg border border-slate-200 p-3 leading-relaxed text-slate-800 focus:ring-1 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800"
          >
            Cancel
          </button>
          <button
            onClick={handleImport}
            className="px-5 py-2 text-xs font-bold rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-sm transition-colors"
          >
            Import & Run NLP Analysis
          </button>
        </div>
      </div>
    </div>
  );
};
