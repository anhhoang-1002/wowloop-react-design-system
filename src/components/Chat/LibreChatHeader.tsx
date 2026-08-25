import React, { useState } from 'react';
import { PanelLeft, PanelRight, ChevronDown, Sparkles, Share2, Bookmark } from 'lucide-react';
import { Button } from '../ui/button';
import { ThemeSwitcher } from '../ThemeSwitcher';

export interface LibreChatHeaderProps {
  isLeftNavOpen: boolean;
  onToggleLeftNav: () => void;
  isRightPanelOpen: boolean;
  onToggleRightPanel: () => void;
}

export const LibreChatHeader: React.FC<LibreChatHeaderProps> = ({
  isLeftNavOpen,
  onToggleLeftNav,
  isRightPanelOpen,
  onToggleRightPanel,
}) => {
  const [selectedModel, setSelectedModel] = useState('Wowloop AI (GPT-4o)');
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);

  const models = [
    { name: 'Wowloop AI (GPT-4o)', desc: 'High-performance retention & subscription model', badge: 'Recommended' },
    { name: 'Wowloop Retention Agent (Claude 3.5)', desc: 'Specialized in churn analysis & win-back campaigns', badge: 'Fast' },
    { name: 'Wowloop Funnel Architect', desc: 'Designs high-converting SaaS subscription funnels', badge: 'Pro' },
  ];

  return (
    <header className="h-14 border-b border-border dark:border-slate-800 bg-surface dark:bg-slate-900 px-4 flex items-center justify-between sticky top-0 z-30 shadow-xs transition-colors">
      <div className="flex items-center gap-3">
        {/* Toggle Left Sidebar */}
        <button
          onClick={onToggleLeftNav}
          className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title={isLeftNavOpen ? 'Hide Sidebar' : 'Show Sidebar'}
        >
          <PanelLeft size={18} />
        </button>

        {/* Model Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 font-bold text-sm transition-colors border border-slate-200/80 dark:border-slate-700 shadow-xs"
          >
            <Sparkles size={16} className="text-secondary dark:text-blue-400" />
            <span>{selectedModel}</span>
            <ChevronDown size={14} className="text-slate-400" />
          </button>

          {isModelDropdownOpen && (
            <div className="absolute left-0 top-full mt-1.5 w-80 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in-0 zoom-in-95">
              <div className="text-[11px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider px-3 py-1.5">
                Select Model
              </div>
              <div className="space-y-1">
                {models.map((m, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedModel(m.name);
                      setIsModelDropdownOpen(false);
                    }}
                    className={`w-full text-left p-3 rounded-xl transition-all flex flex-col gap-1 border ${
                      selectedModel === m.name
                        ? 'bg-[#F0F5FF] dark:bg-slate-700/80 border-secondary/40 dark:border-blue-500/50 shadow-xs'
                        : 'bg-transparent border-transparent hover:bg-slate-50 dark:hover:bg-slate-700/40'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className={selectedModel === m.name ? 'text-secondary dark:text-blue-300 font-bold' : 'text-slate-900 dark:text-slate-100'}>
                        {m.name}
                      </span>
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-extrabold px-2 py-0.5 rounded-md">
                        {m.badge}
                      </span>
                    </div>
                    <span className={selectedModel === m.name ? 'text-slate-600 dark:text-slate-300 text-[11px]' : 'text-slate-500 dark:text-slate-400 text-[11px]'}>
                      {m.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Header Actions & Theme Switcher */}
      <div className="flex items-center gap-2">
        {/* Theme Switcher Component */}
        <ThemeSwitcher className="mr-2" />

        <button className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" title="Bookmark">
          <Bookmark size={17} />
        </button>
        <button className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" title="Share Conversation">
          <Share2 size={17} />
        </button>

        {/* Toggle Right Wowloop SidePanel */}
        <Button
          variant={isRightPanelOpen ? 'deepBlue' : 'outline'}
          size="sm"
          onClick={onToggleRightPanel}
          className="ml-2 gap-2 text-xs"
        >
          <PanelRight size={16} />
          <span>Wowloop SaaS Panel</span>
        </Button>
      </div>
    </header>
  );
};
