import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { Activity } from '../../api/api-interface';

interface ActivityDialogProps {
  open: boolean;
  onClose: () => void;
  activity?: Activity;
}

export default function ActivityDialog({
  open,
  onClose,
  activity,
}: ActivityDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Activity</DialogTitle>
      <DialogContent>
        <Autocomplete
          disablePortal
          id='combo-box-demo'
          options={['hey', 'hi', 'ho']}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label='Movie' />}
        />

        <TextField
          autoFocus
          margin='dense'
          id='name'
          label='Email Address'
          type='email'
          fullWidth
          variant='filled'
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onClose}>Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
}