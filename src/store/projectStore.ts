
import { create } from 'zustand';
import { Project, ProjectPhase, StakeAction, CreateProjectPayload, UpdateProjectPhasePayload } from '@/types';

interface ProjectState {
  projects: Project[];
  userStakedTokens: number;
  loading: boolean;
  
  // Actions
  getProject: (id: string) => Project | undefined;
  stakeTokens: (stake: StakeAction) => void;
  createProject: (project: CreateProjectPayload) => void;
  updateProjectPhase: (update: UpdateProjectPhasePayload) => void;
}

// Sample data
const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Decentralized Exchange Platform',
    description: 'A next-generation DEX with advanced liquidity pools and minimal slippage.',
    phase: 'Phase 1',
    fundingGoal: 1000000,
    currentFunding: 500000,
    tokenCirculation: 5000000,
    createdAt: new Date('2023-10-15'),
    founder: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
  },
  {
    id: '2',
    name: 'NFT Marketplace',
    description: 'A comprehensive marketplace for digital collectibles with cross-chain compatibility.',
    phase: 'Escrowing',
    fundingGoal: 750000,
    currentFunding: 150000,
    tokenCirculation: 2000000,
    createdAt: new Date('2023-11-22'),
    founder: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
  },
  {
    id: '3',
    name: 'DeFi Lending Protocol',
    description: 'Decentralized lending with algorithmic interest rates and multi-collateral support.',
    phase: 'Phase 2',
    fundingGoal: 1250000,
    currentFunding: 850000,
    tokenCirculation: 7500000,
    createdAt: new Date('2023-09-05'),
    founder: '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4'
  }
];

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: mockProjects,
  userStakedTokens: 1000,
  loading: false,
  
  getProject: (id: string) => {
    return get().projects.find(project => project.id === id);
  },
  
  stakeTokens: (stake: StakeAction) => {
    set(state => {
      // Find the project
      const updatedProjects = state.projects.map(project => {
        if (project.id === stake.projectId) {
          // Update project funding
          return {
            ...project,
            currentFunding: project.currentFunding + stake.amount
          };
        }
        return project;
      });
      
      // Update user's staked tokens
      return {
        projects: updatedProjects,
        userStakedTokens: state.userStakedTokens - stake.amount
      };
    });
  },
  
  createProject: (payload: CreateProjectPayload) => {
    set(state => {
      const newProject: Project = {
        id: `${state.projects.length + 1}`,
        name: payload.name,
        description: payload.description,
        phase: 'Escrowing',
        fundingGoal: payload.fundingGoal,
        currentFunding: 0,
        tokenCirculation: payload.tokenCirculation,
        createdAt: new Date(),
        founder: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e' // Mock wallet address
      };
      
      return {
        projects: [...state.projects, newProject]
      };
    });
  },
  
  updateProjectPhase: (update: UpdateProjectPhasePayload) => {
    set(state => {
      const updatedProjects = state.projects.map(project => {
        if (project.id === update.projectId) {
          return {
            ...project,
            phase: update.newPhase
          };
        }
        return project;
      });
      
      return {
        projects: updatedProjects
      };
    });
  }
}));
