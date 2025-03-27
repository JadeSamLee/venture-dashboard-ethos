
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/Button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="glass-card p-12 text-center max-w-lg mx-auto animate-fade-in">
        <h1 className="text-6xl font-bold text-white mb-6">404</h1>
        <p className="text-xl text-gray-300 mb-6">
          The page you're looking for can't be found.
        </p>
        <p className="text-gray-400 mb-8">
          The link you followed may be broken, or the page may have been removed.
        </p>
        <Link to="/">
          <Button size="lg" className="inline-flex items-center">
            <Home className="mr-2 h-5 w-5" />
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
