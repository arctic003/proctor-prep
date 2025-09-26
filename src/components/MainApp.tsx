import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "./Navigation";
import Hero from "./Hero";
import Auth from "./Auth";
import Dashboard from "./Dashboard";
import InterviewInterface from "./InterviewInterface";
import ResultsDashboard from "./ResultsDashboard";
import ResumeUpload from "./ResumeUpload";

const MainApp = () => {
  const [currentView, setCurrentView] = useState<string>('hero');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleViewChange = (view: string) => {
    setCurrentView(view);
  };

  const handleAuth = () => {
    setIsAuthenticated(true);
    setCurrentView('dashboard');
  };

  const handleGetStarted = () => {
    setCurrentView('auth');
  };

  const renderCurrentView = () => {
    if (!isAuthenticated && currentView !== 'hero') {
      return <Auth />;
    }

    switch (currentView) {
      case 'hero':
        return <Hero />;
      case 'auth':
        return <Auth />;
      case 'dashboard':
        return <Dashboard />;
      case 'interview':
        return <InterviewInterface />;
      case 'results':
        return <ResultsDashboard />;
      case 'resume':
        return <ResumeUpload />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation - only show when authenticated and not on hero/auth */}
      {isAuthenticated && currentView !== 'hero' && currentView !== 'auth' && (
        <Navigation currentView={currentView} onViewChange={handleViewChange} />
      )}

      {/* Hero Navigation */}
      {currentView === 'hero' && (
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-0 left-0 right-0 z-50 p-6"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
                <span className="text-xl font-bold text-white">AI</span>
              </div>
              <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Interview Platform
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setCurrentView('auth')}
                className="text-foreground hover:text-primary transition-colors"
              >
                Sign In
              </button>
              <motion.button
                onClick={handleGetStarted}
                className="px-6 py-2 bg-gradient-primary text-white rounded-lg font-medium shadow-primary hover:shadow-glow transition-all hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
            </div>
          </div>
        </motion.nav>
      )}

      {/* Main Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentView}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={currentView === 'hero' ? '' : 'min-h-screen'}
        >
          {renderCurrentView()}
        </motion.div>
      </AnimatePresence>

      {/* Auth Success Handler */}
      {currentView === 'auth' && (
        <div className="fixed bottom-8 right-8">
          <motion.button
            onClick={handleAuth}
            className="px-6 py-3 bg-gradient-primary text-white rounded-lg font-medium shadow-glow opacity-20 hover:opacity-100 transition-opacity"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Skip Auth (Demo)
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default MainApp;