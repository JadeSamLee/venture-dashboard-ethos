
import { useState } from 'react';
import { useProjectStore } from '@/store/projectStore';
import ProjectCard from '@/components/ProjectCard';
import { Search } from 'lucide-react';

const InvestorDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { projects, userStakedTokens } = useProjectStore();
  
  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2">Investor Dashboard</h1>
          <p className="text-gray-400 mb-8">Manage your investments and discover new opportunities.</p>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="glass-card p-6 animate-fade-in">
              <p className="text-sm text-gray-400 mb-1">Available Tokens</p>
              <h3 className="text-2xl font-bold text-white">{userStakedTokens.toLocaleString()}</h3>
            </div>
            
            <div className="glass-card p-6 animate-fade-in delay-100">
              <p className="text-sm text-gray-400 mb-1">Total Staked</p>
              <h3 className="text-2xl font-bold text-white">2,580</h3>
            </div>
            
            <div className="glass-card p-6 animate-fade-in delay-200">
              <p className="text-sm text-gray-400 mb-1">Active Projects</p>
              <h3 className="text-2xl font-bold text-white">4</h3>
            </div>
            
            <div className="glass-card p-6 animate-fade-in delay-300">
              <p className="text-sm text-gray-400 mb-1">Total Rewards</p>
              <h3 className="text-2xl font-bold text-white">320</h3>
            </div>
          </div>
          
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h2 className="text-xl font-semibold text-white mb-4 md:mb-0">Projects</h2>
            
            <div className="w-full md:w-auto">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search projects..."
                  className="w-full md:w-64 bg-gray-800/50 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-200"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
          
          {/* Projects Grid */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <div key={project.id} style={{ animationDelay: `${index * 100}ms` }}>
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-card p-12 text-center">
              <p className="text-gray-400">No projects found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvestorDashboard;
