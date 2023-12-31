import { WeeklyEntry } from '../../api/types';
import WeeklyEntryHeader from './WeeklyEntryHeader/WeeklyEntryHeader';
import WeeklyEntryRow from './WeeklyEntryRow/WeeklyEntryRow';

interface WeeklyEntryTableProps {
  weeklyEntries: WeeklyEntry[];
}

export default function WeeklyEntryTable({
  weeklyEntries,
}: WeeklyEntryTableProps) {
  // Sort by targeting
  weeklyEntries.sort((first, second) => {
    let secondMinusFirst = 0;
    secondMinusFirst =
      first.targeting === second.targeting ? 0 : first.targeting ? -1 : 1;

    if (secondMinusFirst === 0) {
      secondMinusFirst = first.goalName.localeCompare(second.goalName);
    }

    if (secondMinusFirst === 0) {
      secondMinusFirst = first.activityName.localeCompare(second.activityName);
    }

    return secondMinusFirst;
  });

  return (
    <div>
      <WeeklyEntryHeader />
      {weeklyEntries.map((weeklyEntry) => (
        <WeeklyEntryRow weeklyEntry={weeklyEntry} />
      ))}
    </div>
  );
}
