import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useConfirm } from 'material-ui-confirm';
import { useContext } from 'react';
import {
  Activity,
  deleteActivity,
  flipTargeting,
} from '../../api/api-interface';
import GoalTrackerDisabledIcon from '../../assets/GoalTrackerDisabledIcon.png';
import GoalTrackerIcon from '../../assets/GoalTrackerIcon.png';
import {
  ActivityMode,
  GoalsAndActivitiesContext,
} from '../../pages/GoalsAndActivities';
import { RowContext } from '../../pages/Home';

async function postData(activityId: number) {
  await flipTargeting(activityId);
}

async function postDelete(activityId: number) {
  await deleteActivity(activityId);
}

interface ActivityRowProps {
  activity: Activity;
}

export default function ActivityRow({ activity }: ActivityRowProps) {
  const { setFlipped } = useContext(RowContext);

  const { handleOpenActivity, setActivityData, setActivityMode } = useContext(
    GoalsAndActivitiesContext
  );

  const confirm = useConfirm();

  return (
    <TableRow>
      <TableCell sx={{ width: '80%' }}>{activity.activityName}</TableCell>
      <TableCell sx={{ textAlign: 'center', alignItems: 'center' }}>
        <Button
          onClick={async () => {
            await postData(activity.activityId);
            setFlipped((val) => !val);
          }}
        >
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

      <TableCell sx={{ textAlign: 'center' }}>{activity.weighting}</TableCell>
      <TableCell>
        <IconButton
          onClick={() => {
            setActivityMode(ActivityMode.EditMode);
            setActivityData(activity);
            handleOpenActivity();
          }}
        >
          <EditIcon />
        </IconButton>
      </TableCell>
      <TableCell>
        <IconButton
          onClick={async () => {
            try {
              await confirm({ description: 'This action is permanent!' });
              await postDelete(activity.activityId);
            } catch {
              // fuck me... how tf am i supposed to handle ACTUAL errors... bitch
            } finally {
              setFlipped((val) => !val);
            }
          }}
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
