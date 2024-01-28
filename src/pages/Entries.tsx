import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { DayWithExpandedEntries, getAllEntries } from '../api/api-interface';
import EntryTableGroup from '../components/EntriesTableGroup/EntryTableGroup';

export default function Entries() {
  const [data, setData] = useState<DayWithExpandedEntries[]>([]);

  useEffect(() => {
    async function getEntries() {
      const days = await getAllEntries();
      setData(days);
    }

    getEntries();
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
      <TextField variant='outlined' label='Search' fullWidth />
      <EntryTableGroup days={data} />
    </div>
  );
}
