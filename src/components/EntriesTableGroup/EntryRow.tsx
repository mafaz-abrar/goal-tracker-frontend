import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { ExpandedEntry } from '../../api/api-interface';

interface EntryRowProps {
  expandedEntry: ExpandedEntry;
}

export default function EntryRow({ expandedEntry }: EntryRowProps) {
  return (
    <TableRow>
      <TableCell sx={{ width: '40%' }}>{expandedEntry.activityName}</TableCell>
      <TableCell sx={{ width: '40%' }}>
        {expandedEntry.entry.taskDescription}
      </TableCell>
      <TableCell>{expandedEntry.entry.timeSpent.toString()}</TableCell>
      <TableCell>
        {expandedEntry.entry.startTime?.toLocaleTimeString() ?? ''}
      </TableCell>
      <TableCell>
        {expandedEntry.entry.endTime?.toLocaleTimeString() ?? ''}
      </TableCell>
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
