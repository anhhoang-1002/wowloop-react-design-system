import React, { useState } from 'react';
import { WowloopHero } from './components/Wowloop/WowloopHero';
import { WowloopMetrics } from './components/Wowloop/WowloopMetrics';
import { LibreChatPage } from './components/Chat/LibreChatPage';
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
import { MessageSquare, LayoutGrid } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<'saas' | 'librechat'>('librechat');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-canvas">
      {/* Top Global Mode Bar */}
      <header className="bg-white border-b border-border sticky top-0 z-50 px-6 py-2.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <img src="/logo-wowsuite.svg" alt="WOW Suite Logo" className="h-8 w-auto" />
          <span className="text-xs font-bold bg-secondary-bg text-secondary px-2.5 py-1 rounded-full border border-secondary/20 hidden sm:inline">
            LibreChat Architecture Ready
          </span>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80">
          <button
            onClick={() => setActiveTab('librechat')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'librechat' ? 'bg-white text-secondary shadow-xs' : 'text-slate-600 hover:text-black'
            }`}
          >
            <MessageSquare size={15} /> LibreChat Full Chat UI
          </button>
          <button
            onClick={() => setActiveTab('saas')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'saas' ? 'bg-white text-secondary shadow-xs' : 'text-slate-600 hover:text-black'
            }`}
          >
            <LayoutGrid size={15} /> Wowsuite SaaS Landing & Design Tokens
          </button>
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
                  <CardTitle>Shadcn UI Dialog & Form Inputs</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input label="Company Name" placeholder="Acme Inc." requiredStar />
                  <Input label="Monthly Revenue" placeholder="$50,000" />
                  <Button variant="primaryGradient" className="w-full" onClick={() => setIsDialogOpen(true)}>
                    Test Dialog Modal
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>
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
            <Input label="Company Name" requiredStar placeholder="Acme Brands" />
            <Input label="Company Website" requiredStar placeholder="https://example.com" />
            <Input label="Monthly Revenue (USD)" requiredStar placeholder="$100,000" />
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
