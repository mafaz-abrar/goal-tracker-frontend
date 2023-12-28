import { useEffect, useState } from 'react';
import { API_SERVER } from '../api/config';
import { WeeklyEntry } from '../api/types';
import WeeklyEntryTable from '../components/WeeklyEntries/WeeklyEntryTable';
import logo from '../logo.svg';

export default function Home() {
  const [myData, setMyData] = useState('');
  const [input, setInput] = useState('');

  useEffect(() => {
    async function getData() {
      const res = await fetch(API_SERVER + '/test.php');
      const data = await res.json();

      setMyData(data);
    }

    getData();
  }, []);

  async function onSubmit() {
    const formData = new FormData();
    formData.append('input', input);
    const res = await fetch(API_SERVER + '/form_input.php', {
      method: 'POST',
      body: formData,
    });

    const resJ = await res.json();

    console.log(resJ);
  }

  const weeklyEntry: WeeklyEntry = {
    activityId: 1,
    activityName: 'activityName',
    goalId: 1,
    goalName: 'goalName',

    mondayHours: 'mondayHours',
    tuesdayHours: 'tuesdayHours',
    wednesdayHours: 'wednesdayHours',
    thursdayHours: 'thursdayHours',
    fridayHours: 'fridayHours',
    saturdayHours: 'saturdayHours',
    sundayHours: 'sundayHours',
  };

  const weeklyEntries: WeeklyEntry[] = [weeklyEntry, weeklyEntry];

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          {myData}
        </a>
      </header>

      <input
        type='text'
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <button onClick={onSubmit}>Submit</button>

      <div className='container'>Hello</div>

      <WeeklyEntryTable weeklyEntries={weeklyEntries} />
    </div>
  );
}
