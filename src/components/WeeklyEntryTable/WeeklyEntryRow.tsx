import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useContext } from 'react';
import TimeSpent from '../../api/TimeSpent';
import { Entry, WeeklyEntry, flipTargeting } from '../../api/api-interface';
import GoalTrackerDisabledIcon from '../../assets/GoalTrackerDisabledIcon.png';
import GoalTrackerIcon from '../../assets/GoalTrackerIcon.png';
import { ModeContext, RowContext } from '../../pages/Home';
import { EntryDialogMode } from '../Dialogs/EntryDialog';
import styles from './WeeklyEntryTable.module.css';

const dataItemStyleProps = {
  width: '10%',
  color: 'rgba(25, 118, 210, 1)',
  textAlign: 'center',
};

const todayStyleProps = {
  backgroundColor: 'rgba(26, 198, 255, 0.1)',
};

function getToday() {
  return new Date().getDay();
}

interface WeeklyEntryProps {
  weeklyEntry: WeeklyEntry;
  setEntryData: React.Dispatch<React.SetStateAction<Partial<Entry>>>;
  handleDialogOpen: () => void;
}

async function postData(activityId: number) {
  await flipTargeting(activityId);
}

export default function WeeklyEntryRow({
  weeklyEntry,
  setEntryData,
  handleDialogOpen,
}: WeeklyEntryProps) {
  const { setFlipped } = useContext(RowContext);
  const { setMode } = useContext(ModeContext);

  return (
    <>
      <TableRow>
        <TableCell>
          <Button
            onClick={async () => {
              await postData(weeklyEntry.activity.activityId);
              setFlipped((val) => !val);
            }}
          >
            {weeklyEntry.activity.targeting ? (
              <img
                src={GoalTrackerIcon}
                alt='targeting'
                style={{ width: '20px', height: '20px' }}
              />
            ) : (
              <img
                src={GoalTrackerDisabledIcon}
                alt='not targeting'
                style={{ width: '20px', height: '20px' }}
              />
            )}
          </Button>
        </TableCell>
        <TableCell className={styles.nameItem}>
          {weeklyEntry.goalName}
        </TableCell>
        <TableCell className={styles.nameItem}>
          {weeklyEntry.activity.activityName}
        </TableCell>
        <TableCell
          sx={[
            weeklyEntry.activity.weighting >= 0
              ? {
                  color: 'rgba(0, 102, 255, 0.7)',
                }
              : { color: 'red' },
            {
              fontWeight: 'bold',
              textAlign: 'center',
            },
          ]}
        >
          <span
            style={{
              borderStyle: 'solid',
              borderWidth: '1px',
              borderRadius: '50%',
              display: 'inline-block',
              height: '25px',
              width: '25px',
              lineHeight: '25px',
              borderColor:
                weeklyEntry.activity.weighting >= 0
                  ? 'rgba(0, 102, 255, 0.7)'
                  : 'red',
            }}
          >
            {weeklyEntry.activity.weighting}
          </span>
        </TableCell>
        <TableCell
          align='center'
          sx={[
            dataItemStyleProps,
            ...(getToday() === 1 ? [todayStyleProps] : []),
          ]}
        >
          {weeklyEntry.mondayTime.getTotalMinutes() === 0
            ? ''
            : weeklyEntry.mondayTime.toString()}
        </TableCell>
        <TableCell
          align='center'
          sx={[
            dataItemStyleProps,
            ...(getToday() === 2 ? [todayStyleProps] : []),
          ]}
        >
          {weeklyEntry.tuesdayTime.getTotalMinutes() === 0
            ? ''
            : weeklyEntry.tuesdayTime.toString()}
        </TableCell>
        <TableCell
          align='center'
          sx={[
            dataItemStyleProps,
            ...(getToday() === 3 ? [todayStyleProps] : []),
          ]}
        >
          {weeklyEntry.wednesdayTime.getTotalMinutes() === 0
            ? ''
            : weeklyEntry.wednesdayTime.toString()}
        </TableCell>
        <TableCell
          align='center'
          sx={[
            dataItemStyleProps,
            ...(getToday() === 4 ? [todayStyleProps] : []),
          ]}
        >
          {weeklyEntry.thursdayTime.getTotalMinutes() === 0
            ? ''
            : weeklyEntry.thursdayTime.toString()}
        </TableCell>
        <TableCell
          align='center'
          sx={[
            dataItemStyleProps,
            ...(getToday() === 5 ? [todayStyleProps] : []),
          ]}
        >
          {weeklyEntry.fridayTime.getTotalMinutes() === 0
            ? ''
            : weeklyEntry.fridayTime.toString()}
        </TableCell>
        <TableCell
          align='center'
          sx={[
            dataItemStyleProps,
            ...(getToday() === 6 ? [todayStyleProps] : []),
          ]}
        >
          {weeklyEntry.saturdayTime.getTotalMinutes() === 0
            ? ''
            : weeklyEntry.saturdayTime.toString()}
        </TableCell>
        <TableCell
          align='center'
          sx={[
            dataItemStyleProps,
            ...(getToday() === 0 ? [todayStyleProps] : []),
          ]}
        >
          {weeklyEntry.sundayTime.getTotalMinutes() === 0
            ? ''
            : weeklyEntry.sundayTime.toString()}
        </TableCell>
        <TableCell>
          <IconButton
            onClick={() => {
              setEntryData({
                date: new Date(),
                activityId: weeklyEntry.activity.activityId,
                taskDescription: '✅',
                timeSpent: new TimeSpent(5),
                startTime: new Date(),
                endTime: new Date(new Date().getTime() + 5 * 60000), // Add 5 minutes
              });
              setMode(EntryDialogMode.AddMode);
              handleDialogOpen();
            }}
          >
            <AddIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
}
