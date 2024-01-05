import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import { WeeklyEntry } from '../../api/api-interface';
import WeeklyEntryHeader from './WeeklyEntryHeader';
import WeeklyEntryRow from './WeeklyEntryRow';

interface WeeklyEntryTableProps {
  weeklyEntries: WeeklyEntry[];
  style?: React.CSSProperties;
}

export default function WeeklyEntryTable({
  weeklyEntries,
  style,
}: WeeklyEntryTableProps) {
  // Sort by targeting, then goal name, finally activity name.
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
    <TableContainer component={Paper} sx={style}>
      <Table>
        <WeeklyEntryHeader />
        {weeklyEntries.map((weeklyEntry) => (
          <WeeklyEntryRow weeklyEntry={weeklyEntry} />
        ))}
      </Table>
    </TableContainer>
  );
}
