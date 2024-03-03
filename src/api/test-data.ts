import {
  Activity,
  DayWithExpandedEntries,
  Entry,
  ExpandedEntry,
  Goal,
  GoalWithActivities,
  WeeklyEntry,
} from './api-interface';
import TimeSpent from './TimeSpent';

const goal1: Goal = {
  goalId: 0,
  goalName: 'First goal: do good things',
};

const goal2: Goal = {
  goalId: 1,
  goalName: "Second goal: don't do bad things",
};

const activity1: Activity = {
  activityId: 0,
  goalId: 0,
  activityName: 'first activity: get up early every day',
  targeting: true,
  weighting: 3,
  target: new TimeSpent(0),
};

const activity2: Activity = {
  activityId: 1,
  goalId: 0,
  activityName: 'second activity: brush my teeth',
  targeting: false,
  weighting: 3,
  target: new TimeSpent(0),
};

const activity3: Activity = {
  activityId: 2,
  goalId: 1,
  activityName: 'third activity: resist Mr. Jack',
  targeting: false,
  weighting: 5,
  target: new TimeSpent(0),
};

const activity4: Activity = {
  activityId: 3,
  goalId: 1,
  activityName: 'fourth activity: resist tim tams',
  targeting: true,
  weighting: 5,
  target: new TimeSpent(0),
};

const entry1: Entry = {
  entryId: 0,
  date: new Date('2023-12-27'),
  activityId: 0,
  taskDescription: 'got up pretty early',
  timeSpent: new TimeSpent(120),
  startTime: null,
  endTime: null,
};

const entry2: Entry = {
  entryId: 1,
  date: new Date('2023-12-27'),
  activityId: 1,
  taskDescription: 'brushed teeth',
  timeSpent: new TimeSpent(5),
  startTime: null,
  endTime: null,
};

const entry3: Entry = {
  entryId: 2,
  date: new Date('2023-12-28'),
  activityId: 2,
  taskDescription: 'resisted mr jack',
  timeSpent: new TimeSpent(5),
  startTime: null,
  endTime: null,
};

const entry4: Entry = {
  entryId: 3,
  date: new Date('2023-12-28'),
  activityId: 3,
  taskDescription: 'resisted tim tams',
  timeSpent: new TimeSpent(5),
  startTime: null,
  endTime: null,
};

const entry5: Entry = {
  entryId: 4,
  date: new Date('2023-12-29'),
  activityId: 0,
  taskDescription: 'got up pretty early',
  timeSpent: new TimeSpent(120),
  startTime: null,
  endTime: null,
};

const entry6: Entry = {
  entryId: 5,
  date: new Date('2023-12-29'),
  activityId: 1,
  taskDescription: 'took a little while to brush teeth',
  timeSpent: new TimeSpent(12),
  startTime: null,
  endTime: null,
};

const entry7: Entry = {
  entryId: 6,
  date: new Date('2023-12-30'),
  activityId: 2,
  taskDescription: 'resisted jack again, harder this time',
  timeSpent: new TimeSpent(300),
  startTime: null,
  endTime: null,
};

const entry8: Entry = {
  entryId: 7,
  date: new Date('2023-12-30'),
  activityId: 3,
  taskDescription: 'resisted tim tams',
  timeSpent: new TimeSpent(72),
  startTime: null,
  endTime: null,
};

const goalWithActivities1: GoalWithActivities = {
  goal: goal1,
  activities: [activity1, activity2],
};

const goalWithActivities2: GoalWithActivities = {
  goal: goal2,
  activities: [activity3, activity4],
};

const weeklyEntry1: WeeklyEntry = {
  goalName: 'Weekly Entry 1 goal',
  activity: activity1,

  mondayTime: new TimeSpent(0),
  tuesdayTime: new TimeSpent(15),
  wednesdayTime: new TimeSpent(20),
  thursdayTime: new TimeSpent(0),
  fridayTime: new TimeSpent(10 * 60 + 20),
  saturdayTime: new TimeSpent(0),
  sundayTime: new TimeSpent(20 * 60),
};

