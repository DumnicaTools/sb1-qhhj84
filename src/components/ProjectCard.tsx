import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

export interface ProjectCardProps {
  id: string;
  title: string;
  category: string;
  location: string;
  image: string;
  logo: string;
  progress: number;
  target: string;
  apy: string;
  description: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  category,
  location,
  image,
  logo,
  progress,
  target,
  apy,
  description,
}) => {
  return (
    <Link to={`/projects/${id}`} className="block">
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden transition hover:transform hover:scale-[1.02] hover:shadow-xl">
        <div className="relative">
          <img src={image} alt={title} className="w-full h-48 object-cover" />
          <div className="absolute top-4 right-4 bg-gray-900/80 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-emerald-500 font-semibold">{apy} APY</span>
          </div>
          <div className="absolute -bottom-8 left-4">
            <img 
              src={logo} 
              alt={`${title} logo`} 
              className="w-16 h-16 rounded-lg border-4 border-gray-800 object-cover"
            />
          </div>
        </div>
        <div className="p-6 pt-10 space-y-4">
          <div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold mb-1">{title}</h3>
                <p className="text-gray-400 flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-1" />
                  {location}
                </p>
              </div>
              <span className="text-sm px-2 py-1 bg-gray-700 rounded-full">
                {category}
              </span>
            </div>
            <p className="text-gray-400 text-sm mt-2 line-clamp-2">
              {description}
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Progression</span>
              <span className="text-emerald-500">{progress}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-emerald-500 rounded-full h-2 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <div className="flex justify-between text-sm">
            <div>
              <p className="text-gray-400">Objectif</p>
              <p className="font-semibold">{target}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-400">Investisseurs</p>
              <p className="font-semibold">{Math.floor(Math.random() * 100) + 50}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;