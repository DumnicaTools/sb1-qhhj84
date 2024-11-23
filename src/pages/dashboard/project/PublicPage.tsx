import React, { useState, useEffect } from 'react';
import { Edit2, Save, X, MapPin, Users, Calendar, BarChart, Building2, Wallet } from 'lucide-react';
import { useAuthStore } from '../../../store/authStore';
import { useProjectStore } from '../../../store/projectStore';
import { supabase } from '../../../lib/supabase';

const PublicPage = () => {
  const { user } = useAuthStore();
  const { updateProject } = useProjectStore();
  const [project, setProject] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProject();
  }, [user]);

  const fetchProject = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('owner_id', user.id)
        .single();

      if (error) throw error;
      setProject(data);
      setEditedData(data);
    } catch (error) {
      console.error('Erreur lors de la récupération du projet:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await updateProject(project.id, editedData);
      setProject(editedData);
      setIsEditing(false);
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!project) return null;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Page Publique</h2>
        {isEditing ? (
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition"
            >
              <Save className="h-4 w-4" />
              <span>Sauvegarder</span>
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditedData(project);
              }}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition"
            >
              <X className="h-4 w-4" />
              <span>Annuler</span>
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition"
          >
            <Edit2 className="h-4 w-4" />
            <span>Modifier</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {isEditing ? (
            <div className="space-y-4">
              <input
                type="text"
                value={editedData.title}
                onChange={(e) => setEditedData({ ...editedData, title: e.target.value })}
                className="text-4xl font-bold bg-gray-700 rounded-lg px-4 py-2 w-full"
              />
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={editedData.location}
                  onChange={(e) => setEditedData({ ...editedData, location: e.target.value })}
                  className="bg-gray-700 rounded-lg px-4 py-2 w-full"
                />
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-4xl font-bold">{project.title}</h1>
              <p className="flex items-center text-gray-400">
                <MapPin className="h-5 w-5 mr-2" />
                {project.location}
              </p>
            </>
          )}

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Progression</span>
              <span className="text-emerald-500">{project.progress}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div 
                className="bg-emerald-500 rounded-full h-3 transition-all duration-500"
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <p className="text-gray-400">Objectif</p>
              {isEditing ? (
                <input
                  type="number"
                  value={editedData.target_amount}
                  onChange={(e) => setEditedData({ ...editedData, target_amount: e.target.value })}
                  className="text-2xl font-bold bg-gray-700 rounded-lg px-4 py-2 w-full"
                />
              ) : (
                <p className="text-2xl font-bold">€{project.target_amount.toLocaleString()}</p>
              )}
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <p className="text-gray-400">APY</p>
              {isEditing ? (
                <input
                  type="number"
                  value={editedData.apy}
                  onChange={(e) => setEditedData({ ...editedData, apy: e.target.value })}
                  className="text-2xl font-bold bg-gray-700 rounded-lg px-4 py-2 w-full"
                  step="0.1"
                />
              ) : (
                <p className="text-2xl font-bold text-emerald-500">{project.apy}%</p>
              )}
            </div>
          </div>

          <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-lg flex items-center justify-center space-x-2 transition">
            <Wallet className="h-5 w-5" />
            <span>Investir Maintenant</span>
          </button>
        </div>

        <div className="space-y-4">
          {isEditing ? (
            <div className="space-y-4">
              <input
                type="text"
                value={editedData.image}
                onChange={(e) => setEditedData({ ...editedData, image: e.target.value })}
                placeholder="URL de l'image principale"
                className="bg-gray-700 rounded-lg px-4 py-2 w-full"
              />
              <div className="grid grid-cols-3 gap-4">
                {editedData.gallery?.map((image: string, index: number) => (
                  <input
                    key={index}
                    type="text"
                    value={image}
                    onChange={(e) => {
                      const newGallery = [...editedData.gallery];
                      newGallery[index] = e.target.value;
                      setEditedData({ ...editedData, gallery: newGallery });
                    }}
                    className="bg-gray-700 rounded-lg px-4 py-2 w-full"
                  />
                ))}
              </div>
            </div>
          ) : (
            <>
              <img 
                src={project.image || "https://via.placeholder.com/800x400"} 
                alt={project.title}
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="grid grid-cols-3 gap-4">
                {project.gallery?.map((image: string, index: number) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${project.title} ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-75 transition"
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { icon: Calendar, label: 'Date de début', value: project.start_date },
          { icon: Users, label: 'Investisseurs', value: project.investors_count },
          { icon: Building2, label: 'Total Parts', value: project.total_shares },
          { icon: BarChart, label: 'Inv. Minimum', value: `€${project.min_investment.toLocaleString()}` }
        ].map((item, index) => (
          <div key={index} className="bg-gray-800/50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <item.icon className="h-5 w-5 text-emerald-500" />
              <span className="text-gray-400">{item.label}</span>
            </div>
            {isEditing && index === 3 ? (
              <input
                type="number"
                value={editedData.min_investment}
                onChange={(e) => setEditedData({ ...editedData, min_investment: e.target.value })}
                className="bg-gray-700 rounded-lg px-4 py-2 w-full"
              />
            ) : (
              <p className="text-lg font-semibold">{item.value}</p>
            )}
          </div>
        ))}
      </div>

      <div className="bg-gray-800/50 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">À Propos du Projet</h2>
        {isEditing ? (
          <textarea
            value={editedData.description}
            onChange={(e) => setEditedData({ ...editedData, description: e.target.value })}
            className="w-full h-32 bg-gray-700 rounded-lg px-4 py-2"
          />
        ) : (
          <p className="text-gray-300 leading-relaxed">{project.description}</p>
        )}
      </div>
    </div>
  );
};

export default PublicPage;