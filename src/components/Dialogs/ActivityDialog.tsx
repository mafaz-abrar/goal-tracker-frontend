import { FormControlLabel, FormGroup, Switch } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useContext, useEffect, useState } from 'react';
import TimeSpent from '../../api/TimeSpent';
import {
  Activity,
  Goal,
  addNewActivity,
  getAllGoals,
  updateActivity,
} from '../../api/api-interface';
import {
  ActivityMode,
  GoalsAndActivitiesContext,
} from '../../pages/GoalsAndActivities';
import {
  validateActivityForAdd,
  validateActivityForEdit,
} from '../../validators/activity-validator';
import ErrorHandler from '../ErrorHandler/ErrorHandler';

function findGoalFromGoalId(goals: Goal[], givenGoalId: number): Goal | null {
  const foundGoal = goals.find((goal: Goal) => goal.goalId === givenGoalId);

  return foundGoal ?? null;
}
interface ActivityDialogProps {
  open: boolean;
  onClose: () => void;
  activity: Partial<Activity>;
}

export default function ActivityDialog({
  open,
  onClose,
  activity,
}: ActivityDialogProps) {
  const [goalData, setGoalData] = useState<Goal[]>([]);
  const [selectedGoalOption, setSelectedGoalOption] = useState<Goal | null>(
    null
  );
  const [targetString, setTargetString] = useState<string>('');

  const [error, setError] = useState<string>('');

  const { setActivityData, activityMode } = useContext(
    GoalsAndActivitiesContext
  );

  useEffect(() => {
    async function getData() {
      const data = await getAllGoals();
      setGoalData(data);
    }
    if (open) getData();
  }, [open]);

  useEffect(() => {
    if (open && activity.goalId && goalData) {
      setSelectedGoalOption(findGoalFromGoalId(goalData, activity.goalId));
    }
  }, [open, activity, goalData]);

  useEffect(() => {
    if (open && activity.target) {
      setTargetString(activity.target.toString());
    }
  }, [open, activity]);

  function onExit() {
    setError('');
    onClose();
    setTargetString('');
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Activity</DialogTitle>
      <DialogContent>
        {error !== '' ? <ErrorHandler errorMsg={error} /> : <></>}

        <Autocomplete
          disablePortal
          options={goalData}
          getOptionLabel={(goal) => goal.goalName}
          sx={{ marginTop: '10px', width: '20vw' }}
          fullWidth
          renderInput={(params) => <TextField {...params} label='Goal' />}
          value={selectedGoalOption}
          onChange={(event: any, newValue: Goal | null) => {
            setSelectedGoalOption(newValue);
            if (newValue)
              setActivityData((prev) => ({
                ...prev,
                goalId: newValue.goalId,
              }));
          }}
        />

        <TextField
          autoFocus
          margin='dense'
          id='name'
          label='Activity Name'
          type='text'
          fullWidth
          variant='filled'
          value={activity.activityName}
          onChange={(event) =>
            setActivityData((prev) => ({
              ...prev,
              activityName: event.target.value,
            }))
          }
        />
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={activity.targeting}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setActivityData((prev) => ({
                    ...prev,
                    targeting: event.target.checked,
                  }))
                }
              />
            }
            label='Targeting?'
          />
        </FormGroup>

        <TextField
          autoFocus
          margin='dense'
          id='name'
          label='Weighting'
          type='number'
          fullWidth
          variant='filled'
          value={activity.weighting}
          onChange={(event) =>
            setActivityData((prev) => ({
              ...prev,
              weighting: +event.target.value,
            }))
          }
        />

        <TextField
          error={
            targetString !== '' && !TimeSpent.validateTimeString(targetString)
          }
          autoFocus
          margin='dense'
          id='name'
          label='Target'
          type='text'
          fullWidth
          variant='filled'
          value={targetString}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setTargetString(event.target.value);

            // This has to be event.target.value and not the state variable since for some reason,
            // the state variable hasn't been set yet by the time execution reaches this line, even
            // though setState was called earlier.
            if (TimeSpent.validateTimeString(event.target.value)) {
              setActivityData((prev) => ({
                ...prev,
                target: TimeSpent.buildFromFormattedTimeString(
                  event.target.value
                ),
              }));
            }
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onExit}>Cancel</Button>
        <Button
          onClick={async () => {
            try {
              if (activityMode === ActivityMode.AddMode) {
                const activityForPost = validateActivityForAdd(activity);
                await addNewActivity(activityForPost);
              } else if (activityMode === ActivityMode.EditMode) {
                const activityForPost = validateActivityForEdit(activity);
                await updateActivity(activityForPost);
              }

              onExit();
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
