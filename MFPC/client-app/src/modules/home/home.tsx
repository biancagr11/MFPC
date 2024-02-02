import React from "react";
import { Container } from "@mui/material";
import NavBar from "../navbar.tsx";

const HomePage = () => {
  return (
    <Container>
      <NavBar />
      <div style={{width:"100%", display:"flex", alignItems: "center", justifyContent:"center", marginTop: "240px"}}>
        <img
          src={require("../../images/welcome.jpg")}
          alt={"Welcome"}
          loading="lazy"
          width={"50%"}
        />
      </div>
    </Container>
  );
};

export default HomePage;
