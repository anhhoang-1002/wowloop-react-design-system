import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { WowloopHero } from './components/Wowloop/WowloopHero';
import { WowloopMetrics } from './components/Wowloop/WowloopMetrics';
import { LibreChatPage } from './components/Chat/LibreChatPage';
import { DesignLibraryPage } from './components/DesignLibrary/DesignLibraryPage';
import { Button } from './components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/card';
import { Input } from './components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from './components/ui/dialog';
import { MessageSquare, LayoutGrid, BookOpen } from 'lucide-react';

export function AppContent() {
  const [activeTab, setActiveTab] = useState<'librechat' | 'saas' | 'library'>('librechat');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-canvas dark:bg-slate-950 text-foreground dark:text-slate-100 transition-colors duration-200">
      {/* Top Global Mode Bar */}
      <header className="bg-surface dark:bg-slate-900 border-b border-border dark:border-slate-800 sticky top-0 z-50 px-6 py-2.5 flex items-center justify-between shadow-xs transition-colors">
        <div className="flex items-center gap-3">
          <img src="/logo-wowsuite.svg" alt="WOW Suite Logo" className="h-8 w-auto block dark:hidden" />
          <img src="/logo-white-wowsuite.svg" alt="WOW Suite Logo" className="h-8 w-auto hidden dark:block" />
          <span className="text-xs font-bold bg-secondary-bg dark:bg-blue-950/80 text-secondary dark:text-blue-400 px-2.5 py-1 rounded-full border border-secondary/20 dark:border-blue-800/40 hidden sm:inline">
            LibreChat Architecture Ready
          </span>
        </div>

        {/* View Mode Switcher & Theme Switcher (3 Tabs) */}
        <div className="flex items-center gap-3">
          <ThemeSwitcher />

          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200/80 dark:border-slate-700">
            <button
              onClick={() => setActiveTab('librechat')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'librechat'
                  ? 'bg-white dark:bg-slate-700 text-secondary dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white'
              }`}
            >
              <MessageSquare size={15} /> LibreChat Full Chat UI
            </button>
            <button
              onClick={() => setActiveTab('saas')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'saas'
                  ? 'bg-white dark:bg-slate-700 text-secondary dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white'
              }`}
            >
              <LayoutGrid size={15} /> Wowsuite SaaS Landing
            </button>
            <button
              onClick={() => setActiveTab('library')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'library'
                  ? 'bg-white dark:bg-slate-700 text-secondary dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white'
              }`}
            >
              <BookOpen size={15} /> Design Library
            </button>
          </div>
        </div>
      </header>

      {/* Mode 1: Full Authentic LibreChat Chat Page UI */}
      {activeTab === 'librechat' && <LibreChatPage />}

      {/* Mode 2: Wowsuite SaaS Landing Page & Design Tokens */}
      {activeTab === 'saas' && (
        <main className="pb-16">
          <WowloopHero
            onBookCall={() => setIsDialogOpen(true)}
            onExplore={() => {
              const el = document.getElementById('component-showcase');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          <WowloopMetrics />

          {/* Component Showcase */}
          <section id="component-showcase" className="max-w-5xl mx-auto px-4 my-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 text-center mb-2">Shadcn UI Component Primitives</h2>
            <p className="text-muted dark:text-slate-400 text-center mb-8">
              Standardized Shadcn UI components located in <code>src/components/ui/</code>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Buttons */}
              <Card variant="input-shadow">
                <CardHeader>
                  <CardTitle>Shadcn UI Button Variants</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-3">
                    <Button variant="primaryGradient" pill>Primary Gradient</Button>
                    <Button variant="secondaryGradient" pill>Secondary Orange</Button>
                    <Button variant="deepBlue">Deep Blue</Button>
                    <Button variant="solidGreen">Solid Green</Button>
                    <Button variant="outline">Outline</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Form Input */}
              <Card variant="input-shadow">
                <CardHeader>
                  <CardTitle>Shadcn UI Form Inputs</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input label="Company Name" placeholder="Acme Inc." requiredStar />
                  <Input floatingLabel="Monthly Revenue" placeholder="$50,000" />
                </CardContent>
              </Card>
            </div>

            {/* Modal Trigger Demo */}
            <div className="text-center mt-12">
              <Button variant="primaryGradient" size="lg" pill onClick={() => setIsDialogOpen(true)}>
                Test Dialog Modal Component
              </Button>
            </div>
          </section>
        </main>
      )}

      {/* Mode 3: Dedicated Design System Library Tab */}
      {activeTab === 'library' && <DesignLibraryPage />}

      {/* Global Dialog Modal */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Shadcn UI Standard Dialog</DialogTitle>
            <DialogDescription>
              This dialog uses Radix UI primitives styled with Wowsuite tokens and Tailwind CSS.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-3">
            <Input label="Your Email" placeholder="user@wowsuite.ai" />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="primaryGradient" pill onClick={() => setIsDialogOpen(false)}>
              Confirm Action
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
