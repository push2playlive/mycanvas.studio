import React, { useState, useEffect } from 'react';
import { AGENT_MODES } from '../../nexus/AgentProfiles';

export const AgentSwitcher = () => {
  const [activeAgent, setActiveAgent] = useState(AGENT_MODES.NEXUS);

  const handleSwitch = (agentKey: string) => {
    const agent = AGENT_MODES[agentKey];
    setActiveAgent(agent);
    
    // THE DEED: Inject the new DNA into the CSS root
    document.documentElement.style.setProperty('--nexus-accent', agent.color);
    
    // Broadcast to the V24
    console.log(`[V24] RE-TASKING: Agent ${agent.name} is now in command.`);
    
    // Save to localStorage for persistence
    localStorage.setItem('nexus-active-agent', agentKey);
  };

  // Load saved agent on mount
  useEffect(() => {
    const savedAgentKey = localStorage.getItem('nexus-active-agent');
    if (savedAgentKey && AGENT_MODES[savedAgentKey]) {
      handleSwitch(savedAgentKey);
    }
  }, []);

  return (
    <div className="agent-selector-box mb-6">
      <div className="agent-status-orb" style={{ backgroundColor: activeAgent.color }}></div>
      <div className="agent-info flex-1">
        <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-1">Active Agent</label>
        <select 
          onChange={(e) => handleSwitch(e.target.value)}
          value={Object.keys(AGENT_MODES).find(key => AGENT_MODES[key].name === activeAgent.name)}
          className="bg-transparent text-white border-none font-bold cursor-pointer outline-none w-full text-sm font-mono"
        >
          {Object.keys(AGENT_MODES).map(key => (
            <option key={key} value={key} className="bg-void text-white">
              {AGENT_MODES[key].name} ({AGENT_MODES[key].trait})
            </option>
          ))}
        </select>
      </div>
      <style>{`
        .agent-selector-box { 
          display: flex; 
          align-items: center; 
          gap: 12px; 
          padding: 15px; 
          background: rgba(255, 255, 255, 0.02); 
          border-radius: 8px; 
          border: 1px solid var(--nexus-accent, #00ffcc); 
          transition: border-color 0.3s ease;
        }
        .agent-status-orb { 
          width: 12px; 
          height: 12px; 
          border-radius: 50%; 
          box-shadow: 0 0 10px currentColor; 
          transition: background-color 0.3s ease;
        }
      `}</style>
    </div>
  );
};
