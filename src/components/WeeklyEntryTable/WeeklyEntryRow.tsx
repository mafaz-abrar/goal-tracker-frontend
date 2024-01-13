import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { WeeklyEntry } from '../../api/api-interface';
import GoalTrackerDisabledIcon from '../../assets/GoalTrackerDisabledIcon.png';
import GoalTrackerIcon from '../../assets/GoalTrackerIcon.png';
import styles from './WeeklyEntryTable.module.css';

interface WeeklyEntryProps {
  weeklyEntry: WeeklyEntry;
}

export default function WeeklyEntryRow({ weeklyEntry }: WeeklyEntryProps) {
  return (
    <TableRow>
      <TableCell>
        <Button>
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
      <TableCell className={styles.nameItem}>{weeklyEntry.goalName}</TableCell>
      <TableCell className={styles.nameItem}>
        {weeklyEntry.activity.activityName}
      </TableCell>
      <TableCell align='center' className={styles.dataItem}>
        {weeklyEntry.mondayHours.toString()}
      </TableCell>
      <TableCell align='center' className={styles.dataItem}>
        {weeklyEntry.tuesdayHours.toString()}
      </TableCell>
      <TableCell align='center' className={styles.dataItem}>
        {weeklyEntry.wednesdayHours.toString()}
      </TableCell>
      <TableCell align='center' className={styles.dataItem}>
        {weeklyEntry.thursdayHours.toString()}
      </TableCell>
      <TableCell align='center' className={styles.dataItem}>
        {weeklyEntry.fridayHours.toString()}
      </TableCell>
      <TableCell align='center' className={styles.dataItem}>
        {weeklyEntry.saturdayHours.toString()}
      </TableCell>
      <TableCell align='center' className={styles.dataItem}>
        {weeklyEntry.sundayHours.toString()}
      </TableCell>
      <TableCell>
        <IconButton>
          <AddIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
