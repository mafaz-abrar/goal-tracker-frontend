import { WeeklyEntry } from '../../../api/types';
import styles from '../WeeklyEntryTable.module.css';

interface WeeklyEntryProps {
  weeklyEntry: WeeklyEntry;
}

export default function WeeklyEntryRow({ weeklyEntry }: WeeklyEntryProps) {
  return (
    <div
      className={`${styles.container} ${
        weeklyEntry.targeting ? styles.targetingItem : ''
      }`}
    >
      <div className={styles.nameItem}>{weeklyEntry.goalName}</div>
      <div className={styles.nameItem}>{weeklyEntry.activityName}</div>
      <div className={styles.dataItem}>{weeklyEntry.mondayHours}</div>
      <div className={styles.dataItem}>{weeklyEntry.tuesdayHours}</div>
      <div className={styles.dataItem}>{weeklyEntry.wednesdayHours}</div>
      <div className={styles.dataItem}>{weeklyEntry.thursdayHours}</div>
      <div className={styles.dataItem}>{weeklyEntry.fridayHours}</div>
      <div className={styles.dataItem}>{weeklyEntry.saturdayHours}</div>
      <div className={styles.dataItem}>{weeklyEntry.sundayHours}</div>
      <div className={styles.dataItem}>
        <button>Push Me</button>
      </div>
    </div>
  );
}
