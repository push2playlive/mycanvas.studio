import React, { useState } from 'react';
import { TopBar } from './TopBar';
import { Dock } from './Dock';
import { Sidebar } from './Sidebar';
import { FeaturesDropdown } from './FeaturesDropdown';
import { SecurityPulseMonitor } from './SecurityPulseMonitor';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen w-screen bg-void overflow-hidden text-white font-sans">
      <TopBar 
        onMenuClick={() => setIsSidebarOpen(true)} 
        onFeaturesClick={() => setIsFeaturesOpen(!isFeaturesOpen)} 
      />
      
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
      
      <FeaturesDropdown 
        isOpen={isFeaturesOpen} 
        onClose={() => setIsFeaturesOpen(false)} 
      />

      <main className="flex-1 relative overflow-hidden pb-24">
        {children}
      </main>
      
      <Dock />
      <SecurityPulseMonitor />

      {/* Nexus Shield Anchor */}
      <div id="command-nexus-shield" data-tenant="mycanvaslab"></div>
    </div>
  );
};
