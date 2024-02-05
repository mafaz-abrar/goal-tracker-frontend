import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Entry, WeeklyEntry, flipTargeting } from '../../api/api-interface';
import GoalTrackerDisabledIcon from '../../assets/GoalTrackerDisabledIcon.png';
import GoalTrackerIcon from '../../assets/GoalTrackerIcon.png';
import styles from './WeeklyEntryTable.module.css';

interface WeeklyEntryProps {
  weeklyEntry: WeeklyEntry;
  setEntryData: React.Dispatch<React.SetStateAction<Partial<Entry>>>;
  handleDialogOpen: () => void;
}

function postData(activityId: number) {
  flipTargeting(activityId);
}

export default function WeeklyEntryRow({
  weeklyEntry,
  setEntryData,
  handleDialogOpen,
}: WeeklyEntryProps) {
  return (
    <>
      <TableRow>
        <TableCell>
          <Button
            onClick={() => {
              postData(weeklyEntry.activity.activityId);
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
                taskDescription: weeklyEntry.activity.activityName,
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
