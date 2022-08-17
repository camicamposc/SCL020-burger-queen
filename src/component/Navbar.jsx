import React from 'react'
import Grid from '@mui/material/Grid';
import { IconButton } from '@mui/material';
import { useHistory } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { auth, signOut } from '../Firebase/config';

const Navbar = () => {
  const history = useHistory();

  const handleLogOut = e => {
    logOut()
    history.push("/")
  }

  const logOut = () => {
    signOut(auth)
      .then(() => {
        console.log('Adiós');
        // Sign-out successful.
      })
      .catch((error) => {
        alert('aún estás aquí');
        // An error happened.
      });
  }


  return (
    <div>
      <Grid container justifyContent="flex-end">
        <Grid item xs={4}>
          <IconButton style={{ background: "#A91313", border: "#A91313" }} size="large"className='mt-3'>
            <LogoutIcon
              onClick={() => handleLogOut()}
              style={{ color: "#98C2B1" }}
            />
          </IconButton>
      </Grid>
      </Grid>
      <img src="https://github.com/Noribel/SCL020-burger-queen/blob/main/src/imagenes/logo.png?raw=true"
        className="rounded-pill"
        style={{ height: "20%", width: "20%" }}
      ></img>
    </div>
  )
}

export default Navbar