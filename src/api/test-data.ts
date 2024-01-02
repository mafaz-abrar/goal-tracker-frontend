import { Activity, Goal, WeeklyEntry } from './api-interface';

const weeklyEntry1: WeeklyEntry = {
  activityId: 1,
  activityName: 'Do 100 pushups',
  goalId: 1,
  goalName: 'Achieve an ideal body shape',
  targeting: false,
  weighting: 0,

  mondayHours: '00:00:00',
  tuesdayHours: '00:15:20',
  wednesdayHours: '00:20:15',
  thursdayHours: '09:00:00',
  fridayHours: '10:20:00',
  saturdayHours: '00:30:00',
  sundayHours: '20:00:00',
};

const weeklyEntry2: WeeklyEntry = {
  activityId: 1,
  activityName: 'Gave in to Mr. Jack',
  goalId: 1,
  goalName:
    'Keep track of my failures lorem ipsum dolor eta lorem ipsum huh lorem ipsum bug test lorem ipsum',
  targeting: true,
  weighting: 1,

  mondayHours: '20:00:00',
  tuesdayHours: '00:30:00',
  wednesdayHours: '10:45:00',
  thursdayHours: '45:00:20',
  fridayHours: '09:10:00',
  saturdayHours: '',
  sundayHours: '',
};

const weeklyEntry3: WeeklyEntry = {
  activityId: 1,
  activityName:
    'Do 300 pushups in a day, then do 300 more pushups in the same day',
  goalId: 1,
  goalName: 'Achieve an ideal body shape',
  targeting: true,
  weighting: -1,

  mondayHours: '00:00:00',
  tuesdayHours: '',
  wednesdayHours: null,
  thursdayHours: '09:00:00',
  fridayHours: null,
  saturdayHours: '00:30:00',
  sundayHours: '20:00:00',
};

export const weeklyEntriesTestData: WeeklyEntry[] = [
  weeklyEntry1,
  weeklyEntry2,
  weeklyEntry3,
];

const activity1: Activity = {
  activityId: 1,
  goalId: 0,
  activityName: 'first activity',
  targeting: true,
  weighting: 3,
};

const activity2: Activity = {
  activityId: 1,
  goalId: 0,
  activityName: 'first activity',
  targeting: false,
  weighting: 3,
};

export const goalTest: Goal = {
  goalId: 0,
  goalName: 'first goal',
  activities: [activity1, activity2],
};

export const goalsTest: Goal[] = [goalTest, goalTest];
