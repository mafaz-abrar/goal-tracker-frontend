import { DayWithExpandedEntries, Entry, Goal } from '../../api/api-interface';
import EntryDayTable from './EntryDayTable';

interface EntryTableGroupProps {
  days: DayWithExpandedEntries[];
  style?: React.CSSProperties;
  setEntryData: React.Dispatch<React.SetStateAction<Partial<Entry>>>;
  setSelectedGoal: React.Dispatch<React.SetStateAction<Goal | null>>;
  handleDialogOpen: () => void;
}

export default function EntryTableGroup({
  days,
  style,
  setEntryData,
  setSelectedGoal,
  handleDialogOpen,
}: EntryTableGroupProps) {
  return (
    <div style={style}>
      {days.map((day) => (
        <EntryDayTable
          day={day}
          setEntryData={setEntryData}
          handleDialogOpen={handleDialogOpen}
          setSelectedGoal={setSelectedGoal}
        />
      ))}
    </div>
  );
}
