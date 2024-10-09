import React from 'react'
import Container from 'react-bootstrap/esm/Container';

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

import Alert from 'react-bootstrap/Alert';

import Button from 'react-bootstrap/Button';

import Nav from "react-bootstrap/Nav"

import { useState, useEffect } from 'react';

const url = "http://localhost:5000/usuarios"

const Login = () => {

  // variaveis pro usuario
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")

  // variaveis pro alerta
  const [alertaClass, setAlertaClass] = useState("mb-3 d-none")
  const [alertaMensagem, setAlertaMensagem] = useState("")
  const [alertaVariant, useAlertaVariant] = useState("danger");

  // lista de usuarios
  const [usuarios, setUsuarios] = useState ([])
  

  // resgate de dados API
  useEffect(() => {
    async function fetchData(){
      try{
        const res = await fetch(url)
        const users = await res.json()
        setUsuarios(users)
      }
      catch(error){
        console.log(error.message)
      }
    }
    fetchData()

  },[]);

  return (
    <div>
      <Container>

      <span class="material-symbols-outlined" style={{fontSize:"100px", color: "green"}}>
       login
      </span>

        <form>
        {/* caixinha email */}
        <FloatingLabel
        controlId="floatingInputEmail"
        label="Email"
        className="mb-3"
      >
        <Form.Control type="email" placeholder="name@example.com" value={email} onChange={(e) =>{setEmail(e.target.value);}}/>
      </FloatingLabel>
        
        {/* caixinha da senha */}
      <FloatingLabel controlId="floatingPassword" label="Senha" className='mb-3'>

        <Form.Control type="password" placeholder="Password" value={senha} onChange={(e) =>{setSenha(e.target.value);}}/>
      </FloatingLabel>

      <Alert key="danger" variant={alertaVariant} className={alertaClass}>
          {alertaMensagem}
        </Alert>

        <Button variant="primary">Login</Button>{' '}

      </form>

      <p>Não tem cadastro?
        <Nav.Link href="/Cadastro"style={{color:"Red"}}>-CADASTRAR-SE-</Nav.Link>
      </p>
      </Container>
    </div>
  )
}

export default Login