import { useState, useCallback } from 'react';
import { getItem, setItem, removeItem } from '../utils/storage';
import { getToday } from '../utils/dateHelpers';

export interface UserData {
  onboardingComplete: boolean;
  goal: string; // 'emagrecer' | 'desinchar' | 'energia' | 'dormir'
  prepTime: string; // '5' | '10' | 'sem_pressa'
  restrictions: string[]; // ['cafeina', 'gestante'] or []
  startDate: string; // when user first completed onboarding
  favorites: string[]; // recipe IDs
  preparedTeas: { recipeId: string; date: string; time: string }[];
  completedAchievements: string[]; // achievement IDs
  weeklyPlanSwaps: { [dateAndSlot: string]: string }; // custom recipe swaps in weekly plan
  level: number; // calculated from total teas
  seenRecipes: string[]; // recipe IDs the user has viewed
}

const STORAGE_KEY = 'user_data';

const DEFAULT_USER_DATA: UserData = {
  onboardingComplete: false,
  goal: '',
  prepTime: '5',
  restrictions: [],
  startDate: '',
  favorites: [],
  preparedTeas: [],
  completedAchievements: [],
  weeklyPlanSwaps: {},
  level: 1,
  seenRecipes: [],
};

/**
 * Calculates the user level based on the total number of teas prepared.
 * Every 5 teas = 1 level up, starting at level 1.
 */
function calculateLevel(totalTeas: number): number {
  return Math.max(1, Math.floor(totalTeas / 5) + 1);
}

export function useUserData() {
  const [userData, setUserData] = useState<UserData>(() => {
    const stored = getItem<UserData>(STORAGE_KEY, DEFAULT_USER_DATA);
    // Recalculate level from prepared teas to keep it in sync
    return {
      ...DEFAULT_USER_DATA,
      ...stored,
      level: calculateLevel(stored.preparedTeas?.length ?? 0),
    };
  });

  /**
   * Merges a partial update into the current user data.
   */
  const updateUserData = useCallback(
    (partial: Partial<UserData>) => {
      setUserData((prev) => {
        const updated = { ...prev, ...partial };
        // Recalculate level whenever preparedTeas changes
        if (partial.preparedTeas !== undefined) {
          updated.level = calculateLevel(updated.preparedTeas.length);
        }
        setItem(STORAGE_KEY, updated);
        return updated;
      });
    },
    [],
  );

  /**
   * Toggles a recipe as favorite (add if missing, remove if present).
   */
  const toggleFavorite = useCallback(
    (recipeId: string) => {
      setUserData((prev) => {
        const isFav = prev.favorites.includes(recipeId);
        const favorites = isFav
          ? prev.favorites.filter((id) => id !== recipeId)
          : [...prev.favorites, recipeId];
        const updated = { ...prev, favorites };
        setItem(STORAGE_KEY, updated);
        return updated;
      });
    },
    [],
  );

  /**
   * Records that the user prepared a tea right now.
   * Dispatches a custom event so other parts of the app can react.
   */
  const markTeaPrepared = useCallback(
    (recipeId: string) => {
      setUserData((prev) => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const entry = {
          recipeId,
          date: getToday(),
          time: `${hours}:${minutes}`,
        };
        const preparedTeas = [...prev.preparedTeas, entry];
        const level = calculateLevel(preparedTeas.length);
        const updated = { ...prev, preparedTeas, level };
        setItem(STORAGE_KEY, updated);
        return updated;
      });
      window.dispatchEvent(new CustomEvent('tea-prepared'));
    },
    [],
  );

  /**
   * Marks an achievement as completed (no-op if already completed).
   * Dispatches a custom event to trigger confetti or other visual effects.
   */
  const completeAchievement = useCallback(
    (achievementId: string) => {
      setUserData((prev) => {
        if (prev.completedAchievements.includes(achievementId)) return prev;
        const completedAchievements = [...prev.completedAchievements, achievementId];
        const updated = { ...prev, completedAchievements };
        setItem(STORAGE_KEY, updated);
        return updated;
      });
      window.dispatchEvent(new CustomEvent('achievement-unlocked'));
    },
    [],
  );

  /**
   * Marks a recipe as seen/viewed by the user.
   */
  const markRecipeSeen = useCallback(
    (recipeId: string) => {
      setUserData((prev) => {
        if (prev.seenRecipes.includes(recipeId)) return prev;
        const seenRecipes = [...prev.seenRecipes, recipeId];
        const updated = { ...prev, seenRecipes };
        setItem(STORAGE_KEY, updated);
        return updated;
      });
    },
    [],
  );

  /**
   * Swaps a recipe in the weekly plan for a specific date and time slot.
   * dateAndSlot format: "YYYY-MM-DD-manha" | "YYYY-MM-DD-tarde" | "YYYY-MM-DD-noite"
   */
  const swapPlanRecipe = useCallback(
    (dateAndSlot: string, recipeId: string) => {
      setUserData((prev) => {
        const weeklyPlanSwaps = { ...prev.weeklyPlanSwaps, [dateAndSlot]: recipeId };
        const updated = { ...prev, weeklyPlanSwaps };
        setItem(STORAGE_KEY, updated);
        return updated;
      });
    },
    [],
  );

  /**
   * Resets all user data back to defaults and clears localStorage.
   */
  const resetData = useCallback(() => {
    removeItem(STORAGE_KEY);
    setUserData({ ...DEFAULT_USER_DATA });
  }, []);

  /**
   * Checks if a given recipe is in the user's favorites.
   */
  const isFavorite = useCallback(
    (recipeId: string) => {
      return userData.favorites.includes(recipeId);
    },
    [userData.favorites],
  );

  return {
    userData,
    updateUserData,
    toggleFavorite,
    markTeaPrepared,
    completeAchievement,
    markRecipeSeen,
    swapPlanRecipe,
    resetData,
    isFavorite,
  };
}
