import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import styles from './WeeklyEntryTable.module.css';

const headerProps = {
  color: `white`,
};

export default function WeeklyEntryHeader() {
  return (
    <TableRow
      sx={{
        backgroundColor: 'black',
      }}
    >
      <TableCell sx={headerProps}>TARGETING?</TableCell>
      <TableCell
        className={`${styles.nameItem} ${styles.headerCell}`}
        sx={headerProps}
      >
        GOAL
      </TableCell>
      <TableCell
        className={`${styles.nameItem} ${styles.headerCell}`}
        sx={headerProps}
      >
        ACTIVITY
      </TableCell>
      <TableCell
        className={`${styles.nameItem} ${styles.headerCell}`}
        sx={[headerProps, { textAlign: 'center' }]}
      >
        WEIGHTING
      </TableCell>
      <TableCell
        className={`${styles.nameItem} ${styles.headerCell}`}
        sx={[headerProps, { textAlign: 'center' }]}
      >
        PROGRESS
      </TableCell>
      <TableCell
        align='center'
        className={`${styles.dataItem} ${styles.headerCell}`}
        sx={headerProps}
      >
        MON
      </TableCell>
      <TableCell
        align='center'
        className={`${styles.dataItem} ${styles.headerCell}`}
        sx={headerProps}
      >
        TUE
      </TableCell>
      <TableCell
        align='center'
        className={`${styles.dataItem} ${styles.headerCell}`}
        sx={headerProps}
      >
        WED
      </TableCell>
      <TableCell
        align='center'
        className={`${styles.dataItem} ${styles.headerCell}`}
        sx={headerProps}
      >
        THUR
      </TableCell>
      <TableCell
        align='center'
        className={`${styles.dataItem} ${styles.headerCell}`}
        sx={headerProps}
      >
        FRI
      </TableCell>
      <TableCell
        align='center'
        className={`${styles.dataItem} ${styles.headerCell}`}
        sx={headerProps}
      >
        SAT
      </TableCell>
      <TableCell
        align='center'
        className={`${styles.dataItem} ${styles.headerCell}`}
        sx={headerProps}
      >
        SUN
      </TableCell>
      <TableCell
        className={`${styles.dataItem} ${styles.headerCell}`}
        sx={headerProps}
      ></TableCell>
    </TableRow>
  );
}
