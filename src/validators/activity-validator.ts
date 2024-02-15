import { Activity } from '../api/api-interface';

function checkValidActivity(partialActivity: Partial<Activity>): Activity {
  if (partialActivity.activityId === undefined)
    throw new Error('Activity ID undefined!');
  if (partialActivity.activityName === undefined)
    throw new Error('Activity name undefined!');
  if (partialActivity.goalId === undefined)
    throw new Error('Goal ID undefined!');
  if (partialActivity.targeting === undefined)
    throw new Error('Targeting undefined!');
  if (partialActivity.weighting === undefined)
    throw new Error('Weighting undefined!');

  return {
    activityId: partialActivity.activityId,
    activityName: partialActivity.activityName,
    goalId: partialActivity.goalId,
    targeting: partialActivity.targeting,
    weighting: partialActivity.weighting,
  };
}

export function validateActivityForAdd(
  partialActivity: Partial<Activity>
): Activity {
  let error = '';

  partialActivity.activityId = -1; // The ID is not used in this case

  const activity = checkValidActivity(partialActivity);

  if (activity.goalId === null || activity.goalId < 0)
    error += 'Goal ID invalid!';

  if (error !== '') throw new Error(error);

  return activity;
}

export function validateActivityForEdit(
  partialActivity: Partial<Activity>
): Activity {
  let error = '';

  const activity = checkValidActivity(partialActivity);

  if (activity.activityId === null || activity.activityId < 0)
    error += 'Activity ID invalid';
  if (activity.goalId === null || activity.goalId < 0)
    error += 'Goal ID invalid!';

  if (error !== '') throw new Error(error);

  return activity;
}
