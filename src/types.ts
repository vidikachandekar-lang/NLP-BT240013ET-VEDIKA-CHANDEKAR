export type SentimentLabel = 'positive' | 'negative' | 'neutral' | 'mixed';

export interface AspectSentiment {
  aspect: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  score: number; // -1.0 to 1.0
  evidence: string;
}

export interface KeyPhrase {
  phrase: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  weight: number; // 0.1 to 1.0
}

export interface EmotionBreakdown {
  joy: number; // 0 to 100
  trust: number; // 0 to 100
  disappointment: number; // 0 to 100
  frustration: number; // 0 to 100
  surprise: number; // 0 to 100
}

export interface SentimentAnalysisResult {
  sentiment: SentimentLabel;
  score: number; // -1.0 to 1.0 (polarity)
  confidence: number; // 0 to 1.0
  subjectivity: number; // 0 (objective facts) to 1.0 (subjective opinion)
  isSarcastic: boolean;
  sarcasmReason?: string;
  ratingDissonance?: {
    detected: boolean;
    explanation: string;
  };
  summary: string;
  emotions: EmotionBreakdown;
  aspects: AspectSentiment[];
  keyPhrases: KeyPhrase[];
  buyerRecommendation: 'Strongly Buy' | 'Consider with Reservations' | 'Avoid' | 'Conditional on Sale';
}

export interface AmazonReview {
  id: string;
  reviewerName: string;
  rating: number; // 1 to 5
  reviewTitle: string;
  reviewText: string;
  reviewDate: string;
  verifiedPurchase: boolean;
  helpfulVotes: number;
  productVariant?: string;
  analysis?: SentimentAnalysisResult;
}

export interface ProductDataset {
  id: string;
  asin: string;
  title: string;
  category: string;
  price: string;
  image: string;
  overallRating: number;
  totalReviewsCount: number;
  reviews: AmazonReview[];
}

export interface BatchAnalysisSummary {
  totalAnalyzed: number;
  netSentimentScore: number; // -100 to +100 (like NPS)
  positivePct: number;
  neutralPct: number;
  negativePct: number;
  mixedPct: number;
  averagePolarity: number;
  topAspects: {
    aspect: string;
    positiveCount: number;
    negativeCount: number;
    avgScore: number;
  }[];
  topStrengths: string[];
  topPainPoints: string[];
  dissonanceCount: number;
  sarcasmCount: number;
  executiveVerdict: string;
  actionableInsights: string[];
}
