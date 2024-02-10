import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useContext } from 'react';
import {
  Entry,
  Goal,
  WeeklyEntry,
  flipTargeting,
} from '../../api/api-interface';
import GoalTrackerDisabledIcon from '../../assets/GoalTrackerDisabledIcon.png';
import GoalTrackerIcon from '../../assets/GoalTrackerIcon.png';
import { RowContext } from '../../pages/Home';
import styles from './WeeklyEntryTable.module.css';

interface WeeklyEntryProps {
  weeklyEntry: WeeklyEntry;
  setEntryData: React.Dispatch<React.SetStateAction<Partial<Entry>>>;
  handleDialogOpen: () => void;
  setSelectedGoal: React.Dispatch<React.SetStateAction<Goal | null>>;
}

async function postData(activityId: number) {
  console.log(activityId);
  await flipTargeting(activityId);
}

export default function WeeklyEntryRow({
  weeklyEntry,
  setEntryData,
  handleDialogOpen,
  setSelectedGoal,
}: WeeklyEntryProps) {
  const { setFlipped } = useContext(RowContext);

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
        <TableCell align='center' className={styles.dataItem}>
          {weeklyEntry.mondayTime.getTotalMinutes() === 0
            ? ''
            : weeklyEntry.mondayTime.toString()}
        </TableCell>
        <TableCell align='center' className={styles.dataItem}>
          {weeklyEntry.tuesdayTime.getTotalMinutes() === 0
            ? ''
            : weeklyEntry.tuesdayTime.toString()}
        </TableCell>
        <TableCell align='center' className={styles.dataItem}>
          {weeklyEntry.wednesdayTime.getTotalMinutes() === 0
            ? ''
            : weeklyEntry.wednesdayTime.toString()}
        </TableCell>
        <TableCell align='center' className={styles.dataItem}>
          {weeklyEntry.thursdayTime.getTotalMinutes() === 0
            ? ''
            : weeklyEntry.thursdayTime.toString()}
        </TableCell>
        <TableCell align='center' className={styles.dataItem}>
          {weeklyEntry.fridayTime.getTotalMinutes() === 0
            ? ''
            : weeklyEntry.fridayTime.toString()}
        </TableCell>
        <TableCell align='center' className={styles.dataItem}>
          {weeklyEntry.saturdayTime.getTotalMinutes() === 0
            ? ''
            : weeklyEntry.saturdayTime.toString()}
        </TableCell>
        <TableCell align='center' className={styles.dataItem}>
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
              });
              setSelectedGoal({
                goalId: weeklyEntry.activity.goalId,
                goalName: weeklyEntry.goalName,
              });
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
