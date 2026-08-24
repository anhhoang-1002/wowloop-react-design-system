import React, { useState } from 'react';
import { PanelLeft, PanelRight, ChevronDown, Sparkles, Share2, Bookmark } from 'lucide-react';
import { Button } from '../ui/button';

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
    <header className="h-14 border-b border-border bg-white px-4 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      <div className="flex items-center gap-3">
        {/* Toggle Left Sidebar */}
        <button
          onClick={onToggleLeftNav}
          className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
          title={isLeftNavOpen ? 'Hide Sidebar' : 'Show Sidebar'}
        >
          <PanelLeft size={18} />
        </button>

        {/* Model Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-100 text-slate-800 font-bold text-sm transition-colors border border-slate-200/80 shadow-xs"
          >
            <Sparkles size={16} className="text-secondary" />
            <span>{selectedModel}</span>
            <ChevronDown size={14} className="text-slate-400" />
          </button>

          {isModelDropdownOpen && (
            <div className="absolute left-0 top-full mt-1.5 w-80 bg-white border border-border rounded-xl shadow-xl p-1.5 z-50 animate-in fade-in-0 zoom-in-95">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1.5">
                Select Model
              </div>
              {models.map((m, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedModel(m.name);
                    setIsModelDropdownOpen(false);
                  }}
                  className={`w-full text-left p-2.5 rounded-lg transition-colors flex flex-col gap-0.5 ${
                    selectedModel === m.name ? 'bg-secondary-bg text-secondary' : 'hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span>{m.name}</span>
                    <span className="text-[10px] bg-primary-vibrant/10 text-primary-vibrant font-extrabold px-1.5 py-0.5 rounded-md">
                      {m.badge}
                    </span>
                  </div>
                  <span className="text-[11px] text-muted-foreground">{m.desc}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Header Actions */}
      <div className="flex items-center gap-2">
        <button className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors" title="Bookmark">
          <Bookmark size={17} />
        </button>
        <button className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors" title="Share Conversation">
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
