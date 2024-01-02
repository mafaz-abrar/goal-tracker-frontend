import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Entries from './pages/Entries';
import GoalsAndActivities from './pages/GoalsAndActivities';
import Home from './pages/Home';
import PageNotFound from './pages/PageNotFound';

export default function App() {
  return (
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
  );
}
