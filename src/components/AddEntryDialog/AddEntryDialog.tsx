import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState } from 'react';
import { Entry, Id, createNewEntry } from '../../api/api-interface';

interface AddEntryDialogProps {
  open: boolean;
  onClose: () => void;
  entry?: Entry;
}

async function postData(entry: Entry) {
  return await createNewEntry(entry);
}

export default function AddEntryDialog({
  open,
  onClose,
  entry,
}: AddEntryDialogProps) {
  const [activityId, setActivityId] = useState<Id>(null);
  const [date, setDate] = useState<Date>(null);
  const [desc, setDesc] = useState('');
  const [timeSpent, setTimeSpent] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Entry {activityId}</DialogTitle>

      <DialogContent sx={{ width: 400 }}>
        <Autocomplete
          options={[
            { label: 'hey', val: 1 },
            { label: 'hi', val: 2 },
            { label: 'ho', val: 3 },
          ]}
          fullWidth
          renderInput={(params) => <TextField {...params} label='Activity' />}
          onChange={(event, value) => {
            if (value !== null) setActivityId(value.val);
          }}
          value={null}
          sx={{
            marginTop: '10px',
          }}
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            sx={{ width: '100%', marginTop: '10px' }}
            label='Basic date picker'
          />
        </LocalizationProvider>

        <TextField
          autoFocus
          margin='dense'
          id='name'
          label='Task Description'
          type='email'
          fullWidth
          variant='filled'
        />

        <TextField
          autoFocus
          margin='dense'
          id='name'
          label='Hours'
          helperText='Time format: HH:mm:ss e.g. 05:00:00 is 5 hours.'
          type='email'
          fullWidth
          variant='filled'
        />

        <TextField
          autoFocus
          margin='dense'
          id='name'
          label='Start Time'
          helperText='Time format: HH:mm:ss e.g. 05:00:00 is 5 AM.'
          type='email'
          fullWidth
          variant='filled'
        />

        <TextField
          autoFocus
          margin='dense'
          id='name'
          label='End Time'
          helperText='Time format: HH:mm:ss e.g. 05:00:00 is 5 AM.'
          type='email'
          fullWidth
          variant='filled'
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={() => {
            postData({
              entryId: null,
              date: date,
              activityId: activityId,
              taskDescription: desc,
              timeSpent: timeSpent,
              startTime: new Date(),
              endTime: new Date(),
            });

            onClose();
          }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
