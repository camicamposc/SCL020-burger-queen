import React from 'react'
import Grid from '@mui/material/Grid';
import { Button} from '@mui/material';
import { useHistory } from 'react-router-dom';
import Navbar from './Navbar';

const table = [
  {
    nMesa: "1",
    nombre: "Mesa 1"
  },
  {
    nMesa: "2",
    nombre: "Mesa 2"
  },
  {
    nMesa: "3",
    nombre: "Mesa 3"
  },
  {
    nMesa: "4",
    nombre: "Mesa 4"
  },
  {
    nMesa: "5",
    nombre: "Mesa 5"
  },
  {
    nMesa: "6",
    nombre: "Mesa 6"
  }
]

const VistaMesero = () => {
  const history = useHistory();

  const handleNext = (mesa) => {
    history.push(`/Pedidos/${mesa}`)
  }

  const handleOrders = () => {
    history.push("/EstadoPedidos")
  }
  return (
    <div>
      <Navbar/>
      <Grid container justifyContent="flex-end">
      <Grid item xs={6}>
        <Button variant='contained' onClick={handleOrders}
          style={{ background: "rgb(245 143 143)", color: "white",  width: "200px", height: "50px" }}>
          Estado de Pedidos
        </Button>
      </Grid>
      </Grid>
      <Grid container spacing={2} className="mt-3 mb-5">
        {table.map((item, index) => {
          return (
            <Grid item xs={6} key={index}>
              <Button
                variant='contained'
                style={{ background: "#A91313", color: "white", width: "350px", height: "100px" }}
                onClick={(e) => handleNext(item.nMesa)}
              >{item.nombre}</Button>
            </Grid>)
        })}

      </Grid>

    </div>
  )
}

export default VistaMesero