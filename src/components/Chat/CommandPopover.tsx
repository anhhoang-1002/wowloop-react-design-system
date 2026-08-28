import React from 'react';
import { Sparkles, Terminal, Bot, Zap, Calendar, Target } from 'lucide-react';

export interface CommandItem {
  id: string;
  name: string;
  type: 'agent' | 'command';
  description: string;
  icon?: React.ReactNode;
}

export interface CommandPopoverProps {
  isOpen: boolean;
  onSelect: (item: CommandItem) => void;
  onClose: () => void;
}

export const CommandPopover: React.FC<CommandPopoverProps> = ({ isOpen, onSelect, onClose }) => {
  if (!isOpen) return null;

  const commands: CommandItem[] = [
    { id: '1', name: '@retention-bot', type: 'agent', description: 'Automated win-back & churn analysis agent', icon: <Bot size={15} className="text-secondary dark:text-blue-400" /> },
    { id: '2', name: '@mrr-architect', type: 'agent', description: 'Designs high-converting subscription funnels', icon: <Sparkles size={15} className="text-emerald-500" /> },
    { id: '3', name: '/goal', type: 'command', description: 'Run a thorough, autonomous task until achieved', icon: <Target size={15} className="text-orange-500" /> },
    { id: '4', name: '/schedule', type: 'command', description: 'Schedule a recurring win-back check or timer', icon: <Calendar size={15} className="text-blue-500" /> },
    { id: '5', name: '/learn', type: 'command', description: 'Persist retention preferences for future tasks', icon: <Zap size={15} className="text-purple-500" /> },
  ];

  return (
    <div className="absolute bottom-full left-4 mb-2 w-80 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in-0 slide-in-from-bottom-2 duration-150">
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-slate-100 dark:border-slate-700/60 text-[11px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider">
        <span className="flex items-center gap-1.5">
          <Terminal size={13} /> Agents & Commands
        </span>
        <span>ESC to close</span>
      </div>

      <div className="space-y-1 mt-1 max-h-60 overflow-y-auto">
        {commands.map((cmd) => (
          <button
            key={cmd.id}
            onClick={() => {
              onSelect(cmd);
              onClose();
            }}
            className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-colors flex items-start gap-2.5 group"
          >
            <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-200 shrink-0 group-hover:bg-white dark:group-hover:bg-slate-600 transition-colors">
              {cmd.icon}
            </div>
            <div className="flex flex-col truncate">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-secondary dark:group-hover:text-blue-400 transition-colors">
                  {cmd.name}
                </span>
                <span className="text-[9px] bg-slate-100 dark:bg-slate-700 text-slate-500 font-bold px-1.5 py-0.2 rounded uppercase">
                  {cmd.type}
                </span>
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                {cmd.description}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
