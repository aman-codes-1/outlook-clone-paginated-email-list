import {
  Box, CircularProgress, Grid, Typography,
} from '@mui/material';
import { circularProgressClasses } from '@mui/material/CircularProgress';

const Loader = ({
  message, center, height, boxHeight, color,
}) => (
  <Grid
    container
    justifyContent="center"
    alignItems="center"
    direction="column"
    style={{ minHeight: center ? '100vh' : height || '25vh' }}
    spacing={0}
  >
    <Box sx={{ position: 'relative', height: boxHeight || '25px' }}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: (theme) => theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        }}
        size={25}
        thickness={4}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color:
            color
            || ((theme) => (theme.palette.mode === 'light' ? '#1a90ff' : theme.palette.primary.main)),
          animationDuration: '550ms',
          position: 'absolute',
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
          },
        }}
        size={25}
        thickness={4}
      />
    </Box>
    {message && (
      <Typography pt={1} component="div">
        {message}
      </Typography>
    )}
  </Grid>
);

export default Loader;
