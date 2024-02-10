import { Entry } from '../api/api-interface';

function checkValidEntry(partialEntry: Partial<Entry>): Entry {
  if (partialEntry.entryId === undefined)
    throw new Error('Entry ID undefined!');
  if (partialEntry.activityId === undefined)
    throw new Error('Activity ID undefined!');
  if (partialEntry.date === undefined) throw new Error('Date undefined!');
  if (partialEntry.taskDescription === undefined)
    throw new Error('Task Desc undefined!');
  if (partialEntry.timeSpent === undefined)
    throw new Error('Time spent undefined!');

  return {
    entryId: partialEntry.entryId,
    activityId: partialEntry.activityId,
    date: partialEntry.date,
    taskDescription: partialEntry.taskDescription,
    timeSpent: partialEntry.timeSpent,
    startTime: partialEntry.startTime ?? null,
    endTime: partialEntry.endTime ?? null,
  };
}

export function validateEntryForAdd(partialEntry: Partial<Entry>): Entry {
  let error = '';

  partialEntry.entryId = -1; // The ID is not used in this case
  const entry = checkValidEntry(partialEntry);

  if (entry.timeSpent.getTotalMinutes() === 0)
    error += 'Please enter a value for time spent.\n';

  if (error !== '') throw new Error(error);

  return entry;
}

export function validateEntryForEdit(partialEntry: Partial<Entry>): Entry {
  let error = '';

  const entry = checkValidEntry(partialEntry);

  if (entry.entryId === null) error += 'Entry ID must be defined!';

  if (error !== '') throw new Error(error);

  return entry;
}
