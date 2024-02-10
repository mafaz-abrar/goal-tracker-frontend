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
  GoalWithActivities,
  addNewEntry,
  getAllGoalsAndActivities,
} from '../../api/api-interface';
import { validateEntryForAdd } from '../../validators/entry-validator';
import ErrorHandler from '../ErrorHandler/ErrorHandler';

interface EntryDialogProps {
  open: boolean;
  handleClose: () => void;
  // in fact, no need to pass a Partial Entry here, just directly pass the properties of Entry that
  // we know can be passed in:
  // entry Id (for edit) + all
  // activity Id, date for weeklyEntry context
  // can we use useContext for this?
  entry: Partial<Entry>;
  setEntry: React.Dispatch<React.SetStateAction<Partial<Entry>>>;
}

async function postData(entry: Entry) {
  return addNewEntry(entry);
}

export default function EntryDialog({
  open,
  handleClose,
  entry,
  setEntry,
}: EntryDialogProps) {
  const [goalsWithActivities, setGoalsWithActivities] = useState<
    GoalWithActivities[]
  >([]);
  const [selectedGoalWithActivities, setSelectedGoalWithActivities] =
    useState<GoalWithActivities | null>(null);

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
  }, []);

  function onClose() {
    setSelectedGoalWithActivities(null);
    handleClose();
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{entry.taskDescription}</DialogTitle>

      <DialogContent>
        {error !== '' ? <ErrorHandler errorMsg={error} /> : <></>}

        <Autocomplete
          options={goalsWithActivities}
          fullWidth
          renderInput={(params) => <TextField {...params} label='Goal' />}
          getOptionLabel={(goalWithActivities) =>
            goalWithActivities.goal.goalName
          }
          defaultValue={goalsWithActivities.find((goalWithActivity) =>
            goalWithActivity.activities.find(
              (activity) => activity.activityId === entry.activityId
            )
          )}
          onChange={(event, value) => {
            setSelectedGoalWithActivities(value);
          }}
          sx={{
            marginTop: '10px',
          }}
        />

        <Autocomplete
          options={selectedGoalWithActivities?.activities ?? []}
          fullWidth
          getOptionLabel={(activity) => activity.activityName}
          defaultValue={selectedGoalWithActivities?.activities.find(
            (activity) => activity.activityId === entry.activityId
          )}
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
