import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import { WeeklyEntry } from '../../api/api-interface';
import WeeklyEntryHeader from './WeeklyEntryHeader';
import WeeklyEntryRow from './WeeklyEntryRow';

interface WeeklyEntryTableProps {
  weeklyEntries: WeeklyEntry[];
  handleDialogOpen: () => void;
  style?: React.CSSProperties;
}

export default function WeeklyEntryTable({
  weeklyEntries,
  handleDialogOpen,
  style,
}: WeeklyEntryTableProps) {
  // TODO: Move this to an outer function: [out of scope for MVP].
  // Sort by targeting, then goal name, finally activity name.
  weeklyEntries.sort((first, second) => {
    let secondMinusFirst = 0;
    secondMinusFirst =
      first.activity.targeting === second.activity.targeting
        ? 0
        : first.activity.targeting
        ? -1
        : 1;

    if (secondMinusFirst === 0) {
      secondMinusFirst = first.goalName.localeCompare(second.goalName);
    }

    if (secondMinusFirst === 0) {
      secondMinusFirst = first.activity.activityName.localeCompare(
        second.activity.activityName
      );
    }

    return secondMinusFirst;
  });

  return (
    <TableContainer component={Paper} sx={style}>
      <Table>
        <WeeklyEntryHeader />
        {weeklyEntries.map((weeklyEntry) => {
          console.log(weeklyEntry);
          return (
            <WeeklyEntryRow
              weeklyEntry={weeklyEntry}
              handleDialogOpen={handleDialogOpen}
            />
          );
        })}
      </Table>
    </TableContainer>
  );
}
