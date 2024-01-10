import {
  Activity,
  DayWithEntries,
  EntryWithActivity,
  Goal,
  WeeklyEntry,
} from './api-interface';

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
  thursdayHours: '09:00:00',
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
  activityName: 'first activity: get up early every day',
  targeting: true,
  weighting: 3,
};

const activity2: Activity = {
  activityId: 2,
  goalId: 0,
  activityName: 'second activity: brush my teeth',
  targeting: false,
  weighting: 3,
};

const activity3: Activity = {
  activityId: 3,
  goalId: 0,
  activityName: 'third activity: eat 3 meals a day',
  targeting: false,
  weighting: 5,
};

const activity4: Activity = {
  activityId: 4,
  goalId: 0,
  activityName: 'fourth activity: remind Junayed everything',
  targeting: true,
  weighting: 5,
};

export const goal1: Goal = {
  goalId: 0,
  goalName: 'first goal',
  activities: [activity1, activity2],
};

export const goal2: Goal = {
  goalId: 1,
  goalName: 'second goal',
  activities: [activity3, activity4],
};

export const goalsTest: Goal[] = [goal1, goal2];

export const entryWithActivity1: EntryWithActivity = {
  activityName: 'first entry',
  taskDescription: 'first desc',
  hoursSpent: '1:00:00',
  startTime: '17:05:00',
  endTime: '18:05:00',
};

export const entryWithActivity2: EntryWithActivity = {
  activityName: 'second entry',
  taskDescription: 'second desc',
  hoursSpent: '1:00:00',
  startTime: '17:05:00',
  endTime: '18:05:00',
};

export const entryWithActivity3: EntryWithActivity = {
  activityName: 'third entry',
  taskDescription: 'third desc',
  hoursSpent: '1:00:00',
  startTime: '17:05:00',
  endTime: '18:05:00',
};

export const entryWithActivity4: EntryWithActivity = {
  activityName: 'fourth entry',
  taskDescription: 'fourth desc',
  hoursSpent: '1:00:00',
  startTime: '17:05:00',
  endTime: '18:05:00',
};

export const day1: DayWithEntries = {
  date: '2024-01-01',
  entries: [entryWithActivity1, entryWithActivity2],
};

export const day2: DayWithEntries = {
  date: '2023-12-01',
  entries: [entryWithActivity3, entryWithActivity4],
};

export const daysTest: DayWithEntries[] = [day1, day2];
