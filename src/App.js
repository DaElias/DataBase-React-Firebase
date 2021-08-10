import React from "react";
import styled from "styled-components";
import Formulario from "./Components/Formulario";


function App() {
  return (
    <Container>
      <Titulo>Lista de contactos</Titulo>
      <Formulario />
    </Container>
  );
}
const Container = styled.div`
	margin: 40px;
	width: 90%;
	max-width: 400px;
	background: #fff;
	padding: 40px;
	border-radius: 5px;
	text-align: center;
`;

const Titulo = styled.h2`
	margin-bottom: 10px;
`;


export default App;


