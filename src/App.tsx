
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const InvestorDashboard = lazy(() => import("./pages/InvestorDashboard"));
const FounderDashboard = lazy(() => import("./pages/FounderDashboard"));
const ProjectDetails = lazy(() => import("./pages/ProjectDetails"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background text-foreground">
          <Navbar />
          <Suspense fallback={
            <div className="flex h-[90vh] w-full items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-white"></div>
            </div>
          }>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/investor-dashboard" element={<InvestorDashboard />} />
              <Route path="/founder-dashboard" element={<FounderDashboard />} />
              <Route path="/projects/:projectId" element={<ProjectDetails />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
