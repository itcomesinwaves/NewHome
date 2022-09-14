import React from 'react';
import {
  Card, CardActions, CardContent, CardMedia, Button, Typography,
} from '@material-ui/core';

function FeedEntry(props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image="https://upload.wikimedia.org/wikipedia/commons/3/3f/Anole_Lizard_Hilo_Hawaii_edit_wizard.jpg"
        alt="card image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This lizard literally has magickal powers, and will GG you into Oblivian, yet, he still
          doesnt have a cozy spot to rest his head, FIX THAT NOW!
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">view more</Button>
        <Button size="small">save for later</Button>
      </CardActions>
    </Card>
  );
}
export default FeedEntry;
