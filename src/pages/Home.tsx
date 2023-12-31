import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { weeklyEntriesTestData } from '../api/test-data';
import { WeeklyEntry } from '../api/types';
import WeeklyEntryTable from '../components/WeeklyEntryTable/WeeklyEntryTable';

export default function Home() {
  const [weeklyEntries, setWeeklyEntries] = useState<WeeklyEntry[]>([]);
  const [filterDate, setFilterDate] = useState('');

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    async function getData() {
      // const res = await fetch(API_SERVER + '/main_report.php');
      // const weeklyEntries = camelcaseKeysDeep(await res.json());

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
        >
          +Add Entry
        </Button>
      </div>
      <WeeklyEntryTable
        weeklyEntries={weeklyEntries}
        style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto' }}
      />

      <Modal open={open} onClose={handleClose}>
        <div style={{ backgroundColor: 'red' }}>Hello</div>
      </Modal>
    </div>
  );
}
