import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import { Entry, Goal, WeeklyEntry } from '../../api/api-interface';
import WeeklyEntryHeader from './WeeklyEntryHeader';
import WeeklyEntryRow from './WeeklyEntryRow';

interface WeeklyEntryTableProps {
  weeklyEntries: WeeklyEntry[];
  setEntryData: React.Dispatch<React.SetStateAction<Partial<Entry>>>;
  setSelectedGoal: React.Dispatch<React.SetStateAction<Goal | null>>;
  handleDialogOpen: () => void;
  style?: React.CSSProperties;
}

export default function WeeklyEntryTable({
  weeklyEntries,
  setEntryData,
  setSelectedGoal,
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
              setEntryData={setEntryData}
              handleDialogOpen={handleDialogOpen}
              setSelectedGoal={setSelectedGoal}
            />
          );
        })}
      </Table>
    </TableContainer>
  );
}
