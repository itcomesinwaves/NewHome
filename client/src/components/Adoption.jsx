import React, { useState, useEffect, useContext } from 'react';
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
import axios from 'axios';
import { UserContext } from '../UserContext.jsx';
// import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

function Adoption({ animalsData }) {
  // get rid of conditional rendering here and create a single card instance with dynamic data
  // this won't render until animals data is defined
  // navigate hook to render petview
  const { user, savedList } = useContext(UserContext);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [isLiked, setLiked] = useState(false);

  // on click render individual petview
  const handleEntryClick = () => {
    console.log('clicked on', animalsData.name);
    // navigate tag to render petview
    return navigate('/petview', { state: { animalsData } });
  };
  const handleSavePet = (e) => {
    console.log(e.target.id);

    // check if user is logged in, and button id;
    if (!loggedIn) {
      // direct a user to log in to save/follow pets
      window.alert('Please sign up/login');
    } else if (e.target.id === 'save') {
      console.log(user);
      // axios request for favoriting a pet
      // console.log('the animal object to save', animal);
      axios
        .post('/pet/savePet', {
          pet: {
            petId: animalsData.id,
            species: animalsData.species,
            breed: animalsData.breeds.primary,
            gender: animalsData.gender,
            name: animalsData.name,
            age: animalsData.age,
            tags: animalsData.tags,
            shelterInfo: {
              address: animalsData.contact.address,
              email: animalsData.contact.email,
              phone: animalsData.contact.phone,
            },
            adopted: animalsData.status,
            userId: user.id,
          },
        })
        .then((data) => {
          setLiked(true);
          console.log('data from pet/savePet', data);
        })
        .catch((err) => {
          console.error('error on /pet/savePet req', err);
        });
    } else {
      console.log('testing follow request');
    }
  };

  useEffect(
    () => (user !== null ? setLoggedIn(true) : setLoggedIn(false)),
    [loggedIn],
  );

  // const likeChanger = () => {
  //   const isLiked = savedList.map((ele) => ele.petId);
  //   if (isLiked.includes(animalsData.id)) {
  //     return (
  //       <IconButton
  //         id="save"
  //         aria-label="add to favorites"
  //         onClick={(e) => {
  // 				  handleSavePet(e);
  //         }}
  //       >
  //         <FavoriteIcon style={{ color: '#DEA057' }} size="small" />
  //       </IconButton>
  //     );
  //   } else {
  //     return (
  //       <IconButton
  //         id="save"
  //         aria-label="add to favorites"
  //         onClick={(e) => {
  //             handleSavePet(e);
  //         }}
  //       >
  //         <FavoriteIcon style={{ color: 'purple' }} size="small" />
  //       </IconButton>
  //     );

  //   }
  // };

  return (
    <Card raised sx={{ width: '40vw' }}>
      {(() => {
			  if (animalsData.photos.length) {
			    return (
  <CardMedia
    component="img"
    image={animalsData.photos[0].medium}
    alt=""
  />
			    );
			  }
      })()}

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
        <IconButton
          id="save"
          aria-label="add to favorites"
          onClick={(e) => {
					  handleSavePet(e);
          }}
        >
          <FavoriteIcon style={{ color: '#DEA057' }} size="small" />
        </IconButton>
        {/* {likeChanger()} */}
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
