import React, { useState } from 'react';
import { Brain, ChevronDown, CheckCircle2, Search, Database, Terminal, Sparkles, Clock, Layers, Code } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Badge } from '../ui/badge';

export interface ProcessStep {
  id: string;
  title: string;
  category: 'search' | 'database' | 'code' | 'reasoning';
  status: 'completed' | 'running' | 'pending';
  duration?: string;
  details?: string;
}

export interface ThinkingProcessAccordionProps {
  thinkingText?: string;
  durationSeconds?: number;
  steps?: ProcessStep[];
  defaultExpanded?: boolean;
  variant?: 'simple' | 'advanced';
  className?: string;
}

const defaultProcessSteps: ProcessStep[] = [
  {
    id: 'step-1',
    title: 'Query Subscriber DB & Retention Metrics',
    category: 'database',
    status: 'completed',
    duration: '0.6s',
    details: 'Searched postgres DB table `subscriptions` (3,420 records). Identified 142 churn-risk subscribers.',
  },
  {
    id: 'step-2',
    title: 'Search Win-Back Offer Templates',
    category: 'search',
    status: 'completed',
    duration: '0.8s',
    details: 'Fetched 3 active Shopify discount webhook triggers and promotional email templates.',
  },
  {
    id: 'step-3',
    title: 'Synthesize AI Reasoning & Calculations',
    category: 'reasoning',
    status: 'completed',
    duration: '1.0s',
    details: 'Calculated 30-day LTV projections and generated automated win-back workflow payload.',
  },
];

export const ThinkingProcessAccordion: React.FC<ThinkingProcessAccordionProps> = ({
  thinkingText = '1. Querying subscriber database (3,420 records)\n2. Verifying 30-day retention curve and LTV growth metrics.',
  durationSeconds = 2.4,
  steps = defaultProcessSteps,
  defaultExpanded = false,
  variant = 'advanced',
  className,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [activeTab, setActiveTab] = useState<'grid' | 'raw'>('grid');

  const getStepIcon = (category: ProcessStep['category']) => {
    switch (category) {
      case 'database':
        return <Database size={14} className="text-blue-500" />;
      case 'search':
        return <Search size={14} className="text-amber-500" />;
      case 'code':
        return <Terminal size={14} className="text-emerald-500" />;
      default:
        return <Sparkles size={14} className="text-purple-500" />;
    }
  };

  // Simple Minimalist Variant for Inline Chat Stream
  if (variant === 'simple') {
    return (
      <div className={cn("border border-slate-200/80 dark:border-slate-700/80 rounded-xl bg-slate-50/80 dark:bg-slate-800/60 overflow-hidden my-2 select-none", className)}>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between px-3.5 py-2 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Brain size={15} className="text-secondary dark:text-blue-400 animate-pulse" />
            <span>Thought for {durationSeconds}s</span>
          </div>
          <ChevronDown
            size={15}
            className={cn("transition-transform duration-200 text-slate-400", isExpanded && "rotate-180")}
          />
        </button>

        {isExpanded && (
          <div className="px-4 py-3 border-t border-slate-200/80 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-mono whitespace-pre-wrap bg-white/50 dark:bg-slate-900/40">
            {thinkingText}
          </div>
        )}
      </div>
    );
  }

  // Advanced Full Grid Variant
  return (
    <div className={cn("border border-slate-200/80 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 overflow-hidden shadow-xs select-none transition-all my-3", className)}>
      {/* Accordion Header */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-3 bg-slate-50/80 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-secondary-bg dark:bg-blue-950/80 text-secondary dark:text-blue-400 flex items-center justify-center border border-secondary/20 dark:border-blue-800/40">
            <Brain size={18} className="animate-pulse" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                AI Reasoning & Process Steps
              </span>
              <Badge variant="green" className="text-[9px] px-2 py-0.2">
                Completed
              </Badge>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
              <span className="flex items-center gap-1">
                <Clock size={12} className="text-slate-400" /> Thought for {durationSeconds}s
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Layers size={12} className="text-slate-400" /> {steps.length} Steps Executed
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Sub-view switcher: Grid Process vs Raw Logs */}
          {isExpanded && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex items-center bg-slate-200/70 dark:bg-slate-700/60 p-0.5 rounded-lg text-[10px] font-bold"
            >
              <button
                onClick={() => setActiveTab('grid')}
                className={cn(
                  "px-2 py-1 rounded-md transition-all flex items-center gap-1",
                  activeTab === 'grid'
                    ? "bg-white dark:bg-slate-800 text-secondary dark:text-blue-400 shadow-xs font-extrabold"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                <Layers size={11} /> Step Grid
              </button>
              <button
                onClick={() => setActiveTab('raw')}
                className={cn(
                  "px-2 py-1 rounded-md transition-all flex items-center gap-1",
                  activeTab === 'raw'
                    ? "bg-white dark:bg-slate-800 text-secondary dark:text-blue-400 shadow-xs font-extrabold"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                <Code size={11} /> Raw Output
              </button>
            </div>
          )}

          <ChevronDown
            size={18}
            className={cn("transition-transform duration-200 text-slate-400", isExpanded && "rotate-180")}
          />
        </div>
      </div>

      {/* Expanded Accordion Body */}
      {isExpanded && (
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
          {activeTab === 'grid' ? (
            /* AI Process Grid Layout */
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {steps.map((step, idx) => (
                <div
                  key={step.id}
                  className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-2 hover:border-secondary/30 dark:hover:border-blue-700/40 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      {getStepIcon(step.category)}
                      <span className="text-[10px] font-extrabold uppercase text-slate-400 dark:text-slate-500 tracking-wider">
                        Step 0{idx + 1}
                      </span>
                    </div>

                    {step.duration && (
                      <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-200/60 dark:bg-slate-700/50 px-1.5 py-0.3 rounded">
                        {step.duration}
                      </span>
                    )}
                  </div>

                  <div className="font-extrabold text-xs text-slate-900 dark:text-slate-100 leading-snug">
                    {step.title}
                  </div>

                  {step.details && (
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                      {step.details}
                    </p>
                  )}

                  <div className="pt-1 flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 size={12} /> Verified & Executed
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Raw Logs View */
            <div className="p-3.5 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs leading-relaxed whitespace-pre-wrap border border-slate-800">
              {thinkingText}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
