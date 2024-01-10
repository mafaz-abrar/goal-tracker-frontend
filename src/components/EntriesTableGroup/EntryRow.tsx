import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { EntryWithActivity } from '../../api/api-interface';

interface EntryRowProps {
  entry: EntryWithActivity;
}

export default function EntryRow({ entry }: EntryRowProps) {
  return (
    <TableRow>
      <TableCell sx={{ width: '40%' }}>{entry.activityName}</TableCell>
      <TableCell sx={{ width: '40%' }}>{entry.taskDescription}</TableCell>
      <TableCell>{entry.hoursSpent}</TableCell>
      <TableCell>{entry.startTime}</TableCell>
      <TableCell>{entry.endTime}</TableCell>
      <TableCell>
        <IconButton>
          <EditIcon />
        </IconButton>
      </TableCell>
      <TableCell>
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
