import React, { useContext } from "react";
import {
  BottomNavigation,
  BottomNavigationAction
} from "@mui/material";
import NotesIcon from "@mui/icons-material/Notes";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useNavigate } from "react-router-dom";
import { MemoryContext } from "./memory/memory-store.tsx";
import { observer } from "mobx-react";
import { LoginContext } from "./login/login-store.ts";

const NavBar = observer(() => {
  const memoryStore = useContext(MemoryContext);
  const loginStore = useContext(LoginContext);
  const navigate = useNavigate();

  const clickList = () => {
    memoryStore.getMemories();
    navigate("/diary");
  };

  const clickNew = () => {
    memoryStore.getMemories();
    navigate("/addMemory");
  };

  const clickFavourites = () => {
    memoryStore.getFavourites();
    navigate("/favourites");
  };

  return (
    <BottomNavigation
      showLabels
      value={loginStore.page}
      onChange={(event, newValue) => {
        loginStore.clickPage(newValue);
      }}
    >
      <BottomNavigationAction
        label="Diary"
        icon={<NotesIcon />}
        onClick={clickList}
      />
      <BottomNavigationAction
        label="New"
        icon={<AddCircleOutlineIcon />}
        onClick={clickNew}
      />
      <BottomNavigationAction
        label="Favourites"
        icon={<StarBorderIcon />}
        onClick={clickFavourites}
      />
    </BottomNavigation>
  );
});

export default NavBar;
