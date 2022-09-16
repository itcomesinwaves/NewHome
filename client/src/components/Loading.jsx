import React from 'react';
import { Stack, LinearProgress } from '@mui/material';

function Loading() {
  return (
    <div>
      <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
        <LinearProgress color="inherit" />
      </Stack>
    </div>
  );
}

export default Loading;
