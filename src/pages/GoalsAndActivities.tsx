import Button from '@mui/material/Button';

export default function GoalsAndActivities() {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '80%',
          marginLeft: 'auto',
          marginRight: 'auto',
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
        >
          +Add Goal
        </Button>
      </div>
    </div>
  );
}
