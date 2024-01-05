import Button from '@mui/material/Button';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { WeeklyEntry } from '../api/api-interface';
import { weeklyEntriesTestData } from '../api/test-data';
import AddEntryDialog from '../components/Modals/AddEntryDialog/AddEntryDialog';
import WeeklyEntryTable from '../components/WeeklyEntryTable/WeeklyEntryTable';

export default function Home() {
  const [weeklyEntries, setWeeklyEntries] = useState<WeeklyEntry[]>([]);
  const [filterDate, setFilterDate] = useState<Dayjs>(dayjs());

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    async function getData() {
      setWeeklyEntries(weeklyEntriesTestData);
    }

    getData();
  }, []);

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
          alignItems: 'center',
        }}
      >
        <h1
          style={{
            fontFamily: 'Nunito',
          }}
        >
          My Week
        </h1>
        <Button
          sx={{
            height: '7vh',
          }}
          variant='outlined'
          onClick={handleOpen}
        >
          Add Entry
        </Button>
      </div>
      <div
        style={{
          paddingBottom: '20px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Button
          variant='contained'
          onClick={() => {
            setFilterDate(filterDate.subtract(7, 'day'));
          }}
        >
          Prev
        </Button>
        <input
          type='date'
          style={{
            borderWidth: '1px',
            borderRadius: '5px',
            padding: '5px',
            width: '50%',
            marginLeft: '10px',
            marginRight: '10px',
          }}
          value={filterDate.toISOString().slice(0, 10)}
          onChange={(e) => {
            setFilterDate(dayjs(e.target.value));
          }}
        />
        <Button
          variant='contained'
          onClick={() => {
            setFilterDate(filterDate.add(7, 'day'));
          }}
        >
          Next
        </Button>
      </div>
      <WeeklyEntryTable weeklyEntries={weeklyEntries} style={{}} />

      <AddEntryDialog open={open} onClose={handleClose} />
    </div>
  );
}
