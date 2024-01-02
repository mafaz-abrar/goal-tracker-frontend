import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import { Goal } from '../../api/api-interface';
import ActivityRow from './ActivityRow';

interface GoalGroupProps {
  goal: Goal;
}

export default function GoalGroup({ goal }: GoalGroupProps) {
  const [open, setOpen] = useState(true);

  return (
    <TableContainer
      component={Paper}
      sx={{ marginTop: '20px', marginBottom: '20px' }}
    >
      <Table>
        <TableRow>
          <TableCell sx={{ width: '5%' }}>
            <IconButton
              aria-label='expand row'
              size='small'
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell sx={{ width: '90%', textAlign: 'left' }}>
            {goal.goalName}
          </TableCell>
          <TableCell>
            <IconButton>
              <AddIcon />
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
            <Collapse in={open} timeout='auto' unmountOnExit>
              <Table>
                {goal.activities.map((activity) => (
                  <ActivityRow activity={activity} />
                ))}
              </Table>
            </Collapse>
          </TableCell>
        </TableRow>
      </Table>
    </TableContainer>
  );
}
