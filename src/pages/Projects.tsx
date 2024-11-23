import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, ArrowRight, MapPin } from 'lucide-react';
import { useProjectStore } from '../store/projectStore';
import { Link } from 'react-router-dom';

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const { projects, fetchProjects, isLoading } = useProjectStore();

  useEffect(() => {
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold">Projets d'Investissement</h1>
        <div className="flex w-full md:w-auto gap-4">
          <div className="relative flex-grow md:flex-grow-0">
            <input
              type="text"
              placeholder="Rechercher des projets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-64 bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-gray-700/50 transition"
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span>Filtres</span>
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-gray-800/50 p-4 rounded-lg">
          <select className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2">
            <option>Localisation</option>
            <option>Europe</option>
            <option>Amérique du Nord</option>
            <option>Asie</option>
          </select>
          <select className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2">
            <option>Type de Projet</option>
            <option>Immobilier</option>
            <option>Technologie</option>
            <option>Énergie</option>
          </select>
          <select className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2">
            <option>Investissement</option>
            <option>0€ - 10K€</option>
            <option>10K€ - 50K€</option>
            <option>50K€+</option>
          </select>
          <select className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2">
            <option>APY</option>
            <option>10-12%</option>
            <option>12-15%</option>
            <option>15%+</option>
          </select>
        </div>
      )}

      <div className="space-y-2">
        {filteredProjects.map((project) => (
          <Link
            key={project.id}
            to={`/projects/${project.id}`}
            className="block bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition"
          >
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={project.logo || "https://via.placeholder.com/50"}
                  alt={project.title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-semibold">{project.title}</h3>
                  <p className="text-sm text-gray-400 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {project.location}
                  </p>
                </div>
                <span className="ml-4 px-2 py-1 bg-gray-700 rounded-full text-sm">
                  {project.category || 'Immobilier'}
                </span>
              </div>
              <div className="flex items-center space-x-8">
                <div className="text-right">
                  <p className="text-sm text-gray-400">Objectif</p>
                  <p className="font-semibold">€{project.target_amount.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">APY</p>
                  <p className="font-semibold text-emerald-500">{project.apy}%</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">Progression</p>
                  <p className="font-semibold">{project.progress}%</p>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Projects;