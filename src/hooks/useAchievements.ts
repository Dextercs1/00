import { useMemo, useCallback } from 'react';
import { achievements, Achievement } from '../data/achievements';
import { recipes } from '../data/recipes';
import type { UserData } from './useUserData';
import { getToday, isConsecutiveDay } from '../utils/dateHelpers';

/**
 * Computes the current streak length from prepared teas.
 */
function computeCurrentStreak(
  preparedTeas: { recipeId: string; date: string; time: string }[],
): number {
  if (preparedTeas.length === 0) return 0;

  const uniqueDates = Array.from(new Set(preparedTeas.map((t) => t.date))).sort();
  const today = getToday();
  const lastDate = uniqueDates[uniqueDates.length - 1];

  // If the last tea date is not today or yesterday, streak is 0
  if (lastDate !== today && !isConsecutiveDay(lastDate, today)) {
    return 0;
  }

  // Count backwards from the last date
  let streak = 1;
  for (let i = uniqueDates.length - 2; i >= 0; i--) {
    if (isConsecutiveDay(uniqueDates[i], uniqueDates[i + 1])) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

/**
 * Checks whether a single achievement's requirement is met given the user data.
 */
function isAchievementUnlocked(
  achievement: Achievement,
  userData: UserData,
): boolean {
  const { type, value, category } = achievement.requirement;
  const { preparedTeas } = userData;

  switch (type) {
    case 'first_tea':
      return preparedTeas.length >= value;

    case 'total_teas':
      return preparedTeas.length >= value;

    case 'streak': {
      const currentStreak = computeCurrentStreak(preparedTeas);
      return currentStreak >= value;
    }

    case 'challenge_complete': {
      // The 21-day challenge is complete when the user has teas on at least 21 distinct days
      const uniqueDays = new Set(preparedTeas.map((t) => t.date));
      return uniqueDays.size >= value;
    }

    case 'category_count': {
      if (!category) return false;
      // Count teas prepared from recipes that belong to the specified category
      const count = preparedTeas.filter((t) => {
        const recipe = recipes.find((r) => r.id === t.recipeId);
        return recipe?.category === category;
      }).length;
      return count >= value;
    }

    case 'recipes_tried': {
      const uniqueRecipes = new Set(preparedTeas.map((t) => t.recipeId));
      return uniqueRecipes.size >= value;
    }

    case 'early_bird': {
      // Check if the user has ever prepared a tea before 6:00 AM
      const earlyTeas = preparedTeas.filter((t) => {
        const hour = parseInt(t.time.split(':')[0], 10);
        return hour < 6;
      });
      return earlyTeas.length >= value;
    }

    default:
      return false;
  }
}

/**
 * Hook that checks all achievements against user data and returns:
 * - unlockedAchievements: all achievements the user has earned (requirement met)
 * - newAchievements: achievements that are unlocked but NOT yet in completedAchievements
 * - checkAndUnlock: function that returns IDs of newly unlocked achievements
 */
export function useAchievements(userData: UserData) {
  const unlockedAchievements = useMemo(() => {
    return achievements.filter((a) => isAchievementUnlocked(a, userData));
  }, [userData]);

  const newAchievements = useMemo(() => {
    return unlockedAchievements.filter(
      (a) => !userData.completedAchievements.includes(a.id),
    );
  }, [unlockedAchievements, userData.completedAchievements]);

  const checkAndUnlock = useCallback((): string[] => {
    return newAchievements.map((a) => a.id);
  }, [newAchievements]);

  return {
    unlockedAchievements,
    newAchievements,
    checkAndUnlock,
  };
}
