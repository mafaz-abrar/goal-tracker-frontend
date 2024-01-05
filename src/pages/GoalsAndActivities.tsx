import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { goalsTest } from '../api/test-data';
import GoalsAndActivitiesTableGroup from '../components/GoalsAndActivitiesTableGroup/GoalsAndActivitiesTableGroup';

export default function GoalsAndActivities() {
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
      <TextField variant='outlined' label='Search' fullWidth />

      <GoalsAndActivitiesTableGroup goals={goalsTest} style={{}} />
    </div>
  );
}
