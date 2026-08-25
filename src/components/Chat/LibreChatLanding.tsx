import React from 'react';
import { Sparkles, TrendingUp, Zap, Target, Rocket } from 'lucide-react';
import { Card, CardTitle, CardDescription } from '../ui/card';

export interface LibreChatLandingProps {
  onSelectPrompt: (promptText: string) => void;
}

export const LibreChatLanding: React.FC<LibreChatLandingProps> = ({ onSelectPrompt }) => {
  const promptCards = [
    {
      title: 'Analyze Churn & MRR Metrics',
      desc: 'Audit monthly recurring revenue drop-offs and generate retention recommendations.',
      icon: <TrendingUp size={20} className="text-secondary dark:text-blue-400" />,
      prompt: 'Please analyze my current MRR and subscriber retention metrics.',
    },
    {
      title: 'Setup Win-back Workflow',
      desc: 'Build an automated win-back sequence for cancelled subscriptions.',
      icon: <Zap size={20} className="text-primary-vibrant" />,
      prompt: 'Help me set up an automated win-back workflow for cancelled subscribers.',
    },
    {
      title: 'Design Retention Program Rules',
      desc: 'Configure clear benefits, clear rules, and delivery triggers for Wowloop.',
      icon: <Target size={20} className="text-accent-orangeEnd" />,
      prompt: 'How do I structure clear benefits and rules for my customer retention program?',
    },
    {
      title: 'Generate Affiliate Funnel Template',
      desc: 'Create affiliate-ready upsell and cross-sell funnel configurations.',
      icon: <Rocket size={20} className="text-secondary-light" />,
      prompt: 'Generate an affiliate-ready subscription funnel template for my ecommerce store.',
    },
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-4xl mx-auto w-full select-none">
      {/* Brand Icon Header */}
      <div className="w-16 h-16 rounded-2xl bg-secondary-bg dark:bg-blue-950/80 text-secondary dark:text-blue-400 flex items-center justify-center mb-6 shadow-xs border border-secondary/20 dark:border-blue-800/40 animate-in zoom-in-95 duration-300">
        <Sparkles size={32} />
      </div>

      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-3 text-center tracking-tight">
        What would you like to build or retain today?
      </h1>
      <p className="text-sm text-slate-600 dark:text-slate-300 text-center max-w-lg mb-10 leading-relaxed font-medium">
        Wowloop AI powers recurring revenue, retention workflows, and customer lifetime value.
      </p>

      {/* Starter Cards Grid (100% Unified Panel Card Shadow & Border Style) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {promptCards.map((card, idx) => (
          <Card
            key={idx}
            variant="input-shadow"
            onClick={() => onSelectPrompt(card.prompt)}
            className="cursor-pointer hover:border-secondary/60 dark:hover:border-blue-400/60 hover:-translate-y-1 transition-all p-5 flex items-start gap-4 group"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 flex items-center justify-center shrink-0 group-hover:bg-secondary-bg dark:group-hover:bg-blue-950/60 transition-colors">
              {card.icon}
            </div>
            <div>
              <CardTitle className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-secondary dark:group-hover:text-blue-400 transition-colors mb-1">
                {card.title}
              </CardTitle>
              <CardDescription className="text-xs text-slate-500 dark:text-slate-300 leading-relaxed">
                {card.desc}
              </CardDescription>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
