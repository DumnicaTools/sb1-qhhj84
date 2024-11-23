import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Project } from '../lib/supabase';

interface ProjectState {
  projects: Project[];
  isLoading: boolean;
  error: string | null;
  fetchProjects: () => Promise<void>;
  updateProject: (projectId: string, updates: Partial<Project>) => Promise<void>;
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: [],
  isLoading: false,
  error: null,

  fetchProjects: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ projects: data || [] });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  updateProject: async (projectId: string, updates: Partial<Project>) => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .update(updates)
        .eq('id', projectId)
        .select()
        .single();

      if (error) throw error;

      // Mettre à jour le projet dans le state local
      const projects = get().projects.map(project =>
        project.id === projectId ? { ...project, ...data } : project
      );
      set({ projects });

      return data;
    } catch (error: any) {
      throw new Error(`Erreur lors de la mise à jour du projet: ${error.message}`);
    }
  },
}));