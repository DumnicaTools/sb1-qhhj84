import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { initializeTestProjects } from '../lib/supabase';

interface User {
  id: string;
  email: string;
  role: 'investor' | 'project';
  metadata?: {
    name?: string;
    company?: string;
  };
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string, role: 'investor' | 'project') => Promise<void>;
  signUp: (email: string, password: string, role: 'investor' | 'project') => Promise<void>;
  signOut: () => Promise<void>;
  checkSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,

  checkSession: async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role, email')
          .eq('id', session.user.id)
          .single();

        if (profile) {
          set({
            user: {
              id: session.user.id,
              email: profile.email,
              role: profile.role,
              metadata: session.user.user_metadata,
            },
          });

          // Initialiser les projets de test si nécessaire
          if (profile.role === 'project') {
            await initializeTestProjects();
          }
        }
      }
    } catch (error) {
      console.error('Session check error:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  signIn: async (email: string, password: string, role: 'investor' | 'project') => {
    try {
      const { data: { user: authUser }, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;
      if (!authUser) throw new Error('Utilisateur non trouvé');

      // Vérifier si le profil existe
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role, email')
        .eq('id', authUser.id)
        .single();

      // Si le profil n'existe pas, le créer
      if (profileError && profileError.code === 'PGRST116') {
        const { error: insertError } = await supabase
          .from('profiles')
          .insert([{
            id: authUser.id,
            email: authUser.email,
            role: role,
          }]);

        if (insertError) throw insertError;

        set({
          user: {
            id: authUser.id,
            email: authUser.email!,
            role: role,
            metadata: authUser.user_metadata,
          },
        });
      } else if (profileError) {
        throw profileError;
      } else {
        // Vérifier si le rôle correspond
        if (profile.role !== role) {
          throw new Error(`Ce compte est un compte ${profile.role}. Veuillez utiliser l'espace ${profile.role} pour vous connecter.`);
        }

        set({
          user: {
            id: authUser.id,
            email: profile.email,
            role: profile.role,
            metadata: authUser.user_metadata,
          },
        });
      }

      // Initialiser les projets de test si c'est un compte projet
      if (role === 'project') {
        await initializeTestProjects();
      }
    } catch (error: any) {
      console.error('Erreur dans signIn:', error);
      throw error;
    }
  },

  signUp: async (email: string, password: string, role: 'investor' | 'project') => {
    try {
      const { data: { user: authUser }, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) throw signUpError;
      if (!authUser) throw new Error("L'inscription a échoué");

      // Créer le profil immédiatement après l'inscription
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{
          id: authUser.id,
          email: authUser.email,
          role: role,
        }]);

      if (profileError) {
        console.error('Erreur création profil:', profileError);
        throw new Error("Erreur lors de la création du profil");
      }

      set({
        user: {
          id: authUser.id,
          email: authUser.email!,
          role: role,
          metadata: authUser.user_metadata,
        },
      });

      // Initialiser les projets de test si c'est un compte projet
      if (role === 'project') {
        await initializeTestProjects();
      }
    } catch (error: any) {
      console.error('Erreur complète:', error);
      if (error.message === 'User already registered') {
        throw new Error('Un compte existe déjà avec cet email');
      }
      throw error;
    }
  },

  signOut: async () => {
    try {
      await supabase.auth.signOut();
      set({ user: null });
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      throw new Error('Erreur lors de la déconnexion');
    }
  },
}));