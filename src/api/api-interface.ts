import camelcaseKeysDeep from 'camelcase-keys-deep';
import dayjs from 'dayjs';
import TimeSpent from './TimeSpent';
import { API_SERVER } from './config';

/**
 * We have a core problem with the data structures in this API.
 *
 * Looking at the answers in
 * https://stackoverflow.com/questions/45339065/typescript-empty-object-for-a-typed-variable, we can
 * see that the goal of adding types is to aid documentation.
 *
 * Our problem lies in that we are trying to say two conflicting things with these data structures.
 * 1. An (e.g.) Entry MUST have the properties X, Y etc. The reasoning behind this decision makes
 *    sense, a fully defined entry must have an activity Id, task description etc.
 * 2. However, we are also passing around an entry object as we build up this object. E.g. from the
 *    weekly entry screen, we populate some properties, then in the dialog we populate the rest. So,
 *    potentially all the properties for this type may be null.
 *
 *    In this case, we should really have created two data structures. One would be a complete
 *    entry, where some properties are nullable only because we explicitly say they are nullable in
 *    the complete type (e.g. startTime), while others MUST be included.
 *
 *    The second type would be a simpler type where everything is nullable, because it allows us to
 *    build up the type as we go along.
 */

export type Goal = {
  goalId: number;
  goalName: string;
};

export type Activity = {
  activityId: number;
  goalId: number;
  activityName: string;
  targeting: boolean;
  weighting: number;
};

type SimpleEntry = {
  entryId: number;
  date: string;
  activityId: number;
  taskDescription: string;
  timeSpent: number;
  startTime: string | null;
  endTime: string | null;
};

export type Entry = {
  entryId: number;
  date: Date;
  activityId: number;
  taskDescription: string;
  timeSpent: TimeSpent;
  startTime: Date | null;
  endTime: Date | null;
};

export type GoalWithActivities = {
  goal: Goal;
  activities: Activity[];
};

type SimpleExpandedEntry = {
  goalName: string;
  activityName: string;
  entry: SimpleEntry;
};

export type ExpandedEntry = {
  goalName: string;
  goalId: number;
  activityName: string;
  entry: Entry;
};

type SimpleDayWithExpandedEntries = {
  date: string;
  expandedEntries: SimpleExpandedEntry[];
};

export type DayWithExpandedEntries = {
  date: Date; // Included for ease of access by developer.
  expandedEntries: ExpandedEntry[];
};

type SimpleWeeklyEntry = {
  goalName: string;
  activity: Activity;

  mondayTime: number;
  tuesdayTime: number;
  wednesdayTime: number;
  thursdayTime: number;
  fridayTime: number;
  saturdayTime: number;
  sundayTime: number;
};

export type WeeklyEntry = {
  goalName: string;
  activity: Activity;

  mondayTime: TimeSpent;
  tuesdayTime: TimeSpent;
  wednesdayTime: TimeSpent;
  thursdayTime: TimeSpent;
  fridayTime: TimeSpent;
  saturdayTime: TimeSpent;
  sundayTime: TimeSpent;
};

export function getDateObjectFromTimeString(
  timeString: string,
  date: Date
): Date {
  const elements = timeString.split(':');
  const hours = elements[0];
  const minutes = elements[1];
  const seconds = elements[2];

  return dayjs(date)
    .set('hour', +hours)
    .set('minute', +minutes)
    .set('second', +seconds)
    .toDate();
}

export async function getWeeklyEntriesForDate(
  date: Date
): Promise<WeeklyEntry[]> {
  const response = await fetch(
    `http://goal-tracker-backend/api/main_report.php?filter_date=${dayjs(
      date
    ).format('YYYY-MM-DD')}`
  );

  const data = camelcaseKeysDeep(await response.json());

  const returnVal = data.map((weeklyEntry: SimpleWeeklyEntry) => {
    return {
      goalName: weeklyEntry.goalName,
      activity: weeklyEntry.activity,
      mondayTime: new TimeSpent(weeklyEntry.mondayTime),
      tuesdayTime: new TimeSpent(weeklyEntry.tuesdayTime),
      wednesdayTime: new TimeSpent(weeklyEntry.wednesdayTime),
      thursdayTime: new TimeSpent(weeklyEntry.thursdayTime),
      fridayTime: new TimeSpent(weeklyEntry.fridayTime),
      saturdayTime: new TimeSpent(weeklyEntry.saturdayTime),
      sundayTime: new TimeSpent(weeklyEntry.sundayTime),
    };
  });

  return returnVal;
}

