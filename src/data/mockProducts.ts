import { ProductDataset } from '../types';

export const SAMPLE_PRODUCTS: ProductDataset[] = [
  {
    id: 'sony-wh1000xm5',
    asin: 'B09XS7JWHH',
    title: 'Sony WH-1000XM5 Wireless Industry Leading Noise Canceling Headphones',
    category: 'Electronics > Headphones',
    price: '$398.00',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=80',
    overallRating: 4.4,
    totalReviewsCount: 14890,
    reviews: [
      {
        id: 'rev-1',
        reviewerName: 'Marcus Sterling',
        rating: 5,
        reviewTitle: 'Unbelievable noise cancellation on international flights',
        reviewText:
          'I commute weekly between NYC and London. The active noise cancellation creates an absolute bubble of silence even next to the jet engine. The battery lasted the entire round trip without needing a recharge. However, the new hinge design does not fold up as compactly into a backpack as the older XM4s did, which is a mild inconvenience.',
        reviewDate: 'October 14, 2024',
        verifiedPurchase: true,
        helpfulVotes: 342,
        productVariant: 'Silver',
        analysis: {
          sentiment: 'positive',
          score: 0.85,
          confidence: 0.94,
          subjectivity: 0.72,
          isSarcastic: false,
          summary: 'High praise for industry-leading ANC and battery life, with a minor critique of portability compared to XM4.',
          emotions: { joy: 85, trust: 90, disappointment: 15, frustration: 5, surprise: 40 },
          aspects: [
            { aspect: 'Noise Cancellation', sentiment: 'positive', score: 0.98, evidence: 'creates an absolute bubble of silence even next to the jet engine' },
            { aspect: 'Battery Life', sentiment: 'positive', score: 0.92, evidence: 'battery lasted the entire round trip without needing a recharge' },
            { aspect: 'Portability & Foldability', sentiment: 'negative', score: -0.45, evidence: 'does not fold up as compactly into a backpack as the older XM4s' },
          ],
          keyPhrases: [
            { phrase: 'bubble of silence', sentiment: 'positive', weight: 0.95 },
            { phrase: 'battery lasted entire round trip', sentiment: 'positive', weight: 0.9 },
            { phrase: 'mild inconvenience', sentiment: 'negative', weight: 0.35 }
          ],
          buyerRecommendation: 'Strongly Buy'
        }
      },
      {
        id: 'rev-2',
        reviewerName: 'Elena Rostova',
        rating: 2,
        reviewTitle: 'Great if you love sweaty ears and auto-pause glitches!',
        reviewText:
          'Oh wonderful, spending $400 for headphones that randomly pause whenever I clear my throat or yawn. The auto-speak-to-chat feature is completely neurotic. The faux leather earcups turned into a sauna after 35 minutes of light desk work. Sound quality is rich, but the software quirks make daily Zoom calls infuriating.',
        reviewDate: 'November 2, 2024',
        verifiedPurchase: true,
        helpfulVotes: 189,
        productVariant: 'Black',
        analysis: {
          sentiment: 'negative',
          score: -0.72,
          confidence: 0.91,
          subjectivity: 0.88,
          isSarcastic: true,
          sarcasmReason: 'Reviewer uses sarcastic praise ("Oh wonderful, spending $400...") to mock software glitches and comfort issues.',
          ratingDissonance: {
            detected: false,
            explanation: 'Star rating (2 stars) aligns well with the heavy negative sentiment and sarcasm.'
          },
          summary: 'Severely frustrated by Speak-to-Chat trigger errors and excessive heat buildup, despite acknowledging good sound quality.',
          emotions: { joy: 5, trust: 20, disappointment: 85, frustration: 95, surprise: 30 },
          aspects: [
            { aspect: 'Software & Sensors', sentiment: 'negative', score: -0.9, evidence: 'randomly pause whenever I clear my throat or yawn' },
            { aspect: 'Comfort & Heat', sentiment: 'negative', score: -0.85, evidence: 'turned into a sauna after 35 minutes of light desk work' },
            { aspect: 'Sound Quality', sentiment: 'positive', score: 0.65, evidence: 'Sound quality is rich' },
            { aspect: 'Value for Money', sentiment: 'negative', score: -0.75, evidence: 'spending $400 for headphones that randomly pause' }
          ],
          keyPhrases: [
            { phrase: 'completely neurotic', sentiment: 'negative', weight: 0.9 },
            { phrase: 'turned into a sauna', sentiment: 'negative', weight: 0.85 },
            { phrase: 'Sound quality is rich', sentiment: 'positive', weight: 0.65 }
          ],
          buyerRecommendation: 'Avoid'
        }
      },
      {
        id: 'rev-3',
        reviewerName: 'Devon Carter',
        rating: 4,
        reviewTitle: 'Superior mic quality for remote work, bass is a bit warm',
        reviewText:
          'The beamforming microphones filter out barking dogs and coffee shop chatter better than any competitor headset I tested. My colleagues noticed the clarity difference immediately. Out of the box the bass tuning is slightly boomy, but tweaking the Sony Headphones Connect equalizer flattened it out nicely. Solid 4 stars.',
        reviewDate: 'December 18, 2024',
        verifiedPurchase: true,
        helpfulVotes: 76,
        productVariant: 'Black',
        analysis: {
          sentiment: 'positive',
          score: 0.68,
          confidence: 0.89,
          subjectivity: 0.6,
          isSarcastic: false,
          summary: 'Commends microphone background cancellation for work calls; mentions bass tuning requires EQ adjustment.',
          emotions: { joy: 65, trust: 80, disappointment: 20, frustration: 10, surprise: 35 },
          aspects: [
            { aspect: 'Microphone Quality', sentiment: 'positive', score: 0.95, evidence: 'filter out barking dogs and coffee shop chatter better than any competitor' },
            { aspect: 'Sound & EQ', sentiment: 'neutral', score: 0.35, evidence: 'bass tuning is slightly boomy, but tweaking equalizer flattened it out' },
            { aspect: 'Call Clarity', sentiment: 'positive', score: 0.88, evidence: 'colleagues noticed the clarity difference immediately' }
          ],
          keyPhrases: [
            { phrase: 'filter out barking dogs', sentiment: 'positive', weight: 0.85 },
            { phrase: 'slightly boomy', sentiment: 'negative', weight: 0.4 },
            { phrase: 'clarity difference', sentiment: 'positive', weight: 0.8 }
          ],
          buyerRecommendation: 'Strongly Buy'
        }
      },
      {
        id: 'rev-4',
        reviewerName: 'Sarah Jenkins',
        rating: 1,
        reviewTitle: 'Headband snapped after 4 months with zero support',
        reviewText:
          'Be very careful: the plastic slider connection is brittle. I have an average size head and baby my electronics in the hard case. Last Thursday while sliding them onto my head, the right adjustment yoke cracked in half. Sony warranty classified physical damage as user abuse and refused repair. $400 down the drain.',
        reviewDate: 'January 9, 2025',
        verifiedPurchase: true,
        helpfulVotes: 512,
        productVariant: 'Midnight Blue',
        analysis: {
          sentiment: 'negative',
          score: -0.92,
          confidence: 0.98,
          subjectivity: 0.82,
          isSarcastic: false,
          summary: 'Critical structural failure with broken headband slider; warranty denied by customer support.',
          emotions: { joy: 0, trust: 5, disappointment: 95, frustration: 98, surprise: 60 },
          aspects: [
            { aspect: 'Build Quality & Durability', sentiment: 'negative', score: -0.98, evidence: 'plastic slider connection is brittle... right adjustment yoke cracked in half' },
            { aspect: 'Customer Support & Warranty', sentiment: 'negative', score: -0.95, evidence: 'classified physical damage as user abuse and refused repair' },
            { aspect: 'Value for Money', sentiment: 'negative', score: -0.9, evidence: '$400 down the drain' }
          ],
          keyPhrases: [
            { phrase: 'cracked in half', sentiment: 'negative', weight: 0.95 },
            { phrase: 'refused repair', sentiment: 'negative', weight: 0.9 },
            { phrase: 'down the drain', sentiment: 'negative', weight: 0.85 }
          ],
          buyerRecommendation: 'Avoid'
        }
      },
      {
        id: 'rev-5',
        reviewerName: 'Tariq Al-Mansoor',
        rating: 5,
        reviewTitle: 'Audiophile grade with LDAC codec enabled',
        reviewText:
          'If you use Android and enable LDAC in developer settings, the dynamic range and instrument separation are breathtaking. Tracks on Qobuz and Tidal come alive with detailed highs and controlled sub-bass. Multipoint Bluetooth switches seamlessly between my Pixel 8 and MacBook Pro.',
        reviewDate: 'February 1, 2025',
        verifiedPurchase: true,
        helpfulVotes: 94,
        productVariant: 'Silver',
        analysis: {
          sentiment: 'positive',
          score: 0.94,
          confidence: 0.96,
          subjectivity: 0.75,
          isSarcastic: false,
          summary: 'Enthusiastic audiophile review praising LDAC resolution, acoustic staging, and seamless multipoint pairing.',
          emotions: { joy: 95, trust: 92, disappointment: 0, frustration: 0, surprise: 45 },
          aspects: [
            { aspect: 'Sound Quality & Codec', sentiment: 'positive', score: 0.97, evidence: 'dynamic range and instrument separation are breathtaking' },
            { aspect: 'Connectivity & Multipoint', sentiment: 'positive', score: 0.9, evidence: 'Multipoint Bluetooth switches seamlessly between Pixel and MacBook' }
          ],
          keyPhrases: [
            { phrase: 'breathtaking', sentiment: 'positive', weight: 0.98 },
            { phrase: 'switches seamlessly', sentiment: 'positive', weight: 0.88 },
            { phrase: 'detailed highs', sentiment: 'positive', weight: 0.85 }
          ],
          buyerRecommendation: 'Strongly Buy'
        }
      },
      {
        id: 'rev-6',
        reviewerName: 'Priya Patel',
        rating: 5,
        reviewTitle: 'Worst purchase of my life... not! Best headphones ever',
        reviewText:
          'Had you in the first half! I was skeptical because of the high price tag, but I can no longer hear my loud roommates having jam sessions next door. Extremely comfortable for 8+ hour work sessions. Totally justified price.',
        reviewDate: 'February 15, 2025',
        verifiedPurchase: true,
        helpfulVotes: 63,
        productVariant: 'Black',
        analysis: {
          sentiment: 'positive',
          score: 0.89,
          confidence: 0.93,
          subjectivity: 0.78,
          isSarcastic: true,
          sarcasmReason: 'Playful clickbait title ("Worst purchase... not!") resolved with glowing praise in the review body.',
          ratingDissonance: {
            detected: false,
            explanation: 'Initial tease title subverts expectations, but 5-star rating matches true positive sentiment.'
          },
          summary: 'Enthusiastic endorsement after initial price skepticism, highlighting effective room sound isolation and all-day comfort.',
          emotions: { joy: 90, trust: 85, disappointment: 5, frustration: 5, surprise: 80 },
          aspects: [
            { aspect: 'Noise Cancellation', sentiment: 'positive', score: 0.95, evidence: 'no longer hear my loud roommates having jam sessions next door' },
            { aspect: 'Comfort', sentiment: 'positive', score: 0.92, evidence: 'Extremely comfortable for 8+ hour work sessions' },
            { aspect: 'Value for Money', sentiment: 'positive', score: 0.82, evidence: 'Totally justified price' }
          ],
          keyPhrases: [
            { phrase: 'Extremely comfortable', sentiment: 'positive', weight: 0.9 },
            { phrase: 'Totally justified price', sentiment: 'positive', weight: 0.85 }
          ],
          buyerRecommendation: 'Strongly Buy'
        }
      }
    ]
  },
  {
    id: 'kindle-paperwhite-11',
    asin: 'B08KTZ8249',
    title: 'Kindle Paperwhite (16 GB) – 6.8" display, adjustable warm light, up to 10 weeks battery',
    category: 'Electronics > E-Readers',
    price: '$149.99',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
    overallRating: 4.7,
    totalReviewsCount: 38240,
    reviews: [
      {
        id: 'k-1',
        reviewerName: 'Jessica Wong',
        rating: 5,
        reviewTitle: 'The warm light upgrade alone is worth every penny',
        reviewText:
          'Coming from a 2018 Paperwhite, the warm light feature completely eliminated my late night eye fatigue. The 6.8" screen fits significantly more text per page without feeling heavy. Page turns are crisp with zero lag. USB-C charging was long overdue and finally here!',
        reviewDate: 'January 22, 2025',
        verifiedPurchase: true,
        helpfulVotes: 142,
        productVariant: 'Agave Green, 16GB',
        analysis: {
          sentiment: 'positive',
          score: 0.92,
          confidence: 0.97,
          subjectivity: 0.65,
          isSarcastic: false,
          summary: 'Praise for warm light eye comfort, larger crisp display, and modern USB-C charging.',
          emotions: { joy: 92, trust: 94, disappointment: 5, frustration: 0, surprise: 30 },
          aspects: [
            { aspect: 'Screen & Warm Light', sentiment: 'positive', score: 0.98, evidence: 'warm light feature completely eliminated my late night eye fatigue' },
            { aspect: 'Performance & Speed', sentiment: 'positive', score: 0.88, evidence: 'Page turns are crisp with zero lag' },
            { aspect: 'Hardware & Ports', sentiment: 'positive', score: 0.9, evidence: 'USB-C charging was long overdue and finally here' }
          ],
          keyPhrases: [
            { phrase: 'worth every penny', sentiment: 'positive', weight: 0.95 },
            { phrase: 'eliminated eye fatigue', sentiment: 'positive', weight: 0.92 },
            { phrase: 'crisp with zero lag', sentiment: 'positive', weight: 0.88 }
          ],
          buyerRecommendation: 'Strongly Buy'
        }
      },
      {
        id: 'k-2',
        reviewerName: 'Brandon Miller',
        rating: 3,
        reviewTitle: 'Great hardware ruined by lock-screen ads and sluggish library UI',
        reviewText:
          'The e-ink hardware is gorgeous and waterproof in the bathtub. But Amazon charging $20 extra just to remove intrusive romance novel ads from my lockscreen is greedy. Furthermore, the new Home screen firmware is bloated with recommendations and makes finding my sideloaded epubs a chore.',
        reviewDate: 'February 3, 2025',
        verifiedPurchase: true,
        helpfulVotes: 215,
        productVariant: 'Black, 16GB with lockscreen ads',
        analysis: {
          sentiment: 'mixed',
          score: -0.15,
          confidence: 0.88,
          subjectivity: 0.78,
          isSarcastic: false,
          summary: 'Contrasting review loving the waterproof hardware but strongly criticizing monetization and cluttered UI.',
          emotions: { joy: 35, trust: 40, disappointment: 75, frustration: 80, surprise: 20 },
          aspects: [
            { aspect: 'Hardware & Display', sentiment: 'positive', score: 0.9, evidence: 'e-ink hardware is gorgeous and waterproof' },
            { aspect: 'Software & UI', sentiment: 'negative', score: -0.75, evidence: 'bloated with recommendations and makes finding sideloaded epubs a chore' },
            { aspect: 'Pricing & Ads', sentiment: 'negative', score: -0.85, evidence: 'charging $20 extra just to remove intrusive ads is greedy' }
          ],
          keyPhrases: [
            { phrase: 'hardware is gorgeous', sentiment: 'positive', weight: 0.88 },
            { phrase: 'intrusive romance novel ads', sentiment: 'negative', weight: 0.82 },
            { phrase: 'firmware is bloated', sentiment: 'negative', weight: 0.78 }
          ],
          buyerRecommendation: 'Consider with Reservations'
        }
      },
      {
        id: 'k-3',
        reviewerName: 'Chloe Dupont',
        rating: 5,
        reviewTitle: 'Charged it once, read 6 novels, still at 48%',
        reviewText:
          'Battery life on this e-reader feels like black magic. I read about 45 minutes every evening with 40% brightness and airplane mode on. It has been almost 6 weeks since its first charge and the battery indicator barely moved. Best travel companion.',
        reviewDate: 'February 12, 2025',
        verifiedPurchase: true,
        helpfulVotes: 88,
        productVariant: 'Black, 16GB',
        analysis: {
          sentiment: 'positive',
          score: 0.91,
          confidence: 0.95,
          subjectivity: 0.62,
          isSarcastic: false,
          summary: 'Exceptional praise for 6+ week real-world battery endurance.',
          emotions: { joy: 90, trust: 95, disappointment: 0, frustration: 0, surprise: 70 },
          aspects: [
            { aspect: 'Battery Life', sentiment: 'positive', score: 0.99, evidence: 'almost 6 weeks since first charge and battery indicator barely moved' },
            { aspect: 'Portability & Travel', sentiment: 'positive', score: 0.92, evidence: 'Best travel companion' }
          ],
          keyPhrases: [
            { phrase: 'black magic', sentiment: 'positive', weight: 0.9 },
            { phrase: 'read 6 novels', sentiment: 'positive', weight: 0.85 },
            { phrase: 'Best travel companion', sentiment: 'positive', weight: 0.92 }
          ],
          buyerRecommendation: 'Strongly Buy'
        }
      }
    ]
  },
  {
    id: 'ninja-air-fryer-pro',
    asin: 'B07FDJMC99',
    title: 'Ninja AF101 Air Fryer that Crisps, Roasts, Reheats, & Dehydrates, 4-Quart Capacity',
    category: 'Home & Kitchen > Small Appliances',
    price: '$89.99',
    image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=600&auto=format&fit=crop&q=80',
    overallRating: 4.6,
    totalReviewsCount: 52190,
    reviews: [
      {
        id: 'n-1',
        reviewerName: 'Dave Kowalski',
        rating: 5,
        reviewTitle: 'Replaced my microwave and oven for 90% of meals',
        reviewText:
          'Frozen fries and chicken wings come out restaurant-grade crispy in 14 minutes flat with just a tablespoon of oil. The ceramic coated basket cleans in under 30 seconds with warm water. My only regret was not buying the 5.5-quart model because 4 quarts fills up fast when cooking for a family of three.',
        reviewDate: 'January 15, 2025',
        verifiedPurchase: true,
        helpfulVotes: 97,
        productVariant: 'Grey, 4-Quart',
        analysis: {
          sentiment: 'positive',
          score: 0.82,
          confidence: 0.93,
          subjectivity: 0.7,
          isSarcastic: false,
          summary: 'Fast cooking speed and easy ceramic cleaning; notes capacity limitation for larger families.',
          emotions: { joy: 85, trust: 90, disappointment: 15, frustration: 5, surprise: 40 },
          aspects: [
            { aspect: 'Cooking Performance', sentiment: 'positive', score: 0.96, evidence: 'restaurant-grade crispy in 14 minutes flat' },
            { aspect: 'Cleaning & Maintenance', sentiment: 'positive', score: 0.94, evidence: 'cleans in under 30 seconds with warm water' },
            { aspect: 'Capacity & Size', sentiment: 'neutral', score: -0.2, evidence: '4 quarts fills up fast when cooking for a family of three' }
          ],
          keyPhrases: [
            { phrase: 'restaurant-grade crispy', sentiment: 'positive', weight: 0.92 },
            { phrase: 'cleans in under 30 seconds', sentiment: 'positive', weight: 0.9 },
            { phrase: 'fills up fast', sentiment: 'negative', weight: 0.3 }
          ],
          buyerRecommendation: 'Strongly Buy'
        }
      },
      {
        id: 'n-2',
        reviewerName: 'Michelle Rodriguez',
        rating: 1,
        reviewTitle: 'Chemical burning plastic smell that would not go away',
        reviewText:
          'Ran it through 6 empty 20-minute heat cycles with vinegar and lemon as advised on forums, but the toxic plastic burning odor still permeated my entire apartment and gave me a migraine. I refuse to cook food that absorbs carcinogenic fumes. Returned on day three.',
        reviewDate: 'January 29, 2025',
        verifiedPurchase: true,
        helpfulVotes: 164,
        productVariant: 'Grey, 4-Quart',
        analysis: {
          sentiment: 'negative',
          score: -0.94,
          confidence: 0.97,
          subjectivity: 0.85,
          isSarcastic: false,
          summary: 'Severe chemical/plastic odor issue that persisted through troubleshooting, leading to return.',
          emotions: { joy: 0, trust: 5, disappointment: 92, frustration: 98, surprise: 45 },
          aspects: [
            { aspect: 'Smell & Materials', sentiment: 'negative', score: -0.99, evidence: 'toxic plastic burning odor still permeated my entire apartment' },
            { aspect: 'Safety & Health', sentiment: 'negative', score: -0.95, evidence: 'refuse to cook food that absorbs carcinogenic fumes' }
          ],
          keyPhrases: [
            { phrase: 'toxic plastic burning odor', sentiment: 'negative', weight: 0.96 },
            { phrase: 'gave me a migraine', sentiment: 'negative', weight: 0.88 },
            { phrase: 'Returned on day three', sentiment: 'negative', weight: 0.8 }
          ],
          buyerRecommendation: 'Avoid'
        }
      }
    ]
  }
];
