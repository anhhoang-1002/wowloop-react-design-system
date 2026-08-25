import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Repeat, Zap, ShieldCheck, ArrowUpRight, BarChart3, Settings2 } from 'lucide-react';

export const WowloopSidePanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'workflows' | 'rules'>('analytics');

  return (
    <div className="w-full p-4 space-y-5 bg-canvas dark:bg-slate-900 min-h-full transition-colors">
      {/* SidePanel Header */}
      <div className="flex items-center justify-between border-b border-border dark:border-slate-800 pb-3">
        <div>
          <h2 className="text-base font-bold text-secondary dark:text-blue-400">Wowloop SaaS Panel</h2>
          <p className="text-xs text-muted dark:text-slate-400">Recurring Revenue & Retention Controls</p>
        </div>
        <Badge variant="green">ACTIVE</Badge>
      </div>

      {/* SidePanel Sub-Tabs */}
      <div className="grid grid-cols-3 gap-1 bg-slate-200/70 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold select-none">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`py-1.5 rounded-lg transition-all flex items-center justify-center gap-1 ${
            activeTab === 'analytics'
              ? 'bg-white dark:bg-slate-700 text-secondary dark:text-blue-400 border-2 border-secondary dark:border-blue-400 font-bold shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:text-secondary dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700/50 font-semibold'
          }`}
        >
          <BarChart3 size={13} /> Analytics
        </button>
        <button
          onClick={() => setActiveTab('workflows')}
          className={`py-1.5 rounded-lg transition-all flex items-center justify-center gap-1 ${
            activeTab === 'workflows'
              ? 'bg-white dark:bg-slate-700 text-secondary dark:text-blue-400 border-2 border-secondary dark:border-blue-400 font-bold shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:text-secondary dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700/50 font-semibold'
          }`}
        >
          <Zap size={13} /> Workflows
        </button>
        <button
          onClick={() => setActiveTab('rules')}
          className={`py-1.5 rounded-lg transition-all flex items-center justify-center gap-1 ${
            activeTab === 'rules'
              ? 'bg-white dark:bg-slate-700 text-secondary dark:text-blue-400 border-2 border-secondary dark:border-blue-400 font-bold shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:text-secondary dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700/50 font-semibold'
          }`}
        >
          <Settings2 size={13} /> Rules
        </button>
      </div>

      {/* Tab 1: MRR Analytics */}
      {activeTab === 'analytics' && (
        <div className="space-y-4 animate-in fade-in-0 duration-200">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-xs font-bold text-secondary dark:text-blue-400 flex items-center gap-2">
                <Repeat size={16} /> Recurring Revenue Program
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3.5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted dark:text-slate-400 font-medium">Active Subscriptions</span>
                <span className="font-bold text-secondary dark:text-blue-400 text-sm">3,420</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted dark:text-slate-400 font-medium">Current Monthly MRR</span>
                <span className="font-bold text-primary-vibrant text-sm">$128,450</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted dark:text-slate-400 font-medium">Retention Rate</span>
                <span className="font-bold text-secondary dark:text-blue-400 text-sm">94.6%</span>
              </div>
              <Button variant="primaryGradient" size="sm" pill className="w-full mt-2">
                Manage Wowloop Program <ArrowUpRight size={14} />
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tab 2: Workflows */}
      {activeTab === 'workflows' && (
        <div className="space-y-4 animate-in fade-in-0 duration-200">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-xs font-bold text-secondary dark:text-blue-400 flex items-center gap-2">
                <Zap size={16} className="text-primary-vibrant" /> Win-Back Automations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-xs text-muted dark:text-slate-400 leading-relaxed">
                Automatically trigger win-back sequences and custom retention offers when a user initiates cancellation.
              </p>
              <Button variant="secondaryGradient" size="sm" pill className="w-full">
                Run Win-back Workflow
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tab 3: Program Rules */}
      {activeTab === 'rules' && (
        <div className="space-y-4 animate-in fade-in-0 duration-200">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-xs font-bold text-secondary dark:text-blue-400 flex items-center gap-2">
                <ShieldCheck size={16} className="text-secondary dark:text-blue-400" /> Wowsuite Program Standards
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-primary-vibrant shrink-0" />
                <span className="font-bold">Clear Benefits</span>: Defined customer rewards
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary dark:bg-blue-400 shrink-0" />
                <span className="font-bold">Clear Rules</span>: Strict billing cycle terms
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-accent-orangeEnd shrink-0" />
                <span className="font-bold">Clear Status</span>: Real-time user lifecycle tracking
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
