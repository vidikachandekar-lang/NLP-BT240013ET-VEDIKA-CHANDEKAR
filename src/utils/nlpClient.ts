import { SentimentAnalysisResult } from '../types';

export async function analyzeReviewAPI(
  reviewText: string,
  reviewTitle: string = '',
  rating: number = 3
): Promise<{ source: string; result: SentimentAnalysisResult }> {
  const response = await fetch('/api/nlp/analyze-review', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ reviewText, reviewTitle, rating }),
  });

  if (!response.ok) {
    throw new Error(`NLP Analysis failed with status ${response.status}`);
  }

  return response.json();
}

export async function batchSynthesizeAPI(
  reviews: Array<{
    id: string;
    reviewerName: string;
    rating: number;
    reviewTitle: string;
    reviewText: string;
    verifiedPurchase: boolean;
    helpfulVotes: number;
  }>,
  productName: string
): Promise<{
  source: string;
  topStrengths: string[];
  topPainPoints: string[];
  executiveVerdict: string;
  actionableInsights: string[];
}> {
  const response = await fetch('/api/nlp/batch-summary', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ reviews, productName }),
  });

  if (!response.ok) {
    throw new Error(`Batch NLP synthesis failed with status ${response.status}`);
  }

  return response.json();
}
