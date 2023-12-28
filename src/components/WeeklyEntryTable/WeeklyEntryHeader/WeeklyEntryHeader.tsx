import styles from '../WeeklyEntryRow.module.css';

export default function WeeklyEntryHeader() {
  return (
    <div className={styles.container}>
      <div className={styles.dataItem}>Goal Name</div>
      <div className={styles.dataItem}>Activity Name</div>
      <div className={styles.dataItem}>Monday</div>
      <div className={styles.dataItem}>Tuesday</div>
      <div className={styles.dataItem}>Wednesday</div>
      <div className={styles.dataItem}>Thursday</div>
      <div className={styles.dataItem}>Friday</div>
      <div className={styles.dataItem}>Saturday</div>
      <div className={styles.dataItem}>Sunday</div>
    </div>
  );
}
