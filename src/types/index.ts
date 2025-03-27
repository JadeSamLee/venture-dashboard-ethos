
export type ProjectPhase = 'Escrowing' | 'Phase 1' | 'Phase 2' | 'Phase 3' | 'Completed';

export interface Project {
  id: string;
  name: string;
  description: string;
  phase: ProjectPhase;
  fundingGoal: number;
  currentFunding: number;
  tokenCirculation: number;
  createdAt: Date;
  founder: string;
}

export interface StakeAction {
  projectId: string;
  amount: number;
}

export interface CreateProjectPayload {
  name: string;
  description: string;
  fundingGoal: number;
  tokenCirculation: number;
}

export interface UpdateProjectPhasePayload {
  projectId: string;
  newPhase: ProjectPhase;
}
