import { Box } from '@mui/material';
import LinearProgress, {
  LinearProgressProps,
} from '@mui/material/LinearProgress';

export default function LinearProgressWithLabel(
  props: LinearProgressProps & { label: string }
) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr',
      }}
    >
      <Box
        sx={{
          gridRowStart: 1,
          gridColumnStart: 1,
          paddingTop: '9px',
          paddingBottom: '9px',
        }}
      >
        <LinearProgress
          variant='determinate'
          {...props}
          sx={{ height: '20px', borderRadius: '10px', width: '100%' }}
        />
      </Box>
      <Box
        sx={{
          color: 'white',
          gridRowStart: 1,
          gridColumnStart: 1,
          zIndex: 2,
          padding: '10px',
        }}
      >
        {props.label}
      </Box>
    </Box>
  );
}
