import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Bot, Sparkles, Globe, Zap } from 'lucide-react';

export interface AgentCreatorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateAgent?: (agent: { name: string; description: string; instructions: string }) => void;
}

export const AgentCreatorDialog: React.FC<AgentCreatorDialogProps> = ({
  open,
  onOpenChange,
  onCreateAgent,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [instructions, setInstructions] = useState('');
  const [temperature, setTemperature] = useState(0.7);

  const [webSearch, setWebSearch] = useState(true);
  const [retentionTools, setRetentionTools] = useState(true);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onCreateAgent && name) {
      onCreateAgent({ name, description, instructions });
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg p-0 overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl">
        <DialogHeader className="px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <DialogTitle className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Bot size={18} className="text-secondary dark:text-blue-400" /> Create Custom AI Agent
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[500px] overflow-y-auto">
          <Input
            label="Agent Name"
            placeholder="e.g. Retention Architect"
            requiredStar
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            label="Short Description"
            placeholder="e.g. Analyzes churn and triggers win-back campaigns"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div>
            <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2">
              System Instructions (Prompt)
            </label>
            <textarea
              rows={3}
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="You are an AI specialized in customer retention, subscription funnels, and MRR metrics..."
              className="w-full rounded-md border border-secondary/30 dark:border-slate-700 bg-surface dark:bg-slate-800 p-3 text-xs text-foreground dark:text-slate-100 outline-none focus:ring-2 focus:ring-secondary/50 resize-none"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                Temperature ({temperature})
              </label>
              <span className="text-[11px] text-slate-400">
                {temperature < 0.4 ? 'Precise' : temperature < 0.8 ? 'Balanced' : 'Creative'}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              className="w-full accent-secondary cursor-pointer"
            />
          </div>

          <div className="pt-2 space-y-2 border-t border-slate-100 dark:border-slate-800">
            <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2">
              Capabilities & Tools
            </label>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700 text-xs">
              <span className="flex items-center gap-2 text-slate-700 dark:text-slate-200 font-semibold">
                <Globe size={15} className="text-blue-500" /> Web Search
              </span>
              <input
                type="checkbox"
                checked={webSearch}
                onChange={(e) => setWebSearch(e.target.checked)}
                className="w-4 h-4 rounded text-secondary focus:ring-secondary cursor-pointer"
              />
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700 text-xs">
              <span className="flex items-center gap-2 text-slate-700 dark:text-slate-200 font-semibold">
                <Zap size={15} className="text-emerald-500" /> Wowloop SaaS Retention Tools
              </span>
              <input
                type="checkbox"
                checked={retentionTools}
                onChange={(e) => setRetentionTools(e.target.checked)}
                className="w-4 h-4 rounded text-secondary focus:ring-secondary cursor-pointer"
              />
            </div>
          </div>

          <DialogFooter className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <Button type="submit" variant="primaryGradient" pill className="w-full">
              Create Agent <Sparkles size={14} />
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
