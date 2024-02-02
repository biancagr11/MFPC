import { Container, Grid } from "@mui/material";
import { observer } from "mobx-react";
import { MemoryContext } from "./memory-store.tsx";
import { useContext, useEffect } from "react";
import React from "react";
import MemoryCard from "./memory-card.tsx";
import NavBar from "../navbar.tsx";

const Diary = observer(() => {
  const memoryStore = useContext(MemoryContext);
  const { memories } = memoryStore;

  return (
    <Container>
      <NavBar />
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} style={{marginTop: "20px"}}>
        {memories.map((value) => (
          <Grid item xs={2} sm={4} md={4} key={value.id}>
            <MemoryCard memory={value}></MemoryCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
});

export default Diary;
