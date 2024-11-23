import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Users, Calendar, BarChart, Building2, Wallet, ChevronRight, Shield, Coins, FileText } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Project } from '../lib/supabase';

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setProject(data);
      } catch (error) {
        console.error('Erreur lors de la récupération du projet:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!project) {
    return <div>Projet non trouvé</div>;
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative h-96 rounded-xl overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1549517045-bc93de075e53?auto=format&fit=crop&w=2000&q=80" 
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2 text-emerald-400 text-sm mb-2">
                  <span>Immobilier</span>
                  <ChevronRight className="h-4 w-4" />
                  <span>Résidentiel</span>
                </div>
                <h1 className="text-4xl font-bold mb-2">{project.title}</h1>
                <p className="flex items-center text-gray-300">
                  <MapPin className="h-5 w-5 mr-2" />
                  {project.location}
                </p>
              </div>
              <div className="bg-gray-900/90 backdrop-blur-sm rounded-lg p-4 space-y-2">
                <p className="text-sm text-gray-400">Objectif de financement</p>
                <p className="text-2xl font-bold">€{project.target_amount.toLocaleString()}</p>
                <div className="flex items-center space-x-2 text-emerald-400">
                  <Shield className="h-4 w-4" />
                  <span className="text-sm">Projet vérifié</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Progress Section */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-400">Progression</p>
                <p className="text-2xl font-bold">{project.progress}%</p>
              </div>
              <div className="text-right">
                <p className="text-gray-400">Temps restant</p>
                <p className="text-2xl font-bold">15 jours</p>
              </div>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div 
                className="bg-emerald-500 rounded-full h-3 transition-all duration-500"
                style={{ width: `${project.progress}%` }}
              />
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-gray-400">Investisseurs</p>
                <p className="text-xl font-bold">47</p>
              </div>
              <div>
                <p className="text-gray-400">Collecté</p>
                <p className="text-xl font-bold">€{(project.target_amount * project.progress / 100).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-400">APY</p>
                <p className="text-xl font-bold text-emerald-500">{project.apy}%</p>
              </div>
            </div>
          </div>

          {/* Project Description */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 space-y-6">
            <h2 className="text-2xl font-bold">À Propos du Projet</h2>
            <p className="text-gray-300 leading-relaxed">
              {project.description}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80"
                alt="Vue intérieure"
                className="rounded-lg w-full h-48 object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"
                alt="Vue extérieure"
                className="rounded-lg w-full h-48 object-cover"
              />
            </div>
          </div>

          {/* Project Details */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 space-y-6">
            <h2 className="text-2xl font-bold">Détails du Projet</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-4">Caractéristiques</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Surface totale: 2,500 m²</li>
                  <li>• 20 appartements de luxe</li>
                  <li>• Parking souterrain</li>
                  <li>• Jardin commun</li>
                  <li>• Service de conciergerie</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Localisation</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• 16ème arrondissement de Paris</li>
                  <li>• Proche des transports</li>
                  <li>• Quartier résidentiel prisé</li>
                  <li>• Proximité des écoles</li>
                  <li>• Commerces à proximité</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Investment Panel */}
        <div className="space-y-6">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 space-y-6 sticky top-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Prix du NFT</span>
                <span className="font-bold">€{project.min_investment.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">APY</span>
                <span className="font-bold text-emerald-500">{project.apy}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Durée</span>
                <span className="font-bold">{project.duration} mois</span>
              </div>
              <div className="h-px bg-gray-700" />
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Disponibilité</span>
                <span className="font-bold">53 NFTs restants</span>
              </div>
            </div>

            <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-lg flex items-center justify-center space-x-2 transition">
              <Wallet className="h-5 w-5" />
              <span>Investir Maintenant</span>
            </button>

            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Shield className="h-4 w-4" />
                <span>Projet vérifié et sécurisé</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Coins className="h-4 w-4" />
                <span>Rendement trimestriel</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <FileText className="h-4 w-4" />
                <span>Documentation complète disponible</span>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 space-y-4">
            <h3 className="font-semibold">Documents</h3>
            <div className="space-y-2">
              <a href="#" className="block p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition">
                <div className="flex items-center justify-between">
                  <span>Présentation détaillée</span>
                  <FileText className="h-4 w-4" />
                </div>
              </a>
              <a href="#" className="block p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition">
                <div className="flex items-center justify-between">
                  <span>Plan d'investissement</span>
                  <FileText className="h-4 w-4" />
                </div>
              </a>
              <a href="#" className="block p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition">
                <div className="flex items-center justify-between">
                  <span>Études de marché</span>
                  <FileText className="h-4 w-4" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;