export async function getAllGoalsAndActivities(): Promise<
  GoalWithActivities[]
> {
  const response = await fetch(
    'http://goal-tracker-backend/api/goals_with_activities.php'
  );
  return camelcaseKeysDeep(await response.json());
}

export async function getAllEntries(): Promise<DayWithExpandedEntries[]> {
  const response = await fetch(
    `http://goal-tracker-backend/api/all_entries.php`
  );

  const data = camelcaseKeysDeep(await response.json());

  const returnVal = data.map(
    (dayWithExpandedEntry: SimpleDayWithExpandedEntries) => {
      const processedEntries = dayWithExpandedEntry.expandedEntries.map(
        (expandedEntry: SimpleExpandedEntry) => {
          return {
            goalName: expandedEntry.goalName,
            activityName: expandedEntry.activityName,
            entry: {
              entryId: expandedEntry.entry.entryId,
              date: new Date(expandedEntry.entry.date),
              activityId: expandedEntry.entry.activityId,
              taskDescription: expandedEntry.entry.taskDescription,
              timeSpent: new TimeSpent(expandedEntry.entry.timeSpent / 60),
              startTime: expandedEntry.entry.startTime
                ? new Date(expandedEntry.entry.startTime)
                : null,
              endTime: expandedEntry.entry.endTime
                ? new Date(expandedEntry.entry.endTime)
                : null,
            },
          };
        }
      );

      return {
        date: new Date(dayWithExpandedEntry.date),
        expandedEntries: processedEntries,
      };
    }
  );

  return returnVal;
}

export async function getAllEntriesForDate(date: Date): Promise<Entry[]> {
  const response = await fetch(
    new URL(
      API_SERVER,
      `/api/get_all_entries_for_date.php?date=${dayjs(date).format(
        'YYYY-MM-DD'
      )}`
    ).href
  );
  return camelcaseKeysDeep(await response.json());
}

export async function getAllEntriesForWeek(
  date: Date
): Promise<DayWithExpandedEntries[]> {
  const response = await fetch(
    `http://goal-tracker-backend/api/all_entries_for_week?filter_date=${dayjs(
      date
    ).format('YYYY-MM-DD')}`
  );

  const data = camelcaseKeysDeep(await response.json());

  const returnVal = data.map(
    (dayWithExpandedEntry: SimpleDayWithExpandedEntries) => {
      const processedEntries = dayWithExpandedEntry.expandedEntries.map(
        (expandedEntry: SimpleExpandedEntry) => {
          return {
            goalName: expandedEntry.goalName,
            activityName: expandedEntry.activityName,
            entry: {
              entryId: expandedEntry.entry.entryId,
              date: new Date(expandedEntry.entry.date),
              activityId: expandedEntry.entry.activityId,
              taskDescription: expandedEntry.entry.taskDescription,
              timeSpent: new TimeSpent(expandedEntry.entry.timeSpent / 60),
              startTime: expandedEntry.entry.startTime
                ? getDateObjectFromTimeString(
                    expandedEntry.entry.startTime,
                    new Date(expandedEntry.entry.date)
                  )
                : null,
              endTime: expandedEntry.entry.endTime
                ? getDateObjectFromTimeString(
                    expandedEntry.entry.endTime,
                    new Date(expandedEntry.entry.date)
                  )
                : null,
            },
          };
        }
      );

      return {
        date: new Date(dayWithExpandedEntry.date),
        expandedEntries: processedEntries,
      };
    }
  );

  return returnVal;
}

export async function getAllEntriesForActivity(
  activityId: number
): Promise<Entry[]> {
  const response = await fetch(
    new URL(
      API_SERVER,
      `/api/get_all_entries_for_activity.php?activity_id=${activityId}`
    ).href
  );
  return camelcaseKeysDeep(await response.json());
}

export async function addNewActivity(activity: Activity) {
  const formData = new FormData();

  formData.append('goal_id', activity.goalId.toString());
  formData.append('activity_name', activity.activityName);
  formData.append('targeting', activity.targeting.toString());
  formData.append('weighting', activity.weighting.toString());

  const response = await fetch(
    `http://goal-tracker-backend/api/activity_process.php?mode=add`,
    {
      method: 'POST',
      body: formData,
    }
  );

  return await camelcaseKeysDeep(response.json());
}

