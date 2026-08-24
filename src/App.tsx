import React, { useState } from 'react';
import { WowloopHero } from './components/Wowloop/WowloopHero';
import { WowloopMetrics } from './components/Wowloop/WowloopMetrics';
import { WowloopSidePanel } from './components/SidePanel/WowloopSidePanel';
import { WowloopNavItem } from './components/Nav/WowloopNavItem';
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
import { MessageSquare, LayoutGrid, Sparkles } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<'saas' | 'librechat'>('saas');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-canvas">
      {/* Top Bar Switcher */}
      <header className="bg-white border-b border-border sticky top-0 z-50 px-6 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <img src="/logo-wowsuite.svg" alt="WOW Suite Logo" className="h-8 w-auto" />
          <span className="text-xs font-bold bg-secondary-bg text-secondary px-2.5 py-1 rounded-full border border-secondary/20">
            LibreChat Architecture Ready
          </span>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('saas')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
              activeTab === 'saas' ? 'bg-white text-secondary shadow-sm' : 'text-slate-600 hover:text-black'
            }`}
          >
            <LayoutGrid size={14} /> SaaS Landing & Components
          </button>
          <button
            onClick={() => setActiveTab('librechat')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
              activeTab === 'librechat' ? 'bg-white text-secondary shadow-sm' : 'text-slate-600 hover:text-black'
            }`}
          >
            <MessageSquare size={14} /> LibreChat SidePanel Preview
          </button>
        </div>
      </header>

      {/* Mode 1: SaaS Landing Page & Design System */}
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
            <h2 className="text-3xl font-bold text-black text-center mb-2">Shadcn UI Component Primitives</h2>
            <p className="text-muted text-center mb-8">
              Standardized Shadcn UI components located in <code>src/components/ui/</code>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Buttons */}
              <Card variant="blue-shadow">
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
                    <Button variant="ghost">Ghost</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Dialog Modal */}
              <Card variant="blue-shadow">
                <CardHeader>
                  <CardTitle>Shadcn UI Dialog & Inputs</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input floatingLabel="Company Name" placeholder="Acme Inc." requiredStar />
                  <Input floatingLabel="Monthly Revenue" placeholder="$50,000" />
                  <Button variant="primaryGradient" className="w-full" onClick={() => setIsDialogOpen(true)}>
                    Test Dialog Modal
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>
        </main>
      )}

      {/* Mode 2: LibreChat Layout Embedding Demo */}
      {activeTab === 'librechat' && (
        <main className="max-w-6xl mx-auto my-8 px-4">
          <div className="bg-white rounded-xl border border-border overflow-hidden shadow-2xl flex min-h-[600px]">
            {/* LibreChat Mock Sidebar */}
            <aside className="w-64 border-r border-border bg-slate-50 p-4 space-y-4 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">
                  LibreChat Navigation
                </div>
                <div className="space-y-1">
                  <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-200">
                    <MessageSquare size={16} /> New Chat
                  </button>
                  <WowloopNavItem isActive={true} />
                </div>
              </div>
              <div className="text-xs text-slate-400 p-2 border-t border-slate-200">
                LibreChat Core v0.7.x
              </div>
            </aside>

            {/* LibreChat Main Area Mock */}
            <div className="flex-1 flex">
              <div className="flex-1 p-6 bg-slate-100 flex flex-col items-center justify-center text-center">
                <Sparkles className="h-12 w-12 text-secondary mb-4" />
                <h3 className="text-xl font-bold text-black mb-2">LibreChat Chat Area</h3>
                <p className="text-sm text-slate-500 max-w-md">
                  This represents your standard LibreChat conversation window. Wowloop components live safely in <code>src/components/Wowloop/</code> and <code>src/components/SidePanel/</code> without modifying chat logic.
                </p>
              </div>

              {/* Wowloop SidePanel Plug-in */}
              <div className="w-80 border-l border-border bg-canvas overflow-y-auto">
                <WowloopSidePanel />
              </div>
            </div>
          </div>
        </main>
      )}

      {/* Dialog Modal */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Book A Strategy Call</DialogTitle>
            <DialogDescription>
              Please enter your business details below to reserve your call.
            </DialogDescription>
          </DialogHeader>

          <form className="space-y-3 mt-4" onSubmit={(e) => { e.preventDefault(); setIsDialogOpen(false); alert('Submitted!'); }}>
            <Input floatingLabel="Company Name" requiredStar placeholder="Acme Brands" />
            <Input floatingLabel="Company Website" requiredStar placeholder="https://example.com" />
            <Input floatingLabel="Monthly Revenue (USD)" requiredStar placeholder="$100,000" />
            <DialogFooter>
              <Button type="submit" variant="primaryGradient" pill className="w-full">
                Submit Strategy Request
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;
