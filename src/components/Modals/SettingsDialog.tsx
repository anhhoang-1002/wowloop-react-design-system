import React, { useState } from 'react';
import { Dialog, DialogContent } from '../ui/dialog';
import { Input } from '../ui/input';
import { Sliders, User, ShieldCheck, Moon, Sun, Monitor, Zap, X } from 'lucide-react';
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
      <DialogContent className="max-w-3xl p-0 overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl h-[520px] flex flex-row">
        {/* Full-Height Left Sidebar (Spans top to bottom with zero gap) */}
        <div className="w-56 bg-slate-50 dark:bg-slate-950/80 p-4 border-r border-slate-200/80 dark:border-slate-800 flex flex-col justify-between shrink-0 select-none">
          <div className="space-y-4">
            <div className="text-[11px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-2 pt-1">
              Settings
            </div>

            <div className="space-y-1">
              <button
                onClick={() => setActiveTab('general')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'general'
                    ? 'bg-slate-200/70 dark:bg-slate-800 text-secondary dark:text-blue-400 font-extrabold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                }`}
              >
                <Sliders size={15} className={activeTab === 'general' ? 'text-secondary dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'} /> General
              </button>

              <button
                onClick={() => setActiveTab('chat')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'chat'
                    ? 'bg-slate-200/70 dark:bg-slate-800 text-secondary dark:text-blue-400 font-extrabold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                }`}
              >
                <Zap size={15} className={activeTab === 'chat' ? 'text-secondary dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'} /> Chat & Speech
              </button>

              <button
                onClick={() => setActiveTab('account')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'account'
                    ? 'bg-slate-200/70 dark:bg-slate-800 text-secondary dark:text-blue-400 font-extrabold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                }`}
              >
                <User size={15} className={activeTab === 'account' ? 'text-secondary dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'} /> Account
              </button>

              <button
                onClick={() => setActiveTab('wowloop')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'wowloop'
                    ? 'bg-slate-200/70 dark:bg-slate-800 text-secondary dark:text-blue-400 font-extrabold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                }`}
              >
                <ShieldCheck size={15} className={activeTab === 'wowloop' ? 'text-secondary dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'} /> Wowloop SaaS
              </button>
            </div>
          </div>

          {/* Left Sidebar Bottom Profile Snippet (Antigravity Style) */}
          <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800 flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-secondary dark:bg-blue-600 text-white font-extrabold text-[11px] flex items-center justify-center shrink-0">
              WA
            </div>
            <div className="flex flex-col truncate">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">Wow Admin</span>
              <span className="text-[10px] text-slate-400 truncate">wowadmin@wowsuite.ai</span>
            </div>
          </div>
        </div>

        {/* Main Content Area (Spans top to bottom without footer gap) */}
        <div className="flex-1 flex flex-col justify-between relative bg-white dark:bg-slate-900">
          {/* Top Header inside Right Content Panel */}
          <div className="px-8 pt-6 pb-4 flex items-start justify-between border-b border-slate-100 dark:border-slate-800/80">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                {activeTab === 'general' && 'General'}
                {activeTab === 'chat' && 'Chat & Speech'}
                {activeTab === 'account' && 'Account Settings'}
                {activeTab === 'wowloop' && 'Wowloop SaaS Controls'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {activeTab === 'general' && 'Configure theme preferences and system appearance.'}
                {activeTab === 'chat' && 'Configure streaming options, auto-scroll, and text-to-speech.'}
                {activeTab === 'account' && 'Manage your account profile, plan status, and credentials.'}
                {activeTab === 'wowloop' && 'Manage recurring revenue webhooks and retention automation triggers.'}
              </p>
            </div>

            {/* Top-Right Close Button (Antigravity Style) */}
            <button
              onClick={() => onOpenChange(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Close Settings"
            >
              <X size={18} />
            </button>
          </div>

          {/* Scrollable Content Body */}
          <div className="p-8 flex-1 overflow-y-auto space-y-6">
            {/* General Settings */}
            {activeTab === 'general' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-3">
                    Theme Preference
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => setTheme('light')}
                      className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-bold transition-all ${
                        theme === 'light'
                          ? 'border-secondary bg-blue-50/60 text-secondary'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      <Sun size={15} /> Light
                    </button>
                    <button
                      onClick={() => setTheme('dark')}
                      className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-bold transition-all ${
                        theme === 'dark'
                          ? 'border-blue-400 bg-slate-800 text-blue-400'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      <Moon size={15} /> Dark
                    </button>
                    <button
                      onClick={() => setTheme('light')}
                      className="flex items-center justify-center gap-2 p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 opacity-60"
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
                <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800">
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

                <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800">
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

            {/* Account Settings */}
            {activeTab === 'account' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-xs">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-full bg-secondary dark:bg-blue-600 text-white font-extrabold text-base flex items-center justify-center shadow-xs">
                      WA
                    </div>
                    <div>
                      <div className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
                        Wow Admin
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        wowadmin@wowsuite.ai
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0 border border-emerald-500/20">
                    PRO SUBSCRIPTION ACTIVE
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
                <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-700 dark:text-emerald-300">
                  ⚡ Automatic win-back workflow triggers enabled for cancelled subscriptions.
                </div>
              </div>
            )}
          </div>

          {/* Minimal Footer Line with Version Tag (No Confirm Button) */}
          <div className="px-8 py-3 border-t border-slate-100 dark:border-slate-800/80 text-[11px] text-slate-400 flex justify-between items-center">
            <span>LibreChat v0.7.5 • Wowloop System v1.2</span>
            <span className="text-slate-400 font-medium">Settings auto-saved</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
