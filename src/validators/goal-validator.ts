import { Goal } from '../api/api-interface';

function checkValidGoal(partialGoal: Partial<Goal>): Goal {
  if (partialGoal.goalId === undefined) throw new Error('Goal ID undefined!');
  if (partialGoal.goalName === undefined)
    throw new Error('Goal name undefined!');

  return {
    goalId: partialGoal.goalId,
    goalName: partialGoal.goalName,
  };
}

export function validateGoalForAdd(partialGoal: Partial<Goal>): Goal {
  partialGoal.goalId = -1; // The ID is not used in this case
  const goal = checkValidGoal(partialGoal);
  return goal;
}

export function validateGoalForEdit(partialGoal: Partial<Goal>): Goal {
  let error = '';

  const goal = checkValidGoal(partialGoal);

  if (goal.goalId === null || goal.goalId < 0) error += 'Goal ID invalid!';

  if (error !== '') throw new Error(error);

  return goal;
}
