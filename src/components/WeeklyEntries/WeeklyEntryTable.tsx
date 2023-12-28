import { WeeklyEntry } from '../../api/types';
import WeeklyEntryHeader from './WeeklyEntryHeader/WeeklyEntryHeader';
import WeeklyEntryRow from './WeeklyEntryRow/WeeklyEntryRow';

interface WeeklyEntryTableProps {
  weeklyEntries: WeeklyEntry[];
}

export default function WeeklyEntryTable({
  weeklyEntries,
}: WeeklyEntryTableProps) {
  return (
    <div>
      <WeeklyEntryHeader />
      {weeklyEntries.map((weeklyEntry) => (
        <WeeklyEntryRow weeklyEntry={weeklyEntry} />
      ))}
    </div>
  );
}
