import React from 'react';
import { Globe, BarChart2, Layers, Megaphone, MessageCircle, Construction } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navigation = [
  { name: 'Page Publique', icon: Globe, path: '/dashboard/project/public', enabled: true },
  { name: 'Rapport', icon: BarChart2, path: '/dashboard/project', enabled: true },
  { name: 'Collection NFT', icon: Layers, path: '/dashboard/project/nft', enabled: true },
  { name: 'Publications', icon: Megaphone, path: '/dashboard/project/announcements', enabled: false },
  { name: 'Messagerie', icon: MessageCircle, path: '/dashboard/project/messages', enabled: false },
];

const ProjectNavigation = () => {
  const location = useLocation();

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-2">
      <nav className="flex flex-wrap gap-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <div key={item.name} className="relative group">
              {item.enabled ? (
                <Link
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
                    isActive
                      ? 'bg-emerald-500 text-white'
                      : 'hover:bg-gray-700/50 text-gray-300 hover:text-white'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              ) : (
                <div className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-500 cursor-not-allowed">
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                  <Construction className="h-4 w-4 ml-1" />
                </div>
              )}
              {!item.enabled && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap">
                  En maintenance
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default ProjectNavigation;