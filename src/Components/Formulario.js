import React, { useState } from 'react'
import styled from 'styled-components';
import DataBase from '../firebase/FirebaseConfig';
import Mensaje from './Mensajes/Mensaje';

const Formulario = () => {
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");

    const [notificacion, setNotificacion] = useState({
        estado: false,
        type: "", //green or red
        mensaje:"" 
    });

    const onSubmit = (e) => {
        e.preventDefault();

        //funcion asincrona
        if(nombre!=="" && correo !== ""){
            DataBase.collection('usuarios').add({
                email: correo,
                name: nombre
            }).then(() => {
                //se ejecuta cuando la funcion completo la tarea
                //alert("Agregado Correctamente");
                setNotificacion({
                    estado: true,
                    type: "green",
                    mensaje: "Enviado Exitoso!!"
                });
            
    
    
            }).catch((error) => {
                //se ejecuta cuando hay algun error
                //alert("Error: ", error);
                setNotificacion({
                    estado: true,
                    type: "red",
                    mensaje: "Error!!" 
                });
    
            });
        }else{
            setNotificacion({
                estado: true,
                type: "red",
                mensaje: "Espacios Vacios!!" 
            });
        }

        setNombre("");
        setCorreo("");
    }

    return (
        <form onSubmit={onSubmit}>
            <Mensaje
                notificacion={notificacion}
            />
            <Input
                type="text"
                name="nombre"
                value={nombre}
                onChange={(e) => { setNombre(e.target.value) }}
                placeholder="Nombre"
            />
            <Input
                type="email"
                name="nombre"
                value={correo}
                onChange={(e) => { setCorreo(e.target.value) }}
                placeholder="Correo"
            />
            <Boton type="submit">Enviar Datos</Boton>
        </form>
    )
}


const Input = styled.input`
    padding: 10px;
    border: 2px solid rgba(0,0,0,.2);
    border-radius: 3px;
    width: 100%;
    margin-bottom: 10px;
    transition: .2s ease all;
    outline: none;
    text-align: center;
    
    &:focus {
        border: 2px solid #3D76E9;
    }
`;

const Boton = styled.button`
    padding: 10px 30px;
    border: none;
    cursor: pointer;
    border-radius: 3px;
    transition: .3s ease all;
    outline: none;
    background: #C4C4C4;
    color: #fff;
    font-size: 12px;
 
    &:hover {
        background: #3D76E9;
    }
`;



export default Formulario
