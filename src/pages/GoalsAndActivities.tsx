import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react';
import {
  Activity,
  Goal,
  GoalWithActivities,
  getAllGoalsAndActivities,
} from '../api/api-interface';
import ActivityDialog from '../components/Dialogs/ActivityDialog';
import GoalDialog from '../components/Dialogs/GoalDialog';
import GoalsAndActivitiesTableGroup from '../components/GoalsAndActivitiesTableGroup/GoalsAndActivitiesTableGroup';
import { RowContext } from './Home';

export enum GoalMode {
  AddMode,
  EditMode,
}

export enum ActivityMode {
  AddMode,
  EditMode,
}
interface GoalsAndActivitiesContextType {
  setActivityData: Dispatch<SetStateAction<Partial<Activity>>>;
  setGoalData: Dispatch<SetStateAction<Partial<Goal>>>;
  handleOpenActivity: () => void;
  handleOpenGoal: () => void;
  goalMode: GoalMode;
  setGoalMode: Dispatch<SetStateAction<GoalMode>>;
  activityMode: ActivityMode;
  setActivityMode: Dispatch<SetStateAction<ActivityMode>>;
}

export const GoalsAndActivitiesContext =
  createContext<GoalsAndActivitiesContextType>({
    setActivityData: () => {},
    setGoalData: () => {},
    handleOpenActivity: () => {},
    handleOpenGoal: () => {},
    goalMode: GoalMode.AddMode,
    setGoalMode: () => {},
    activityMode: ActivityMode.AddMode,
    setActivityMode: () => {},
  });

function filterGoalsBySearchTerm(
  goalsWithActivities: GoalWithActivities[],
  searchTerm: string
): GoalWithActivities[] {
  if (searchTerm.toLowerCase() === '') {
    return goalsWithActivities;
  }

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

  const [goalData, setGoalData] = useState<Partial<Goal>>({});
  const [activityData, setActivityData] = useState<Partial<Activity>>({});

  const [openGoal, setOpenGoal] = useState(false);
  const handleOpenGoal = () => setOpenGoal(true);
  const handleCloseGoal = () => setOpenGoal(false);

  const [goalMode, setGoalMode] = useState<GoalMode>(GoalMode.AddMode);

  const [openActivity, setOpenActivity] = useState(false);
  const handleOpenActivity = () => setOpenActivity(true);
  const handleCloseActivity = () => setOpenActivity(false);

  const [activityMode, setActivityMode] = useState<ActivityMode>(
    ActivityMode.AddMode
  );

  const [flipped, setFlipped] = useState<boolean>(false);

  useEffect(() => {
    async function getData() {
      const response = await getAllGoalsAndActivities();
      response.sort((a, b: GoalWithActivities) => {
        return a.goal.goalName < b.goal.goalName ? -1 : 1;
      });
      setGoalsWithActivities(response);
    }
    getData();
  }, [flipped, openActivity, openGoal]);

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
          onClick={() => {
            setGoalMode(GoalMode.AddMode);
            setGoalData({});
            handleOpenGoal();
          }}
        >
          Add Goal
        </Button>
      </div>
      <TextField
        variant='outlined'
        label='Search Goals'
        fullWidth
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
      />

      <GoalsAndActivitiesContext.Provider
        value={{
          setActivityData,
          setGoalData,
          handleOpenActivity,
          handleOpenGoal,
          goalMode,
          setGoalMode,
          activityMode,
          setActivityMode,
        }}
      >
        <RowContext.Provider value={{ setFlipped }}>
          <GoalsAndActivitiesTableGroup
            goalsWithActivities={filterGoalsBySearchTerm(
              goalsWithActivities,
              searchTerm
            )}
          />

          <GoalDialog
            open={openGoal}
            onClose={handleCloseGoal}
            goal={goalData}
          />
          <ActivityDialog
            open={openActivity}
            onClose={handleCloseActivity}
            activity={activityData}
          />
        </RowContext.Provider>
      </GoalsAndActivitiesContext.Provider>
    </div>
  );
}
