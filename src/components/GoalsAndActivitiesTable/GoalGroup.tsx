import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Goal } from '../../api/types';
import ActivityRow from './ActivityRow';

interface GoalGroupProps {
  goal: Goal;
}

export default function GoalGroup({ goal }: GoalGroupProps) {
  return (
    <TableRow>
      <TableCell>{goal.goalName}</TableCell>
      {goal.activities.map(() => (
        <ActivityRow />
      ))}
    </TableRow>
  );
}
