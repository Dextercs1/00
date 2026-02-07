import { useMemo } from 'react';
import { getToday, isConsecutiveDay } from '../utils/dateHelpers';

interface PreparedTea {
  recipeId: string;
  date: string;
  time: string;
}

/**
 * Hook that calculates streak information from the user's prepared teas history.
 *
 * - currentStreak: consecutive days ending with today (or yesterday if no tea today yet)
 * - longestStreak: the longest consecutive day streak ever achieved
 * - hasTeaToday: whether the user has prepared at least one tea today
 * - streakDates: array of date strings that form the current streak
 */
export function useStreak(preparedTeas: PreparedTea[]) {
  return useMemo(() => {
    if (!preparedTeas || preparedTeas.length === 0) {
      return {
        currentStreak: 0,
        longestStreak: 0,
        hasTeaToday: false,
        streakDates: [] as string[],
      };
    }

    // Extract unique dates and sort them in ascending order
    const uniqueDatesSet = new Set(preparedTeas.map((t) => t.date));
    const uniqueDates = Array.from(uniqueDatesSet).sort();

    const today = getToday();
    const hasTeaToday = uniqueDatesSet.has(today);

    // Build streak runs by walking through sorted unique dates
    let currentRun = 1;
    let longestStreak = 1;
    const streakRuns: string[][] = [[uniqueDates[0]]];

    for (let i = 1; i < uniqueDates.length; i++) {
      if (isConsecutiveDay(uniqueDates[i - 1], uniqueDates[i])) {
        currentRun++;
        streakRuns[streakRuns.length - 1].push(uniqueDates[i]);
      } else {
        currentRun = 1;
        streakRuns.push([uniqueDates[i]]);
      }
      if (currentRun > longestStreak) {
        longestStreak = currentRun;
      }
    }

    // Determine the current streak: must include today or yesterday
    let currentStreak = 0;
    let streakDates: string[] = [];

    const lastRun = streakRuns[streakRuns.length - 1];
    const lastDate = lastRun[lastRun.length - 1];

    if (lastDate === today) {
      // Streak is active and includes today
      currentStreak = lastRun.length;
      streakDates = [...lastRun];
    } else if (isConsecutiveDay(lastDate, today)) {
      // Last tea was yesterday; streak is still alive but user hasn't had tea today yet
      currentStreak = lastRun.length;
      streakDates = [...lastRun];
    } else {
      // Streak is broken — more than 1 day gap
      currentStreak = 0;
      streakDates = [];
    }

    return {
      currentStreak,
      longestStreak,
      hasTeaToday,
      streakDates,
    };
  }, [preparedTeas]);
}
