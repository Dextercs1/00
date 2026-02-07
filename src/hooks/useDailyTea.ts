import { useMemo } from 'react';
import { getTimeOfDay } from '../utils/dateHelpers';
import { getDailyTea, getTeaForTimeSlot } from '../utils/teaRecommender';
import type { Recipe } from '../data/recipes';
import type { UserData } from './useUserData';

/**
 * Hook that provides the daily recommended teas for each time slot,
 * the current time of day, and an appropriate Portuguese greeting.
 *
 * Uses useMemo to avoid recalculating recommendations on every render.
 * Recalculates when the user's goal, restrictions, or startDate changes.
 */
export function useDailyTea(userData: UserData) {
  const timeOfDay = getTimeOfDay();

  const greeting = useMemo((): string => {
    switch (timeOfDay) {
      case 'manha':
        return 'Bom dia!';
      case 'tarde':
        return 'Boa tarde!';
      case 'noite':
        return 'Boa noite!';
    }
  }, [timeOfDay]);

  const dailyTea = useMemo((): Recipe => {
    return getDailyTea(userData.goal, userData.restrictions, userData.startDate);
  }, [userData.goal, userData.restrictions, userData.startDate]);

  const morningTea = useMemo((): Recipe => {
    return getTeaForTimeSlot('manha', userData.goal, userData.restrictions, userData.startDate);
  }, [userData.goal, userData.restrictions, userData.startDate]);

  const afternoonTea = useMemo((): Recipe => {
    return getTeaForTimeSlot('tarde', userData.goal, userData.restrictions, userData.startDate);
  }, [userData.goal, userData.restrictions, userData.startDate]);

  const nightTea = useMemo((): Recipe => {
    return getTeaForTimeSlot('noite', userData.goal, userData.restrictions, userData.startDate);
  }, [userData.goal, userData.restrictions, userData.startDate]);

  return {
    dailyTea,
    morningTea,
    afternoonTea,
    nightTea,
    timeOfDay,
    greeting,
  };
}
