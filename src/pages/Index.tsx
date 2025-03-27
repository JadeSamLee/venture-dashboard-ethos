
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight, LineChart, Shield, BarChart3 } from 'lucide-react';
import { Button } from '@/components/Button';
import ProjectCard from '@/components/ProjectCard';
import { useProjectStore } from '@/store/projectStore';

const Index = () => {
  const projects = useProjectStore(state => state.projects);
  const featuredProjects = projects.slice(0, 3);
  const statsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-in');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => {
      el.classList.add('opacity-0', 'translate-y-10');
      observer.observe(el);
    });
    
    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);
  
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="hero-gradient hero-glow min-h-screen flex items-center pt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 animate-fade-in">
              The Future of <span className="gradient-text">Blockchain Ventures</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 animate-fade-in delay-200">
              Invest, stake, and earn rewards in the most promising blockchain projects. 
              Transparent, secure, and community-driven funding protocol.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in delay-300">
              <Link to="/investor-dashboard">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/founder-dashboard">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Launch a Project
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section ref={statsRef} className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass-card p-8 text-center animate-on-scroll">
                <h3 className="text-5xl font-bold gradient-text mb-4">$120M+</h3>
                <p className="text-gray-400">Total Value Locked</p>
              </div>
              <div className="glass-card p-8 text-center animate-on-scroll delay-150">
                <h3 className="text-5xl font-bold gradient-text mb-4">45+</h3>
                <p className="text-gray-400">Successful Projects</p>
              </div>
              <div className="glass-card p-8 text-center animate-on-scroll delay-300">
                <h3 className="text-5xl font-bold gradient-text mb-4">12,000+</h3>
                <p className="text-gray-400">Active Investors</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Projects Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Featured Projects</h2>
                <p className="text-gray-400 max-w-2xl">Discover the most promising blockchain ventures ready for your investment.</p>
              </div>
              <Link to="/investor-dashboard" className="mt-4 md:mt-0 flex items-center text-purple-400 hover:text-purple-300 transition-colors">
                View All Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project, index) => (
                <div key={project.id} className="animate-on-scroll" style={{ animationDelay: `${index * 150}ms` }}>
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">How It Works</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">Our protocol provides a seamless experience for both investors and project founders.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="glass-card p-8 animate-on-scroll">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-6">
                  <LineChart className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-medium text-white mb-3">Invest Securely</h3>
                <p className="text-gray-400">Stake tokens in vetted projects with transparent fund distribution and milestone tracking.</p>
              </div>
              
              <div className="glass-card p-8 animate-on-scroll delay-150">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-6">
                  <Shield className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-medium text-white mb-3">Phased Funding</h3>
                <p className="text-gray-400">Projects receive funding in phases based on milestone completion, ensuring accountability.</p>
              </div>
              
              <div className="glass-card p-8 animate-on-scroll delay-300">
                <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center mb-6">
                  <BarChart3 className="h-6 w-6 text-indigo-400" />
                </div>
                <h3 className="text-xl font-medium text-white mb-3">Earn Rewards</h3>
                <p className="text-gray-400">Receive token rewards as projects progress and meet their goals, increasing your returns.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto glass-card overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 z-0"></div>
            <div className="relative z-10 p-10 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Join the Future of Venture Funding?</h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Start investing in promising blockchain projects or launch your own venture with our secure protocol.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/investor-dashboard">
                  <Button size="lg" className="w-full sm:w-auto">
                    Start Investing
                  </Button>
                </Link>
                <Link to="/founder-dashboard">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                    Launch a Project
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-background py-12 border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between mb-8">
              <div className="mb-8 md:mb-0">
                <div className="text-2xl font-bold gradient-text mb-4">ETHVENTURE</div>
                <p className="text-gray-400 max-w-xs">The future of blockchain venture funding, secure and transparent.</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                <div>
                  <h4 className="text-white font-medium mb-4">Platform</h4>
                  <ul className="space-y-2">
                    <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                    <li><Link to="/investor-dashboard" className="text-gray-400 hover:text-white transition-colors">Investor Dashboard</Link></li>
                    <li><Link to="/founder-dashboard" className="text-gray-400 hover:text-white transition-colors">Founder Dashboard</Link></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-white font-medium mb-4">Resources</h4>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Whitepaper</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-white font-medium mb-4">Community</h4>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Discord</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white transition-colors">GitHub</a></li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm">© 2023 ETHVenture. All rights reserved.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
