import React from "react";
import { Outlet } from "react-router-dom";

//MUI components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import AppBarNav from "../Widgets/AppBar/AppBarNav";

function MasterPage() {
  return (
    <>
      <AppBarNav />
      <Container sx={{marginTop:'1%'}}>
        <Outlet />
      </Container>
    </>
  );
}

export default MasterPage;
