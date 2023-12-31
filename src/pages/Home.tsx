import camelcaseKeysDeep from 'camelcase-keys-deep';
import { useEffect, useState } from 'react';
import { API_SERVER } from '../api/config';
import { WeeklyEntry } from '../api/types';
import WeeklyEntryTable from '../components/WeeklyEntryTable/WeeklyEntryTable';

export default function Home() {
  const [weeklyEntries, setWeeklyEntries] = useState<WeeklyEntry[]>([]);
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    async function getData() {
      const res = await fetch(API_SERVER + '/main_report.php');
      const weeklyEntries = camelcaseKeysDeep(await res.json());

      setWeeklyEntries(weeklyEntries);
    }

    getData();
  }, []);

  // async function onSubmit() {
  //   const formData = new FormData();
  //   formData.append('input', input);
  //   const res = await fetch(API_SERVER + '/form_input.php', {
  //     method: 'POST',
  //     body: formData,
  //   });

  //   const resJ = await res.json();

  //   console.log(resJ);
  // }

  // const weeklyEntry1: WeeklyEntry = {
  //   activityId: 1,
  //   activityName: 'Do 100 pushups',
  //   goalId: 1,
  //   goalName: 'Achieve an ideal body shape',
  //   targeting: false,
  //   weighting: 0,

  //   mondayHours: '00:00:00',
  //   tuesdayHours: '00:15:20',
  //   wednesdayHours: '00:20:15',
  //   thursdayHours: '09:00:00',
  //   fridayHours: '10:20:00',
  //   saturdayHours: '00:30:00',
  //   sundayHours: '20:00:00',
  // };

  // const weeklyEntry2: WeeklyEntry = {
  //   activityId: 1,
  //   activityName: 'Gave in to Mr. Jack',
  //   goalId: 1,
  //   goalName:
  //     'Keep track of my failures and one of those big ones huh what a catch lol who was that',
  //   targeting: true,
  //   weighting: 1,

  //   mondayHours: '20:00:00',
  //   tuesdayHours: '00:30:00',
  //   wednesdayHours: '10:45:00',
  //   thursdayHours: '45:00:20',
  //   fridayHours: '09:10:00',
  //   saturdayHours: '',
  //   sundayHours: '',
  // };

  // const weeklyEntry3: WeeklyEntry = {
  //   activityId: 1,
  //   activityName: 'Do 300 pushups',
  //   goalId: 1,
  //   goalName: 'Achieve an ideal body shape',
  //   targeting: true,
  //   weighting: -1,

  //   mondayHours: '00:00:00',
  //   tuesdayHours: '00:15:20',
  //   wednesdayHours: '00:20:15',
  //   thursdayHours: '09:00:00',
  //   fridayHours: '10:20:00',
  //   saturdayHours: '00:30:00',
  //   sundayHours: '20:00:00',
  // };

  // const weeklyEntries: WeeklyEntry[] = [
  //   weeklyEntry1,
  //   weeklyEntry2,
  //   weeklyEntry3,
  // ];

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ textAlign: 'center' }}>Goal Tracker</h1>
      <input style={{ marginTop: '20px', marginBottom: '20px' }} type='date' />
      <WeeklyEntryTable weeklyEntries={weeklyEntries} />
    </div>
  );
}
