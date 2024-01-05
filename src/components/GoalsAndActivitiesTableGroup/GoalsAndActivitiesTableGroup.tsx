import { Goal } from '../../api/api-interface';
import GoalTable from './GoalTable';

interface GoalsAndActivitiesTableGroupProps {
  goals: Goal[];
  style?: React.CSSProperties;
}

export default function GoalsAndActivitiesTableGroup({
  goals,
  style,
}: GoalsAndActivitiesTableGroupProps) {
  return (
    <div style={style}>
      {goals.map((goal) => (
        <GoalTable goal={goal} />
      ))}
    </div>
  );
}
