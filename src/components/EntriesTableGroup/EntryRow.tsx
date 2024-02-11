import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useContext } from 'react';
import {
  Entry,
  ExpandedEntry,
  Goal,
  deleteEntry,
} from '../../api/api-interface';
import { RowContext } from '../../pages/Home';

async function postDelete(entryId: number) {
  console.log(entryId);
  await deleteEntry(entryId);
}

interface EntryRowProps {
  expandedEntry: ExpandedEntry;
  setEntryData: React.Dispatch<React.SetStateAction<Partial<Entry>>>;
  setSelectedGoal: React.Dispatch<React.SetStateAction<Goal | null>>;
  handleDialogOpen: () => void;
}

export default function EntryRow({
  expandedEntry,
  setEntryData,
  setSelectedGoal,
  handleDialogOpen,
}: EntryRowProps) {
  const { setFlipped } = useContext(RowContext);

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
        <IconButton
          onClick={() => {
            setEntryData(expandedEntry.entry);
            setSelectedGoal({
              goalId: expandedEntry.goalId,
              goalName: expandedEntry.goalName,
            });

            handleDialogOpen();
          }}
        >
          <EditIcon />
        </IconButton>
      </TableCell>
      <TableCell>
        <IconButton
          onClick={async () => {
            await postDelete(expandedEntry.entry.entryId);
            setFlipped((val) => !val);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
