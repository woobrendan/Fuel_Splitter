import React from "react";
import { Box, Toolbar, AppBar } from "@mui/material";
import "../Styles/navBar.scss";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
  return (
    <div className="nav-bar">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ bgcolor: "#FF0000" }}>
          <Toolbar>
            <div className="navbar-links">
              <h1>Fuel Splitter</h1>
              <Link to="/">Trip Management</Link>
              <Link to="/history">History</Link>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default NavBar;
