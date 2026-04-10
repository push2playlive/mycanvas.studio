/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
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
import { Account } from './pages/Account';
import { WarRoom } from './pages/WarRoom';
import { Auth } from './pages/Auth';
import { Tasks } from './pages/Tasks';
import { MarketDispatcher } from './pages/MarketDispatcher';

import { AdminLayout } from './components/layout/AdminLayout';

export default function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem('nexus-theme') || 'dark';
    if (savedTheme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }

    const handleThemeChange = () => {
      const theme = localStorage.getItem('nexus-theme');
      if (theme === 'light') {
        document.documentElement.classList.add('light');
      } else {
        document.documentElement.classList.remove('light');
      }
    };

    window.addEventListener('storage', handleThemeChange);
    window.addEventListener('nexus-theme-change', handleThemeChange);
    return () => {
      window.removeEventListener('storage', handleThemeChange);
      window.removeEventListener('nexus-theme-change', handleThemeChange);
    };
  }, []);

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
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/market" element={<MarketDispatcher />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/account" element={<Account />} />
            </Routes>
          </AdminLayout>
        } />
      </Routes>
    </Router>
  );
}

