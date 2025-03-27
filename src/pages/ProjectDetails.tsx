
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProjectStore } from '@/store/projectStore';
import ProgressBar from '@/components/ProgressBar';
import StakeForm from '@/components/StakeForm';
import { Button } from '@/components/Button';
import { ArrowLeft } from 'lucide-react';

const ProjectDetails = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { getProject, userStakedTokens } = useProjectStore();
  const [project, setProject] = useState(getProject(projectId || ''));
  
  useEffect(() => {
    // Refetch project when the store updates
    setProject(getProject(projectId || ''));
  }, [projectId, getProject]);
  
  if (!project) {
    return (
      <div className="pt-24 pb-16 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="glass-card p-12 text-center">
              <h1 className="text-2xl font-semibold text-white mb-4">Project Not Found</h1>
              <p className="text-gray-400 mb-6">The project you're looking for doesn't exist or has been removed.</p>
              <Link to="/investor-dashboard">
                <Button variant="secondary">
                  <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  const progressPercentage = Math.min(Math.round((project.currentFunding / project.fundingGoal) * 100), 100);
  
  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <Link to="/investor-dashboard" className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Projects
            </Link>
          </div>
          
          <div className="glass-card p-8 mb-10 animate-fade-in">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{project.name}</h1>
                <p className="text-gray-400">Created on {project.createdAt.toLocaleDateString()}</p>
              </div>
              
              <div className={`px-4 py-1.5 text-sm font-medium rounded-full mt-4 lg:mt-0
                ${project.phase === 'Escrowing' ? 'bg-amber-500/20 text-amber-300' :
                  project.phase === 'Phase 1' ? 'bg-blue-500/20 text-blue-300' :
                  project.phase === 'Phase 2' ? 'bg-purple-500/20 text-purple-300' :
                  project.phase === 'Phase 3' ? 'bg-indigo-500/20 text-indigo-300' :
                  'bg-green-500/20 text-green-300'
                }`}
              >
                {project.phase}
              </div>
            </div>
            
            <p className="text-gray-300 mb-8">{project.description}</p>
            
            <div className="mb-8">
              <div className="mb-2 flex justify-between items-center">
                <span className="text-gray-400">Funding Progress</span>
                <span className="text-white font-medium">{progressPercentage}%</span>
              </div>
              <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <div className="mt-2 flex justify-between items-center text-sm">
                <span className="text-gray-400">
                  {project.currentFunding.toLocaleString()} tokens raised
                </span>
                <span className="text-gray-400">
                  Goal: {project.fundingGoal.toLocaleString()} tokens
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="glass-card p-5 bg-opacity-50">
                <p className="text-sm text-gray-400 mb-1">Token Circulation</p>
                <h3 className="text-xl font-semibold text-white">{project.tokenCirculation.toLocaleString()}</h3>
              </div>
              
              <div className="glass-card p-5 bg-opacity-50">
                <p className="text-sm text-gray-400 mb-1">Current Phase</p>
                <h3 className="text-xl font-semibold text-white">{project.phase}</h3>
              </div>
              
              <div className="glass-card p-5 bg-opacity-50">
                <p className="text-sm text-gray-400 mb-1">Founder</p>
                <h3 className="text-xl font-semibold text-white truncate">{project.founder.slice(0, 6)}...{project.founder.slice(-4)}</h3>
              </div>
            </div>
          </div>
          
          <div className="mb-12 animate-fade-in delay-100">
            <h2 className="text-xl font-semibold text-white mb-6">Project Phases</h2>
            <ProgressBar currentPhase={project.phase} />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-fade-in delay-200">
            <div>
              <h2 className="text-xl font-semibold text-white mb-6">Project Details</h2>
              <div className="glass-card p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-white mb-4">Phase Details</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between py-3 border-b border-gray-700">
                      <span className="text-gray-400">Escrowing</span>
                      <span className={`font-medium ${project.phase === 'Escrowing' ? 'text-amber-300' : project.phase === 'Phase 1' || project.phase === 'Phase 2' || project.phase === 'Phase 3' || project.phase === 'Completed' ? 'text-green-400' : 'text-gray-500'}`}>
                        {project.phase === 'Escrowing' ? 'Current' : project.phase === 'Phase 1' || project.phase === 'Phase 2' || project.phase === 'Phase 3' || project.phase === 'Completed' ? 'Completed' : 'Pending'}
                      </span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-700">
                      <span className="text-gray-400">Phase 1</span>
                      <span className={`font-medium ${project.phase === 'Phase 1' ? 'text-blue-300' : project.phase === 'Phase 2' || project.phase === 'Phase 3' || project.phase === 'Completed' ? 'text-green-400' : 'text-gray-500'}`}>
                        {project.phase === 'Phase 1' ? 'Current' : project.phase === 'Phase 2' || project.phase === 'Phase 3' || project.phase === 'Completed' ? 'Completed' : 'Pending'}
                      </span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-700">
                      <span className="text-gray-400">Phase 2</span>
                      <span className={`font-medium ${project.phase === 'Phase 2' ? 'text-purple-300' : project.phase === 'Phase 3' || project.phase === 'Completed' ? 'text-green-400' : 'text-gray-500'}`}>
                        {project.phase === 'Phase 2' ? 'Current' : project.phase === 'Phase 3' || project.phase === 'Completed' ? 'Completed' : 'Pending'}
                      </span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-700">
                      <span className="text-gray-400">Phase 3</span>
                      <span className={`font-medium ${project.phase === 'Phase 3' ? 'text-indigo-300' : project.phase === 'Completed' ? 'text-green-400' : 'text-gray-500'}`}>
                        {project.phase === 'Phase 3' ? 'Current' : project.phase === 'Completed' ? 'Completed' : 'Pending'}
                      </span>
                    </div>
                    <div className="flex justify-between py-3">
                      <span className="text-gray-400">Completion</span>
                      <span className={`font-medium ${project.phase === 'Completed' ? 'text-green-400' : 'text-gray-500'}`}>
                        {project.phase === 'Completed' ? 'Completed' : 'Pending'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-white mb-4">Additional Information</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between py-3 border-b border-gray-700">
                      <span className="text-gray-400">Project ID</span>
                      <span className="text-white font-mono">{project.id}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-700">
                      <span className="text-gray-400">Created</span>
                      <span className="text-white">{project.createdAt.toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between py-3">
                      <span className="text-gray-400">Contract</span>
                      <span className="text-white font-mono">0x1234...5678</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-white mb-6">Stake Tokens</h2>
              <StakeForm projectId={project.id} maxAmount={userStakedTokens} />
              
              <div className="mt-6 glass-card p-6">
                <h3 className="text-lg font-medium text-white mb-4">Your Balance</h3>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Available Tokens</span>
                  <span className="text-xl font-semibold text-white">{userStakedTokens.toLocaleString()}</span>
                </div>
                <div className="mt-6">
                  <p className="text-sm text-gray-500">
                    Note: Staking tokens in this project will lock them until the respective phase completes. Rewards will be distributed based on project milestones.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
