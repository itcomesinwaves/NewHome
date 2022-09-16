import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Post({ animalsData }) {
  // get rid of conditional rendering here and create a single card instance with dynamic data
  // this won't render until animals data is defined
  // navigate hook to render petview
  const navigate = useNavigate();

  // on click render individual petview
  const handleEntryClick = () => {
    console.log('clicked on', animalsData.name);
    // navigate tag to render petview
    return navigate('/petview', { state: { animalsData } });
  };

  return (
    <Card>
      <CardMedia
        component="img"
        height="400"
        width="400"
        image={
					animalsData.photos.length
					  ? animalsData.photos[0].medium
					  : 'https://st3.depositphotos.com/1322515/35964/v/600/depositphotos_359648638-stock-illustration-image-available-icon.jpg'
				}
        alt="card image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {animalsData.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {animalsData.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" id="viewpet" onClick={handleEntryClick}>
          view more
        </Button>
        <Button size="small">save for later</Button>
      </CardActions>
    </Card>
  );
  // }
}
Post.propTypes = {
  animalsData: PropTypes.object.isRequired,
};
export default Post;

//   if (!animalsData) {
//   return (
// 	<Card>
// 		<CardMedia
// 			component="img"
// 			height="140"
// 			image="https://upload.wikimedia.org/wikipedia/commons/3/3f/Anole_Lizard_Hilo_Hawaii_edit_wizard.jpg"
// 			alt="card image"
// 		/>
// 		<CardContent>
// 			<Typography gutterBottom variant="h5" component="div">
// 				{'tony'}
// 			</Typography>
// 			<Typography variant="body2" color="text.secondary">
// 				This lizard literally has magickal powers, and will GG you into
// 				Oblivian, yet, he still doesnt have a cozy spot to rest his head, FIX
// 				THAT NOW!
// 			</Typography>
// 		</CardContent>
// 		<CardActions>
// 			<Button size="small">view more</Button>
// 			<Button size="small">save for later</Button>
// 		</CardActions>
// 	</Card>
// );
// } else {

// image={[animalsData.photos[0].small ? animalsData.photos[0].small : 'https://st3.depositphotos.com/1322515/35964/v/600/depositphotos_359648638-stock-illustration-image-available-icon.jpg']}
