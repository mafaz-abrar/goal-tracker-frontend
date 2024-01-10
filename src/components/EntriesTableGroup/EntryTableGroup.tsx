import { DayWithEntries } from '../../api/api-interface';
import EntryDayTable from './EntryDayTable';

interface GoalsAndActivitiesTableGroupProps {
  days: DayWithEntries[];
  style?: React.CSSProperties;
}

export default function EntryTableGroup({
  days,
  style,
}: GoalsAndActivitiesTableGroupProps) {
  return (
    <div style={style}>
      {days.map((day) => (
        <EntryDayTable day={day} />
      ))}
    </div>
  );
}
