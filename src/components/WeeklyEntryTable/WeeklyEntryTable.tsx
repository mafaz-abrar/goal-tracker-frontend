import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import { Entry, WeeklyEntry } from '../../api/api-interface';
import WeeklyEntryHeader from './WeeklyEntryHeader';
import WeeklyEntryRow from './WeeklyEntryRow';

interface WeeklyEntryTableProps {
  weeklyEntries: WeeklyEntry[];
  setEntryData: React.Dispatch<React.SetStateAction<Partial<Entry>>>;
  handleDialogOpen: () => void;
  style?: React.CSSProperties;
}

export default function WeeklyEntryTable({
  weeklyEntries,
  setEntryData,
  handleDialogOpen,
  style,
}: WeeklyEntryTableProps) {
  // TODO: Move this to an outer function: [out of scope for MVP].
  // Sort by weighting, then goal name, finally activity name.
  weeklyEntries.sort((first, second) => {
    let secondMinusFirst = 0;
    secondMinusFirst = second.activity.weighting - first.activity.weighting;

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
      <Table size='small'>
        <TableBody>
          <WeeklyEntryHeader />
          {weeklyEntries.map((weeklyEntry, index) => {
            return (
              <WeeklyEntryRow
                key={index}
                weeklyEntry={weeklyEntry}
                setEntryData={setEntryData}
                handleDialogOpen={handleDialogOpen}
              />
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
