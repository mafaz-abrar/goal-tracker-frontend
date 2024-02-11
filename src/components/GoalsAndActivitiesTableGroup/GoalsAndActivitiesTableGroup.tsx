import { GoalWithActivities } from '../../api/api-interface';
import GoalTable from './GoalTable';

interface GoalsAndActivitiesTableGroupProps {
  goalsWithActivities: GoalWithActivities[];
  style?: React.CSSProperties;
}

export default function GoalsAndActivitiesTableGroup({
  goalsWithActivities,
  style,
}: GoalsAndActivitiesTableGroupProps) {
  return (
    <div style={style}>
      {goalsWithActivities.map((goalWithActivities, index) => (
        <GoalTable key={index} goalWithActivities={goalWithActivities} />
      ))}
    </div>
  );
}
