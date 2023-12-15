import React from 'react';
import { Tooltip } from '@mui/material';

function SlideTooltip(props) {
  const { children, value } = props;

  return (
    <Tooltip enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

export default SlideTooltip;
