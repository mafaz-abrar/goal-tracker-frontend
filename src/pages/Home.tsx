import Button from '@mui/material/Button';
import dayjs, { Dayjs } from 'dayjs';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react';
import TimeSpent from '../api/TimeSpent';
import {
  Entry,
  WeeklyEntry,
  getWeeklyEntriesForDate,
} from '../api/api-interface';
import EntryDialog, {
  EntryDialogMode,
} from '../components/Dialogs/EntryDialog';
import WeeklyEntryTable from '../components/WeeklyEntryTable/WeeklyEntryTable';

/** TS is so dumb. WTF is this... */
interface RowContextType {
  setFlipped: Dispatch<SetStateAction<boolean>>;
}

export const RowContext = createContext<RowContextType>({
  setFlipped: () => {},
});

interface ModeContextType {
  setMode: Dispatch<SetStateAction<EntryDialogMode>>;
}

export const ModeContext = createContext<ModeContextType>({
  setMode: () => {},
});

export default function Home() {
  const [weeklyEntries, setWeeklyEntries] = useState<WeeklyEntry[]>([]);
  const [filterDate, setFilterDate] = useState<Dayjs>(dayjs());
  const [entryData, setEntryData] = useState<Partial<Entry>>({});
  const [flipped, setFlipped] = useState<boolean>(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [mode, setMode] = useState<EntryDialogMode>(EntryDialogMode.AddMode);

  useEffect(() => {
    async function getData() {
      const data = await getWeeklyEntriesForDate(filterDate.toDate());
      setWeeklyEntries(data);
    }

    getData();
  }, [filterDate, open, flipped]);

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
          onClick={() => {
            setEntryData({
              taskDescription: '✅',
              timeSpent: new TimeSpent(5),
              date: new Date(),
              startTime: new Date(),
              endTime: new Date(new Date().getTime() + 5 * 60000), // Add 5 minutes
            });
            setMode(EntryDialogMode.AddMode);
            handleOpen();
          }}
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

      <ModeContext.Provider value={{ setMode }}>
        <RowContext.Provider value={{ setFlipped }}>
          <WeeklyEntryTable
            weeklyEntries={weeklyEntries}
            setEntryData={setEntryData}
            handleDialogOpen={handleOpen}
          />
        </RowContext.Provider>
      </ModeContext.Provider>

      <EntryDialog
        open={open}
        handleClose={handleClose}
        entry={entryData}
        setEntry={setEntryData}
        mode={mode}
      />
    </div>
  );
}
