import React from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import { auth, collection, db, signOut, where, onSnapshot, doc, query, updateDoc, deleteDoc } from '../Firebase/config';
import { useHistory } from 'react-router-dom';
import { Button, Grid } from '@mui/material';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Navbar from './Navbar';
import moment from 'moment';
import 'moment/locale/es';
import Swal from 'sweetalert2';
import growlAlert from 'growl-alert';
import 'growl-alert/dist/growl-alert.css';

const VistaChef = () => {

    const effect =
  {
      fadeAway: true,
      fadeAwayTimeOut: 1000,
  }

    const history = useHistory()

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

    const [orders, setOrders] = React.useState([])
    console.log("Camila16", orders)
    const [ordersDone, setOrdersDone] = React.useState([])
    console.log("Camila", ordersDone)
   
    const papitas = true;

    const hmh = require('hmh');

    React.useEffect(() => {
        if (papitas === true) {
            // repetir en vista de mesero
            const snapshot = (callback) => {
                const lookOrders = query(collection(db, "Pedidos"), where('estado', '==', 'en preparación'));
                onSnapshot(lookOrders, callback);
            }
            snapshot((item) => {
                const pedidos = item.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))
                // console.log(pedidos)
                setOrders(pedidos)
            })
        }
    }, [papitas])

    React.useEffect(() => {
        if (papitas === true) {
            // repetir en vista de mesero
            const snapshot = (callback) => {
                const lookOrders = query(collection(db, "Pedidos"), where('estado', '==', 'Servido'));
                onSnapshot(lookOrders, callback);
            }
            snapshot((item) => {
                const pedidos = item.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))
                // console.log(pedidos)
                setOrdersDone(pedidos)
            })
        }
    }, [papitas])

    const bull = (
        <Box
            component="span"
            sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
        >
            •
        </Box>
    );

    const edit = (item) => {
        console.log(item)
        updateDoc(doc(db, "Pedidos", item.id), {
            estado: "listo",
            hourDone: new Date().getTime(),
        }).then(() => {
            console.log("listo")
        })
            .catch(() => {
                console.log("error")
            })
    }

    const deleteOrders = (item) => {
        Swal.fire({
            title: "¿Estas seguro que quieres eliminar este pedido?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            denyButtonText: `Cancelar`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            deleteDoc(doc(db, 'Pedidos', item.id))
            .then(() => {
                growlAlert.success({ text: 'Pedido Eliminado', ...effect })
                // Swal.fire('Saved!', '', 'success')
            })
            .catch(() => {
                growlAlert.error({ text: 'El pedido no fue eliminado', ...effect })
                // Swal.fire('Changes are not saved', '', 'info')
            });
          })
    };

    return (
        <div >
            <Navbar />
            <Grid container justifyContent="center"
             alignItems="center"  spacing={2} className='mt-3'>
                {orders.map((item, index) => {
                    return (
                        <Card sx={{ minWidth: 210 }} key={index} style={{ background: "#A91313", color: "white", margin: "5px" }}>
                            <Typography sx={{ fontSize: 14 }} color="white" gutterBottom marginTop="10px">
                                Pedido {item.estado}
                            </Typography>
                            <span>Hora: {moment(item.hourSend).format('LT')}</span>
                            <Typography variant="h5" component="div">
                                Mesa {bull}{" " + item.mesa}
                            </Typography>
                            {item.orden.map((item, index) => {
                                return (
                                    <CardContent key={index}>
                                        <Typography color="white">
                                            {item.countProducto} {item.nombreProducto}
                                        </Typography>
                                    </CardContent>
                                )
                            })}
                            <CardActions>
                                <Button onClick={() => deleteOrders(item)}
                                    size="small" variant="contained" style={{ background: "#98C2B1", color: "#A91313", fontWeight: "bold", marginLeft: "10px" }}>
                                    Cancelar
                                </Button>
                                <Button
                                    size="small"
                                    variant="contained"
                                    style={{ background: "white", color: "#A91313", fontWeight: "bold" }}
                                    onClick={() => edit(item)}
                                >
                                    Listo
                                </Button>
                            </CardActions>
                        </Card>
                    )
                })}

            </Grid>
            <Grid container justifyContent="center"
             alignItems="center"  spacing={2} marginTop="10px">
                {ordersDone.map((item, index) => {
                    const send = `${new Date(item.hourSend).getHours()}h ${new Date(item.hourSend).getMinutes()}m`;
                    const hDelivered = `${new Date(item.hourDelivered).getHours()}h ${new Date(item.hourDelivered).getMinutes()}m`;
                    const difftime = (hmh.diff(`${send}`, `${hDelivered}`).toString());
                    console.log("siiii",send)
                    return (
                        <Card sx={{ minWidth: 210 }} key={index} style={{ background: "white", color: "#A91313", margin: "5px" }}>
                            <Typography sx={{ fontSize: 14 }} color="#A91313" gutterBottom marginTop="10px">
                                Pedido {item.estado}
                            </Typography>
                            <Typography variant="h5" component="div">
                                Mesa {bull}{" " + item.mesa}
                            </Typography>
                            {item.orden.map((item, index) => {
                                return (
                                    <CardContent key={index}>
                                        <Typography color="#A91313">
                                            {item.countProducto} {item.nombreProducto}
                                        </Typography>
                                    </CardContent>
                                )
                            })}
                            <CardActions>
                                
                                <span>Tiempo de preparación: {difftime}</span>
                            </CardActions>
                        </Card>
                    )
                })}

            </Grid>

        </div>
    )
}

export default VistaChef