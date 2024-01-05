import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { Goal } from '../api/api-interface';
import { goalsTest } from '../api/test-data';
import GoalsAndActivitiesTableGroup from '../components/GoalsAndActivitiesTableGroup/GoalsAndActivitiesTableGroup';

function filterGoalsBySearchTerm(goals: Goal[], searchTerm: string): Goal[] {
  if (searchTerm.toLowerCase() === '') {
    return goals;
  }

  const goalsWithMatchingActivities = goals
    .map((goal) => {
      const filteredActivities = goal.activities.filter((activity) =>
        activity.activityName.toLowerCase().includes(searchTerm.toLowerCase())
      );

      return {
        goalId: goal.goalId,
        goalName: goal.goalName,
        activities: filteredActivities,
      };
    })
    .filter((goal) => goal.activities.length);

  if (goalsWithMatchingActivities.length !== 0)
    return goalsWithMatchingActivities;

  return goals.filter((goal) =>
    goal.goalName.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

export default function GoalsAndActivities() {
  const [searchTerm, setSearchTerm] = useState<string>('');

  return (
    <div
      style={{
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',

          paddingTop: '10px',
          paddingBottom: '10px',
          alignItems: 'center',
        }}
      >
        <h1
          style={{
            fontFamily: 'Nunito',
          }}
        >
          Goals and Activities
        </h1>
        <Button
          sx={{
            height: '7vh',
          }}
          variant='outlined'
        >
          Add Goal
        </Button>
      </div>
      <TextField
        variant='outlined'
        label='Search'
        fullWidth
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
      />

      <GoalsAndActivitiesTableGroup
        goals={filterGoalsBySearchTerm(goalsTest, searchTerm)}
      />
    </div>
  );
}
