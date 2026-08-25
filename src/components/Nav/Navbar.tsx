import React from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <nav className="h-16 border-b border-border dark:border-slate-800 bg-surface dark:bg-slate-900 px-6 flex items-center justify-between sticky top-0 z-40 shadow-xs transition-colors">
      <div className="flex items-center gap-3">
        <img src="/logo-wowsuite.svg" alt="WOW Suite Logo" className="h-8 w-auto block dark:hidden" />
        <img src="/logo-white-wowsuite.svg" alt="WOW Suite Logo" className="h-8 w-auto hidden dark:block" />
        <Badge variant="blue">
          <Sparkles size={12} /> SaaS Platform
        </Badge>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm">Documentation</Button>
        <Button variant="primaryGradient" size="sm" pill>Book Strategy Call</Button>
      </div>
    </nav>
  );
};
