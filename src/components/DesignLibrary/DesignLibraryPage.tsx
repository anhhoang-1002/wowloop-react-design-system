import React, { useState } from 'react';
import { ComponentDocSection } from './ComponentDocSection';
import { Button } from '../ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Accordion } from '../ui/accordion';
import { Badge } from '../ui/badge';
import { CodeBlock } from '../Chat/CodeBlock';
import { ThinkingProcessAccordion } from '../Chat/ThinkingProcessAccordion';
import { MessageVersionSwitcher } from '../Chat/MessageVersionSwitcher';
import { AttachmentList } from '../Chat/AttachmentList';
import { WowloopNavItem } from '../Nav/WowloopNavItem';
import { SettingsDialog } from '../Modals/SettingsDialog';
import { AgentCreatorDialog } from '../Modals/AgentCreatorDialog';
import { Search, Layers, Sparkles, Sliders, MessageSquare, ShieldCheck, Palette, Bot, Download, CheckCircle2, AlertTriangle, Info, Terminal } from 'lucide-react';

export const DesignLibraryPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAgentCreatorOpen, setIsAgentCreatorOpen] = useState(false);

  const categories = [
    { id: 'all', name: 'All Components', icon: <Layers size={14} /> },
    { id: 'setup', name: 'Installation & Setup', icon: <Download size={14} /> },
    { id: 'primitives', name: 'UI Primitives', icon: <Sliders size={14} /> },
    { id: 'chat', name: 'Chat Engine', icon: <MessageSquare size={14} /> },
    { id: 'modals', name: 'Modals & Dialogs', icon: <Bot size={14} /> },
    { id: 'wowloop', name: 'Wowloop SaaS', icon: <ShieldCheck size={14} /> },
    { id: 'tokens', name: 'Tokens & Palette', icon: <Palette size={14} /> },
  ];

  const componentsIndex = [
    { id: 'install-guide', name: 'Installation & Quickstart', category: 'setup' },
    { id: 'buttons', name: 'Button Variants', category: 'primitives' },
    { id: 'inputs', name: 'Form Inputs', category: 'primitives' },
    { id: 'textarea', name: 'Textarea (Text Box)', category: 'primitives' },
    { id: 'accordion', name: 'Accordion (Collapsible)', category: 'primitives' },
    { id: 'cards', name: 'Card Surfaces', category: 'primitives' },
    { id: 'badges', name: 'Status Badges', category: 'primitives' },
    { id: 'alerts', name: 'Alert Banners', category: 'primitives' },
    { id: 'codeblock', name: 'Code Block Container', category: 'chat' },
    { id: 'thinking', name: 'Thinking Accordion', category: 'chat' },
    { id: 'version-switcher', name: 'Version Switcher', category: 'chat' },
    { id: 'attachments', name: 'Attachment Chips', category: 'chat' },
    { id: 'settings-modal', name: 'Settings Dialog', category: 'modals' },
    { id: 'agent-creator', name: 'Agent Creator Dialog', category: 'modals' },
    { id: 'wowloop-nav', name: 'Wowloop SaaS Nav Item', category: 'wowloop' },
    { id: 'tokens-palette', name: 'Design Tokens & Palette', category: 'tokens' },
  ];

  const filteredComponents = componentsIndex.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const scrollToComponent = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const faqItems = [
    { id: '1', title: 'What is Wowloop SaaS Integration?', content: 'Wowloop is a recurring revenue and retention management system built on top of LibreChat.' },
    { id: '2', title: 'How do automated win-back workflows work?', content: 'When a customer cancels their subscription, Wowloop triggers automated win-back offer sequences and retention campaigns via webhooks.' },
    { id: '3', title: 'Is the design system dark-mode compatible?', content: 'Yes, 100% of UI components react dynamically to theme tokens defined in tokens.css.' },
  ];

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] bg-canvas dark:bg-[#0B0F19] text-foreground dark:text-slate-100 transition-colors">
      {/* Sticky Left Catalog Sidebar */}
      <aside className="w-64 border-r border-border dark:border-slate-800 bg-surface dark:bg-slate-900 p-4 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto shrink-0 select-none">
        <div className="space-y-4">
          <div>
            <h2 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 tracking-wide uppercase">
              Design System Index
            </h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Shadcn UI & LibreChat Catalog</p>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search size={14} className="absolute left-3 top-2.5 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              placeholder="Search components..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-lg text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-secondary"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="space-y-1">
            <div className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-1">
              Categories
            </div>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-secondary-bg dark:bg-blue-950/80 text-secondary dark:text-blue-400 font-extrabold border border-secondary/20 dark:border-blue-800/40'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {cat.icon}
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Components List */}
          <div className="pt-2 space-y-1">
            <div className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-1 mb-1">
              Components ({filteredComponents.length})
            </div>
            {filteredComponents.map((comp) => (
              <button
                key={comp.id}
                onClick={() => scrollToComponent(comp.id)}
                className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors truncate block"
              >
                {comp.name}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl mx-auto p-8 space-y-12">
        {/* Header Hero Section */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={20} className="text-secondary dark:text-blue-400" />
            <span className="text-xs font-extrabold text-secondary dark:text-blue-400 uppercase tracking-wider">
              @wowsuite/design-system v1.0.0
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Component Documentation & Installation Guide
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed max-w-2xl">
            Universal Core UI Primitives, LibreChat AI stream components, Antigravity dialog modals, and Wowloop SaaS design tokens ready for company projects.
          </p>
        </div>

        {/* Component 0: Installation & Setup Guide */}
        <ComponentDocSection
          id="install-guide"
          title="Installation & Quickstart Guide"
          description="How to install and import @wowsuite/design-system in any new React / Next.js / Vite company project."
          category="Package Setup"
          codeSnippet={`# 1. Install NPM Package\nnpm install @wowsuite/design-system\n\n# 2. Import CSS Stylesheet in your root entry (App.tsx / _app.tsx / layout.tsx)\nimport '@wowsuite/design-system/dist/style.css';\n\n# 3. Import Core Components in any file\nimport { Button, Card, Input, Textarea, Dialog, Accordion, ThemeProvider } from '@wowsuite/design-system';`}
        >
          <div className="space-y-4 max-w-2xl text-xs leading-relaxed">
            <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono flex items-center justify-between border border-slate-700">
              <span className="flex items-center gap-2">
                <Terminal size={16} className="text-emerald-400 shrink-0" />
                <span>npm install @wowsuite/design-system</span>
              </span>
              <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-extrabold">NPM</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-surface dark:bg-slate-800 border border-border dark:border-slate-700">
                <div className="font-extrabold text-secondary dark:text-blue-400 text-xs mb-1">1. Import CSS Styles</div>
                <p className="text-slate-500 dark:text-slate-400 text-[11px]">Add <code>import '@wowsuite/design-system/dist/style.css'</code> at your root file.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-surface dark:bg-slate-800 border border-border dark:border-slate-700">
                <div className="font-extrabold text-secondary dark:text-blue-400 text-xs mb-1">2. Enable Theme Provider</div>
                <p className="text-slate-500 dark:text-slate-400 text-[11px]">Wrap root app with <code>&lt;ThemeProvider&gt;</code> for dark mode reactivity.</p>
              </div>
            </div>
          </div>
        </ComponentDocSection>

        {/* Component 1: Buttons */}
        <ComponentDocSection
          id="buttons"
          title="Button Variants & Actions"
          description="Standardized interactive buttons with gradient fills, solid states, outline variants, and pill radius options."
          category="UI Primitives"
          codeSnippet={`import { Button } from '@wowsuite/design-system';\n\n<Button variant="primaryGradient" pill>Primary Gradient</Button>\n<Button variant="secondaryGradient" pill>Secondary Orange</Button>\n<Button variant="deepBlue">Deep Blue</Button>\n<Button variant="solidGreen">Solid Green</Button>\n<Button variant="outline">Outline</Button>`}
        >
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primaryGradient" pill>Primary Gradient</Button>
            <Button variant="secondaryGradient" pill>Secondary Orange</Button>
            <Button variant="deepBlue">Deep Blue</Button>
            <Button variant="solidGreen">Solid Green</Button>
            <Button variant="outline">Outline</Button>
          </div>
        </ComponentDocSection>

        {/* Component 2: Form Inputs */}
        <ComponentDocSection
          id="inputs"
          title="Form Inputs (Standard & Floating Labels)"
          description="Form inputs featuring clean normal state (shadow-none) and smooth focus-visible shadow activation."
          category="UI Primitives"
          codeSnippet={`import { Input } from '@wowsuite/design-system';\n\n<Input label="Company Name" placeholder="Acme Inc." requiredStar />\n<Input floatingLabel="Monthly Revenue" />`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl items-end">
            <div>
              <Input label="Company Name" placeholder="Acme Inc." requiredStar />
            </div>
            <div>
              <Input floatingLabel="Monthly Revenue" />
            </div>
          </div>
        </ComponentDocSection>

        {/* Component 3: Textarea */}
        <ComponentDocSection
          id="textarea"
          title="Textarea (Text Box Container)"
          description="Multiline text box container with label, helper text, and focus shadow elevation."
          category="UI Primitives"
          codeSnippet={`import { Textarea } from '@wowsuite/design-system';\n\n<Textarea label="System Instructions" placeholder="Describe instructions..." helperText="Max 1,000 characters." />`}
        >
          <div className="max-w-xl">
            <Textarea
              label="System Instructions (Prompt)"
              placeholder="You are an AI specialized in customer retention, subscription funnels, and MRR metrics..."
              helperText="Describe custom instructions for your AI agent."
              rows={3}
            />
          </div>
        </ComponentDocSection>

        {/* Component 4: Accordion */}
        <ComponentDocSection
          id="accordion"
          title="Accordion (Collapsible List)"
          description="Expandable accordion component for FAQs, specs, and program rules."
          category="UI Primitives"
          codeSnippet={`import { Accordion } from '@wowsuite/design-system';\n\n<Accordion items={[{ id: '1', title: 'What is Wowloop?', content: 'Details...' }]} defaultOpenId="1" />`}
        >
          <div className="max-w-xl">
            <Accordion items={faqItems} defaultOpenId="1" />
          </div>
        </ComponentDocSection>

        {/* Component 5: Cards */}
        <ComponentDocSection
          id="cards"
          title="Card Surfaces & Shadow Elevation"
          description="Elevated card containers with subtle borders and symmetrical padding."
          category="UI Primitives"
          codeSnippet={`import { Card, CardHeader, CardTitle, CardContent } from '@wowsuite/design-system';\n\n<Card variant="input-shadow">\n  <CardHeader><CardTitle>SaaS Retention Card</CardTitle></CardHeader>\n  <CardContent><p>Symmetrical 24px horizontal padding</p></CardContent>\n</Card>`}
        >
          <div className="max-w-md">
            <Card variant="input-shadow">
              <CardHeader className="py-3 px-5 border-b border-slate-100 dark:border-slate-700/80">
                <CardTitle className="text-xs font-bold text-secondary dark:text-blue-400 uppercase tracking-wider">
                  SaaS Retention Card
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 text-xs text-slate-600 dark:text-slate-300">
                Symmetrical horizontal padding (24px) with subtle border shadow.
              </CardContent>
            </Card>
          </div>
        </ComponentDocSection>

        {/* Component 6: Status Badges */}
        <ComponentDocSection
          id="badges"
          title="Status Badges"
          description="Capsule badges for indicating system status, subscriptions, and verified badges."
          category="UI Primitives"
          codeSnippet={`import { Badge } from '@wowsuite/design-system';\n\n<Badge variant="green">ACTIVE</Badge>\n<Badge variant="blue">VERIFIED</Badge>`}
        >
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="green">ACTIVE</Badge>
            <Badge variant="blue">VERIFIED</Badge>
            <span className="text-[10px] bg-primary-vibrant text-white font-extrabold px-2.5 py-0.5 rounded-full">
              PRO ACTIVE
            </span>
          </div>
        </ComponentDocSection>

        {/* Component 7: Alert Banners */}
        <ComponentDocSection
          id="alerts"
          title="Alert & Notification Banners"
          description="Contextual alert banners for info, success, and warning status notifications."
          category="UI Primitives"
          codeSnippet={`<div className="p-3.5 rounded-xl bg-emerald-50 text-emerald-700">Success Alert</div>`}
        >
          <div className="space-y-3 max-w-xl text-xs">
            <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-semibold">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
              <span>Retention campaign successfully deployed to 3,420 subscribers.</span>
            </div>

            <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 font-semibold">
              <AlertTriangle size={16} className="text-amber-600 shrink-0" />
              <span>Webhook endpoint response latency higher than 200ms.</span>
            </div>

            <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300 font-semibold">
              <Info size={16} className="text-blue-600 shrink-0" />
              <span>LibreChat v0.7.5 system updates available for synchronization.</span>
            </div>
          </div>
        </ComponentDocSection>

        {/* Component 8: CodeBlock Container */}
        <ComponentDocSection
          id="codeblock"
          title="Code Block Container"
          description="Syntax highlighted code container with language tag badge and copy button."
          category="Chat Engine"
          codeSnippet={`import { CodeBlock } from '@wowsuite/design-system';\n\n<CodeBlock language="typescript" code="const wowloop = new WowloopSdk();" />`}
        >
          <CodeBlock
            language="typescript"
            code={`import { WowloopSdk } from '@wowsuite/sdk';\n\nexport const wowloop = new WowloopSdk({\n  apiKey: process.env.WOWLOOP_API_KEY,\n});`}
          />
        </ComponentDocSection>

        {/* Component 9: Thinking Accordion */}
        <ComponentDocSection
          id="thinking"
          title="AI Thinking Process Accordion"
          description="Collapsible accordion for AI reasoning tokens with pulse icon."
          category="Chat Engine"
          codeSnippet={`import { ThinkingProcessAccordion } from '@wowsuite/design-system';\n\n<ThinkingProcessAccordion thinkingText="1. Querying DB\\n2. Verifying metrics..." />`}
        >
          <ThinkingProcessAccordion thinkingText="1. Querying subscriber database (3,420 records)\n2. Verifying 30-day retention curve and LTV growth metrics." />
        </ComponentDocSection>

        {/* Component 10: Version Switcher */}
        <ComponentDocSection
          id="version-switcher"
          title="Message Version Switcher"
          description="Pagination control (1/3 < >) for cycling through prompt or AI response versions."
          category="Chat Engine"
          codeSnippet={`import { MessageVersionSwitcher } from '@wowsuite/design-system';\n\n<MessageVersionSwitcher currentVersion={1} totalVersions={3} onPrevious={() => {}} onNext={() => {}} />`}
        >
          <MessageVersionSwitcher currentVersion={1} totalVersions={3} onPrevious={() => {}} onNext={() => {}} />
        </ComponentDocSection>

        {/* Component 11: Attachment List */}
        <ComponentDocSection
          id="attachments"
          title="File Attachment Chips"
          description="Preview chips for uploaded image thumbnails and PDF documents."
          category="Chat Engine"
          codeSnippet={`import { AttachmentList } from '@wowsuite/design-system';\n\n<AttachmentList files={[{ id: '1', name: 'MRR_Report.pdf', size: '240 KB', type: 'file' }]} onRemoveFile={() => {}} />`}
        >
          <AttachmentList
            files={[{ id: '1', name: 'MRR_Report_Q3.pdf', size: '240 KB', type: 'file' }]}
            onRemoveFile={() => {}}
          />
        </ComponentDocSection>

        {/* Component 12: Settings Dialog */}
        <ComponentDocSection
          id="settings-modal"
          title="Settings Dialog (Antigravity Style)"
          description="Full-height sidebar settings modal with auto-saved controls and top-right close button."
          category="Modals & Dialogs"
          codeSnippet={`import { SettingsDialog } from '@wowsuite/design-system';\n\n<Button onClick={() => setIsSettingsOpen(true)}>Open Settings Modal</Button>`}
        >
          <div>
            <Button variant="deepBlue" onClick={() => setIsSettingsOpen(true)}>
              Open Settings Dialog Modal
            </Button>
            <SettingsDialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen} />
          </div>
        </ComponentDocSection>

        {/* Component 13: Agent Creator Dialog */}
        <ComponentDocSection
          id="agent-creator"
          title="Agent Creator Dialog"
          description="Form modal to construct custom AI Assistants with system prompts and tool toggles."
          category="Modals & Dialogs"
          codeSnippet={`import { AgentCreatorDialog } from '@wowsuite/design-system';\n\n<Button onClick={() => setIsAgentCreatorOpen(true)}>Open Agent Creator Modal</Button>`}
        >
          <div>
            <Button variant="secondaryGradient" pill onClick={() => setIsAgentCreatorOpen(true)}>
              Open Agent Creator Modal
            </Button>
            <AgentCreatorDialog open={isAgentCreatorOpen} onOpenChange={setIsAgentCreatorOpen} />
          </div>
        </ComponentDocSection>

        {/* Component 14: Wowloop SaaS Nav Item */}
        <ComponentDocSection
          id="wowloop-nav"
          title="Wowloop SaaS Sidebar Item"
          description="Clean white card container with subtle border matching Wow Admin account card."
          category="Wowloop SaaS"
          codeSnippet={`import { WowloopNavItem } from '@wowsuite/design-system';\n\n<WowloopNavItem isActive={true} />`}
        >
          <div className="max-w-xs">
            <WowloopNavItem isActive={true} />
          </div>
        </ComponentDocSection>

        {/* Component 15: Design Tokens & Palette */}
        <ComponentDocSection
          id="tokens-palette"
          title="Design Tokens & Color Palette"
          description="Primary Vibrant (#009959), Secondary (#122DBD), Accent Orange, Light & Dark Canvas."
          category="Tokens & Palette"
          codeSnippet={`:root {\n  --color-primary-vibrant: #009959;\n  --color-secondary: #122DBD;\n  --color-canvas-dark: #0B0F19;\n}`}
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-bold">
            <div className="p-4 rounded-xl bg-[#009959] text-white flex flex-col justify-between h-20 shadow-xs">
              <span>Primary Vibrant</span>
              <span className="font-mono text-[10px]">#009959</span>
            </div>
            <div className="p-4 rounded-xl bg-[#122DBD] text-white flex flex-col justify-between h-20 shadow-xs">
              <span>Secondary Blue</span>
              <span className="font-mono text-[10px]">#122DBD</span>
            </div>
            <div className="p-4 rounded-xl bg-[#FF8000] text-white flex flex-col justify-between h-20 shadow-xs">
              <span>Accent Orange</span>
              <span className="font-mono text-[10px]">#FF8000</span>
            </div>
            <div className="p-4 rounded-xl bg-[#0B0F19] text-white flex flex-col justify-between h-20 shadow-xs border border-slate-700">
              <span>Dark Canvas</span>
              <span className="font-mono text-[10px]">#0B0F19</span>
            </div>
          </div>
        </ComponentDocSection>
      </main>
    </div>
  );
};
