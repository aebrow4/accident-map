'use client';

import { Button, Menu as _Menu, MenuItem } from '@mui/material';
import Link from 'next/link';
import * as React from 'react';

export default function Menu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
              variant="contained"
              onClick={handleClick}
            >
        yo
      </Button>
      <_Menu
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
            >
        <MenuItem
                onClick={handleClose}
              >
          <Link
                  href="/"
                >
            Home
          </Link>
        </MenuItem>
        <MenuItem
                onClick={handleClose}
              >
          <Link
                  href="/map"
                >
            Map
          </Link>
        </MenuItem>
      </_Menu>
    </div>

  );
}
