import React from 'react';

export type PipelineState = 'idle' | 'running' | 'success' | 'failed';
export type StageStatus = 'pending' | 'running' | 'success' | 'failed';

export interface PipelineStage {
  id: string;
  name: string;
  icon: React.ReactNode;
  status: StageStatus;
  logs: string[];
  duration?: number;
}

export interface SimulationScenario {
  id: string;
  name: string;
  description: string;
  failAtStage?: string;
  color: string;
}
