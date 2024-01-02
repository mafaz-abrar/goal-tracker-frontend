import Button from '@mui/material/Button';
import { Link, Outlet } from 'react-router-dom';

export default function NavBar() {
  return (
    <div>
      <nav
        style={{
          display: 'flex',
          backgroundColor: 'rgba(10,1,3,1)',
          justifyContent: 'space-between',
          paddingTop: '20px',
          paddingBottom: ' 20px',
          paddingLeft: '20px',
          paddingRight: '20px',
          alignItems: 'center',
        }}
      >
        <Link
          to='/'
          style={{
            textDecoration: 'none',
            // backgroundColor: 'red',
            fontFamily: 'Nunito',
            fontSize: '2em',
            alignItems: 'center',
            color: 'white',
          }}
        >
          GoalTracker
        </Link>

        <div>
          <Link to='/'>
            <Button
              sx={{
                color: 'white',
                fontFamily: 'Nunito',
                fontWeight: '1000',
                '&:hover': {
                  color: 'rgba(180,180,180,1)',
                },
              }}
              variant='text'
            >
              My Week
            </Button>
          </Link>

          <Link to='/entries'>
            <Button
              sx={{
                color: 'white',
                fontFamily: 'Nunito',
                fontWeight: '1000',
                '&:hover': {
                  color: 'rgba(180,180,180,1)',
                },
              }}
              variant='text'
            >
              My Entries
            </Button>
          </Link>

          <Link to='/goals'>
            <Button
              sx={{
                color: 'white',
                fontFamily: 'Nunito',
                fontWeight: '1000',
                '&:hover': {
                  color: 'rgba(180,180,180,1)',
                },
              }}
              variant='text'
            >
              Goals and Activities
            </Button>
          </Link>
        </div>
      </nav>

      <Outlet />
    </div>
  );
}
