import camelcaseKeysDeep from 'camelcase-keys-deep';
import dayjs from 'dayjs';
import TimeSpent from './TimeSpent';
import { API_SERVER } from './config';

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
    console.log(weeklyEntry);

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
          console.log(expandedEntry);

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

  console.log(returnVal);
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

export async function addNewEntry(entry: Entry) {
  const formData = new FormData();
  console.log(entry);

  formData.append('activity_id', entry.activityId.toString());
  formData.append('date', dayjs(entry.date).format('YYYY-MM-DD'));
  formData.append('task_description', entry.taskDescription);
  formData.append('hours', entry.timeSpent.toString());

  console.log(formData.get('activity_id'));
  const response = await fetch(
    `http://goal-tracker-backend/api/entry_process.php?mode=add`,
    {
      method: 'POST',
      body: formData,
    }
  );

  return await camelcaseKeysDeep(response.json());
}

export async function postActivity(activity: Activity) {}

export async function postGoal(goal: Goal) {}

export async function deleteEntry(entryId: number) {}

export async function deleteActivity(activityId: number) {}

export async function deleteGoal(goalId: number) {}

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
