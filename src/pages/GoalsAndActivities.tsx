import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import {
  GoalWithActivities,
  getAllGoalsAndActivities,
} from '../api/api-interface';
import GoalsAndActivitiesTableGroup from '../components/GoalsAndActivitiesTableGroup/GoalsAndActivitiesTableGroup';
import { RowContext } from './Home';

function filterGoalsBySearchTerm(
  goalsWithActivities: GoalWithActivities[],
  searchTerm: string
): GoalWithActivities[] {
  if (searchTerm.toLowerCase() === '') {
    return goalsWithActivities;
  }

  const goalsWithMatchingActivities = goalsWithActivities
    .map((goalWithActivities) => {
      const filteredActivities = goalWithActivities.activities.filter(
        (activity) =>
          activity.activityName.toLowerCase().includes(searchTerm.toLowerCase())
      );

      return {
        goal: goalWithActivities.goal,
        activities: filteredActivities,
      };
    })
    .filter((goalWithActivities) => goalWithActivities.activities.length);

  if (goalsWithMatchingActivities.length !== 0)
    return goalsWithMatchingActivities;

  return goalsWithActivities.filter((goalWithActivities) =>
    goalWithActivities.goal.goalName
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );
}

export default function GoalsAndActivities() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [goalsWithActivities, setGoalsWithActivities] = useState<
    GoalWithActivities[]
  >([]);
  const [flipped, setFlipped] = useState<boolean>(false);

  useEffect(() => {
    async function getData() {
      const response = await getAllGoalsAndActivities();

      setGoalsWithActivities(response);
    }
    getData();
  }, [flipped]);

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

      <RowContext.Provider value={{ setFlipped }}>
        <GoalsAndActivitiesTableGroup
          goalsWithActivities={filterGoalsBySearchTerm(
            goalsWithActivities,
            searchTerm
          )}
        />
      </RowContext.Provider>
    </div>
  );
}
