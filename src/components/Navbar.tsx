import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Wallet, Rocket, Menu } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import AuthRibbon from './auth/AuthRibbon';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthRibbon, setShowAuthRibbon] = useState(false);
  const [authType, setAuthType] = useState<'investor' | 'project' | null>(null);
  const { user, signOut } = useAuthStore();
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    if (user) {
      navigate(`/dashboard/${user.role}`);
    }
  };

  const handleAuthClick = (type: 'investor' | 'project') => {
    setAuthType(type);
    setShowAuthRibbon(true);
  };

  return (
    <>
      <nav className="bg-gray-900/50 backdrop-blur-lg border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Rocket className="h-8 w-8 text-emerald-500" />
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
                GoRent
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/projects" className="text-gray-300 hover:text-white transition">
                Projets
              </Link>
              <Link to="/marketplace" className="text-gray-300 hover:text-white transition">
                Marketplace
              </Link>
              {user ? (
                <>
                  <button 
                    onClick={handleDashboardClick}
                    className="text-gray-300 hover:text-white transition"
                  >
                    Dashboard {user.role === 'investor' ? 'Investisseur' : 'Projet'}
                  </button>
                  <button 
                    onClick={() => signOut()}
                    className="text-gray-300 hover:text-white transition"
                  >
                    Déconnexion
                  </button>
                </>
              ) : (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleAuthClick('investor')}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition"
                  >
                    <Wallet className="h-4 w-4" />
                    <span>Espace Investisseur</span>
                  </button>
                  <button
                    onClick={() => handleAuthClick('project')}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition"
                  >
                    <Rocket className="h-4 w-4" />
                    <span>Espace Projet</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-300 hover:text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden py-4">
              <div className="flex flex-col space-y-4">
                <Link 
                  to="/projects" 
                  className="text-gray-300 hover:text-white transition"
                  onClick={() => setIsOpen(false)}
                >
                  Projets
                </Link>
                <Link 
                  to="/marketplace" 
                  className="text-gray-300 hover:text-white transition"
                  onClick={() => setIsOpen(false)}
                >
                  Marketplace
                </Link>
                {user ? (
                  <>
                    <button 
                      onClick={() => {
                        handleDashboardClick();
                        setIsOpen(false);
                      }}
                      className="text-gray-300 hover:text-white transition text-left"
                    >
                      Dashboard {user.role === 'investor' ? 'Investisseur' : 'Projet'}
                    </button>
                    <button 
                      onClick={() => {
                        signOut();
                        setIsOpen(false);
                      }}
                      className="text-gray-300 hover:text-white transition text-left"
                    >
                      Déconnexion
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        handleAuthClick('investor');
                        setIsOpen(false);
                      }}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition"
                    >
                      <Wallet className="h-4 w-4" />
                      <span>Espace Investisseur</span>
                    </button>
                    <button
                      onClick={() => {
                        handleAuthClick('project');
                        setIsOpen(false);
                      }}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition"
                    >
                      <Rocket className="h-4 w-4" />
                      <span>Espace Projet</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      <AuthRibbon 
        isOpen={showAuthRibbon} 
        onClose={() => {
          setShowAuthRibbon(false);
          setAuthType(null);
        }}
        userType={authType}
      />
    </>
  );
};

export default Navbar;