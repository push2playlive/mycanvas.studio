export interface AgentProfile {
  name: string;
  color: string;
  trait: string;
  focus: string;
}

export const AGENT_MODES: Record<string, AgentProfile> = {
  NEXUS: { name: 'Nexus', color: '#00ffcc', trait: 'Sovereign', focus: 'Fleet Management' },
  GURU: { name: 'Guru', color: '#a855f7', trait: 'Creative', focus: 'Visual Generation' },
  VANCE: { name: 'Vance', color: '#ff4444', trait: 'Aggressive', focus: 'Market Displacement' },
  WATCHTOWER: { name: 'Watchtower', color: '#ffcc00', trait: 'Vigilant', focus: 'Threat Mitigation' },
  CHRONOS: { name: 'Chronos', color: '#3b82f6', trait: 'Analytical', focus: 'Trends & Forecasting' }
};
