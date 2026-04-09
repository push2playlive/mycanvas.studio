/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TopBar } from './components/layout/TopBar';
import { Dock } from './components/layout/Dock';
import { CommandDeck } from './pages/CommandDeck';
import { Home } from './pages/Home';
import { MissionControl } from './pages/MissionControl';
import { Settings } from './pages/Settings';
import { Profile } from './pages/Profile';
import { Gallery } from './pages/Gallery';
import { Projects } from './pages/Projects';
import { Pricing } from './pages/Pricing';
import { WarRoom } from './pages/WarRoom';
import { Auth } from './pages/Auth';

const AdminLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col h-screen w-screen bg-void overflow-hidden text-white font-sans">
    <TopBar />
    <main className="flex-1 relative overflow-hidden pb-24">
      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neon-cyan/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-neon-magenta/5 blur-[120px] rounded-full pointer-events-none" />
      {children}
    </main>
    <Dock />
  </div>
);

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/admin/*" element={
          <AdminLayout>
            <Routes>
              <Route path="/" element={<CommandDeck />} />
              <Route path="/war-room" element={<WarRoom />} />
              <Route path="/mission-control" element={<MissionControl />} />
              <Route path="/command" element={<CommandDeck />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/pricing" element={<Pricing />} />
            </Routes>
          </AdminLayout>
        } />
      </Routes>
    </Router>
  );
}

