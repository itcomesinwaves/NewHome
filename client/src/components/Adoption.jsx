import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  IconButton,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';

function Adoption({ animalsData }) {
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
  const handleSaveClick = () => {
    console.log('faved');
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
      <CardContent style={{ backgroundColor: '#E3C770' }}>
        <Typography gutterBottom variant="h5" component="div">
          {animalsData.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {animalsData.description}
        </Typography>
      </CardContent>
      <CardActions style={{ backgroundColor: '#A64B2A' }}>
        <Button
          style={{ backgroundColor: '#FCFFE7', color: '#DEA057' }}
          size="small"
          id="viewpet"
          onClick={handleEntryClick}
        >
          view more
        </Button>
        <IconButton aria-label="add to favorites" onClick={handleSaveClick}>
          <FavoriteIcon
            style={{ backgroundColor: '#FCFFE7', color: '#DEA057' }}
            size="small"
            id="savepet"
          />
        </IconButton>
      </CardActions>
    </Card>
  );
  // }
}
Adoption.propTypes = {
  animalsData: PropTypes.object.isRequired,
};
export default Adoption;
/* <IconButton aria-label="add to favorites"
style={{backgroundColor: "#FCFFE7", color: "#DEA057" }}
size="small" id="savepet"
onClick={handleSaveClick}>save for later</IconButton>
*/
