import { DayWithExpandedEntries, Entry } from '../../api/api-interface';
import EntryDayTable from './EntryDayTable';

interface EntryTableGroupProps {
  days: DayWithExpandedEntries[];
  style?: React.CSSProperties;
  setEntryData: React.Dispatch<React.SetStateAction<Partial<Entry>>>;
  handleDialogOpen: () => void;
}

export default function EntryTableGroup({
  days,
  style,
  setEntryData,
  handleDialogOpen,
}: EntryTableGroupProps) {
  return (
    <div style={style}>
      {days.map((day, index) => (
        <EntryDayTable
          key={index}
          day={day}
          setEntryData={setEntryData}
          handleDialogOpen={handleDialogOpen}
        />
      ))}
    </div>
  );
}
