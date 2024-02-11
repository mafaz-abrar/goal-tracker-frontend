import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import 'dayjs/locale/en-au';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Entries from './pages/Entries';
import GoalsAndActivities from './pages/GoalsAndActivities';
import Home from './pages/Home';
import PageNotFound from './pages/PageNotFound';

import 'dayjs/locale/en-gb';

// The Localization Provider of AdapterDayjs means that all controlled Date and TimePicker values
// need to be Dayjs values, convert to and from the Date object when storing to state. Also, the
// pickers will try to get a default value of now. See
// https://mui.com/x/react-date-pickers/base-concepts/#reference-date-when-no-value-is-defined
export default function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-au'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<NavBar />}>
            <Route index element={<Home />} />
            <Route path='goals' element={<GoalsAndActivities />} />
            <Route path='entries' element={<Entries />} />
            <Route path='*' element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  );
}
