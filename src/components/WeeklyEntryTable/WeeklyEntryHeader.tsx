import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import styles from './WeeklyEntryTable.module.css';

export default function WeeklyEntryHeader() {
  return (
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
      <TableCell
        align='center'
        className={`${styles.dataItem} ${styles.headerCell}`}
      >
        MON
      </TableCell>
      <TableCell
        align='center'
        className={`${styles.dataItem} ${styles.headerCell}`}
      >
        TUE
      </TableCell>
      <TableCell
        align='center'
        className={`${styles.dataItem} ${styles.headerCell}`}
      >
        WED
      </TableCell>
      <TableCell
        align='center'
        className={`${styles.dataItem} ${styles.headerCell}`}
      >
        THUR
      </TableCell>
      <TableCell
        align='center'
        className={`${styles.dataItem} ${styles.headerCell}`}
      >
        FRI
      </TableCell>
      <TableCell
        align='center'
        className={`${styles.dataItem} ${styles.headerCell}`}
      >
        SAT
      </TableCell>
      <TableCell
        align='center'
        className={`${styles.dataItem} ${styles.headerCell}`}
      >
        SUN
      </TableCell>
      <TableCell
        className={`${styles.dataItem} ${styles.headerCell}`}
      ></TableCell>
    </TableRow>
  );
}
