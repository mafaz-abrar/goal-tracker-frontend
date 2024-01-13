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
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useEffect, useState } from 'react';
import TimeSpent from '../../api/TimeSpent';
import { Entry, GoalWithActivities, Id } from '../../api/api-interface';
import { goalsWithActivitiesTestData } from '../../api/test-data';

interface AddEditEntryDialogProps {
  open: boolean;
  handleClose: () => void;
  entry?: Entry;
}

async function postData(entry: Entry) {
  // return await createNewEntry(entry);
}

function processGoalWithActivitiesForActivityIdAutocomplete(
  goalsWithActivities: GoalWithActivities[],
  goalId: Id
) {
  const selectedGoal: GoalWithActivities | undefined = goalsWithActivities.find(
    (goalWithActivities) => goalWithActivities.goal.goalId === goalId
  );

  if (selectedGoal === undefined) return [];

  return selectedGoal.activities.map((activity) => ({
    label: activity.activityName,
    val: activity.activityId,
  }));
}

export default function AddEditEntryDialog({
  open,
  handleClose,
  entry,
}: AddEditEntryDialogProps) {
  const [goalsWithActivities, setGoalsWithActivities] = useState<
    GoalWithActivities[]
  >([]);
  const [selectedGoalWithActivities, setSelectedGoalWithActivities] =
    useState<GoalWithActivities | null>(null);

  const [activityId, setActivityId] = useState<Id>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [desc, setDesc] = useState('');
  const [timeSpent, setTimeSpent] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  useEffect(() => {
    setGoalsWithActivities(goalsWithActivitiesTestData);
  }, []);

  useEffect(() => {
    if (entry !== null) {
    }
  });

  function onClose() {
    setSelectedGoalWithActivities(null);
    handleClose();
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Entry</DialogTitle>

      <DialogContent>
        <Autocomplete
          options={goalsWithActivities}
          fullWidth
          renderInput={(params) => <TextField {...params} label='Goal' />}
          getOptionLabel={(goalWithActivities) =>
            goalWithActivities.goal.goalName
          }
          defaultValue={goalsWithActivities.find((goalWithActivity) =>
            goalWithActivity.activities.find(
              (activity) => activity.activityId === activityId
            )
          )}
          onChange={(event, value) => {
            if (value !== null) setSelectedGoalWithActivities(value);
          }}
          sx={{
            marginTop: '10px',
          }}
        />

        <Autocomplete
          options={
            selectedGoalWithActivities?.activities.filter(
              (activity) => activity.activityId === 3
            ) ?? []
          }
          fullWidth
          getOptionLabel={(activity) => activity.activityName}
          renderInput={(params) => <TextField {...params} label='Activity' />}
          onChange={(event, value) => {
            if (value !== null) setActivityId(value.activityId);
          }}
          sx={{
            marginTop: '10px',
          }}
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker sx={{ width: '100%', marginTop: '10px' }} label='Date' />
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
          helperText='Time format: HH:mm e.g. 25:00 is 25 hours.'
          type='email'
          fullWidth
          variant='filled'
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label='Start Time'
            sx={{ width: '100%', marginTop: '10px' }}
          />
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label='End Time '
            sx={{ width: '100%', marginTop: '10px' }}
          />
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={() => {
            const timeSpentToPost = new TimeSpent();
            timeSpentToPost.setFromFormattedTimeString(timeSpent);

            postData({
              entryId: entry?.entryId ?? null,
              date: date ?? new Date(),
              activityId: activityId ?? 0,
              taskDescription: desc,
              timeSpent: timeSpentToPost,
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
