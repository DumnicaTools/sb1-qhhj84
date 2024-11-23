import React, { useState, useEffect } from 'react';
import { Plus, Target, Users, TrendingUp, MapPin } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useProjectStore } from '../../store/projectStore';
import ProjectForm from '../../components/project/ProjectForm';
import ProjectNavigation from '../../components/dashboard/ProjectNavigation';
import { supabase } from '../../lib/supabase';
import type { Project } from '../../lib/supabase';

const ProjectDashboard = () => {
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthStore();
  const { updateProject } = useProjectStore();

  useEffect(() => {
    const fetchUserProject = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('owner_id', user.id)
          .single();

        if (error) {
          if (error.code !== 'PGRST116') {
            console.error('Erreur lors de la récupération du projet:', error);
          }
        } else {
          setProject(data);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du projet:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProject();
  }, [user]);

  const handleProjectCreated = async (newProject: Project) => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .upsert({
          ...newProject,
          owner_id: user?.id,
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;

      setProject(data);
      await updateProject(data.id, data);
      setShowProjectForm(false);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du projet:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ProjectNavigation />
      
      {!project ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gray-800/50 backdrop-blur-sm rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-4">Bienvenue sur GoRent</h1>
          <p className="text-gray-400 text-center max-w-lg mb-8">
            Vous n'avez pas encore créé de projet. Commencez dès maintenant à lever des fonds pour votre projet en créant votre première page projet.
          </p>
          <button
            onClick={() => setShowProjectForm(true)}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition"
          >
            <Plus className="h-5 w-5" />
            <span>Créer un Projet</span>
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">{project.title}</h1>
              <p className="text-gray-400 flex items-center mt-2">
                <MapPin className="h-4 w-4 mr-1" />
                {project.location}
              </p>
            </div>
            <button
              onClick={() => setShowProjectForm(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Modifier</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Fonds Levés',
                value: `€${project.progress * project.target_amount / 100}`,
                change: `${project.progress}%`,
                icon: Target,
              },
              {
                title: 'Investisseurs',
                value: '45',
                change: '+5',
                icon: Users,
              },
              {
                title: 'Rendement',
                value: `${project.apy}%`,
                change: 'APY',
                icon: TrendingUp,
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 space-y-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-400">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className="h-6 w-6 text-emerald-500" />
                </div>
                <div className="text-sm text-emerald-500">{stat.change}</div>
              </div>
            ))}
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Aperçu du Projet</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-300">{project.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Détails du Financement</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Objectif</span>
                      <span className="font-semibold">€{project.target_amount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Investissement Min.</span>
                      <span className="font-semibold">€{project.min_investment}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Durée</span>
                      <span className="font-semibold">{project.duration} mois</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Progression</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Avancement</span>
                      <span className="text-emerald-500">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-emerald-500 rounded-full h-2 transition-all duration-500"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Restant</span>
                      <span>€{(project.target_amount * (100 - project.progress) / 100).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showProjectForm && (
        <ProjectForm 
          onClose={() => setShowProjectForm(false)} 
          onSubmit={handleProjectCreated}
          initialData={project}
        />
      )}
    </div>
  );
};

export default ProjectDashboard;