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
  Activity,
  Entry,
  GoalWithActivities,
  addNewEntry,
  getAllGoalsAndActivities,
  updateEntry,
} from '../../api/api-interface';
import {
  validateEntryForAdd,
  validateEntryForEdit,
} from '../../validators/entry-validator';
import ErrorHandler from '../ErrorHandler/ErrorHandler';

export enum EntryDialogMode {
  AddMode,
  EditMode,
}

function findGoalFromActivityId(
  goals: GoalWithActivities[],
  givenActivityId: number
): GoalWithActivities | null {
  const foundGoal = goals.find((goal: GoalWithActivities) => {
    return goal.activities.find(
      (activity: Activity) => activity.activityId === givenActivityId
    );
  });

  return foundGoal ?? null;
}

function findActivityFromActivityId(
  activities: Activity[],
  givenActivityId: number
): Activity | null {
  const foundActivity = activities.find(
    (activity: Activity) => activity.activityId === givenActivityId
  );

  return foundActivity ?? null;
}

interface EntryDialogProps {
  open: boolean;
  handleClose: () => void;
  entry: Partial<Entry>;
  setEntry: React.Dispatch<React.SetStateAction<Partial<Entry>>>;
  mode: EntryDialogMode;
}

async function addEntry(entry: Entry) {
  return addNewEntry(entry);
}

async function editEntry(entry: Entry) {
  return updateEntry(entry);
}

type GoalOption = GoalWithActivities;
type ActivityOption = Activity;

export default function EntryDialog({
  open,
  handleClose,
  entry,
  setEntry,
  mode,
}: EntryDialogProps) {
  const [goalOptions, setGoalOptions] = useState<GoalOption[]>([]);
  const [activityOptions, setActivityOptions] = useState<ActivityOption[]>([]);

  const [selectedGoalOption, setSelectedGoalOption] =
    useState<GoalOption | null>(null);
  const [selectedActivityOption, setSelectedActivityOption] =
    useState<ActivityOption | null>(null);

  const [timeSpentString, setTimeSpentString] = useState<string>('');

  const [error, setError] = useState<string>('');

  // Default: Gets all goal data.
  useEffect(() => {
    async function getGoalOptions() {
      setGoalOptions(await getAllGoalsAndActivities());
    }

    if (open) {
      getGoalOptions();
    }
  }, [open]);

  // Gets activity data from a selected goal.
  useEffect(() => {
    if (open && selectedGoalOption)
      setActivityOptions(selectedGoalOption.activities);
  }, [selectedGoalOption, open]);

  // Handle entry data if exists
  useEffect(() => {
    if (open && entry.activityId && goalOptions && activityOptions) {
      setSelectedGoalOption(
        findGoalFromActivityId(goalOptions, entry.activityId)
      );
      setSelectedActivityOption(
        findActivityFromActivityId(activityOptions, entry.activityId)
      );
    }
  }, [open, entry, goalOptions, activityOptions]);

  useEffect(() => {
    if (open && entry.timeSpent) {
      setTimeSpentString(entry.timeSpent.toString());
    }
  }, [open, entry]);

  function onClose() {
    setSelectedGoalOption(null);
    setSelectedActivityOption(null);
    setTimeSpentString('');
    setError('');
    handleClose();
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Entry</DialogTitle>

      <DialogContent>
        {error !== '' ? <ErrorHandler errorMsg={error} /> : <></>}

        <Autocomplete
          options={goalOptions}
          fullWidth
          renderInput={(params) => <TextField {...params} label='Goal' />}
          getOptionLabel={(goalWithActivities: GoalOption) =>
            goalWithActivities.goal.goalName
          }
          isOptionEqualToValue={(option, value) =>
            option.goal.goalId === value.goal.goalId
          }
          value={selectedGoalOption}
          onChange={(event: any, newValue: GoalOption | null) => {
            setSelectedGoalOption(newValue);
          }}
          sx={{
            marginTop: '10px',
          }}
        />

        <Autocomplete
          options={activityOptions}
          fullWidth
          getOptionLabel={(activity: ActivityOption) => activity.activityName}
          isOptionEqualToValue={(option, value) =>
            option.activityId === value.activityId
          }
          renderInput={(params) => <TextField {...params} label='Activity' />}
          value={selectedActivityOption}
          onChange={(event: any, value: ActivityOption | null) => {
            setSelectedActivityOption(value);
            if (value) {
              setEntry((entry) => ({ ...entry, activityId: value.activityId }));
            }
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
          error={
            timeSpentString !== '' &&
            !TimeSpent.validateTimeString(timeSpentString)
          }
          autoFocus
          margin='dense'
          id='name'
          label='Hours'
          helperText='Time format: HH:mm e.g. 25:00 is 25 hours.'
          type='text'
          fullWidth
          variant='filled'
          value={timeSpentString}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setTimeSpentString(event.target.value);

            // This has to be event.target.value and not the state variable since for some reason,
            // the state variable hasn't been set yet by the time execution reaches this line, even
            // though setState was called earlier.
            if (TimeSpent.validateTimeString(event.target.value)) {
              setEntry((entry) => ({
                ...entry,
                timeSpent: TimeSpent.buildFromFormattedTimeString(
                  event.target.value
                ),
              }));
            }
          }}
        />

        <TimePicker
          label='Start Time'
          sx={{ width: '100%', marginTop: '10px' }}
          value={dayjs(entry.startTime)}
          onChange={(newStartTime) => {
            setEntry((entry) => ({
              ...entry,
              startTime: newStartTime?.toDate(),
            }));
          }}
        />

        <TimePicker
          label='End Time '
          sx={{ width: '100%', marginTop: '10px' }}
          value={dayjs(entry.endTime)}
          onChange={(newEndTime) =>
            setEntry((entry) => ({ ...entry, endTime: newEndTime?.toDate() }))
          }
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            onClose();
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={async () => {
            // For Edit mode, pass in an Entry, then set State directly, don't build an Entry.
            try {
              if (mode === EntryDialogMode.AddMode) {
                const entryForPost = validateEntryForAdd(entry);
                await addEntry(entryForPost);
              } else if (mode === EntryDialogMode.EditMode) {
                const entryForPost = validateEntryForEdit(entry);
                await editEntry(entryForPost);
              }

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
