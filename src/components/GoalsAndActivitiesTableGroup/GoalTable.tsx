import AddIcon from '@mui/icons-material/Add';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import { GoalWithActivities } from '../../api/api-interface';
import ActivityRow from './ActivityRow';

interface GoalGroupProps {
  goalWithActivities: GoalWithActivities;
}

export default function GoalGroup({ goalWithActivities }: GoalGroupProps) {
  const [open, setOpen] = useState(false);

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
              color: 'white',
            }}
          >
            <TableCell
              sx={{
                width: '95%',
                textAlign: 'center',
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
              <IconButton sx={{ color: 'white' }}>
                <AddIcon />
              </IconButton>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ padding: 0 }} colSpan={3}>
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
