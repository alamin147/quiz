import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ChildProfile {
  id: string;
  name: string;
  avatar: string;
  createdAt: Date;
  scenariosCompleted: number;
  lastActive: Date;
}

interface ProfileState {
  profiles: ChildProfile[];
  currentProfile: ChildProfile | null;
  addProfile: (profile: Omit<ChildProfile, 'id' | 'createdAt' | 'scenariosCompleted' | 'lastActive'>) => void;
  selectProfile: (profileId: string) => void;
  updateProfile: (profileId: string, updates: Partial<ChildProfile>) => void;
  deleteProfile: (profileId: string) => void;
}

export const useProfiles = create<ProfileState>()(
  persist(
    (set, get) => ({
      profiles: [],
      currentProfile: null,
      addProfile: (profileData) => {
        const newProfile: ChildProfile = {
          ...profileData,
          id: crypto.randomUUID(),
          createdAt: new Date(),
          scenariosCompleted: 0,
          lastActive: new Date(),
        };
        set((state) => ({
          profiles: [...state.profiles, newProfile],
        }));
      },
      selectProfile: (profileId) => {
        const profile = get().profiles.find(p => p.id === profileId);
        if (profile) {
          set({ currentProfile: profile });
          // Update last active
          get().updateProfile(profileId, { lastActive: new Date() });
        }
      },
      updateProfile: (profileId, updates) => {
        set((state) => ({
          profiles: state.profiles.map(p =>
            p.id === profileId ? { ...p, ...updates } : p
          ),
          currentProfile: state.currentProfile?.id === profileId
            ? { ...state.currentProfile, ...updates }
            : state.currentProfile
        }));
      },
      deleteProfile: (profileId) => {
        set((state) => ({
          profiles: state.profiles.filter(p => p.id !== profileId),
          currentProfile: state.currentProfile?.id === profileId ? null : state.currentProfile
        }));
      },
    }),
    {
      name: 'emostory-profiles',
    }
  )
);
