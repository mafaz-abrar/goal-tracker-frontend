import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { useConfirm } from 'material-ui-confirm';
import { useContext, useState } from 'react';
import { GoalWithActivities, deleteGoal } from '../../api/api-interface';
import {
  ActivityMode,
  GoalMode,
  GoalsAndActivitiesContext,
} from '../../pages/GoalsAndActivities';
import { RowContext } from '../../pages/Home';
import ActivityRow from './ActivityRow';

interface GoalGroupProps {
  goalWithActivities: GoalWithActivities;
}

async function postDelete(goalId: number) {
  await deleteGoal(goalId);
}

export default function GoalGroup({ goalWithActivities }: GoalGroupProps) {
  const [open, setOpen] = useState(false);

  const { setFlipped } = useContext(RowContext);
  const { setGoalData, setActivityData, setGoalMode, setActivityMode } =
    useContext(GoalsAndActivitiesContext);

  const { handleOpenActivity, handleOpenGoal } = useContext(
    GoalsAndActivitiesContext
  );

  const confirm = useConfirm();

  return (
    <TableContainer
      component={Paper}
      sx={{ marginTop: '20px', marginBottom: '20px' }}
    >
      <Table>
        <TableBody>
          <TableRow
            sx={{
              backgroundColor: 'black',
            }}
          >
            <TableCell
              sx={{
                width: '90%',
                color: 'white',

                '&:hover': {
                  color: 'rgba(180,180,180,1)',
                  cursor: 'pointer',
                },
              }}
              onClick={() => setOpen(!open)}
            >
              {goalWithActivities.goal.goalName}
            </TableCell>
            <TableCell>
              <IconButton
                sx={{ color: 'white' }}
                onClick={() => {
                  setActivityMode(ActivityMode.AddMode);
                  setActivityData({
                    targeting: false,
                    goalId: goalWithActivities.goal.goalId,
                    weighting: 0,
                  });
                  handleOpenActivity();
                }}
              >
                <AddIcon />
              </IconButton>
            </TableCell>
            <TableCell>
              <IconButton
                sx={{ color: `white` }}
                onClick={() => {
                  setGoalMode(GoalMode.EditMode);
                  setGoalData(goalWithActivities.goal);
                  handleOpenGoal();
                }}
              >
                <EditIcon />
              </IconButton>
            </TableCell>
            <TableCell>
              <IconButton
                sx={{
                  color: 'white',
                }}
                onClick={async () => {
                  try {
                    await confirm({ description: 'This action is permanent!' });
                    await postDelete(goalWithActivities.goal.goalId);
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
          <TableRow>
            <TableCell style={{ padding: 0 }} colSpan={4}>
              <Collapse in={open} timeout='auto' unmountOnExit>
                <Table>
                  {goalWithActivities.activities.map((activity, index) => (
                    <ActivityRow key={index} activity={activity} />
                  ))}
                </Table>
              </Collapse>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
