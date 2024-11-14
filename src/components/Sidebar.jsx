// src/components/Sidebar.jsx
import React from 'react';
import { Box, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <Box sx={{ width: '200px', bgcolor: 'background.paper' }}>
      <List>
        <ListItem button component={Link} to="/products">
          <ListItemText primary="Productos" />
        </ListItem>
        <ListItem button component={Link} to="/catalog">
          <ListItemText primary="Catálogo" />
        </ListItem>
        <ListItem button component={Link} to="/sales">
          <ListItemText primary="Ventas" />
        </ListItem>
        <ListItem button component={Link} to="/reservations">
          <ListItemText primary="Reservas" />
        </ListItem>
        <ListItem button component={Link} to="/reports">
          <ListItemText primary="Informes" />
        </ListItem>
      </List>
    </Box>
  );
}

export default Sidebar;
