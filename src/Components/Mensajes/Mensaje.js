import React, { useState, useEffect } from 'react'
import './StyledMensajes.css';

const Mensaje = ({ notificacion }) => {
    const [display, setdisplay] = useState("none");
    const [mensaje, setmensaje] = useState("")
    const [color, setColor] = useState("");

   useEffect(()=>{
    if (notificacion.estado) {
        switch (notificacion.type) {
            case "green":
                setmensaje(notificacion.mensaje);
                setColor(notificacion.type);
                break;
            case "red":
                setmensaje(notificacion.mensaje);
                setColor(notificacion.type);
                break;
            default:
                break;
        }
        setdisplay("block");
        setTimeout(() => {
            
            setdisplay("none");
        }, 2000);
    }
   },[notificacion]);



    return (
        <div className={"containerMensaje " + color} style={{ display: display }}>
            {mensaje}
        </div >
    )
}


export default Mensaje;
