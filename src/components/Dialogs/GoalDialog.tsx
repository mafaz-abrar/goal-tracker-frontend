import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { Goal } from '../../api/api-interface';

interface GoalDialogProps {
  open: boolean;
  onClose: () => void;
  goal?: Goal;
}

export default function GoalDialog({ open, onClose, goal }: GoalDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Goal</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin='dense'
          id='name'
          label='Email Address'
          type='text'
          fullWidth
          variant='filled'
          defaultValue={goal?.goalName}
          value={goal?.goalName}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onClose}>Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
}
