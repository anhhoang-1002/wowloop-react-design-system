import React, { useState } from 'react';
import { LibreChatHeader } from './LibreChatHeader';
import { LibreChatNav } from './LibreChatNav';
import { LibreChatLanding } from './LibreChatLanding';
import { LibreChatMessages, ChatMessage } from './LibreChatMessages';
import { LibreChatInput } from './LibreChatInput';
import { WowloopSidePanel } from '../SidePanel/WowloopSidePanel';

export const LibreChatPage: React.FC = () => {
  const [isLeftNavOpen, setIsLeftNavOpen] = useState(true);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(true);

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const handleSendMessage = (text: string) => {
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);

    // Simulate Wowloop AI Response
    setTimeout(() => {
      const isMetricsQuery = text.toLowerCase().includes('mrr') || text.toLowerCase().includes('metrics') || text.toLowerCase().includes('retention');
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: isMetricsQuery
          ? 'Here is your real-time Wowloop SaaS program metric summary. Your MRR has increased by 14.2% this month with a 94.6% retention rate across 3,420 active subscribers.'
          : 'Wowloop AI is ready to help configure your subscription programs, win-back workflows, and retention offers. What specific rule or funnel would you like to set up next?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        widget: isMetricsQuery ? 'metrics' : undefined,
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 800);
  };

  const handleNewChat = () => {
    setMessages([]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-canvas">
      {/* LibreChat Top Header */}
      <LibreChatHeader
        isLeftNavOpen={isLeftNavOpen}
        onToggleLeftNav={() => setIsLeftNavOpen(!isLeftNavOpen)}
        isRightPanelOpen={isRightPanelOpen}
        onToggleRightPanel={() => setIsRightPanelOpen(!isRightPanelOpen)}
      />

      {/* Main Body Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Navigation Drawer */}
        <LibreChatNav
          isOpen={isLeftNavOpen}
          onNewChat={handleNewChat}
        />

        {/* Center Chat View Area */}
        <main className="flex-1 flex flex-col justify-between overflow-y-auto bg-slate-50/50 relative">
          {messages.length === 0 ? (
            <LibreChatLanding onSelectPrompt={handleSendMessage} />
          ) : (
            <LibreChatMessages messages={messages} />
          )}

          {/* Floating Bottom Input Bar */}
          <LibreChatInput onSendMessage={handleSendMessage} />
        </main>

        {/* Right Wowloop SaaS SidePanel */}
        {isRightPanelOpen && (
          <aside className="w-80 border-l border-border bg-canvas overflow-y-auto shrink-0 sticky top-14 h-[calc(100vh-3.5rem)]">
            <WowloopSidePanel />
          </aside>
        )}
      </div>
    </div>
  );
};
