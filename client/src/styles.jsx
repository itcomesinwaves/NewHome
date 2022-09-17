import { ThemeProvider, createTheme } from '@mui/material';

// const theme = createTheme({
//   palette: {
//     primary: {
//       // light: will be calculated from palette.primary& .Main,
//       main: '#ff4400',
//       // dark: will be calculated from palette.primary& .Main,
//       // contrastText: will be calculated to contrast with palette.primary& .Main
//     },
//     secondary: {
//       light: '#0066ff',
//       main: '#0044ff',
//       // dark: will be calculated from palette.secondary& .Main,
//       contrastText: '#ffcc00',
//     },
//      // Provide every color token (light, main, dark, and contrastText) when using
//      // custom colors for props in Material UI's components.
//      // Then you will be able to use it like this: `<Button color="custom">`
//      // (For TypeScript, you need to add module augmentation for the `custom` value)
//     custom: {
//       light: '#ffa726'
//       main: '#f57c00',
//       dark: '#ef6c00',
//       contrastText: 'rgba(0, 0, 0, 0.87)',
//     },
//     // Used by `getContrastText()` to maximize the contrast between
//     // the background and the text.
//     contrastThreshold: 3,
//     // Used by the functions below to shift a color's luminance by approximately
//     // two indexes within its tonal palette.
//     // E.g., shift from Red 500 to Red 300 or Red 700.
//     tonalOffset: 0.2,
//   },
// });

//   Card
//   CardActions
//   CardContent
//   CardMedia
//   Button contained outlined
//   Typography h1 h5 body2
//   Container
//   LinearProgress
//   TextField standard
//   Grid
//   InputLabel
//   Select
//   MenuItem
//   Tabs
//   Tab

const theme = createTheme({
  palette: {
    primary: {
      main: '#B7D5E6',
      light: '#B7C4CF',
      contrastText: '#375E3D',
    },
    secondary: {
      main: '#EEE3CB',
      dark: '#967E76',
    },
  },
});

const styles = {
  '& .MuiCard-root': {},
  '& .MuiCardActions-root': {},
  '& .MuiCardContent-root': {},
  '& .MuiCardMedia-root': {},
  '& .MuiButton-root': {
    color: theme.palette.primary.contrastText,
    // '&:hover': {
    //   color: 'yellow',
    // },
    '&:active': {
      color: theme.palette.primary.contrastText,
    },
  },
  '& .MuiButton-contained': {
    bgcolor: theme.palette.primary.light,
    '&:hover': {
      bgcolor: theme.palette.primary.main,
    },
  },
  '& .MuiButton-outlined-root': {},
  '& .MuiTypography-h1-root': {},
  '& .MuiTypography-h5-root': {},
  '& .MuiTypography-body2-root': {},
  '& .MuiContainer-root': {},
  '& .MuiLinearProgress-root': {},
  '& .MuiTextField-root': {},
  '& .MuiGrid-root': {},
  '& .MuiInputLabel-root': {},
  '& .MuiSelect-select-root': {},
  '& .MuiMenuItem-root': {},

  // & .Mui-selected styles the currently selected tab of a tabs group
  '& .MuiTabs-root': {
    bgcolor: theme.palette.secondary.dark,
    'border-radius': '5px',
    ml: '20px',
    mr: '20px',
  },

  // color is for text color
  // &:hover is for style on hovering
  // backgroundColor is for background color
  '& .MuiTab-root': {
    color: 'black',
    bgcolor: theme.palette.primary.light,
    border: '2px solid black',
    borderRadius: '10px',
    ml: '20px',
    mr: '20px',
    mt: '10px',
    mb: '20px',
    '&:hover': {
      color: theme.palette.primary.contrastText,
    },
  },
  '.MuiBox-root': {},
};

export default styles;
