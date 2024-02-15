import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useContext, useState } from 'react';
import { Goal, addNewGoal, updateGoal } from '../../api/api-interface';
import {
  GoalMode,
  GoalsAndActivitiesContext,
} from '../../pages/GoalsAndActivities';
import {
  validateGoalForAdd,
  validateGoalForEdit,
} from '../../validators/goal-validator';
import ErrorHandler from '../ErrorHandler/ErrorHandler';

interface GoalDialogProps {
  open: boolean;
  onClose: () => void;
  goal: Partial<Goal>;
}

export default function GoalDialog({ open, onClose, goal }: GoalDialogProps) {
  const { setGoalData, goalMode } = useContext(GoalsAndActivitiesContext);
  const [error, setError] = useState<string>('');

  function onExit() {
    setError('');
    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Goal</DialogTitle>
      <DialogContent>
        {error !== '' ? <ErrorHandler errorMsg={error} /> : <></>}

        <TextField
          autoFocus
          margin='dense'
          id='name'
          label='Goal name'
          type='text'
          fullWidth
          variant='filled'
          value={goal.goalName}
          onChange={(event) => {
            setGoalData((prev) => ({
              ...prev,
              goalName: event.target.value,
            }));
          }}
          sx={{ marginTop: '10px', width: '20vw' }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onExit}>Cancel</Button>
        <Button
          onClick={async () => {
            try {
              if (goalMode === GoalMode.AddMode) {
                const goalForPost = validateGoalForAdd(goal);
                await addNewGoal(goalForPost);
              } else if (goalMode === GoalMode.EditMode) {
                const goalForPost = validateGoalForEdit(goal);
                await updateGoal(goalForPost);
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
