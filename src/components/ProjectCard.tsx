
import { Link } from 'react-router-dom';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  showStakeButton?: boolean;
}

const ProjectCard = ({ project, showStakeButton = true }: ProjectCardProps) => {
  const progressPercentage = Math.min(Math.round((project.currentFunding / project.fundingGoal) * 100), 100);
  
  return (
    <div className="glass-card overflow-hidden animate-fade-in transition-all duration-300 hover:translate-y-[-4px]">
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-medium text-white">{project.name}</h3>
          <span className={`px-3 py-1 text-xs font-medium rounded-full 
            ${project.phase === 'Escrowing' ? 'bg-amber-500/20 text-amber-300' :
              project.phase === 'Phase 1' ? 'bg-blue-500/20 text-blue-300' :
              project.phase === 'Phase 2' ? 'bg-purple-500/20 text-purple-300' :
              project.phase === 'Phase 3' ? 'bg-indigo-500/20 text-indigo-300' :
              'bg-green-500/20 text-green-300'
            }`}
          >
            {project.phase}
          </span>
        </div>
        
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
        
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Funding Progress</span>
            <span>{progressPercentage}%</span>
          </div>
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
        
        <div className="flex justify-between items-center text-sm text-gray-300 mb-5">
          <div>
            <span className="text-gray-400">Goal: </span>
            {project.fundingGoal.toLocaleString()} Tokens
          </div>
          <div>
            <span className="text-gray-400">Raised: </span>
            {project.currentFunding.toLocaleString()} Tokens
          </div>
        </div>
        
        <div className="flex space-x-3">
          <Link 
            to={`/projects/${project.id}`} 
            className="flex-1"
          >
            <button className="w-full glass-card px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-white/10">
              View Details
            </button>
          </Link>
          
          {showStakeButton && (
            <Link 
              to={`/projects/${project.id}`} 
              className="flex-1"
            >
              <button className="w-full btn-gradient px-4 py-2 text-sm font-medium">
                Stake Tokens
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
