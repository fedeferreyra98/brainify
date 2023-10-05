import React from 'react';
import List from '@mui/material/List';
import HiringItem from './HiringItem';

function HiringList({ contrataciones, handleEstadoChange, classes }) {
  return (
    <List className={classes.list}>
      {contrataciones.map((contratacion) => (
        <HiringItem
          key={contratacion.id}
          contratacion={contratacion}
          handleEstadoChange={handleEstadoChange}
        />
      ))}
    </List>
  );
}

export default HiringList;
