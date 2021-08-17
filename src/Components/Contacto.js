import React, { useState } from 'react'
import styled from 'styled-components';
import DataBase from '../firebase/FirebaseConfig';
import Mensaje from './Mensajes/Mensaje';

const Contacto = ({ id, name, email }) => {
    const [editTarea, setEditTarea] = useState(false);
    const [nuevoNombre, setNuevoNombre] = useState(name);
    const [nuevoCorreo, setNuevoCorreo] = useState(email);
    //* Mensajes
    const [notificacion, setNotificacion] = useState({
        estado: false,
        type: "", //green or red
        mensaje: ""
    });
    

    const eliminarContancto = (id) => {
        DataBase.collection("usuarios").doc(id).delete().then(()=>{
            console.log("Cambio efectuado!!");
        });
    }
    const actualziarContacto = (e) => {
        e.preventDefault();
        //console.log("name: ",name,", id: ",id);
        DataBase.collection("usuarios").doc(id).update({
            name: nuevoNombre,
            email: nuevoCorreo
        }).then(() => {
            setNotificacion({
                estado: true,
                type: "green",
                mensaje: "El cambio fue efectuado!!"
            });
            setEditTarea(!editTarea);
        }).catch(() => {
            setEditTarea(!editTarea);
            setNotificacion({
                estado: true,
                type: "red",
                mensaje: "El cambio no fue efectuado!!"
            });
        });

    }

    return (
        <ContenedorContacto onSubmit={actualziarContacto}>
            <Mensaje notificacion={notificacion} />
            {editTarea ?
                <form>
                    <Input
                        type="text"
                        name="nombre"
                        value={nuevoNombre}
                        onChange={(e) => setNuevoNombre(e.target.value)}
                        placeholder="Nombre"
                    />
                    <Input
                        type="text"
                        name="email"
                        value={nuevoCorreo}
                        onChange={(e) => { setNuevoCorreo(e.target.value) }}
                        placeholder="correo"
                    />
                    <Boton type="submit"> Actualizar</Boton>
                </form>
                :
                <div>
                    <Nombre>{name}</Nombre>
                    <Correo>{email}</Correo>
                    <Boton onClick={() => setEditTarea(!editTarea)}>Editar</Boton>
                    <Boton onClick={() => eliminarContancto(id)}>Borrar</Boton>

                </div>

            }
        </ContenedorContacto>
    )
}
const ContenedorContacto = styled.div`
    padding: 10px 0;
    border-bottom: 1px solid rgba(0,0,0,.2);
`;

const Nombre = styled.p`
    font-weight: bold;
`;

const Correo = styled.p`
    font-style: italic;
    color: #6B6B6B;
    margin: 5px 0;
`;

const Boton = styled.button`
    padding: 5px 20px;
    border: none;
    cursor: pointer;
    border-radius: 3px;
    margin: 0px 2px;
    margin-bottom: 10px;
    transition: .3s ease all;
    outline: none;
    background: #C4C4C4;
    color: #fff;
    font-size: 12px;
 
    &:hover {
        background: #3D76E9;
    }
`;

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

export default Contacto;
