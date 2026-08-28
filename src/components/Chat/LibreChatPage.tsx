import React, { useState } from 'react';
import { LibreChatHeader } from './LibreChatHeader';
import { LibreChatNav } from './LibreChatNav';
import { LibreChatLanding } from './LibreChatLanding';
import { LibreChatMessages, ChatMessage } from './LibreChatMessages';
import { LibreChatInput } from './LibreChatInput';
import { WowloopSidePanel } from '../SidePanel/WowloopSidePanel';
import { SettingsDialog } from '../Modals/SettingsDialog';
import { AgentCreatorDialog } from '../Modals/AgentCreatorDialog';

export const LibreChatPage: React.FC = () => {
  const [isLeftNavOpen, setIsLeftNavOpen] = useState(true);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(true);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAgentCreatorOpen, setIsAgentCreatorOpen] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const handleSendMessage = (text: string) => {
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);

    // Simulate Wowloop AI Response with thinking tokens and code snippet
    setTimeout(() => {
      const isMetricsQuery = text.toLowerCase().includes('mrr') || text.toLowerCase().includes('metrics') || text.toLowerCase().includes('retention');
      const isCodeQuery = text.toLowerCase().includes('funnel') || text.toLowerCase().includes('code') || text.toLowerCase().includes('script');

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: isMetricsQuery
          ? 'Here is your real-time Wowloop SaaS program metric summary. Your MRR has increased by 14.2% this month with a 94.6% retention rate across 3,420 active subscribers.'
          : isCodeQuery
          ? 'I have generated a high-converting Wowloop subscription funnel script for your Shopify store:'
          : 'Wowloop AI is ready to help configure your subscription programs, win-back workflows, and retention offers. What specific rule or funnel would you like to set up next?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        widget: isMetricsQuery ? 'metrics' : undefined,
        thinkingText: 'Analyzing subscription funnel architecture...\n1. Querying active subscriber database (3,420 records)\n2. Calculating 30-day retention curve and LTV growth\n3. Verifying webhook triggers for automated win-back sequences.',
        codeSnippet: isCodeQuery
          ? {
              language: 'typescript',
              code: `import { WowloopSdk } from '@wowsuite/sdk';\n\nconst wowloop = new WowloopSdk({\n  apiKey: process.env.WOWLOOP_API_KEY,\n  environment: 'production',\n});\n\nexport async function triggerWinBackSequence(userId: string) {\n  return await wowloop.retention.triggerCampaign({\n    userId,\n    campaignType: 'WIN_BACK_OFFER',\n    discountPercent: 20,\n  });\n}`,
            }
          : undefined,
        versionInfo: { current: 1, total: 3 },
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 800);
  };

  const handleNewChat = () => {
    setMessages([]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-canvas dark:bg-[#0B0F19]">
      {/* LibreChat Top Header */}
      <LibreChatHeader
        isLeftNavOpen={isLeftNavOpen}
        onToggleLeftNav={() => setIsLeftNavOpen(!isLeftNavOpen)}
        isRightPanelOpen={isRightPanelOpen}
        onToggleRightPanel={() => setIsRightPanelOpen(!isRightPanelOpen)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenAgentCreator={() => setIsAgentCreatorOpen(true)}
      />

      {/* Main Body Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Navigation Drawer */}
        <LibreChatNav
          isOpen={isLeftNavOpen}
          onNewChat={handleNewChat}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />

        {/* Center Chat View Area */}
        <main className="flex-1 flex flex-col justify-between overflow-y-auto bg-slate-50/50 dark:bg-[#0B0F19] relative transition-colors">
          {messages.length === 0 ? (
            <LibreChatLanding onSelectPrompt={handleSendMessage} />
          ) : (
            <LibreChatMessages messages={messages} />
          )}

          {/* Floating Bottom Input Bar */}
          <LibreChatInput onSendMessage={handleSendMessage} />
        </main>

        {/* Right Wowloop SaaS SidePanel (Matching Left Nav Background) */}
        {isRightPanelOpen && (
          <aside className="w-80 border-l border-border dark:border-slate-800 bg-slate-50 dark:bg-slate-900 overflow-y-auto shrink-0 sticky top-14 h-[calc(100vh-3.5rem)]">
            <WowloopSidePanel />
          </aside>
        )}
      </div>

      {/* Settings Modal */}
      <SettingsDialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen} />

      {/* Agent Creator Modal */}
      <AgentCreatorDialog open={isAgentCreatorOpen} onOpenChange={setIsAgentCreatorOpen} />
    </div>
  );
};
