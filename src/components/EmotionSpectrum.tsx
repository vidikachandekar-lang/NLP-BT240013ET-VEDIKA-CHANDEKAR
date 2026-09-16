import React from 'react';
import { HeartHandshake, Zap } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { AmazonReview } from '../types';

interface EmotionSpectrumProps {
  reviews: AmazonReview[];
}

export const EmotionSpectrum: React.FC<EmotionSpectrumProps> = ({ reviews }) => {
  const analyzed = reviews.filter((r) => !!r.analysis?.emotions);
  const total = analyzed.length || 1;

  let sumJoy = 0;
  let sumTrust = 0;
  let sumDisappointment = 0;
  let sumFrustration = 0;
  let sumSurprise = 0;

  analyzed.forEach((r) => {
    const emo = r.analysis!.emotions;
    sumJoy += emo.joy || 0;
    sumTrust += emo.trust || 0;
    sumDisappointment += emo.disappointment || 0;
    sumFrustration += emo.frustration || 0;
    sumSurprise += emo.surprise || 0;
  });

  const emotionData = [
    {
      name: 'Joy & Delight',
      key: 'joy',
      score: Math.round(sumJoy / total),
      color: '#10b981', // emerald
      description: 'Satisfied expectations, excitement with product',
    },
    {
      name: 'Trust & Reliability',
      key: 'trust',
      score: Math.round(sumTrust / total),
      color: '#3b82f6', // blue
      description: 'Brand confidence, build quality assurance',
    },
    {
      name: 'Surprise & Novelty',
      key: 'surprise',
      score: Math.round(sumSurprise / total),
      color: '#8b5cf6', // purple
      description: 'Unexpected features or unexpected flaws',
    },
    {
      name: 'Disappointment',
      key: 'disappointment',
      score: Math.round(sumDisappointment / total),
      color: '#f59e0b', // amber
      description: 'Unmet advertising claims, missing expectations',
    },
    {
      name: 'Frustration / Anger',
      key: 'frustration',
      score: Math.round(sumFrustration / total),
      color: '#ef4444', // red
      description: 'Defects, software bugs, poor support',
    },
  ];

  return (
    <div id="emotion-spectrum-card" className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-rose-500" />
              Emotional Resonance Spectrum
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Psycholinguistic emotion profiling across analyzed Amazon reviews
            </p>
          </div>
          <div className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
            0 – 100 Index
          </div>
        </div>

        {/* Recharts Bar Chart */}
        <div className="h-52 w-full my-1">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={emotionData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
            >
              <XAxis type="number" domain={[0, 100]} hide />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fontSize: 12, fill: '#475569', fontWeight: 500 }}
                axisLine={false}
                tickLine={false}
                width={130}
              />
              <Tooltip
                formatter={(val: number) => [`${val} / 100`, 'Intensity']}
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderRadius: '8px',
                  border: 'none',
                  color: '#fff',
                  fontSize: '12px',
                }}
              />
              <Bar dataKey="score" radius={[0, 6, 6, 0]} barSize={18}>
                {emotionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Analytical interpretation */}
      <div className="pt-3 border-t border-slate-100 mt-2">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800 mb-1">
          <Zap className="w-3.5 h-3.5 text-amber-500" />
          <span>Emotion Takeaway:</span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          {sumJoy > sumFrustration && sumTrust > sumDisappointment
            ? 'Positive emotions dominate the corpus. High trust indicators suggest strong brand loyalty and reliable primary feature delivery.'
            : 'Significant frustration points detected. Reviewers display pronounced friction around warranty support, software triggers, or durability.'}
        </p>
      </div>
    </div>
  );
};
