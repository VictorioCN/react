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
  const [alertaVariant, setAlertaVariant] = useState("danger");

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

  const gravarLocalStorage = (usuario) => {
    localStorage.setItem("userName", usuario.nome)
    localStorage.setItem("userEmail", usuario.email)
  }

  const handleLogin = async (e)  => {
    e.preventDefault()

    const user = {email, senha}

    const userToFind = usuarios.find(
      (userFind) => userFind.email == user.email
    )

    if(email !=""){
      if(senha !=""){
        if(userToFind != undefined && userToFind.senha == senha){
          setAlertaClass("mb-3")
          gravarLocalStorage(userToFind)
          alert("Login efetuado com Sucesso")
          setAlertaMensagem("Login efetuado com Sucesso")
          setAlertaVariant("success")
        }
        else{
          setAlertaClass("mb-3")
      setAlertaMensagem("Usuarios ou senha inválidos")
        }
        
      }
      else{
        setAlertaClass("mb-3")
      setAlertaMensagem("O campo senha não pode ser vazio")
      }

    }
    else{
      setAlertaClass("mb-3")
      setAlertaMensagem("O campo email não pode ser vazio")
    }


  }

  return (
    <div>
      <Container>

      <span class="material-symbols-outlined" style={{fontSize:"100px", color: "green"}}>
       login
      </span>
    

        <form onSubmit={handleLogin}>
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

        <Button variant="primary" type='submit'>Login</Button>{' '}

      </form>

      <p>Não tem cadastro?
        <Nav.Link href="/Cadastro"style={{color:"Red"}}>-CADASTRAR-SE-</Nav.Link>
      </p>
      </Container>
    </div>
  )
}

export default Login