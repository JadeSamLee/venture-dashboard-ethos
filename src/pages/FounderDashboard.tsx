
import { useState } from 'react';
import { useProjectStore } from '@/store/projectStore';
import { Button } from '@/components/Button';
import ProjectCard from '@/components/ProjectCard';
import { ProjectPhase } from '@/types';
import { toast } from 'sonner';

const FounderDashboard = () => {
  const { projects, createProject, updateProjectPhase } = useProjectStore();
  
  // Get only projects for the current founder (mock)
  const founderProjects = projects.filter(project => 
    project.founder === '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
  );
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    fundingGoal: 0,
    tokenCirculation: 0
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'fundingGoal' || name === 'tokenCirculation' 
        ? Number(value) 
        : value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.fundingGoal || !formData.tokenCirculation) {
      toast.error('Please fill out all fields');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate delay
    setTimeout(() => {
      createProject(formData);
      toast.success('Project created successfully!');
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        fundingGoal: 0,
        tokenCirculation: 0
      });
      
      setIsSubmitting(false);
    }, 1500);
  };
  
  const handleUpdatePhase = (projectId: string, currentPhase: ProjectPhase) => {
    const phases: ProjectPhase[] = ['Escrowing', 'Phase 1', 'Phase 2', 'Phase 3', 'Completed'];
    const currentIndex = phases.indexOf(currentPhase);
    
    if (currentIndex < phases.length - 1) {
      const newPhase = phases[currentIndex + 1];
      
      updateProjectPhase({ projectId, newPhase });
      toast.success(`Project phase updated to ${newPhase}`);
    } else {
      toast.info('Project is already completed');
    }
  };
  
  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2">Founder Dashboard</h1>
          <p className="text-gray-400 mb-10">Create and manage your blockchain ventures.</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-12">
            <div className="lg:col-span-2">
              <h2 className="text-xl font-semibold text-white mb-6">Your Projects</h2>
              
              {founderProjects.length > 0 ? (
                <div className="space-y-6">
                  {founderProjects.map((project) => (
                    <div key={project.id} className="glass-card p-6 animate-fade-in">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                        <div>
                          <h3 className="text-xl font-medium text-white">{project.name}</h3>
                          <p className="text-sm text-gray-400 mt-1">Created on {project.createdAt.toLocaleDateString()}</p>
                        </div>
                        <div className={`px-3 py-1 text-xs font-medium rounded-full mt-2 md:mt-0
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
                      
                      <div className="mb-6">
                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                            style={{ width: `${Math.min(Math.round((project.currentFunding / project.fundingGoal) * 100), 100)}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-400 mt-2">
                          <span>{project.currentFunding.toLocaleString()} tokens raised</span>
                          <span>Goal: {project.fundingGoal.toLocaleString()} tokens</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button
                          onClick={() => handleUpdatePhase(project.id, project.phase)}
                          disabled={project.phase === 'Completed'}
                          className="w-full sm:w-auto"
                        >
                          {project.phase === 'Completed' ? 'Project Completed' : 'Advance to Next Phase'}
                        </Button>
                        <Button 
                          variant="secondary"
                          onClick={() => window.location.href = `/projects/${project.id}`}
                          className="w-full sm:w-auto"
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="glass-card p-12 text-center">
                  <p className="text-gray-400 mb-4">You haven't created any projects yet.</p>
                  <p className="text-gray-500">Use the form to create your first project.</p>
                </div>
              )}
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-white mb-6">Create New Project</h2>
              
              <div className="glass-card p-6">
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-400 mb-1" htmlFor="name">
                      Project Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-200"
                      placeholder="Enter project name"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-400 mb-1" htmlFor="description">
                      Project Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-200"
                      placeholder="Describe your project"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-400 mb-1" htmlFor="fundingGoal">
                      Funding Goal (tokens)
                    </label>
                    <input
                      id="fundingGoal"
                      name="fundingGoal"
                      type="number"
                      value={formData.fundingGoal || ''}
                      onChange={handleChange}
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-200"
                      placeholder="0"
                      min="1"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-400 mb-1" htmlFor="tokenCirculation">
                      Token Circulation
                    </label>
                    <input
                      id="tokenCirculation"
                      name="tokenCirculation"
                      type="number"
                      value={formData.tokenCirculation || ''}
                      onChange={handleChange}
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-200"
                      placeholder="0"
                      min="1"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    isLoading={isSubmitting} 
                    className="w-full"
                  >
                    Create Project
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FounderDashboard;