export async function updateActivity(activity: Activity) {
  const formData = new FormData();

  formData.append('activity_id', activity.activityId.toString());
  formData.append('goal_id', activity.goalId.toString());
  formData.append('activity_name', activity.activityName);
  formData.append('targeting', activity.targeting.toString());
  formData.append('weighting', activity.weighting.toString());

  const response = await fetch(
    `http://goal-tracker-backend/api/activity_process.php?mode=edit`,
    {
      method: 'POST',
      body: formData,
    }
  );

  return await camelcaseKeysDeep(response.json());
}

export async function addNewGoal(goal: Goal) {
  const formData = new FormData();

  formData.append('goal_name', goal.goalName);

  const response = await fetch(
    `http://goal-tracker-backend/api/goal_process.php?mode=add`,
    {
      method: 'POST',
      body: formData,
    }
  );

  return await camelcaseKeysDeep(response.json());
}

export async function updateGoal(goal: Goal) {
  const formData = new FormData();

  formData.append('goal_id', goal.goalId.toString());
  formData.append('goal_name', goal.goalName);

  const response = await fetch(
    `http://goal-tracker-backend/api/goal_process.php?mode=edit`,
    {
      method: 'POST',
      body: formData,
    }
  );

  return await camelcaseKeysDeep(response.json());
}

export async function deleteEntry(entryId: number) {
  const formData = new FormData();
  formData.append('entry_id', entryId.toString());

  const response = await fetch(
    `http://goal-tracker-backend/api/entry_process.php?mode=delete`,
    {
      method: 'POST',
      body: formData,
    }
  );

  return await response.json();
}

export async function flipTargeting(activityId: number) {
  const formData = new FormData();
  formData.append('activity_id', activityId.toString());

  const response = await fetch(
    `http://goal-tracker-backend/api/flip_targeting.php`,
    {
      method: 'POST',
      body: formData,
    }
  );

  return response.json();
}

export async function getAllActivities() {
  const response = await fetch(
    `http://goal-tracker-backend/api/all_activities.php`
  );

  return camelcaseKeysDeep(await response.json());
}

export async function getAllGoals(): Promise<Goal[]> {
  const response = await fetch(`http://goal-tracker-backend/api/all_goals.php`);

  return camelcaseKeysDeep(await response.json());
}

export async function getAllActivitiesForGoalId(goalId: number) {
  const response = await fetch(
    `http://goal-tracker-backend/api/all_activities_for_goal.php?goal_id=${goalId}`
  );

  return camelcaseKeysDeep(await response.json());
}

export async function addNewEntry(entry: Entry) {
  const formData = new FormData();

  formData.append('activity_id', entry.activityId.toString());
  formData.append('date', dayjs(entry.date).format('YYYY-MM-DD'));
  formData.append('task_description', entry.taskDescription);
  formData.append('hours', entry.timeSpent.toString());
  if (entry.startTime)
    formData.append('start_time', dayjs(entry.startTime).format('HH:mm:ss'));
  if (entry.endTime)
    formData.append('end_time', dayjs(entry.endTime).format('HH:mm:ss'));

  const response = await fetch(
    `http://goal-tracker-backend/api/entry_process.php?mode=add`,
    {
      method: 'POST',
      body: formData,
    }
  );

  return await camelcaseKeysDeep(response.json());
}

export async function updateEntry(entry: Entry) {
  const formData = new FormData();

  formData.append('entry_id', entry.entryId.toString());
  formData.append('activity_id', entry.activityId.toString());
  formData.append('date', dayjs(entry.date).format('YYYY-MM-DD'));
  formData.append('task_description', entry.taskDescription);
  formData.append('hours', entry.timeSpent.toString());
  if (entry.startTime)
    formData.append('start_time', dayjs(entry.startTime).format('HH:mm:ss'));
  if (entry.endTime)
    formData.append('end_time', dayjs(entry.endTime).format('HH:mm:ss'));

  const response = await fetch(
    `http://goal-tracker-backend/api/entry_process.php?mode=edit`,
    {
      method: 'POST',
      body: formData,
    }
  );

  return await camelcaseKeysDeep(response.json());
}

export async function deleteActivity(activityId: number) {
  const formData = new FormData();
  formData.append('activity_id', activityId.toString());

  const response = await fetch(
    `http://goal-tracker-backend/api/activity_process.php?mode=delete`,
    {
      method: 'POST',
      body: formData,
    }
  );

  return await response.json();
}

export async function deleteGoal(goalId: number) {
  const formData = new FormData();
  formData.append('goal_id', goalId.toString());

  const response = await fetch(
    `http://goal-tracker-backend/api/goal_process.php?mode=delete`,
    {
      method: 'POST',
      body: formData,
    }
  );

  return await response.json();
}
