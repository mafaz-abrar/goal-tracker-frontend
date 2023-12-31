import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import styles from './WeeklyEntryTable.module.css';

export default function WeeklyEntryHeader() {
  return (
    <TableHead>
      <TableRow
        sx={{
          backgroundColor: 'black',
        }}
      >
        <TableCell></TableCell>
        <TableCell className={`${styles.nameItem} ${styles.headerCell}`}>
          Goal Name
        </TableCell>
        <TableCell className={`${styles.nameItem} ${styles.headerCell}`}>
          Activity Name
        </TableCell>
        <TableCell className={`${styles.dataItem} ${styles.headerCell}`}>
          MON
        </TableCell>
        <TableCell className={`${styles.dataItem} ${styles.headerCell}`}>
          TUE
        </TableCell>
        <TableCell className={`${styles.dataItem} ${styles.headerCell}`}>
          WED
        </TableCell>
        <TableCell className={`${styles.dataItem} ${styles.headerCell}`}>
          THUR
        </TableCell>
        <TableCell className={`${styles.dataItem} ${styles.headerCell}`}>
          FRI
        </TableCell>
        <TableCell className={`${styles.dataItem} ${styles.headerCell}`}>
          SAT
        </TableCell>
        <TableCell className={`${styles.dataItem} ${styles.headerCell}`}>
          SUN
        </TableCell>
        <TableCell
          className={`${styles.dataItem} ${styles.headerCell}`}
        ></TableCell>
      </TableRow>
    </TableHead>
  );
}
