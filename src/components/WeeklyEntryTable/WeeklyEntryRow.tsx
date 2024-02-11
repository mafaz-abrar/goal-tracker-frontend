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
        <TableCell align='center' sx={dataItemStyleProps}>
          {weeklyEntry.mondayTime.getTotalMinutes() === 0
            ? ''
            : weeklyEntry.mondayTime.toString()}
        </TableCell>
        <TableCell align='center' sx={dataItemStyleProps}>
          {weeklyEntry.tuesdayTime.getTotalMinutes() === 0
            ? ''
            : weeklyEntry.tuesdayTime.toString()}
        </TableCell>
        <TableCell align='center' sx={dataItemStyleProps}>
          {weeklyEntry.wednesdayTime.getTotalMinutes() === 0
            ? ''
            : weeklyEntry.wednesdayTime.toString()}
        </TableCell>
        <TableCell align='center' sx={dataItemStyleProps}>
          {weeklyEntry.thursdayTime.getTotalMinutes() === 0
            ? ''
            : weeklyEntry.thursdayTime.toString()}
        </TableCell>
        <TableCell align='center' sx={dataItemStyleProps}>
          {weeklyEntry.fridayTime.getTotalMinutes() === 0
            ? ''
            : weeklyEntry.fridayTime.toString()}
        </TableCell>
        <TableCell align='center' sx={dataItemStyleProps}>
          {weeklyEntry.saturdayTime.getTotalMinutes() === 0
            ? ''
            : weeklyEntry.saturdayTime.toString()}
        </TableCell>
        <TableCell align='center' sx={dataItemStyleProps}>
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
