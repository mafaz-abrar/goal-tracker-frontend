import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { WeeklyEntry } from '../api/api-interface';
import { weeklyEntriesTestData } from '../api/test-data';
import AddEntryDialog from '../components/Modals/AddEntryDialog/AddEntryDialog';
import WeeklyEntryTable from '../components/WeeklyEntryTable/WeeklyEntryTable';

export default function Home() {
  const [weeklyEntries, setWeeklyEntries] = useState<WeeklyEntry[]>([]);
  const [filterDate, setFilterDate] = useState('');

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
          My Week
        </h1>
        <Button
          sx={{
            height: '7vh',
          }}
          onClick={handleOpen}
        >
          +Add Entry
        </Button>
      </div>
      <WeeklyEntryTable
        weeklyEntries={weeklyEntries}
        style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto' }}
      />

      <AddEntryDialog open={open} onClose={handleClose} />
    </div>
  );
}
