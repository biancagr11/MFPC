import React from 'react';
import { BottomNavigation, BottomNavigationAction, Container } from '@mui/material';
import NotesIcon from '@mui/icons-material/Notes';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const HomePage = () => {
    const [value, setValue] = React.useState(0);

  return (
      <Container>
        <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
            setValue(newValue);
        }}
        >
            <BottomNavigationAction label="Journal" icon={<NotesIcon />} />
            <BottomNavigationAction label="New" icon={<AddCircleOutlineIcon />} />
            <BottomNavigationAction label="Favourites" icon={<StarBorderIcon />} />
        </BottomNavigation>      
        </Container>
  );
};

export default HomePage;