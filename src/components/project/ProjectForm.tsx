import React, { useState } from 'react';
import { X, Plus, Trash2, Upload } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useProjectStore } from '../../store/projectStore';
import { supabase } from '../../lib/supabase';

interface ProjectFormProps {
  onClose: () => void;
  onSubmit: (project: any) => void;
  initialData?: any;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onClose, onSubmit, initialData }) => {
  const { user } = useAuthStore();
  const { updateProject } = useProjectStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    location: initialData?.location || '',
    target_amount: initialData?.target_amount || '',
    min_investment: initialData?.min_investment || '',
    apy: initialData?.apy || '',
    duration: initialData?.duration || '',
    category: initialData?.category || 'Immobilier',
    logo: initialData?.logo || null,
    sections: initialData?.sections || []
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    setError(null);

    try {
      const projectData = {
        ...formData,
        owner_id: user.id,
        status: 'draft',
        progress: 0
      };

      const { data: project, error: projectError } = await supabase
        .from('projects')
        .upsert([{
          ...projectData,
          id: initialData?.id,
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (projectError) throw projectError;

      if (project) {
        await updateProject(project.id, project);
        onSubmit(project);
      }
    } catch (error: any) {
      console.error('Erreur lors de la création/mise à jour du projet:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-8 w-full max-w-4xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold mb-6">
          {initialData ? 'Modifier le Projet' : 'Créer un Nouveau Projet'}
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Titre du Projet
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Catégorie
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Immobilier">Immobilier</option>
                <option value="Technologie">Technologie</option>
                <option value="Énergie">Énergie</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="Startup">Startup</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 h-32"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Localisation
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Logo du Projet
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-700 border-dashed rounded-lg">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-400">
                    <label className="relative cursor-pointer rounded-md font-medium text-emerald-500 hover:text-emerald-400">
                      <span>Télécharger un logo</span>
                      <input type="file" className="sr-only" accept="image/*" />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Objectif (€)
              </label>
              <input
                type="number"
                value={formData.target_amount}
                onChange={(e) => setFormData({ ...formData, target_amount: e.target.value })}
                className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Investissement Min. (€)
              </label>
              <input
                type="number"
                value={formData.min_investment}
                onChange={(e) => setFormData({ ...formData, min_investment: e.target.value })}
                className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                APY (%)
              </label>
              <input
                type="number"
                value={formData.apy}
                onChange={(e) => setFormData({ ...formData, apy: e.target.value })}
                className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
                min="0"
                max="100"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Durée (mois)
              </label>
              <input
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
                min="1"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-white transition"
              disabled={isLoading}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg transition disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? 'Enregistrement...' : initialData ? 'Mettre à jour' : 'Créer le Projet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;