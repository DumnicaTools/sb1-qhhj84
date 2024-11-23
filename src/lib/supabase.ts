import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types pour les tables Supabase
export interface Project {
  id: string;
  title: string;
  description: string;
  location: string;
  target_amount: number;
  min_investment: number;
  apy: number;
  duration: number;
  progress: number;
  owner_id: string;
  created_at: string;
  updated_at: string;
  status: 'draft' | 'active' | 'funded' | 'completed';
  sections?: Section[];
}

export interface Section {
  id: string;
  type: string;
  title: string;
  content: string;
}

export interface Collection {
  id: string;
  project_id: string;
  name: string;
  description: string;
  price: number;
  supply: number;
  sold: number;
  metadata: Record<string, any>;
}

export interface Investment {
  id: string;
  user_id: string;
  project_id: string;
  collection_id: string;
  amount: number;
  tokens: number;
  created_at: string;
  status: 'pending' | 'completed' | 'cancelled';
}

// Fonction pour créer les projets initiaux pour les comptes de test
export const initializeTestProjects = async () => {
  const testAccounts = [
    {
      email: 'admin2@projet.ch',
      project: {
        title: 'Résidence AVP Paris',
        description: 'Un développement résidentiel premium au cœur de Paris, comprenant 20 appartements de luxe avec finitions et équipements haut de gamme.',
        location: 'Paris, France',
        target_amount: 2500000,
        min_investment: 10000,
        apy: 14.2,
        duration: 24,
        progress: 75,
        status: 'active',
        sections: []
      }
    },
    {
      email: 'admin3@projet.ch',
      project: {
        title: 'Ferme Solaire',
        description: 'Un projet d\'énergie renouvelable innovant, comprenant l\'installation de panneaux solaires sur une superficie de 50 hectares.',
        location: 'Bordeaux, France',
        target_amount: 1800000,
        min_investment: 5000,
        apy: 15.5,
        duration: 36,
        progress: 60,
        status: 'active',
        sections: []
      }
    }
  ];

  for (const { email, project } of testAccounts) {
    try {
      // Vérifier si le profil existe
      let { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email)
        .single();

      // Si le profil n'existe pas, le créer
      if (profileError && profileError.code === 'PGRST116') {
        const { data: authUser } = await supabase.auth.signUp({
          email,
          password: 'password123', // Mot de passe temporaire
        });

        if (authUser.user) {
          const { error: insertError } = await supabase
            .from('profiles')
            .insert([{
              id: authUser.user.id,
              email: email,
              role: 'project'
            }]);

          if (insertError) throw insertError;

          profile = { id: authUser.user.id };
        }
      } else if (profileError) {
        throw profileError;
      }

      if (profile) {
        // Vérifier si le projet existe déjà
        const { data: existingProject } = await supabase
          .from('projects')
          .select('id')
          .eq('owner_id', profile.id)
          .single();

        if (!existingProject) {
          // Créer le projet
          const { error: projectError } = await supabase
            .from('projects')
            .insert([{
              ...project,
              owner_id: profile.id
            }]);

          if (projectError) {
            console.error(`Erreur lors de la création du projet pour ${email}:`, projectError);
          }
        }
      }
    } catch (error) {
      console.error(`Erreur lors de l'initialisation pour ${email}:`, error);
    }
  }
};

// Fonctions helper pour les requêtes Supabase
export const getProject = async (id: string) => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data as Project;
};

export const getProjectByOwner = async (ownerId: string) => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('owner_id', ownerId)
    .single();

  if (error) throw error;
  return data as Project;
};

export const getProjectCollections = async (projectId: string) => {
  const { data, error } = await supabase
    .from('collections')
    .select('*')
    .eq('project_id', projectId);

  if (error) throw error;
  return data as Collection[];
};

export const getUserInvestments = async (userId: string) => {
  const { data, error } = await supabase
    .from('investments')
    .select(`
      *,
      projects (
        title,
        apy
      )
    `)
    .eq('user_id', userId);

  if (error) throw error;
  return data;
};

export const createProject = async (project: Omit<Project, 'id' | 'created_at' | 'progress'>) => {
  const { data, error } = await supabase
    .from('projects')
    .insert([{ ...project, progress: 0 }])
    .select()
    .single();

  if (error) throw error;
  return data as Project;
};

export const updateProject = async (id: string, updates: Partial<Project>) => {
  const { data, error } = await supabase
    .from('projects')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as Project;
};