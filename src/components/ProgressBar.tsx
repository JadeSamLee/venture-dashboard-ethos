
import { ProjectPhase } from '@/types';

interface ProgressBarProps {
  currentPhase: ProjectPhase;
}

const ProgressBar = ({ currentPhase }: ProgressBarProps) => {
  const phases: ProjectPhase[] = ['Escrowing', 'Phase 1', 'Phase 2', 'Phase 3', 'Completed'];
  const currentIndex = phases.indexOf(currentPhase);
  
  return (
    <div className="w-full py-8">
      <div className="relative">
        {/* Progress Track */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-700 -translate-y-1/2"></div>
        
        {/* Progress Fill */}
        <div 
          className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 -translate-y-1/2 transition-all duration-500 ease-in-out"
          style={{ 
            width: `${currentIndex >= 0 ? (currentIndex / (phases.length - 1)) * 100 : 0}%` 
          }}
        ></div>
        
        {/* Phase Points */}
        <div className="relative flex justify-between">
          {phases.map((phase, index) => {
            const isActive = index <= currentIndex;
            const isCurrent = index === currentIndex;
            
            return (
              <div key={phase} className="flex flex-col items-center">
                <div 
                  className={`w-6 h-6 rounded-full flex items-center justify-center z-10 transition-all duration-300
                    ${isCurrent 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 scale-125' 
                      : isActive 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                        : 'bg-gray-700'
                    }
                  `}
                >
                  {isActive && (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </div>
                <div className={`mt-3 text-xs font-medium ${isActive ? 'text-white' : 'text-gray-500'}`}>
                  {phase}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
