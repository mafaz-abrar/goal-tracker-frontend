import Collapse from '@mui/material/Collapse';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';

import TableRow from '@mui/material/TableRow';
import dayjs from 'dayjs';
import { useState } from 'react';
import { DayWithExpandedEntries, Entry } from '../../api/api-interface';
import EntryRow from './EntryRow';

interface EntryTableProps {
  day: DayWithExpandedEntries;
  setEntryData: React.Dispatch<React.SetStateAction<Partial<Entry>>>;
  handleDialogOpen: () => void;
}

export default function EntryTable({
  day,
  setEntryData,
  handleDialogOpen,
}: EntryTableProps) {
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
          <TableCell
            sx={{
              width: '90%',
              color: 'white',
              textAlign: 'center',
              '&:hover': {
                color: 'rgba(180,180,180,1)',
                cursor: 'pointer',
              },
            }}
            onClick={() => setOpen(!open)}
          >
            {dayjs(day.date).format('dddd, DD MMM YYYY')}
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
                  {day.expandedEntries.map((expandedEntry, index) => (
                    <EntryRow
                      key={index}
                      expandedEntry={expandedEntry}
                      setEntryData={setEntryData}
                      handleDialogOpen={handleDialogOpen}
                    />
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
