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
import { Settings, User, Sliders, ShieldCheck, Moon, Sun, Monitor, Zap } from 'lucide-react';
import { useThemeContext } from '../../contexts/ThemeContext';

export interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SettingsDialog: React.FC<SettingsDialogProps> = ({ open, onOpenChange }) => {
  const [activeTab, setActiveTab] = useState<'general' | 'chat' | 'account' | 'wowloop'>('general');
  const { theme, setTheme } = useThemeContext();

  const [autoScroll, setAutoScroll] = useState(true);
  const [sendOnEnter, setSendOnEnter] = useState(true);
  const [webhookUrl, setWebhookUrl] = useState('https://api.wowsuite.ai/v1/webhooks/retention');

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl">
        <DialogHeader className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex flex-row items-center justify-between">
          <DialogTitle className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Settings size={18} className="text-secondary dark:text-blue-400" /> LibreChat & Wowloop Settings
          </DialogTitle>
        </DialogHeader>

        {/* Dialog Body with Tabs */}
        <div className="flex h-[400px]">
          {/* Left Tab List */}
          <div className="w-48 bg-slate-50 dark:bg-slate-950/60 p-3 border-r border-slate-100 dark:border-slate-800 space-y-1 select-none">
            <button
              onClick={() => setActiveTab('general')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'general'
                  ? 'bg-white dark:bg-slate-800 text-secondary dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
              }`}
            >
              <Sliders size={15} /> General
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'chat'
                  ? 'bg-white dark:bg-slate-800 text-secondary dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
              }`}
            >
              <Zap size={15} /> Chat & Speech
            </button>
            <button
              onClick={() => setActiveTab('account')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'account'
                  ? 'bg-white dark:bg-slate-800 text-secondary dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
              }`}
            >
              <User size={15} /> Account
            </button>
            <button
              onClick={() => setActiveTab('wowloop')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'wowloop'
                  ? 'bg-white dark:bg-slate-800 text-secondary dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
              }`}
            >
              <ShieldCheck size={15} className="text-emerald-500" /> Wowloop SaaS
            </button>
          </div>

          {/* Right Tab Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {/* General Settings */}
            {activeTab === 'general' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2">
                    Theme Preference
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setTheme('light')}
                      className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-bold transition-all ${
                        theme === 'light'
                          ? 'border-secondary bg-blue-50/60 text-secondary'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      <Sun size={15} /> Light
                    </button>
                    <button
                      onClick={() => setTheme('dark')}
                      className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-bold transition-all ${
                        theme === 'dark'
                          ? 'border-blue-400 bg-slate-800 text-blue-400'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      <Moon size={15} /> Dark
                    </button>
                    <button
                      onClick={() => setTheme('light')}
                      className="flex items-center justify-center gap-2 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 opacity-60"
                    >
                      <Monitor size={15} /> System
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Chat Settings */}
            {activeTab === 'chat' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200">Auto-Scroll to Bottom</div>
                    <div className="text-[11px] text-slate-500">Automatically scroll down on new streaming tokens</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={autoScroll}
                    onChange={(e) => setAutoScroll(e.target.checked)}
                    className="w-4 h-4 rounded text-secondary focus:ring-secondary cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200">Send on Enter</div>
                    <div className="text-[11px] text-slate-500">Press Enter to send, Shift+Enter for new line</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={sendOnEnter}
                    onChange={(e) => setSendOnEnter(e.target.checked)}
                    className="w-4 h-4 rounded text-secondary focus:ring-secondary cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* Account Settings (Unified with Wowloop SaaS Sidebar Style) */}
            {activeTab === 'account' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-secondary-bg dark:bg-blue-950/70 border border-secondary/20 dark:border-blue-800/40 shadow-xs">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-full bg-secondary dark:bg-blue-600 text-white font-extrabold text-base flex items-center justify-center shadow-xs">
                      WA
                    </div>
                    <div>
                      <div className="text-sm font-extrabold text-secondary dark:text-blue-300">
                        Wow Admin
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-300">
                        wowadmin@wowsuite.ai
                      </div>
                    </div>
                  </div>
                  <span className="text-xs bg-primary-vibrant text-white font-extrabold px-3 py-1 rounded-full shadow-2xs uppercase tracking-wider shrink-0">
                    PRO ACTIVE
                  </span>
                </div>
              </div>
            )}

            {/* Wowloop SaaS Settings */}
            {activeTab === 'wowloop' && (
              <div className="space-y-4">
                <Input
                  label="Retention Webhook URL"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  placeholder="https://your-domain.com/webhook"
                />
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-700 dark:text-emerald-300">
                  ⚡ Automatic win-back workflow triggers enabled for cancelled subscriptions.
                </div>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="px-6 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 flex justify-between items-center">
          <span className="text-[11px] text-slate-400">LibreChat v0.7.5 • Wowloop System v1.2</span>
          <Button variant="primaryGradient" size="sm" pill onClick={() => onOpenChange(false)}>
            Save & Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
