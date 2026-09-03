import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Bot, Copy, Check, RotateCw, ThumbsUp, ThumbsDown } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Badge } from '../ui/badge';

export interface MessageVersion {
  id: string;
  versionNumber: number;
  modelName: string;
  timestamp: string;
  content: string;
}

export interface MessageVersionSwitcherProps {
  currentVersion?: number;
  totalVersions?: number;
  onPrevious?: () => void;
  onNext?: () => void;
  versions?: MessageVersion[];
  variant?: 'simple' | 'advanced';
  className?: string;
}

const defaultVersions: MessageVersion[] = [
  {
    id: 'v1',
    versionNumber: 1,
    modelName: 'Wowloop AI (GPT-4o)',
    timestamp: '2 mins ago',
    content: 'We calculated a 30-day LTV increase of +24.8% by automating win-back retention triggers for Shopify subscribers.',
  },
  {
    id: 'v2',
    versionNumber: 2,
    modelName: 'Claude 3.5 Sonnet',
    timestamp: '1 min ago',
    content: 'Detailed Breakdown:\n• Cohort A Retention: 84.2%\n• Webhook Response Latency: <120ms\n• Automated Discounts Distributed: 1,420 promo codes.',
  },
  {
    id: 'v3',
    versionNumber: 3,
    modelName: 'DeepSeek-R1',
    timestamp: 'Just now',
    content: 'Executive Summary: Automated win-back campaign reduced monthly churn by 4.2%, recovering $12,400 in MRR.',
  },
];

export const MessageVersionSwitcher: React.FC<MessageVersionSwitcherProps> = ({
  currentVersion: propCurrentVersion,
  totalVersions: propTotalVersions,
  onPrevious: propOnPrevious,
  onNext: propOnNext,
  versions = defaultVersions,
  variant = 'advanced',
  className,
}) => {
  const [internalVersion, setInternalVersion] = useState(1);
  const [copied, setCopied] = useState(false);

  const activeVersionIndex = (propCurrentVersion || internalVersion) - 1;
  const currentVersionObj = versions[activeVersionIndex] || versions[0];
  const total = propTotalVersions || versions.length;
  const activeVersionNumber = propCurrentVersion || internalVersion;

  const handlePrev = () => {
    if (propOnPrevious) {
      propOnPrevious();
    } else {
      setInternalVersion((prev) => Math.max(1, prev - 1));
    }
  };

  const handleNext = () => {
    if (propOnNext) {
      propOnNext();
    } else {
      setInternalVersion((prev) => Math.min(total, prev + 1));
    }
  };

  const handleCopy = () => {
    if (currentVersionObj) {
      navigator.clipboard.writeText(currentVersionObj.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Simple Minimalist Variant for Inline Chat Stream Controls (< 1/3 >)
  if (variant === 'simple') {
    if (total <= 1) return null;
    return (
      <div className={cn("inline-flex items-center gap-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold px-2 py-0.5 rounded-lg border border-slate-200 dark:border-slate-700 select-none", className)}>
        <button
          onClick={handlePrev}
          disabled={activeVersionNumber <= 1}
          className="p-0.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none transition-colors"
          title="Previous Version"
        >
          <ChevronLeft size={14} />
        </button>
        <span className="font-mono text-[11px] px-1">
          {activeVersionNumber}/{total}
        </span>
        <button
          onClick={handleNext}
          disabled={activeVersionNumber >= total}
          className="p-0.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none transition-colors"
          title="Next Version"
        >
          <ChevronRight size={14} />
        </button>
      </div>
    );
  }

  // Advanced Full Interactive Card Message
  return (
    <div className={cn("w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 shadow-xs select-none space-y-3 transition-all", className)}>
      {/* Header Info */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-secondary/10 text-secondary dark:text-blue-400 flex items-center justify-center font-bold">
            <Bot size={14} />
          </div>
          <span className="text-xs font-extrabold text-slate-900 dark:text-slate-100">
            {currentVersionObj?.modelName || 'AI Assistant'}
          </span>
          <Badge variant="blue" className="text-[9px] px-1.5 py-0.2">
            Ver {activeVersionNumber}
          </Badge>
        </div>

        <span className="text-[10px] text-slate-400 font-medium">
          {currentVersionObj?.timestamp || 'Just now'}
        </span>
      </div>

      {/* Message Content */}
      <div className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed font-sans whitespace-pre-line min-h-[50px] bg-slate-50/60 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-100 dark:border-slate-800/60">
        {currentVersionObj?.content}
      </div>

      {/* Footer Controls & Switcher */}
      <div className="flex items-center justify-between pt-1 text-slate-400">
        <div className="flex items-center gap-1">
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
            title="Copy Response"
          >
            {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
          </button>
          <button
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
            title="Regenerate Response"
          >
            <RotateCw size={14} />
          </button>
          <button
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
            title="Good response"
          >
            <ThumbsUp size={14} />
          </button>
          <button
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
            title="Poor response"
          >
            <ThumbsDown size={14} />
          </button>
        </div>

        {/* Dynamic Version Switcher Controls (< 1/3 >) */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold px-2.5 py-1 rounded-xl border border-slate-200/80 dark:border-slate-700 select-none">
          <button
            onClick={handlePrev}
            disabled={activeVersionNumber <= 1}
            className="p-0.5 rounded hover:bg-white dark:hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            title="Previous Version"
          >
            <ChevronLeft size={14} />
          </button>
          <span className="font-mono text-[11px] font-bold px-1">
            {activeVersionNumber}/{total}
          </span>
          <button
            onClick={handleNext}
            disabled={activeVersionNumber >= total}
            className="p-0.5 rounded hover:bg-white dark:hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            title="Next Version"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
