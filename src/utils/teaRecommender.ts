import { recipes, Recipe, Category } from '../data/recipes';
import { getTimeOfDay, getToday, getDaysSinceStart, getWeekDates } from './dateHelpers';

export interface WeeklyPlan {
  [day: string]: {
    manha: Recipe;
    tarde: Recipe;
    noite: Recipe;
  };
}

/**
 * Maps user goals to the recipe categories most relevant to that goal.
 */
const GOAL_CATEGORY_MAP: Record<string, Category[]> = {
  emagrecer: ['termogenico', 'detox', 'diuretico'],
  desinchar: ['diuretico', 'detox'],
  energia: ['energizante', 'termogenico'],
  dormir: ['relaxante'],
};

/**
 * Simple deterministic hash from a string, used to produce a stable
 * "random" seed from a date so the daily recommendation is consistent
 * throughout the day but varies from day to day.
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash + char) | 0;
  }
  return Math.abs(hash);
}

/**
 * Seeded pseudo-random number generator (simple LCG).
 * Returns a function that produces numbers between 0 and 1.
 */
function seededRandom(seed: number): () => number {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) & 0x7fffffff;
    return state / 0x7fffffff;
  };
}

/**
 * Checks if a recipe's bestTime is compatible with a given time slot.
 * 'qualquer' matches any slot.
 */
function isTimeSlotMatch(
  recipeBestTime: string,
  timeSlot: 'manha' | 'tarde' | 'noite',
): boolean {
  return recipeBestTime === timeSlot || recipeBestTime === 'qualquer';
}

/**
 * Checks if a recipe matches the user's goal based on its category.
 */
function isGoalMatch(recipe: Recipe, userGoal: string): boolean {
  const categories = GOAL_CATEGORY_MAP[userGoal];
  if (!categories) return false;
  return categories.includes(recipe.category);
}

/**
 * Filters recipes based on user restrictions, premium access, and optionally
 * a time slot.
 */
function filterRecipes(
  timeSlot: 'manha' | 'tarde' | 'noite' | null,
  userGoal: string,
  restrictions: string[],
  startDate: string,
): Recipe[] {
  const daysSinceStart = startDate ? getDaysSinceStart(startDate) : 1;

  return recipes.filter((recipe) => {
    // Filter out premium recipes if user hasn't reached the required unlock day
    if (recipe.premium) {
      const unlockDay = recipe.unlockDay ?? 7;
      if (daysSinceStart < unlockDay) return false;
    }

    // Filter out recipes that conflict with user restrictions
    // A recipe is excluded if any of the user's restrictions appear in the recipe's restrictions list
    if (restrictions.some((r) => recipe.restrictions.includes(r))) return false;

    // Filter by time slot if specified
    if (timeSlot && !isTimeSlotMatch(recipe.bestTime, timeSlot)) return false;

    return true;
  });
}

/**
 * Picks a recipe from a list using a deterministic seed.
 * Prioritizes recipes that match the user's goal.
 */
function pickRecipe(
  candidates: Recipe[],
  userGoal: string,
  seed: number,
): Recipe {
  if (candidates.length === 0) {
    // Absolute fallback: return the first recipe in the full list
    return recipes[0];
  }

  // Separate into goal-matching and non-goal-matching
  const goalMatching = candidates.filter((r) => isGoalMatch(r, userGoal));
  const others = candidates.filter((r) => !isGoalMatch(r, userGoal));

  const rand = seededRandom(seed);

  // 75% chance to pick a goal-matching recipe if available
  if (goalMatching.length > 0 && (others.length === 0 || rand() < 0.75)) {
    const index = Math.floor(rand() * goalMatching.length);
    return goalMatching[index];
  }

  if (others.length > 0) {
    const index = Math.floor(rand() * others.length);
    return others[index];
  }

  // Fallback (shouldn't reach here due to the guard above)
  return candidates[0];
}

/**
 * Recommends a daily tea based on the current time of day, user goal,
 * user restrictions, and a date-based seed for daily variation.
 */
export function getDailyTea(
  userGoal: string,
  restrictions: string[],
  startDate: string,
): Recipe {
  const timeOfDay = getTimeOfDay();
  return getTeaForTimeSlot(timeOfDay, userGoal, restrictions, startDate);
}

/**
 * Returns a recommended tea for a specific time slot.
 */
export function getTeaForTimeSlot(
  timeSlot: 'manha' | 'tarde' | 'noite',
  userGoal: string,
  restrictions: string[],
  startDate: string,
): Recipe {
  const today = getToday();
  const candidates = filterRecipes(timeSlot, userGoal, restrictions, startDate);
  const seed = hashString(`${today}-${timeSlot}-${userGoal}`);
  return pickRecipe(candidates, userGoal, seed);
}

/**
 * Generates a weekly plan with 3 teas per day (manha, tarde, noite)
 * for the 7 days of the current week (Monday through Sunday).
 * Uses deterministic seeding so the plan is stable for the same week.
 */
export function generateWeeklyPlan(
  userGoal: string,
  restrictions: string[],
  startDate: string,
): WeeklyPlan {
  const weekDates = getWeekDates();
  const plan: WeeklyPlan = {};

  const timeSlots: ('manha' | 'tarde' | 'noite')[] = ['manha', 'tarde', 'noite'];

  for (const date of weekDates) {
    plan[date] = {} as WeeklyPlan[string];

    for (const slot of timeSlots) {
      const candidates = filterRecipes(slot, userGoal, restrictions, startDate);
      const seed = hashString(`${date}-${slot}-${userGoal}-weekly`);
      plan[date][slot] = pickRecipe(candidates, userGoal, seed);
    }
  }

  return plan;
}
