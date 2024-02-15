import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useConfirm } from 'material-ui-confirm';
import { useContext } from 'react';
import { Entry, ExpandedEntry, deleteEntry } from '../../api/api-interface';
import { ModeContext, RowContext } from '../../pages/Home';
import { EntryDialogMode } from '../Dialogs/EntryDialog';

async function postDelete(entryId: number) {
  await deleteEntry(entryId);
}

interface EntryRowProps {
  expandedEntry: ExpandedEntry;
  setEntryData: React.Dispatch<React.SetStateAction<Partial<Entry>>>;
  handleDialogOpen: () => void;
}

export default function EntryRow({
  expandedEntry,
  setEntryData,
  handleDialogOpen,
}: EntryRowProps) {
  const { setFlipped } = useContext(RowContext);
  const { setMode } = useContext(ModeContext);
  const confirm = useConfirm();

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
            setMode(EntryDialogMode.EditMode);
            handleDialogOpen();
          }}
        >
          <EditIcon />
        </IconButton>
      </TableCell>
      <TableCell>
        <IconButton
          onClick={async () => {
            try {
              await confirm({ description: 'This action is permanent!' });
              await postDelete(expandedEntry.entry.entryId);
            } catch {
              // fuck me... how tf am i supposed to handle ACTUAL errors... bitch
            } finally {
              setFlipped((val) => !val);
            }
          }}
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
