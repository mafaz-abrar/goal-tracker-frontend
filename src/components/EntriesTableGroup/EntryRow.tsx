import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { EntryWithActivity } from '../../api/api-interface';

interface EntryRowProps {
  entry: EntryWithActivity;
}

export default function EntryRow({ entry }: EntryRowProps) {
  return (
    <TableRow>
      <TableCell>{entry.activityName}</TableCell>
      <TableCell>{entry.taskDescription}</TableCell>
      <TableCell>{entry.hoursSpent}</TableCell>
      <TableCell>{entry.startTime}</TableCell>
      <TableCell>{entry.endTime}</TableCell>
    </TableRow>
  );
}
