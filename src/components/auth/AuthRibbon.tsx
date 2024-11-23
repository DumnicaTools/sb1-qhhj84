import React, { useState } from 'react';
import { X } from 'lucide-react';
import AuthModal from './AuthModal';
import { useAuthStore } from '../../store/authStore';

type AuthMode = 'signin' | 'signup' | null;

interface AuthRibbonProps {
  isOpen: boolean;
  onClose: () => void;
  userType: 'investor' | 'project' | null;
}

const AuthRibbon: React.FC<AuthRibbonProps> = ({ isOpen, onClose, userType }) => {
  const [authMode, setAuthMode] = useState<AuthMode>(null);
  const { user } = useAuthStore();

  if (!isOpen || user || !userType) return null;

  const handleAuthComplete = () => {
    setAuthMode(null);
    onClose();
  };

  const userTypeLabel = userType === 'investor' ? 'Investisseur' : 'Porteur de projet';

  return (
    <>
      <div className="fixed top-0 left-0 w-full bg-gray-900/95 backdrop-blur-sm p-4 z-50">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex space-x-6">
            <span className="text-emerald-500 font-semibold">
              Espace {userTypeLabel}
            </span>
            <button
              onClick={() => setAuthMode('signin')}
              className="text-gray-300 hover:text-white transition"
            >
              Se connecter
            </button>
            <button
              onClick={() => setAuthMode('signup')}
              className="text-gray-300 hover:text-white transition"
            >
              S'inscrire
            </button>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-6 w-6" />
          </button>
        </div>
      </div>

      <AuthModal
        isOpen={authMode !== null}
        mode={authMode}
        userType={userType}
        onClose={handleAuthComplete}
      />
    </>
  );
};

export default AuthRibbon;