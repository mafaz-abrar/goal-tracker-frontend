import Button from '@mui/material/Button';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import {
  DayWithExpandedEntries,
  Entry,
  Goal,
  getAllEntriesForWeek,
} from '../api/api-interface';
import EntryDialog from '../components/Dialogs/EntryDialog';
import EntryTableGroup from '../components/EntriesTableGroup/EntryTableGroup';
import { RowContext } from './Home';

export default function Entries() {
  const [data, setData] = useState<DayWithExpandedEntries[]>([]);
  const [filterDate, setFilterDate] = useState<Dayjs>(dayjs());
  const [flipped, setFlipped] = useState<boolean>(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [entryData, setEntryData] = useState<Partial<Entry>>({});

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    async function getEntries() {
      const days = await getAllEntriesForWeek(filterDate.toDate());
      setData(days);
    }

    getEntries();
  }, [filterDate, flipped]);

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
          My Entries
        </h1>
        <Button
          sx={{
            height: '7vh',
          }}
          variant='outlined'
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
          Prev Week
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
          Next Week
        </Button>
      </div>

      <RowContext.Provider value={{ setFlipped }}>
        <EntryTableGroup
          days={data}
          setEntryData={setEntryData}
          handleDialogOpen={handleOpen}
          setSelectedGoal={setSelectedGoal}
        />
      </RowContext.Provider>

      <EntryDialog
        open={open}
        handleClose={handleClose}
        entry={entryData}
        setEntry={setEntryData}
        selectedGoal={selectedGoal}
        setSelectedGoal={setSelectedGoal}
      />
    </div>
  );
}
