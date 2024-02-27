import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TimeSpent from '../../api/TimeSpent';
import { Entry, WeeklyEntry } from '../../api/api-interface';
import WeeklyEntryHeader from './WeeklyEntryHeader';
import WeeklyEntryRow from './WeeklyEntryRow';
import WeeklyEntrySummaryRow, {
  WeeklyEntrySummary,
} from './WeeklyEntrySummaryRow';

function summarizeWeeklyEntries(
  weeklyEntries: WeeklyEntry[]
): WeeklyEntrySummary {
  let mondayTotal = new TimeSpent();
  let tuesdayTotal = new TimeSpent();
  let wednesdayTotal = new TimeSpent();
  let thursdayTotal = new TimeSpent();
  let fridayTotal = new TimeSpent();
  let saturdayTotal = new TimeSpent();
  let sundayTotal = new TimeSpent();

  weeklyEntries.forEach((weeklyEntry: WeeklyEntry) => {
    mondayTotal.addMinutes(weeklyEntry.mondayTime.getTotalMinutes());
    tuesdayTotal.addMinutes(weeklyEntry.tuesdayTime.getTotalMinutes());
    wednesdayTotal.addMinutes(weeklyEntry.wednesdayTime.getTotalMinutes());
    thursdayTotal.addMinutes(weeklyEntry.thursdayTime.getTotalMinutes());
    fridayTotal.addMinutes(weeklyEntry.fridayTime.getTotalMinutes());
    saturdayTotal.addMinutes(weeklyEntry.saturdayTime.getTotalMinutes());
    sundayTotal.addMinutes(weeklyEntry.sundayTime.getTotalMinutes());
  });

  return {
    mondayTotal: mondayTotal.toString(),
    tuesdayTotal: tuesdayTotal.toString(),
    wednesdayTotal: wednesdayTotal.toString(),
    thursdayTotal: thursdayTotal.toString(),
    fridayTotal: fridayTotal.toString(),
    saturdayTotal: saturdayTotal.toString(),
    sundayTotal: sundayTotal.toString(),
  };
}

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
          <WeeklyEntrySummaryRow
            weeklyEntrySummary={summarizeWeeklyEntries(weeklyEntries)}
          />
        </TableBody>
      </Table>
    </TableContainer>
  );
}
