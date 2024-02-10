import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import TimeSpent from '../../api/TimeSpent';
import {
  Entry,
  Goal,
  GoalWithActivities,
  addNewEntry,
  getAllGoalsAndActivities,
} from '../../api/api-interface';
import { validateEntryForAdd } from '../../validators/entry-validator';
import ErrorHandler from '../ErrorHandler/ErrorHandler';

interface EntryDialogProps {
  open: boolean;
  handleClose: () => void;
  entry: Partial<Entry>;
  setEntry: React.Dispatch<React.SetStateAction<Partial<Entry>>>;
  selectedGoal: Goal | null;
  setSelectedGoal: React.Dispatch<React.SetStateAction<Goal | null>>;
}

async function postData(entry: Entry) {
  return addNewEntry(entry);
}

export default function EntryDialog({
  open,
  handleClose,
  entry,
  setEntry,
  selectedGoal,
  setSelectedGoal,
}: EntryDialogProps) {
  const [goalsWithActivities, setGoalsWithActivities] = useState<
    GoalWithActivities[]
  >([]);

  const [error, setError] = useState<string>('');

  function clearData() {
    setEntry({});
  }

  useEffect(() => {
    async function getData() {
      const response = await getAllGoalsAndActivities();

      setGoalsWithActivities(response);
    }

    getData();
  }, [open]);

  function onClose() {
    setSelectedGoal(null);
    setError('');
    handleClose();
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Entry</DialogTitle>

      <DialogContent>
        {error !== '' ? <ErrorHandler errorMsg={error} /> : <></>}

        <Autocomplete
          options={goalsWithActivities}
          fullWidth
          renderInput={(params) => <TextField {...params} label='Goal' />}
          getOptionLabel={(goalWithActivities) =>
            goalWithActivities.goal.goalName
          }
          defaultValue={goalsWithActivities.find(
            (goalWithActivity) =>
              goalWithActivity.goal.goalId === selectedGoal?.goalId
          )}
          onChange={(event, value) => {
            setSelectedGoal(value?.goal ?? null);
          }}
          sx={{
            marginTop: '10px',
          }}
        />

        <Autocomplete
          options={
            goalsWithActivities.find(
              (goalWithActivity) =>
                goalWithActivity.goal.goalId === selectedGoal?.goalId
            )?.activities ?? []
          }
          fullWidth
          defaultValue={goalsWithActivities
            .find(
              (goalWithActivity) =>
                goalWithActivity.goal.goalId === selectedGoal?.goalId
            )
            ?.activities.find(
              (activity) => activity.activityId === entry.activityId
            )}
          getOptionLabel={(activity) => activity.activityName}
          renderInput={(params) => <TextField {...params} label='Activity' />}
          onChange={(event, value) => {
            if (value)
              setEntry((entry) => ({ ...entry, activityId: value.activityId }));
          }}
          sx={{
            marginTop: '10px',
          }}
        />

        <DatePicker
          sx={{ width: '100%', marginTop: '10px' }}
          label='Date'
          value={dayjs(entry.date)}
          onChange={(newDate) => {
            if (newDate)
              setEntry((entry) => ({ ...entry, date: newDate.toDate() }));
          }}
        />

        {/**  OK, this works: */}
        <TextField
          autoFocus
          margin='dense'
          id='name'
          label='Task Description'
          type='text'
          fullWidth
          variant='filled'
          value={entry.taskDescription}
          onChange={(event) =>
            setEntry((prev) => ({
              ...prev,
              taskDescription: event.target.value,
            }))
          }
        />

        <TextField
          autoFocus
          margin='dense'
          id='name'
          label='Hours'
          helperText='Time format: HH:mm e.g. 25:00 is 25 hours.'
          type='email'
          fullWidth
          variant='filled'
          onBlur={(event) =>
            setEntry((entry) => ({
              ...entry,
              timeSpent: new TimeSpent().buildFromFormattedTimeString(
                event.target.value
              ),
            }))
          }
        />

        <TimePicker
          label='Start Time'
          sx={{ width: '100%', marginTop: '10px' }}
          value={entry.startTime}
          onChange={(newStartTime) =>
            setEntry((entry) => ({ ...entry, startTime: newStartTime }))
          }
        />

        <TimePicker
          label='End Time '
          sx={{ width: '100%', marginTop: '10px' }}
          value={entry.endTime}
          onChange={(newEndTime) =>
            setEntry((entry) => ({ ...entry, endTime: newEndTime }))
          }
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            clearData();
            onClose();
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            // For Edit mode, pass in an Entry, then set State directly, don't build an Entry.
            try {
              const entryForPost = validateEntryForAdd(entry);
              postData(entryForPost);
              clearData();
              onClose();
            } catch (err) {
              if (err instanceof Error) {
                setError(err.message);
              }
            }
          }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
