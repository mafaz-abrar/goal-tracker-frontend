import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

export type WeeklyEntrySummary = {
  mondayTotal: string;
  tuesdayTotal: string;
  wednesdayTotal: string;
  thursdayTotal: string;
  fridayTotal: string;
  saturdayTotal: string;
  sundayTotal: string;
};

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

interface WeeklyEntrySummaryRowProps {
  weeklyEntrySummary: WeeklyEntrySummary;
}

export default function WeeklyEntrySummaryRow({
  weeklyEntrySummary,
}: WeeklyEntrySummaryRowProps) {
  return (
    <>
      <TableRow
        sx={{
          borderTop: 'solid black 2px',
          backgroundColor: 'rgba(179, 224, 255, 0.4)',
        }}
      >
        <TableCell
          colSpan={4}
          align='left'
          sx={{
            fontWeight: 'bold',
            fontStyle: 'italic',
            color: 'rgb(69,71,71)',
            fontSize: '2.2vh',
            paddingLeft: '10%',
          }}
        >
          TOTAL
        </TableCell>
        <TableCell align='center'>X</TableCell>

        <TableCell
          align='center'
          sx={[
            dataItemStyleProps,
            ...(getToday() === 1 ? [todayStyleProps] : []),
          ]}
        >
          {weeklyEntrySummary.mondayTotal}
        </TableCell>
        <TableCell
          align='center'
          sx={[
            dataItemStyleProps,
            ...(getToday() === 2 ? [todayStyleProps] : []),
          ]}
        >
          {weeklyEntrySummary.tuesdayTotal}
        </TableCell>
        <TableCell
          align='center'
          sx={[
            dataItemStyleProps,
            ...(getToday() === 3 ? [todayStyleProps] : []),
          ]}
        >
          {weeklyEntrySummary.wednesdayTotal}
        </TableCell>
        <TableCell
          align='center'
          sx={[
            dataItemStyleProps,
            ...(getToday() === 4 ? [todayStyleProps] : []),
          ]}
        >
          {weeklyEntrySummary.thursdayTotal}
        </TableCell>
        <TableCell
          align='center'
          sx={[
            dataItemStyleProps,
            ...(getToday() === 5 ? [todayStyleProps] : []),
          ]}
        >
          {weeklyEntrySummary.fridayTotal}
        </TableCell>
        <TableCell
          align='center'
          sx={[
            dataItemStyleProps,
            ...(getToday() === 6 ? [todayStyleProps] : []),
          ]}
        >
          {weeklyEntrySummary.saturdayTotal}
        </TableCell>
        <TableCell
          align='center'
          sx={[
            dataItemStyleProps,
            ...(getToday() === 0 ? [todayStyleProps] : []),
          ]}
        >
          {weeklyEntrySummary.sundayTotal}
        </TableCell>
        <TableCell></TableCell>
      </TableRow>
    </>
  );
}
