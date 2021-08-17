import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Contacto from './Contacto';
import DataBase from '../firebase/FirebaseConfig';

const ListaContactos = () => {
    const [contactos, setContactos] = useState([]);

    //se ejecuta el inicio
    useEffect(() => {
        DataBase.collection("usuarios").limit(4).onSnapshot((snapshot) => {
            setContactos(snapshot.docs.map((documento) => {
                return { ...documento.data(), id: documento.id }
            }));
            //console.log(snapshot.docs[0].data()," ",snapshot.docs[0].id);
        });
        //console.log(contactos);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        contactos.length > 0 &&  //* * Si contactos es mayor que 0 se muestra <ContenedorContactos>
        <ContenedorContactos>
            {contactos.map((contacto) => {
                return <Contacto
                    key={contacto.id}
                    id={contacto.id}
                    name={contacto.name}
                    email={contacto.email}
                />
            })}
        </ContenedorContactos>
    )
}


const ContenedorContactos = styled.div`
margin-top: 40px;

`;



export default ListaContactos;
