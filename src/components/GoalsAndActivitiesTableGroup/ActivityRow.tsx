import Button from '@mui/material/Button';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Activity } from '../../api/api-interface';
import GoalTrackerDisabledIcon from '../../assets/GoalTrackerDisabledIcon.png';
import GoalTrackerIcon from '../../assets/GoalTrackerIcon.png';

interface ActivityRowProps {
  activity: Activity;
}

export default function ActivityRow({ activity }: ActivityRowProps) {
  return (
    <TableRow>
      <TableCell sx={{ width: '80%' }}>{activity.activityName}</TableCell>
      <TableCell
        sx={{ width: '10%', textAlign: 'center', alignItems: 'center' }}
      >
        <Button>
          {activity.targeting ? (
            <img
              src={GoalTrackerIcon}
              alt='targeting'
              style={{ width: '20px', height: '20px' }}
            />
          ) : (
            <img
              src={GoalTrackerDisabledIcon}
              alt='not targeting'
              style={{ width: '20px', height: '20px' }}
            />
          )}
        </Button>
      </TableCell>

      <TableCell sx={{ width: '10%', textAlign: 'center' }}>
        {activity.weighting}
      </TableCell>
    </TableRow>
  );
}