const weeklyEntry2: WeeklyEntry = {
  goalName: 'Weekly Entry 2 goal',
  activity: activity2,

  mondayTime: new TimeSpent(9 * 60),
  tuesdayTime: new TimeSpent(10 * 60),
  wednesdayTime: new TimeSpent(20),
  thursdayTime: new TimeSpent(0),
  fridayTime: new TimeSpent(10 * 60 + 20),
  saturdayTime: new TimeSpent(0),
  sundayTime: new TimeSpent(15),
};

const weeklyEntry3: WeeklyEntry = {
  goalName: 'Weekly Entry 3 goal',
  activity: activity3,

  mondayTime: new TimeSpent(24),
  tuesdayTime: new TimeSpent(7),
  wednesdayTime: new TimeSpent(14),
  thursdayTime: new TimeSpent(0),
  fridayTime: new TimeSpent(10 * 60 + 20),
  saturdayTime: new TimeSpent(0),
  sundayTime: new TimeSpent(0),
};

const weeklyEntry4: WeeklyEntry = {
  goalName: 'Weekly Entry 4 goal',
  activity: activity4,

  mondayTime: new TimeSpent(0),
  tuesdayTime: new TimeSpent(0),
  wednesdayTime: new TimeSpent(0),
  thursdayTime: new TimeSpent(0),
  fridayTime: new TimeSpent(0),
  saturdayTime: new TimeSpent(0),
  sundayTime: new TimeSpent(0),
};

const expandedEntry1: ExpandedEntry = {
  goalName: 'expanded entry 1 goal',
  goalId: goal1.goalId,
  activityName: 'expanded entry 1 activity',
  entry: entry1,
};

const expandedEntry2: ExpandedEntry = {
  goalName: 'expanded entry 2 goal',
  goalId: goal1.goalId,
  activityName: 'expanded entry 2 activity',
  entry: entry2,
};

const expandedEntry3: ExpandedEntry = {
  goalName: 'expanded entry 3 goal',
  goalId: goal1.goalId,
  activityName: 'expanded entry 3 activity',
  entry: entry3,
};

const expandedEntry4: ExpandedEntry = {
  goalName: 'expanded entry 4 goal',
  goalId: goal1.goalId,
  activityName: 'expanded entry 4 activity',
  entry: entry4,
};

const expandedEntry5: ExpandedEntry = {
  goalName: 'expanded entry 5 goal',
  goalId: goal2.goalId,
  activityName: 'expanded entry 5 activity',
  entry: entry5,
};

const expandedEntry6: ExpandedEntry = {
  goalName: 'expanded entry 6 goal',
  goalId: goal2.goalId,
  activityName: 'expanded entry 6 activity',
  entry: entry6,
};

const expandedEntry7: ExpandedEntry = {
  goalName: 'expanded entry 7 goal',
  goalId: goal2.goalId,
  activityName: 'expanded entry 7 activity',
  entry: entry7,
};

const expandedEntry8: ExpandedEntry = {
  goalName: 'expanded entry 8 goal',
  goalId: goal2.goalId,
  activityName: 'expanded entry 8 activity',
  entry: entry8,
};

const day1: DayWithExpandedEntries = {
  date: new Date('2023-12-27'),
  expandedEntries: [expandedEntry1, expandedEntry2],
};

const day2: DayWithExpandedEntries = {
  date: new Date('2023-12-28'),
  expandedEntries: [expandedEntry3, expandedEntry4],
};

const day3: DayWithExpandedEntries = {
  date: new Date('2023-12-29'),
  expandedEntries: [expandedEntry5, expandedEntry6],
};

const day4: DayWithExpandedEntries = {
  date: new Date('2023-12-30'),
  expandedEntries: [expandedEntry7, expandedEntry8],
};

export const weeklyEntriesTestData: WeeklyEntry[] = [
  weeklyEntry1,
  weeklyEntry2,
  weeklyEntry3,
  weeklyEntry4,
];

export const daysTestData: DayWithExpandedEntries[] = [day1, day2, day3, day4];

export const goalsWithActivitiesTestData: GoalWithActivities[] = [
  goalWithActivities1,
  goalWithActivities2,
];
