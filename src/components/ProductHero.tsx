import React from 'react';
import { Star, ShieldCheck, Tag, ExternalLink, RefreshCw } from 'lucide-react';
import { ProductDataset } from '../types';

interface ProductHeroProps {
  product: ProductDataset;
  onReanalyzeAll: () => void;
  isAnalyzingBatch: boolean;
}

export const ProductHero: React.FC<ProductHeroProps> = ({
  product,
  onReanalyzeAll,
  isAnalyzingBatch,
}) => {
  return (
    <div id="product-hero-card" className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm">
      <div className="flex flex-col md:flex-row gap-5 items-start">
        {/* Product Image */}
        <div className="w-full sm:w-36 h-36 rounded-lg bg-slate-50 border border-slate-100 overflow-hidden flex-shrink-0 flex items-center justify-center p-2 relative group">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-1.5 left-1.5 bg-slate-900/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
            ASIN: {product.asin}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              <Tag className="w-3 h-3 text-amber-600" />
              {product.category}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              Amazon Verified Reviews Dataset
            </span>
          </div>

          <h1 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug mb-2">
            {product.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
            {/* Star Rating */}
            <div className="flex items-center gap-1.5">
              <div className="flex text-amber-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= Math.round(product.overallRating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-200 fill-slate-200'
                    }`}
                  />
                ))}
              </div>
              <span className="font-semibold text-slate-800 text-sm">{product.overallRating} out of 5</span>
              <span className="text-slate-400 text-xs">({product.totalReviewsCount.toLocaleString()} total Amazon ratings)</span>
            </div>

            {/* Price */}
            <div className="text-base font-bold text-slate-900">
              {product.price}
            </div>

            <div className="text-xs text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
              <span className="font-semibold text-slate-700">{product.reviews.length}</span> in-depth customer reviews in NLP corpus
            </div>
          </div>
        </div>

        {/* Action button */}
        <div className="w-full md:w-auto flex md:flex-col justify-end items-end gap-2 flex-shrink-0">
          <button
            id="reanalyze-all-btn"
            onClick={onReanalyzeAll}
            disabled={isAnalyzingBatch}
            className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-950 font-semibold text-xs tracking-wide shadow-sm transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isAnalyzingBatch ? 'animate-spin' : ''}`} />
            {isAnalyzingBatch ? 'Analyzing All Reviews...' : 'Deep Re-Analyze All'}
          </button>
          <span className="text-[11px] text-slate-400 text-right">
            Extracts ABSA, emotions & nuances
          </span>
        </div>
      </div>
    </div>
  );
};
