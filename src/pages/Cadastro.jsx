import React from 'react'

import Container from 'react-bootstrap/esm/Container';

import FloatingLabel from 'react-bootstrap/FloatingLabel';

import Form from 'react-bootstrap/Form';

import Alert from 'react-bootstrap/Alert';

import Button from 'react-bootstrap/Button';

import Nav from "react-bootstrap/Nav"

import { useState } from 'react';

import { useNavigate } from 'react-router-dom';


const url = "http://localhost:5000/usuarios"

const Cadastro = () => {

  // variaveis pro usuario
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [confirmaSenha, setConfirmaSenha] = useState("")

  // variaveis pro alerta
  const [alertaClass, setAlertaClass] = useState("mb-3 d-none")
  const [alertaMensagem, setAlertMensagem] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async (e) =>{
    e.preventDefault()

    if(!nome == ""){
      if(!email == ""){
        if(!senha == "" && !confirmaSenha == "" && senha === confirmaSenha){
          const user = {nome, email, senha}
          const res =await fetch(url, {
            method: "POST",
            headers: {"Comtent-Type": "application/json"},
            body: JSON.stringify(user)
          })
          alert("Usuario cadastrado com sucesso")
          setNome("")
          setEmail("")
          setSenha("")
          setConfirmaSenha("")
          navigate("/Login")
        }
        else{
          setAlertaClass("mb-3")
          setAlertMensagem("As senha não são iguais")
        }

      }
      else{
        setAlertaClass("mb-3")
        setAlertMensagem("O campo email não pode ser vazio")
      }
    }
    else{
      setAlertaClass("mb-3")
      setAlertMensagem("O campo nome não pode ser vazio")
    }
  }

  return (
    <div>
      <Container>

      <span class="material-symbols-outlined" style={{fontSize:"100px", color: "green"}}>
      person_add
      </span>

        <form onSubmit={handleSubmit}>
        {/* caixinha do nome */}
      <FloatingLabel
        controlId="floatingInputName"
        label="Nome"
        className="mb-3"
      >
        <Form.Control type="text" placeholder="Digite seu nome..." value={nome} onChange={(e) =>{setNome(e.target.value);}}/>
        </FloatingLabel>

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

      {/* caixinha da confirmação da senha */}
      <FloatingLabel controlId="floatingConfirmPassword" label="Confirme a senha" className='mb-3'>

        <Form.Control type="password" placeholder="Password" value={confirmaSenha} onChange={(e) =>{setConfirmaSenha(e.target.value);}}/>
      </FloatingLabel>

      <Alert key="danger" variant="danger" className={alertaClass}>
          {alertaMensagem}
        </Alert>

        <Button variant="primary" type="submit">Cadastrar</Button>{' '}

      </form>

      <p>Já tem cadastro?
        <Nav.Link href="/login"style={{color:"Red"}}>-LOGIN-</Nav.Link>
      </p>
      </Container>
    </div>
  )
}

export default Cadastro