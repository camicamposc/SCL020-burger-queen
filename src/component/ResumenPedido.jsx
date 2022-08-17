import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { collection, db, addDoc } from '../Firebase/config';
import { Button } from '@mui/material';
import growlAlert from 'growl-alert';
import 'growl-alert/dist/growl-alert.css';

const ResumenPedido = (props) => {
  const nMesa = props.mesa;
  const effect =
  {
      fadeAway: true,
      fadeAwayTimeOut: 1000,
  }

  const [result, setResult] = React.useState(props.resumen);

  const increase = (item) => {
    const array = props.resumen
    const itemSelected = array.find(element => element.idProducto === item.idProducto);
    const cantidad = itemSelected.countProducto++
    setResult({ ...array, countProducto: cantidad })
  }

  const subtract = (item) => {
    const array = props.resumen
    const itemSelected = array.find(element => element.idProducto === item.idProducto);
    if (itemSelected.countProducto > 1) {
      const cantidad = itemSelected.countProducto--
      setResult({ ...array, countProducto: cantidad })
    }
  }

  const remove = (item) => {
    const position = item.id;
    const menu = props.resumen.splice(position, 1)
    setResult(...menu)
  }

  const sendOrden = async (e) => {
    try {
      await addDoc(collection(db, 'Pedidos'), {
        estado: "en preparación",
        hourSend: new Date(),
        mesa: nMesa,
        orden: props.resumen
      })
      growlAlert.success({ text: 'Pedido Enviado', ...effect })
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div> 
      <TableContainer component={Paper} style={{ background: "rgb(245 143 143)", color: "white",  height: "100%" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" >
          <TableHead style={{ background: "rgb(245 143 143)", color: "white"}}>
            <TableRow>
              <TableCell style={{ color: "white"}} >Producto</TableCell>
              <TableCell align="right"style={{ color: "white"}}></TableCell>
              <TableCell align="center" style={{ color: "white"}}>Cantidad</TableCell>
              <TableCell align="right"style={{ color: "white"}}></TableCell>
              <TableCell align="right" style={{ color: "white"}}>Precio Unitario</TableCell>
              <TableCell align="right" style={{ color: "white"}}>Precio Total</TableCell>
              <TableCell align="right" style={{ color: "white"}}>Eliminar producto</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ background: "rgb(245 143 143)", color: "white"}}>
            {props.resumen.map((row, i) => (
              <TableRow
                key={i}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" style={{ color: "white"}}>
                  {row.nombreProducto}
                </TableCell>
                <TableCell align="right" style={{ color: "white"}}><RemoveIcon style={{ color: "white"}}
                  onClick={(e) => subtract(row)} /></TableCell>
                <TableCell align="center" style={{ color: "white"}}>{row.countProducto}</TableCell>
                <TableCell align="right" style={{ color: "white"}}><AddIcon style={{ color: "white"}}
                  onClick={(e) => increase(row)} /></TableCell>
                <TableCell style={{ color: "white"}}align="right"><AttachMoneyIcon style={{ color: "white"}}/>{row.precioProducto}</TableCell>
                <TableCell style={{ color: "white"}}align="right">Por Ejecutar</TableCell>
                <TableCell  style={{ color: "white"}}align="right"><DeleteIcon style={{ color: "white"}}
                  onClick={(e) => remove(row)} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button
        variant='contained'
        style={{ background: "white", color: "#A91313", width: "200px", height: "50px", margin:"10px"}}
        onClick={(e) => sendOrden()}>
        Enviar Pedido
      </Button>
      </TableContainer>
    

    </div>
  )
}

export default ResumenPedido