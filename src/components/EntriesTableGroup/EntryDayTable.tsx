import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';

import TableRow from '@mui/material/TableRow';
import dayjs from 'dayjs';
import { useState } from 'react';
import { DayWithExpandedEntries } from '../../api/api-interface';
import EntryRow from './EntryRow';

interface EntryTableProps {
  day: DayWithExpandedEntries;
}

export default function EntryTable({ day }: EntryTableProps) {
  const [open, setOpen] = useState(false);

  return (
    <TableContainer
      component={Paper}
      sx={{ marginTop: '20px', marginBottom: '20px' }}
    >
      <Table>
        <TableRow
          sx={{
            backgroundColor: 'black',
            color: 'white',
          }}
        >
          <TableCell sx={{ width: '5%' }}>
            <IconButton
              aria-label='expand row'
              size='small'
              sx={{ color: 'white' }}
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell
            sx={{
              width: '90%',
              textAlign: 'left',
              color: 'white',
              '&:hover': {
                color: 'rgba(180,180,180,1)',
                cursor: 'pointer',
              },
            }}
            onClick={() => setOpen(!open)}
          >
            {dayjs(day.date).format('dddd, DD MMM YYYY')}
          </TableCell>
          <TableCell>
            <IconButton sx={{ color: 'white' }}>
              <AddIcon />
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingTop: 0, paddingBottom: 0 }} colSpan={3}>
            <Collapse in={open} timeout='auto' unmountOnExit>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Activity Name</TableCell>
                    <TableCell>Task Description</TableCell>
                    <TableCell>Hours</TableCell>
                    <TableCell>Start</TableCell>
                    <TableCell>End</TableCell>
                    <TableCell></TableCell>

                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {day.expandedEntries.map((expandedEntry) => (
                    <EntryRow expandedEntry={expandedEntry} />
                  ))}
                </TableBody>
              </Table>
            </Collapse>
          </TableCell>
        </TableRow>
      </Table>
    </TableContainer>
  );
}
