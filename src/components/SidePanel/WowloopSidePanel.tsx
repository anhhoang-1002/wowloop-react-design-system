import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Zap, Repeat, ArrowUpRight } from 'lucide-react';

/**
 * WowloopSidePanel Example for LibreChat:
 * Designed to drop cleanly into LibreChat's `client/src/components/SidePanel/` directory
 * without touching or breaking any core LibreChat chat loops or endpoint providers.
 */
export const WowloopSidePanel: React.FC = () => {
  return (
    <div className="w-full p-4 space-y-6 bg-canvas min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-secondary">Wowloop SaaS Integration</h2>
          <p className="text-xs text-muted">Recurring Revenue & Retention Controls</p>
        </div>
        <Badge variant="green">ACTIVE</Badge>
      </div>

      {/* Program Quick Status */}
      <Card variant="blue-shadow">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-bold text-secondary flex items-center gap-2">
            <Repeat size={16} /> Recurring Revenue Program
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted">Active Subscriptions</span>
            <span className="font-bold text-secondary">3,420</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted">Current MRR</span>
            <span className="font-bold text-primary-vibrant">$128,450</span>
          </div>
          <Button variant="primaryGradient" size="sm" className="w-full">
            Manage Wowloop Program <ArrowUpRight size={14} />
          </Button>
        </CardContent>
      </Card>

      {/* AI Retention Assistant Trigger */}
      <Card variant="light">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-bold text-secondary flex items-center gap-2">
            <Zap size={16} /> AI Retention Automations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-xs text-muted">
            Automatically trigger win-back sequences and churn prevention offers.
          </p>
          <Button variant="outline" size="sm" className="w-full">
            Run Win-back Workflow
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
