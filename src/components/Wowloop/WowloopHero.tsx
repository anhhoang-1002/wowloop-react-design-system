import React from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Sparkles, ArrowRight, Layers } from 'lucide-react';

export interface WowloopHeroProps {
  onBookCall?: () => void;
  onExplore?: () => void;
}

export const WowloopHero: React.FC<WowloopHeroProps> = ({ onBookCall, onExplore }) => {
  return (
    <section className="py-16 px-4 max-w-5xl mx-auto text-center">
      <Badge variant="blue" className="mb-6 inline-flex">
        <Sparkles size={14} /> WOWLOOP SAAS PLATFORM DESIGN SYSTEM
      </Badge>

      <h1 className="text-4xl md:text-5xl font-medium text-black leading-tight max-w-4xl mx-auto mb-6">
        Turn What You Already Have Into{' '}
        <span className="text-secondary font-bold inline">Recurring Revenue</span>
      </h1>

      <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
        A design system engineered for high retention, customer programs, and subscriptions.
        Derived directly from <b>wowsuite.ai</b> aesthetics.
      </p>

      <div className="flex flex-wrap gap-4 justify-center items-center">
        <Button variant="primaryGradient" size="lg" pill onClick={onBookCall}>
          BOOK A STRATEGY CALL <ArrowRight size={18} className="shrink-0" />
        </Button>
        <Button variant="deepBlue" size="lg" pill onClick={onExplore}>
          EXPLORE COMPONENTS <Layers size={18} className="shrink-0" />
        </Button>
      </div>
    </section>
  );
};
